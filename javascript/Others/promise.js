class EventEmitter {
  constructor() {
    this._events = {}
  }

  _ensure(type, callback) {
    return callback(this._events[type] = this._events[type] || [])
  }

  _on(type, callback, once, ...args) {
    this._ensure(type, events => {
      events.push({
        callback,
        args,
        once
      })
    })
  }

  on(type, callback, ...args) {
    this._on(type, callback, false, ...args)
  }

  fire(type, ...otherArgs) {
    this._ensure(type, events => {
      events.forEach(({ callback, args, once }) => {
        callback(...args, ...otherArgs)
        once && this.off(type, callback)
      })
    })
  }

  off(type, callback) {
    if (type === undefined) this._events = {}
    if (callback === undefined) delete this._events[type]
    this._ensure(type, events => {
      const i = events.findIndex(t => t.callback === callback)
      i > -1 && this._events[type].splice(i, 1)
    })
  }

  once(type, callback, ...args) {
    this._on(type, callback, true, ...args)
  }
}

var event = new EventEmitter()
var once = () => console.log('once')
event.once('once', once)
event.fire('once')
event.fire('once')

var normal = (...list) => console.log('normal', ...list)
event.on('normal', normal, 1, 2, 3)
event.fire('normal', 4, 5, 6)
event.off('normal')
event.fire('normal', 4, 5, 6)




