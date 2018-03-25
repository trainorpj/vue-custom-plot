<template>
<g>
  <slot name="provider" v-bind="{computedData, xScale, yScale, svg}">
  </slot>
</g>
</template>

<script>
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"

import { makeGetterFromAccessor } from "./utils"
import Axis from "./Axis"

@Component({
  components: { Axis }
})
export default class ChartProvider extends Vue {
  // required prop: xyData
  @Prop([Array])
  xyData

  // accessors can be strings of functions -- it depends on what the field names in xyData are
  @Prop({ default: "x", type: [String, Function] })
  xAccessor

  @Prop({ default: "y", type: [String, Function] })
  yAccessor

  // dimensions have defaults, although you should set your own, at least for width, height, marginleft, and marginTop
  @Prop({ default: 500, type: Number })
  width

  @Prop({ default: 500, type: Number })
  height

  @Prop({ default: 0, type: Number })
  marginLeft

  @Prop({ default: 0, type: Number })
  marginRight

  @Prop({ default: 0, type: Number })
  marginTop

  @Prop({ default: 0, type: Number })
  marginBottom

  // dimensions - r for rendered, o for original
  get svg() {
    return {
      width: this.width - this.marginLeft - this.marginRight,
      height: this.height - this.marginTop - this.marginBottom,
      left: this.marginLeft,
      top: this.marginTop
    }
  }

  // getters - return functions
  get xGetter() {
    return makeGetterFromAccessor(this.xAccessor)
  }

  get yGetter() {
    return makeGetterFromAccessor(this.yAccessor)
  }

  // scales - return functions
  get xScale() {
    return scaleLinear()
      .domain(extent(this.xyData, this.xGetter))
      .range([this.svg.left, this.svg.width])
  }

  get yScale() {
    return scaleLinear()
      .domain(extent(this.xyData, this.yGetter))
      .range([this.svg.height, this.svg.top])
  }

  // computed data
  get computedData() {
    return this.xyData.map((d, i) => ({
      key: i,
      x: this.xGetter(d),
      y: this.yGetter(d),
      svgx: this.xScale(this.xGetter(d)),
      svgy: this.yScale(this.yGetter(d)),
      attrs: {
        ...d
      }
    }))
  }
}
</script>
