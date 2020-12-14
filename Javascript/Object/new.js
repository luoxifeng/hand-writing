const setPrototypeOf = Object.setPrototypeOf || ((target, prototype) => target.__proto__ = prototype);
const myNew = (Constrcutor, ...args) => {
    const empty = {};
    const result = Constrcutor.call(empty, ...args);
    setPrototypeOf(empty, Constrcutor.prototype)
    return result instanceof Object ? result : empty;
}