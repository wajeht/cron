import path from 'path';
import fs from 'fs/promises';
import fastq from 'fastq';

async function worker({ time, unit }) {
  const timestamp = new Date().toISOString();
  const name = `${time}-${unit}-at-${timestamp}.log`;
  const filepath = path.resolve('logs', name);

  await fs.writeFile(filepath, name);
  console.log(name);
}

const queue = fastq.promise(worker, 1);

process.on('message', function (message) {
  queue.push(message);
});
