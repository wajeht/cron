<img src="https://raw.githubusercontent.com/wajeht/cron/main/.github/screenshot.png" width="100%" />

## Cron Scheduler with FastQ, Fork and PM2
This project uses node-cron, fastq, child_process.fork, and PM2 to schedule cron jobs, process tasks in a queue, run tasks in child processes, and manage the application, respectively.

### Installation
Clone the repository:
```bash
$ git clone https://github.com/wajeht/cron.git
```

### Install dependencies:
```bash
$ cd cron
$ npm install
```

### Running the Scheduler
Use the provided script to start the application with PM2:

```bash
$ chmod +x ./start.sh
$ ./start.sh
```

### Features
- **node-cron:** Schedules cron jobs in Node.js.
- **fastq:** Manages a queue of tasks with variable concurrency.
- **PM2:** Process manager to keep your application running.
- **child_process.fork:** Runs tasks in child processes for improved performance.

### Configuration
Update the `schedules` array in `index.js` to change the cron schedules.
Modify the FastQ concurrency setting to change the number of tasks executed in parallel.
```javascript
const queue = fastq.promise(logWorker, 10); // Concurrency set to 10
```

### Logs
Logs are written to the `logs` directory. You can also view PM2 logs using:

```bash
$ pm2 logs cron
```

### Monitoring
To monitor the application's resource usage, run:

```bash
$ pm2 monit
```
