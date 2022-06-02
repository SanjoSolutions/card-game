export function serialize(value) {
  const space = 2
  return JSON.stringify(value, function (key, value) {
    if (typeof value === "object") {
      if (value === null || Array.isArray(value)) {
        return value
      } else {
        const constructorName = value.constructor.name
        if (constructorName === "Object") {
          return value
        } else {
          return {
            type: constructorName,
            value: { ...value },
          }
        }
      }
    } else {
      return value
    }
  }, space)
}
