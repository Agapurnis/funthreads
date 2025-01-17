const { runOnThread } = require('function-threads');

runOnThread(async () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('async');
  }, 3000);
}))
  .then((str) => {
    console.log(`Result: ${str}`);
  })
  .catch((err) => {
    console.error(err);
  });
