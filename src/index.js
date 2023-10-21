import { fork } from 'child_process';
import cron from 'node-cron';
import path from 'path';

const worker = fork(path.resolve('src', 'worker.js'));

function getCronExpression(time, unit) {
  let cronExpression;
  switch (unit) {
    case 'second':
      cronExpression = `*/${time} * * * * *`;
      break;
    case 'minute':
      cronExpression = `0 */${time} * * * *`;
      break;
  }
  return cronExpression;
}

function main() {
  const schedules = [
    { time: 10, unit: 'second' },
    { time: 5, unit: 'second' },
    { time: 1, unit: 'minute' },
  ];

  for (const { time, unit } of schedules) {
    const cronExpression = getCronExpression(time, unit);
    cron.schedule(cronExpression, () => {
      worker.send({ time, unit });
    });
  }
}

main();
