<script>
import { makeArrayFromTicks } from './utils'

export default {
  props: {
    scale: Function,
    ticks: [Number, Array],
    top: {
      default: 0,
      type: Number
    },
    left: {
      default: 0,
      type: Number
    }
  },
  computed: {
    axisTicks() {
      const tickCount = makeArrayFromTicks({
        scale: this.scale,
        ticks: this.ticks
      })

      return tickCount.map((d, i) => ({
        key: i,
        pos: this.scale(d),
        val: d
      }))
    }
  },
  render() {
    return this.$scopedSlots.default({
      ticks: this.axisTicks
    })
  }
}
</script>
