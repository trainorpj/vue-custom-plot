<template>
<g>
  <slot name="provider" v-bind="{computedData, xScale, yScale, dim}">
  </slot>
</g>
</template>

<script>
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"

import { makeGetterFromAccessor } from "../utils"

@Component({})
export default class ChartProvider extends Vue {
  /**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

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

  @Prop({ default: 20, type: Number })
  marginLeft

  @Prop({ default: 20, type: Number })
  marginRight

  @Prop({ default: 20, type: Number })
  marginTop

  @Prop({ default: 20, type: Number })
  marginBottom

  /**
  |--------------------------------------------------
  | Computed Properties
  |--------------------------------------------------
  */

  // dimensions - r for rendered, o for original
  get dim() {
    return {
      r: {
        width: this.width - this.marginLeft - this.marginRight,
        height: this.height - this.marginTop - this.marginBottom,
        left: this.marginLeft,
        top: this.marginTop
      },
      o: {
        width: this.width,
        height: this.height,
        marginLeft: this.marginLeft,
        marginTop: this.marginTop,
        marginRight: this.marginRight,
        marginBottom: this.marginBottom
      }
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
      .range([this.dim.r.left, this.dim.r.width])
  }

  get yScale() {
    return scaleLinear()
      .domain(extent(this.xyData, this.yGetter))
      .range([this.dim.r.height, this.dim.r.top])
  }

  // computed data
  get computedData() {
    return this.xyData.map((d, i) => ({
      key: i,
      x: this.xGetter(d),
      y: this.yGetter(d),
      scX: this.xScale(this.xGetter(d)),
      scY: this.yScale(this.yGetter(d))
    }))
  }
}
</script>
