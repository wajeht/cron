import cron from 'node-cron';
import path from 'path';
import fs from 'fs';
import fastq from 'fastq';

async function logWorker(task) {
  const { time, unit } = task;
  const timestamp = new Date().toISOString();
  const name = `${time}-${unit}-at-${timestamp}.log`;
  const filepath = path.resolve('logs', name);
  await fs.promises.writeFile(filepath, name);
  console.log(name);
}

const logQueue = fastq.promise(logWorker, 10);

const schedules = [
  { time: 10, unit: 'second' },
  { time: 5, unit: 'second' },
  { time: 1, unit: 'minute' },
];

for (const { time, unit } of schedules) {
  let cronExpression;

  switch (unit) {
    case 'second':
      cronExpression = `*/${time} * * * * *`;
      break;
    case 'minute':
      cronExpression = `0 */${time} * * * *`;
      break;
  }

  cron.schedule(cronExpression, () => {
    logQueue.push({ time, unit });
  });
}
