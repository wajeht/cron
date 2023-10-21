import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const worker = fork(path.resolve(__dirname, 'worker.js'));

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
