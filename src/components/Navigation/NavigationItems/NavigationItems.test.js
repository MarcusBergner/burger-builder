import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
// conect enzyme
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  it("should render two <NavigationItems /> elements if not autnenticated", () => {
    const wrapper = shallow(<NavigationItems />);
    // whrite expection
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
