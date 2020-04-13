const toString = Object.prototype.toString

export function isObject(o: any): boolean {
    return toString.call(o) === '[object Object]'
}

export function isArray(a: any): boolean {
    return toString.call(a) === '[object Array]'
}

export function warn(message: string): void {
    return console && console.warn(message)
}
