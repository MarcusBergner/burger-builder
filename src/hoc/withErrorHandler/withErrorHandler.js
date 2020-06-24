import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";
const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    // constructor() {
    //   super();
    //   this.reqInterceptor = axios.interceptors.request.use((req) => {
    //     this.setState({ error: null });
    //     return req;
    //   });

    //   this.resInterceptor = axios.interceptors.response.use(
    //     (res) => res,
    //     (error) => {
    //       this.setState({ error: error });
    //     }
    //   );
    // }

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
      // this is the cleanUp-effect function, if [] as dependencies(i.e. the effect obly runs once) the cleanUp functions runs when the component gets unmounted!

      // that ensure if our interceptor change's we clean up
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Auxiliary>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
};
export default withErrorHandler;
