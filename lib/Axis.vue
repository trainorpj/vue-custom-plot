<template>
  <g>
    <slot name="axis-ticks" v-for="t in axisTicks" v-bind="t">
    </slot>
  </g>
</template>


<script>
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

import { makeArrayFromTicks } from "./utils"

@Component({})
export default class Axis extends Vue {
  @Prop() scale
  @Prop() ticks
  @Prop({ default: 0, type: Number })
  top
  @Prop({ default: 0, type: Number })
  left

  get axisTicks() {
    const tickCount = makeArrayFromTicks({
      scale: this.scale,
      ticks: this.ticks
    })

    return tickCount.map((d, i) => ({
      pos: this.scale(d),
      val: d
    }))
  }
}
</script>
