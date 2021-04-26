function deferAll() {
  const baseCtl = {
    resolve: () => {},
    reject: () => {}
  }
  const deferList = []
  const promise = new Promise((resolve, reject) => {
    baseCtl.resolve = resolve
    baseCtl.reject = reject
  })
  const createControl = () => {

  }

  return {
    createControl,
    result: promise.then(() => Promise.all(deferList))
  }
}

class Controller {
  promise = Promise.resolve()

  resolve = () => {}

  reject = () => {}

  constructor(resolve, reject) {
    this.promise = new Promise((...args) => {
      [this.resolve, this.reject] = [
        resolve ? resolve(args[0]) : args[0],
        reject ? reject(args[1]) : args[1],
      ]
    })
  }

}

class DeferAll {

  _baseController = new Controller()
  
  _controllers = []

  _doneCount = 0

  resolveCb = () => {}

  rejectCb = () => {}

  constructor(resolveCb = () => {}, rejectCb = () => {}) {
    this.resolveCb = resolveCb;
    this.rejectCb = rejectCb
  }

  then(resolve, reject) {
    return this._baseController.promise
      .then(() => Promise.all(this._controllers.map(t => t.promise)))
      .then(resolve, reject)
  }

  createController() {
    const controller = new Controller(
      cb => res => {
        cb(res)
        const total = this._controllers.length;
        const done = ++this._doneCount
        this.resolveCb({
          total,
          done,
          data: res,
        })
        if (total === done) {
          this._baseController.resolve()
        }
      },
      cb => res => {
        this._baseController.resolve()
        cb(res)
      }
    )
    this._controllers.push(controller)
    return controller
  }

  reset() {
    this._doneCount = 0
    this._baseController = new Controller()
    this._controllers.forEach(controller => controller.reset())
  }
}

const defer = new DeferAll()




const ctl1 = defer.createController()
const ctl2 = defer.createController()
defer.then(console.log, console.error)
ctl1.resolve(1)
ctl1.resolve(2)
const ctl3 = defer.createController()

ctl3.resolve(3)


