export const makeGetterFromAccessor = selector => {
  switch (typeof selector) {
    case "string":
      return d => d[selector]
    case "function":
      return selector
    default:
      throw "Invalid accessor"
      return null
  }
}
