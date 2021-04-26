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

class DeferAll extends Controller {

  baseCtl = null
  
  controllers = []

  constructor() {
    super()
  }

  get result() {
    return this.promise.then(() => Promise.all(this.controllers))
  }


  createController() {
    const controller = new Controller(
      cb => res => {

        cb(res)
      },
      cb => res => {
        cb(res)
      }
    )
    this.controllers.push(controller)
    return controller
  }

  reset() {
    
  }

}