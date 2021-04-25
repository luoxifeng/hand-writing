class Scheduler {

  max = 2

  taskList = []

  next = result => {
    this.taskList = this.taskList.filter(t => t.status === 'pedding')
    this.taskList[0] && this.taskList[0].resolve()
    return result;
  }

  async add(promiseFunc) {
    const task = {
      promise: null,
      resolve: () => {},
      status: 'pedding',
    }
    this.taskList.push(task)

    task.promise = new Promise(resolve => {
      task.resolve = () => {
        resolve()
        task.status = 'fulfilled'
      }
    })
      .then(promiseFunc)
      .then(this.next)
    
    if (this.taskList.length <= this.max) task.resolve() // 启动

    return task.promise;
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