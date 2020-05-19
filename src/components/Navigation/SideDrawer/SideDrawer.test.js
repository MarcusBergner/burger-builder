import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SideDrawer from "./SideDrawer";
import Backdrop from "../../UI/Backdrop/Backdrop";
import DrawerToggle from "./DrawerToggle/DrawerToggle";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";

configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = shallow(<SideDrawer />);
});

describe("<SideDrawer />", () => {
  it("should render the right css class if the SideDrawer open ", () => {
    expect(wrapper.find(DrawerToggle)).toBeDefined();
  });
});
describe("<SideDrawer />", () => {
  it("should render some type of Component <Backdrop /> if attachedClasses open ", () => {
    wrapper.setProps({ attachedClasses: open });
    expect(wrapper.contains(<Backdrop />)).toEqual(true);
  });
});

describe("<SideDrawer />", () => {
  it("should render some type of <Logo /> Component if attachedClasses open ", () => {
    wrapper.setProps({ attachedClasses: open });
    expect(wrapper.contains(<Logo />)).toEqual(true);
  });
});
