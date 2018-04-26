
const { spawn } = require('child_process');
const { CronJob } = require('cron');

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
    timezone = 'America/New_York',
    repeat = numToCron[repeat],
    timeout = 1,
    onChange,
    onComplete = () => {},
  } = config;

  if (ip && port) {
    let previousStatus = 0; // assume its up at first

    const algo = () => {
      return new Promise((resolve) => {
        const netcat = spawn('nc', ['-z', '-w', timeout, ip, port]);
        netcat.on('exit', code => resolve({ ip, port, currentStatus: code, previousStatus }));
      }).then(report => {
        if (report.currentStatus !== previousStatus) {
          onChange(report);
          previousStatus = report.currentStatus;
        }
        return onComplete(report);
      });
    };

    return new CronJob(repeat, algo, null, true, timezone);
  }

  throw new Error('Missing required arguments ip and port.');
};
