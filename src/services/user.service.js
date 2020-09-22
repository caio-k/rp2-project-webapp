import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';
const API_URL2 = 'http://localhost:8080/api/test/'; // remove later

class UserService {
  // remove this method later!
  getPublicContent() {
    return axios.get(API_URL2 + 'all');
  }

  // remove this method later!
  getUserBoard() {
    return axios.get(API_URL2 + 'user', { headers: authHeader() });
  }

  // remove this method later!
  getAdminBoard() {
    return axios.get(API_URL2 + 'admin', { headers: authHeader() });
  }


  addSchool(schoolId, username) {
    return axios.post(API_URL + 'addSchool', {
      schoolId,
      username
    }, {
      headers: authHeader()
    });
  }

  removeSchool(schoolId, username) {
    return axios.delete(API_URL + 'removeSchool', {
      headers: authHeader(),
      data: {
        schoolId,
        username
      }
    });
  }
}

export default new UserService();
