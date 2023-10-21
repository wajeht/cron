import { fork } from 'child_process';
import cron from 'node-cron';
import path from 'path';

const worker = fork(path.resolve('src', 'worker.js'));

function getCronExpression(time, unit) {
  const unitToCronMap = {
    'second': `*/%s * * * * *`,
    'minute': `0 */%s * * * *`,
    'hour': `0 0 */%s * * *`,
    'day': `0 0 0 */%s * *`,
    'week': `0 0 0 ? * %s`,
    'month': `0 0 0 1 */%s ?`
  };
  const cronTemplate = unitToCronMap[unit];
  return cronTemplate ? cronTemplate.replace('%s', time) : '';
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
