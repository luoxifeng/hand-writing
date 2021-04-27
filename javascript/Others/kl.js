
class Controller {
  promise = Promise.resolve()

  resolve = () => { }

  reject = () => { }

  constructor(resolve, reject) {
    this.promise = new Promise((...args) => {
      [this.resolve, this.reject] = [
        resolve ? resolve(args[0]) : args[0],
        reject ? reject(args[1]) : args[1],
      ]
    })
  }

  then(...args) {
    return this.promise.then(...args)
  }

}

// function Controller(resolve, reject) {
//   this.promise = new Promise((...args) => {
//     [this.resolve, this.reject] = [
//       resolve ? resolve(args[0]) : args[0],
//       reject ? reject(args[1]) : args[1],
//     ]
//   })
//   this.then = this.promise.then.bind(this.promise)
// }

// function createDeferPromise() {
//   const baseController = new Controller()
//   const controllers = []


// }
class DeferPromise {

  _baseController = new Controller()

  _controllers = []

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
}

const defer = new DeferAll()



const ctl1 = defer.createController()
const ctl2 = defer.createController()
defer.then(console.log, console.error)
ctl1.reject(1)
ctl2.resolve(2)
const ctl3 = defer.createController()

ctl3.resolve(3)


