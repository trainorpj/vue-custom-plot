<template>
  <svg :width="w" :height="h">
    <CustomPlot :xy-data="sinData">
      <g id="plot-group" slot-scope="{computedData, xScale, yScale, svg}">
        <circle v-for="d in computedData"
          :key="`c-${d.key}`"
          :ref="`cref-${d.key}`"
          :cx="d.svgx"
          :cy="d.svgy"
          :fill="navy"
          :r="10 "
          stroke="white"
        ></circle>
      </g>
    </CustomPlot>
  </svg>
</template>

<script>
import { CustomPlot } from '../../lib'
import { range } from 'd3-array'

const SIN_DATA = range(-1, 1, 0.2).map(d => ({
  x: d,
  y: Math.sin(d)
}))

export default {
  name: 'sin-plot',
  components: { CustomPlot },
  data() {
    return {
      sinData: SIN_DATA,
      w: 500,
      h: 500
    }
  }
}
</script>

<style>

</style>
