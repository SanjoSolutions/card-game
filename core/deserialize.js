export function deserialize(typeMapping, value) {
  return JSON.parse(value, function (key, value) {
    if (isSerializedObject(value)) {
      const { type } = value
      if (typeMapping.has(type)) {
        const constructor = typeMapping.get(type)
        if (typeof constructor.deserialize === 'function') {
          return constructor.deserialize(value.value)
        } else {
          const value2 = new constructor()
          Object.assign(value2, value.value)
          return value2
        }
      } else {
        throw new Error(`No type for "${ type }" in typeMapping`)
      }
    } else {
      return value
    }
  })
}

function isSerializedObject(value) {
  return typeof value ===
    'object' &&
    value !== null &&
    !Array.isArray(value) &&
    value.hasOwnProperty('type') &&
    value.hasOwnProperty('value')
}
