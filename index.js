
const { spawn } = require('child_process');
const { CronJob } = require('cron');

const checkWithNetcat  = (ip, port, threshold) => {
  return new Promise((resolve, reject) => {
    const netcat = spawn('nc', ['-z', '-w', threshold, ip, port]);

    netcat.on('exit', code => code ? reject({ ip, port, connected: !code }) : resolve({ ip, port, connected: !code }));
  });
};

const numToCron = {
  'half-hour': '*/30 * * * *',
  'hourly': '0 * * * *',
  'half-day': '* */12 * * *',
  'daily': '0 0 * * *',
};

exports.healthCheck = (config) => {
  const {
    ip,
    port,
    timezone,
    onSuccess,
    onError,
    repeat,
    threshold,
  } = config;

  if (ip && port) {
    const time = numToCron[repeat] || repeat;
    const tz = timezone || 'America/New_York';
    const timeout = threshold || 1;
    const algo = () => {
      return checkWithNetcat(ip, port, threshold)
        .then(onSuccess)
        .catch(onError);
    };

    return new CronJob(time, algo, null, true, tz);
  }

  throw new Error('Missing required arguments ip and port.');
};
