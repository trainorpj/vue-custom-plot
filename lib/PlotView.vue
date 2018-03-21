<template>
  <g>
    <slot name="point" v-for="d in renderData" v-bind="d">
      <!-- fallback content is a circle -->
      <circle :cx="d.x" :cy="d.y" :r="radius" :fill="fill"></circle>
    </slot>
    <slot name="axes"></slot>
  </g>
</template>

<script>
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component({})
export default class ChartView extends Vue {
  // renderData is what is rendered
  @Prop(Array) renderData

  // this is for fallback/easy plotting
  @Prop({ default: "steelblue", type: String })
  fill

  // this is for fallback/easy plotting
  @Prop({ default: 8, type: Number })
  radius
}
</script>
