<script>
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"

import { makeGetterFromAccessor } from "./utils"

export default {
  props: {
    xyData: Array,
    xAccessor: { default: "x", type: [String, Function] },
    yAccessor: { default: "y", type: [String, Function] },
    width: { default: 500, type: Number },
    height: { default: 500, type: Number },
    marginLeft: { default: 0, type: Number },
    marginTop: { default: 0, type: Number },
    marginBottom: { default: 0, type: Number },
    marginRight: { default: 0, type: Number }
  },
  computed: {
    svg() {
      return {
        width: this.width - this.marginLeft - this.marginRight,
        height: this.height - this.marginTop - this.marginBottom,
        left: this.marginLeft,
        top: this.marginTop
      }
    },
    xGetter() {
      return makeGetterFromAccessor(this.xAccessor)
    },
    yGetter() {
      return makeGetterFromAccessor(this.yAccessor)
    },
    xScale() {
      return scaleLinear()
        .domain(extent(this.xyData, this.xGetter))
        .range([this.svg.left, this.svg.width])
    },
    yScale() {
      return scaleLinear()
        .domain(extent(this.xyData, this.yGetter))
        .range([this.svg.height, this.svg.top])
    },
    computedData() {
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
  },
  render() {
    return this.$scopedSlots.default({
      computedData: this.computedData,
      xScale: this.xScale,
      yScale: this.yScale,
      svg: this.svg
    })
  }
}
</script>
