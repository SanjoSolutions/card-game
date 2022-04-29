export function cssClasses(classes) {
  return (
    classes
      .map(entry => Array.isArray(entry) ? entry : [entry, true])
      .filter(([_, include]) => include)
      .map(([className, _]) => className)
      .join(' ')
  )
}
