<template>
  <svg id="pkmn-svg" :width="w" :height="h">

      <CustomPlot
        id="pkmn-custom-plot"
        :xy-data="grid"
        :width="w"
        :height="h"
        :marginLeft="margin"
        :marginTop="margin"
      >

        <!-- a scoped-slot gives us access to data we can use to render our plot with svg -->
        <g
          class="pkmn-scoped-slot"
          slot-scope="{computedData, xScale, yScale, svg}">
          <!-- render a rectangle for each point in computedData -->
          <rect v-for="p in computedData"
            class="pkmn-rect"
            :key="p.key"
            :ref="`x-${p.x}-y-${p.y}`"
            :x="p.svgx"
            :y="svg.height - p.svgy"
            :width="xScale(1) - xScale(0) + 1"
            :height="yScale(0) - yScale(1) + 1"
            :fill="p.attrs.c !== 0 ? p.attrs.c : 'none'">
          </rect>

        </g>

      </CustomPlot>

  </svg>

</template>

<script>
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { CustomPlot } from "../../lib"

@Component({
  components: {
    CustomPlot
  }
})
export default class PokePlot extends Vue {
  grid = [
    {
      x: 0,
      y: 0,
      c: "#03ff56"
    },
    {
      x: 1,
      y: 0,
      c: "#ff554e"
    },
    {
      x: 0,
      y: 1,
      c: "#41eeee"
    },
    {
      x: 1,
      y: 1,
      c: 0
    }
  ]
  w = 500
  h = 500
  m = 50
}
</script>

<style>

</style>
