# What is [Canary](https://www.npmjs.com/package/canary-bird)?
Canary checks the status of a provided source and performs a callback
function when that status changes. It is inspired by the CLI util
[netcat](https://en.wikipedia.org/wiki/Netcat) and powered by
[cron](https://www.npmjs.com/package/cron) and
[netcat](https://www.npmjs.com/package/netcat).

### Use Canary to notify your developers of critical connection failures.

## Basic Usage
```
const { healthCheck } = require('canary-bird');

// start
const myHealthcheck = healthCheck({
    ip: <target ip>,
    port: <target port>,
    onComplete: (report) => console.log('checked server status', report),
    repeat: '* * * * * *', // every second
}).start();

// stop
myHealthCheck.stop();
```

Your onChange function will always be called with a report object
matching this format:
```
{
    ip: 'xxx.xx.xx.xxx',
    port: 8080,
    listening: true,
}
```


## Required Configuration
**repeat:** How often to repeat the health check. Supports a value that
is in standard cron format.

**onComplete:** The function to perform when the health check completes.

**ip:** The ip address of the server you'd like to check.

**port:** The port that the target service should be listening on.

## Optional Configuration

**timezone:** The desired timezone to schedule the health check with.
Defaults to `America/New_York`.

**timeout:** How long you want to your netcat command to wait for a
connection. Defaults to 1 second.
