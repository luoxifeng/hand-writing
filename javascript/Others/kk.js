
function createProcessManagerCreator({
  type = 'all'
} = {}) {
   let  usedCount = 0,
    baseResolve = () => { };
  const allProcess = [];
  const basePromise = new Promise(res => baseResolve = () => res(allProcess));
  const resolveWrapper = resolve => arg => {
    allProcess.length === ++usedCount && baseResolve();
    resolve(arg);
  };

  const createProcess = () => {
    let resolve;
    let reject;
    const promise = new Promise((...cbs) => [resolve, reject] = cbs);
    allProcess.push(promise);

    return {
      resolve: resolveWrapper(resolve),
      reject: arg => {
        baseResolve();
        reject(arg);
      }
    };
  };


  return [createProcess, basePromise
    .then(Promise[type].bind(Promise))];
}

var [createProcess, promise] = createProcessManagerCreator()




var ctl1 = createProcess()
var ctl2 = createProcess()

ctl1.resolve(1)
ctl2.resolve(2)

promise.then(console.log, console.error)

var ctl3 = createProcess()
ctl3.resolve(3)

