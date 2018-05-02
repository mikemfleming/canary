
const { CronJob } = require('cron');
const NetcatClient = require('netcat/client');

exports.healthCheck = (config) => {
  const {
    ip,
    port,
    onComplete,
    repeat,
    timeout = 1000,
    timezone = 'America/New_York',
  } = config;

  if (ip && port) {
    return new CronJob(repeat, () => {
      const nc = new NetcatClient();
      nc.addr(ip).scan(port, (report) => {
        onComplete({ ip, port, listening: report[port] === 'open' });
      }).waitTime(timeout);
    }, null, true, timezone);
  }

  throw new Error('Missing required arguments ip and port.');
};
