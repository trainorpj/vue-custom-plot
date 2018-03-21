export const makeArrayFromTicks = ({ scale, ticks }) => {
  if (Array.isArray(ticks)) return ticks
  else return scale.ticks(ticks)
}
