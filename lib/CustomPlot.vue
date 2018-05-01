<script>
import { extent } from 'd3-array'

import {
  makeGetterFromAccessor,
  makeScaleFromProps,
  makeSvgObjectFromProps
} from './utils'

export default {
  props: {
    xyData: Array,
    xAccessor: { default: 'x', type: [String, Function] },
    yAccessor: { default: 'y', type: [String, Function] },
    width: { default: 500, type: Number },
    height: { default: 500, type: Number },
    marginLeft: { default: 0, type: Number },
    marginTop: { default: 0, type: Number },
    marginBottom: { default: 0, type: Number },
    marginRight: { default: 0, type: Number },
    xScaleProps: {
      type: Object,
      default: function() {
        return {
          name: 'Linear'
        }
      }
    },
    yScaleProps: {
      type: Object,
      default: function() {
        return {
          name: 'Linear'
        }
      }
    }
  },
  computed: {
    svg() {
      return makeSvgObjectFromProps(this)
    },
    xGetter() {
      return makeGetterFromAccessor(this.xAccessor)
    },
    yGetter() {
      return makeGetterFromAccessor(this.yAccessor)
    },
    xScale() {
      const defaultDomain = extent(this.xyData, this.xGetter)
      const defaultRange = [this.svg.left, this.svg.width]

      return makeScaleFromProps({
        defaultDomain,
        defaultRange,
        scaleProps: this.xScaleProps
      })
    },
    yScale() {
      const defaultDomain = extent(this.xyData, this.yGetter)
      const defaultRange = [this.svg.height, this.svg.top]

      return makeScaleFromProps({
        defaultDomain,
        defaultRange,
        scaleProps: this.yScaleProps
      })
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
