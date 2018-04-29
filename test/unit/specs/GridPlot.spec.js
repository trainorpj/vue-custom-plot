import { mount, shallow } from "@vue/test-utils"
import GridPlot from "@/src/components/GridPlot"

const factory = (values = {}) => {
  return shallow(GridPlot, {
    data: { ...values }
  })
}

describe("GridPlot", () => {
  it("renders the svg properly", () => {
    const wrapper = factory()

    // width and height
    expect(wrapper.find("#pkmn-svg").attributes().width).toBe("500")
    expect(wrapper.find("#pkmn-svg").attributes().height).toBe("500")
  })

  it("renders a rect", () => {
    const wrapper = mount(GridPlot)

    expect(wrapper.find({ ref: `x-0-y-1` }).attributes().fill).toBe("#41eeee")
  })
})
