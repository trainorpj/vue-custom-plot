import * as sc from '@vx/scale'

const selectVxScaleByName = name => {
  // convert to scaleName, i.e. linear to scaleLinear
  const vxName = `scale${name}`

  // {name: vxScale}
  return sc[vxName]
}

const selectScaleFromProps = props => {
  // get name from
  const name = 'name' in props ? props.name : 'Linear'

  // vx scale, with props applied
  return selectVxScaleByName(name)(props)
}

export default function({ defaultDomain, defaultRange, scaleProps }) {
  const domain = 'domain' in scaleProps ? scaleProps.domain : defaultDomain

  const range = 'range' in scaleProps ? scaleProps.domain : defaultRange

  // FIXME: object-spread not working
  const scaleConstructorProps = Object.assign({ domain, range }, scaleProps)

  const scale = selectScaleFromProps(scaleConstructorProps)

  scale.distance = (a, b) => scale(b) - scale(a)

  return scale
}
