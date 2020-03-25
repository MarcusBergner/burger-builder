import axios from "axios";

const backendServer = axios.create({
    baseURL: "https://react-my-burger-6c728.firebaseio.com/"
});
export default backendServer;