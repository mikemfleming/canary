
const { spawn } = require('child_process');
const { CronJob } = require('cron');

const checkWithNetcat  = (ip, port) => {
  return new Promise((resolve, reject) => {
    const netcat = spawn('nc', ['-z', '-w', '1', ip, port]);

    netcat.on('exit', code => code ? reject({ ip, port, code }) : resolve({ ip, port, code }));
  });
};

const numToCron = {
  'half-hour': '*/30 * * * *',
  'hour': '0 * * * *',
  'half-day': '* */12 * * *',
  'day': '0 0 * * *',
};

exports.healthCheck = (config) => {
  const {
    ip,
    port,
    timezone,
    onSuccess,
    onError,
    repeat,
  } = config;

  if (ip && port) {
    const time = numToCron[repeat] || repeat;
    const tz = timezone || 'America/New_York';
    const algo = () => {
      return checkWithNetcat(ip, port)
        .then(onSuccess)
        .catch(onError);
    };

    return new CronJob(time, algo, null, true, tz);
  }

  throw new Error('Missing required arguments ip and port.');
};
