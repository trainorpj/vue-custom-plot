<script>
export default {
  functional: true,
  render: (h, { props }) => {
    const { scale, top, left } = props

    let values = scale.ticks()

    return (
      <g transform={`translate(${left},${top})`}>
        {values.map((val, i) => {
          const x = scale(val)

          return (
            <g transform={`translate(${x}, 10)`}>
              <text text-anchor="middle">{val.toFixed(1)}</text>
            </g>
          )
        })}
      </g>
    )
  }
}
</script>
