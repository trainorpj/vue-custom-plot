<template>
  <div id="app">
    <h1>Let's make a sick chart</h1>
    <svg :width="width" :height="height">
    <provider :xy-data="data3d" :width="width" :height="height">
        <renderer
          slot="provider"
          slot-scope="prop"
          :render-data="prop.computedData">
          <template slot="point" slot-scope="d">
            <circle
                :cx="d.scX"
                :cy="d.scY"
                :r="8"
                :fill="`rgba(77, 77, 177, ${Math.abs(d.other.z)})`">
            </circle>
          </template>
        </renderer>
    </provider>
    </svg>
  </div>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import { PlotProvider, PlotView } from "../lib"
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
    renderer: PlotView
  }
})
export default class App extends Vue {
  name = "App"
  data3d = data3d
  width = 500
  height = 500
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
