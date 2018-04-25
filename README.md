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

### Optional Configuration
**repeat:** how often to repeat the health check. Takes `half-hour`,
`hourly`, `half-day`, `daily`, or a custom value that is in standard
cron format.
**timezone:** The desired timezone to schedule the health check with.
Defaults to `America/New_York`.
