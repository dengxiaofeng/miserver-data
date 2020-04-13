const namespace = "MISERVICE-DATA"

export const setCache = (key: string, value: any): void => {
    if(!(window as any)[namespace]) {
        (window as any)[namespace] = {}
    }
    (window as any)[namespace][key] = value
}

export const getCache = (key: string): any => {
    const stark: any = (window as any)[namespace]
    return stark && stark[key] ? stark[key]: null
}


