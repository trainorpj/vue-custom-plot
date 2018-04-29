import { mount, shallow } from "@vue/test-utils"
import SinPlot from "@/src/components/SinPlot"

describe("SinPlot", () => {
  const wrapper = mount(SinPlot)

  it("renders the svg", () => {
    expect(wrapper.contains("svg")).toBe(true)
  })

  it("renders the sin group", () => {
    const plotGroup = wrapper.find("#plot-group")

    expect(plotGroup.is("g")).toBe(true)
  })
})
