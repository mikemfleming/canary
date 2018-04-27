
const { spawn } = require('child_process');
const { CronJob } = require('cron');

exports.healthCheck = (config) => {
  const {
    ip,
    port,
    onComplete,
    repeat,
    timeout = 1,
    timezone = 'America/New_York',
  } = config;

  if (ip && port) {
    const algo = () => {
      const netcat = spawn('nc', ['-z', '-w', timeout, ip, port]);
      netcat.on('exit', code => onComplete({ ip, port, currentStatus: code }));
    };

    return new CronJob(repeat, algo, null, true, timezone);
  }

  throw new Error('Missing required arguments ip and port.');
};
