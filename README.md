# What is Canary?
Canary is a super lightweight module that checks the status of a provided
source and performs a callback function when that status changes. It is
powered by the CLI util [netcat](https://en.wikipedia.org/wiki/Netcat)
and Node's `child_process`.

### Use Canary to notify your developers of critical connection failures.

## Basic Usage
```
const { healthCheck } = require('canary-bird');

// start
const myHealthcheck = healthCheck({
    ip: <target ip>,
    port: <target port>,
    onChange: (report) => console.log('status changed', report),
    onComplete: (report) => console.log('no change', report),
    repeat: '* * * * * *', // every second
}).start();

// stop
myHealthCheck.stop();
```

Your onChange and onComplete functions will always be called with an object
matching this format:
```
{
    ip: 'xxx.xx.xx.xxx',
    port: 8080,
    currentStatus: Number,
    previousStatus: Number
}
```

Status `1` represents a failure to connect and status `0` represents a
successful connection.

## Optional Configuration
**repeat:** How often to repeat the health check. Takes `half-hour`,
`hourly`, `half-day`, `daily`, or a custom value that is in standard
cron format.

**timezone:** The desired timezone to schedule the health check with.
Defaults to `America/New_York`.

**timeout:** How long you want to your netcat command to wait for a
connection. Defaults to 1 second.
