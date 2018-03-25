<template>
  <div id="app">
    <h1>Let's make a sick chart</h1>
    <svg :width="width" :height="height">
    <provider :xy-data="data3d" :width="width" :height="height" :marginLeft="margin" :marginTop="margin">
        <renderer
          slot="provider"
          slot-scope="props"
          :render-data="props.computedData">
          <template slot="point" slot-scope="d">
            <circle
                :cx="d.svgx"
                :cy="d.svgy"
                :r="8"
                :fill="`rgba(77, 77, 177, ${Math.abs(d.attrs.z)})`">
            </circle>
          </template>
          <axis slot="x-axis" :scale="props.xScale" :ticks="interval">
            <g slot="axis-ticks" slot-scope="xt">
                <text :x="xt.pos" :y="props.svg.height" :font-size="12" text-anchor="middle">
                  {{xt.val.toFixed(2)}}
                </text>
                <line :x1="xt.pos" :y1="props.svg.height - 11" :x2="xt.pos" :y2="props.svg.top" :stroke-width="1" stroke="#7ba7b5"></line>
            </g>
          </axis>
          <axis slot="y-axis" :scale="props.yScale" :ticks="15">
            <g slot="axis-ticks" slot-scope="yt">
              <text :y="yt.pos" :x="props.svg.left - 15" text-anchor="end" :font-size="12">
                {{yt.val}}
              </text>
              <line :x1="props.svg.left" :y1="yt.pos" :x2="props.svg.width" :y2="yt.pos" :stroke-width="1" stroke="#7ba7b5"></line>
            </g>
          </axis>
        </renderer>
    </provider>
    </svg>
  </div>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import { PlotProvider, PlotView, Axis } from "../lib"
import { range } from "d3-array"

const interval = range(-Math.PI, Math.PI, 0.5)

const data3d = interval
  .map(x => {
    return interval.map(y => ({
      x,
      y,
      z: Math.cos(x) * Math.sin(y)
    }))
  })
  .reduce((acc, cur) => [...acc, ...cur], [])

@Component({
  components: {
    provider: PlotProvider,
    renderer: PlotView,
    axis: Axis
  }
})
export default class App extends Vue {
  name = "App"
  data3d = data3d
  interval = interval
  width = 500
  height = 500
  margin = 50
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
