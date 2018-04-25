# What is Canary?
Canary is a super lightweight module that checks the status of a provided
source and performs a callback function when that status changes.

### Use Canary to notify your developers of critical connection failures.

## Basic Usage
```
const { healthCheck } = require('canary');

// start
const myHealthcheck = healthCheck({
    ip: <target ip>,
    port: <target port>,
    onSuccess: () => console.log('success'),
    onError: () => console.log('error'),
    repeat: '* * * * * *',
}).start();

// stop
myHealthCheck.stop();
```

Your onSuccess and onError functions will always be called with an object
matching this format:
```
{ ip: 'xxx.xx.xx.xxx', port: 8080, connected: true/false }
```


## Optional Configuration
**repeat:** how often to repeat the health check. Takes `half-hour`,
`hourly`, `half-day`, `daily`, or a custom value that is in standard
cron format.
**timezone:** The desired timezone to schedule the health check with.
Defaults to `America/New_York`.
