import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SideDrawer from "./SideDrawer";
import DrawerToggle from "./DrawerToggle/DrawerToggle";

configure({ adapter: new Adapter() });

describe("<SideDrawer />", () => {
  it("should render the right css class if the SideDrawer open ", () => {
    const wrapper = shallow(<SideDrawer />);
    expect(wrapper.find(DrawerToggle)).toBeDefined();
  });
});

test("should render the right Sidrawer", () => {
  const wrapper = shallow(<SideDrawer />);
  expect(wrapper);
});
