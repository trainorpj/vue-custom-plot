import * as sc from "@vx/scale"

const selectVxScaleByName = name => {
  // convert to scaleName, i.e. linear to scaleLinear
  const vxName = `scale${name}`

  // {name: vxScale}
  return sc[vxName]
}

export const selectScaleFromProps = props => {
  // get name from
  const name = "name" in props ? props.name : "Linear"

  // vx scale, with props applied
  return selectVxScaleByName(name)(props)
}
