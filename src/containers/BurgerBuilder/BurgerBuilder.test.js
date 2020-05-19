import React from "react";
import { Enzyme, shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// conect enzyme
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  // to set my wrapper up
  beforeEach(() => {
    // i want to have an isolated unit test as you should use it as often as possible
    //Notes: an arrow function with empty {}, for simply fulfill the requirement of passing a function!
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  }); /*?*/
  // write a test
  it("should render < BuildControls /> when receiving ingredients ", () => {
    // after the component has been instantiated
    const wrapped = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls).length).toEqual(1);
    // expect(wrapper.find(BuildControls)).toHaveLength(1);
  }); /*?*/
  it("should render < BuildControls /> when receiving ingredients ", () => {
    // after the component has been instantiated
    wrapper.setProps({
      ings: {
        salad: 1,
        meat: 1,
      },
    }); /*?*/
    // expect( wrapper.find( BuildControls ) ).toHaveLength( 1 );
    expect(wrapper.find(BuildControls).length).toEqual(1);
  });
});
