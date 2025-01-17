import path from 'path';
import { Worker } from 'worker_threads';

const workerPath = path.join(__dirname, 'thread.cjs');

export default (workerData:object): Promise<void> => new Promise((resolve, reject) => {
  const worker = new Worker(workerPath, {
    workerData,
  });

  let finished:boolean = false;

  worker.once('message', ({ errMessage, data }) => {
    finished = true;

    if (errMessage) reject(new Error(`Thread ${errMessage}`));
    else resolve(data);
  });

  worker.once('error', reject);

  worker.once('exit', () => {
    if (!finished) {
      finished = true;
      resolve();
    }
  });
});
