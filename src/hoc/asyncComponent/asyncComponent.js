import React, { Component } from "react";
/**
 * takes a function as an input which it then executes,
 * this function will use 'importComponent()' this dynamic import syntax.
 * for lazy loading components
 * @then  give us a promise where we eventually get the component we want to load.
 *
 * @param {*} importComponent
 */
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };
    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};
export default asyncComponent;
