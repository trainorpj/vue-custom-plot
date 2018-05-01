export default function({
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom
}) {
  return {
    width: width - marginLeft - marginRight,
    height: height - marginTop - marginBottom,
    left: marginLeft,
    top: marginTop
  }
}
