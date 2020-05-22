import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Auth from "./Auth";

// most cases react components are just functions, they only depend on the props they recive!!!
// test example for a functional component

// conect enzyme#
configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = shallow(<Auth />);
});
describe("<Auth />", () => {
  it("should.....", () => {
    expect(wrapper.setProps({}));
  });
});
