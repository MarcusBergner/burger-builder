import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
// conect enzyme
configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = shallow(<NavigationItems />);
});
describe("<NavigationItems />", () => {
  it("should render two <NavigationItems /> elements if not autnenticated", () => {
    // whrite expection
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
describe("<NavigationItems />", () => {
  it("should render three <NavigationItems /> elements if is autnenticated", () => {
    // whrite expection
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
