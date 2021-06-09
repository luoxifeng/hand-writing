const { resolve } = require('core-js/fn/promise')

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
}

const defer = new DeferAll()



const ctl1 = defer.createController()
const ctl2 = defer.createController()
defer.then(console.log, console.error)
ctl1.reject(1)
ctl2.resolve(2)
const ctl3 = defer.createController()

ctl3.resolve(3)


class Scheduler {
  max = 3

  list = []

  async add(taskFun) {
    const task = {
      promise: null,
      resolve: () => {},
      status: 'pedding',
    }

    task.promise = new Promise(resolve => {
      task.resolve = () => {
        task.status = 'fulfilled'
        resolve()
      }
    }).then(taskFun).then(res => {
      const undone = this.list.find(t => t.status === 'pedding') || Promise
      
      return undone.resolve(res)
    })

    this.list.push(task)

    if (this.list.length <= this.max) {
      task.resolve()
    }
    return task.promise
  }
}


const scheduler = new Scheduler()
const timeout = (time) => {
  return new Promise(r => setTimeout(r, time))
}
const addTask = (time, order) => {
  return scheduler.add(() => timeout(time))
    .then(() => (console.log(order), time))
}

addTask(1000, 1).then(console.log)
addTask(500, 2).then(console.log)
addTask(300, 3).then(console.log)
addTask(400, 4).then(console.log)
// 2 3 1 4

Promis.all = function(list) {
  const length = list.length
  let count = 0
  const result = []
  return new Promise((res, rej) => {
    for (let i = 0;i < length;i++) {
      Promise.resolve(list[i])
        .then(res => {
          result[i] = res
          count++
          if (count === length) res(result)
        }, rej)
    }
  })
}


Promise._allSettled = function(list) {
  const length = list.length
  let allCount = 0
  const result = []
  return new Promise(res => {
    for (let i = 0;i < length;i++) {
      Promise.resolve(list[i])
        .then(
          value => {
            result[i] = {
              status: "fulfilled",
              value
            }
          }, 
          reason => {
            result[i] = {
              status: "rejected",
              reason
            }
          }
        ).then(() => {
          allCount++
          if (allCount === length) res(result)
        })
    }
  })
}

Promise._allSettled([1, Promise.reject(2), 3, Promise.reject(4)])

