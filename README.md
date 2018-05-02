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
    onComplete: (report) => console.log('checked server status', report),
    repeat: '* * * * * *', // every second
}).start();

// stop
myHealthCheck.stop();
```

Your onChange function will always be called with an object
matching this format:
```
{
    ip: 'xxx.xx.xx.xxx',
    port: 8080,
    listening: true,
}
```

currentStatus `1` represents a failure to connect and status `0` represents a
successful connection.

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
