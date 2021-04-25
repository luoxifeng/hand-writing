class Scheduler {
    max = 2

    list = []

    async add(promiseFun) {
        const task = {
            promise: null,
            resolve: () => {},
            status: 'pedding',
        }

        task.promise = new Promise(res => {
            task.resolve = () => {
                res()
                task.status = 'fulfilled'
            }
        }).then(promiseFun)

        this.list.push(task)
        if (this.list.length <= this.max) task.resolve()

        return task.promise.then(res => {
            const i = this.list.indexOf(task)
            i > -1 && this.list.splice(i, 1)
            const undoneTask = this.list.find(t => t.status === 'pedding')
            undoneTask && undoneTask.resolve()
            return res;
        })

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