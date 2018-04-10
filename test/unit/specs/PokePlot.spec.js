import { mount, shallow } from "@vue/test-utils"
import PokePlot from "../../../src/components/PokePlot"

const factory = (values = {}) => {
  return shallow(PokePlot, {
    data: { ...values }
  })
}

describe("PokePlot", () => {
  it("renders the svg properly", () => {
    const wrapper = factory()

    // width and height
    expect(wrapper.find("#pkmn-svg").attributes().width).toBe("500")
    expect(wrapper.find("#pkmn-svg").attributes().height).toBe("500")
  })

  it("renders a rect", () => {
    const wrapper = mount(PokePlot)

    expect(wrapper.find({ ref: `x-43-y-36` }).attributes().fill).toBe("#317373")
  })
})
