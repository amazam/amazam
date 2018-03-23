const cancelPromise = (promise) => {
  let canceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(value => canceled ? reject(new Error('This is not bug. Already canceled.')) : resolve(value))
      .catch(error => canceled ? reject(new Error('This is not bug. Already canceled.')) : reject(error));
  });

  return ({
    promise: wrappedPromise,
    cancel() {
      canceled = true;
    },
  });
};

export default cancelPromise;
