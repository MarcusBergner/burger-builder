import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// most cases react components are just functions, they only depend on the props they recive!!!
// test example for a functional component

// conect enzyme#
configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = shallow(<NavigationItems />);
});
describe("<NavigationItems />", () => {
  it("should render two <NavigationItems /> elements if not autnenticated", () => {
    // whrite expection, at this case we want create an instance of this component as it would be renderer to the DOM
    expect(wrapper.find(NavigationItems));
  }); /*?*/
}); /*?*/
describe("<NavigationItems />", () => {
  it("should render three <NavigationItems /> elements if is autnenticated", () => {
    // whrite expection
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
describe("<NavigationItems />", () => {
  it("should an  exact logout button", () => {
    wrapper.setProps({ isAuthenticated: true });

    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
