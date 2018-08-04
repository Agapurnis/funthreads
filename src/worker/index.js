const path = require('path');
const { Worker } = require('worker_threads');

const workerPath = path.join(__dirname, 'thread.js');

function startWorker(workerData) {
	return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData });
    let finished = false;

    worker.once('message', ({ errMessage, data }) => {
      finished = true;
      if (errMessage) return reject(new Error(`Thread ${errMessage}`));
      resolve(data)
    });
    worker.once('error', reject);
    worker.once('exit', () => {
      if (finished) return;
      finished = true;
      resolve();
    })
  });
}

module.exports = startWorker;