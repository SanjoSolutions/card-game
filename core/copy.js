export function copy(value) {
  let valueCopy
  if (value === null || value === undefined || typeof value === 'number' || typeof value === 'string') {
    valueCopy = value
  } else if (Array.isArray(value)) {
    valueCopy = value.map(copy)
  } else if (typeof value === 'object') {
    valueCopy = copyObject(value)
  }
  return valueCopy
}

function copyObject(object) {
  const constructor = object.constructor
  const constructorName = constructor.name
  if (constructorName === 'Object') {
    return copyPlainObject(object)
  } else {
    const numberOfParameters = constructor.length
    let objectCopy
    if (numberOfParameters === 0) {
      objectCopy = new constructor()
      copyOverEntries(objectCopy, object)
    } else if (typeof constructor.prototype.copy === 'function') {
      objectCopy = object.copy()
    } else {
      throw new Error(`Failed to copy object. Maybe try to implement a "copy" method on the class "${object.constructor.name}".`)
    }
    return objectCopy
  }
}

function copyPlainObject(object) {
  const objectCopy = {}
  copyOverEntries(objectCopy, object)
  return objectCopy
}

export function copyOverEntries(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (!isJestMock(value)) {
      target[key] = copy(value)
    }
  }
}

function isJestMock(value) {
  return Boolean(value?.hasOwnProperty('mock'))
}
