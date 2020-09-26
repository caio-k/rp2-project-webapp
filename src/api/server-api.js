import axios from "axios";
import authHeader from '../services/auth-header';

export default axios.create({
  baseURL: "https://safe-school-server.herokuapp.com",
  responseType: "json",
  headers: authHeader(),
});
