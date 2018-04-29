<template>
  <div id="app">
    <h1>Let's make a chart</h1>
    <svg :width="width" :height="height">
      <rect :width="width" :height="height" :rx="15" :ry="15" fill="plum"></rect>
      <custom-plot
        :xy-data="data3d"
        :width="width"
        :height="height"
        :marginLeft="margin"
        :marginTop="margin"
        :xScaleProps="{ clamp: true }">
      <g slot-scope="{computedData, xScale, yScale, svg}">
        <g v-for="d in computedData" :key="d.key">
          <circle
            :key="`c-${d.key}`"
            :cx="d.svgx"
            :cy="d.svgy"
            :fill="color(d.attrs.z)"
            :r="d.attrs.active ? 15 : 10 "
            stroke="white"
          ></circle>
        </g>
        <axis :scale="xScale" :ticks="interval">
          <g slot-scope="{ticks}">
            <text v-for="xt in ticks"
            :key="`xt-${xt.key}`"
            :font-size="12"
            text-anchor="middle"
            :x="xt.pos"
            :y="svg.height + svg.top - margin / 2">
              {{xt.val.toFixed(2)}}
            </text>
          </g>
        </axis>
        <axis :scale="yScale" :ticks="interval">
          <g slot-scope="{ticks}">
            <text v-for="yt in ticks" :key="`yt-${yt.key}`"
            :font-size="12"
            text-anchor="end"
            :x="svg.left"
            :y="yt.pos"
            dominant-baseline="central"
            :dx="-20">
              {{yt.val.toFixed(2)}}
            </text>
          </g>
        </axis>
      </g>
      </custom-plot>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { range } from 'd3-array'
import { interpolatePlasma } from 'd3-scale-chromatic'
import { CustomPlot, Axis } from '../lib'

const interval = range(-Math.PI, Math.PI, 0.5)

const data3d = interval
  .map(x => {
    return interval.map(y => ({
      x,
      y,
      z: Math.cos(x) * Math.sin(y),
      active: false
    }))
  })
  .reduce((acc, cur) => [...acc, ...cur], [])

@Component({
  components: {
    axis: Axis,
    'custom-plot': CustomPlot
  }
})
export default class App extends Vue {
  name = 'App'
  data3d = data3d
  interval = interval
  width = 600
  height = 600
  margin = 70

  color(z) {
    return interpolatePlasma(Math.abs(z))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
