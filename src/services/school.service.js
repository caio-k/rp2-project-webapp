import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/school/';

class SchoolService {

  listAllSchoolsByUsername(username) {
    return axios.get(API_URL + 'allSchoolsByUser', {
      headers: authHeader(),
      params: {
        username: username
      }
    });
  }

  listAdminSchoolByUsername(username) {
    return axios.get(API_URL + 'adminSchool', {
      headers: authHeader(),
      params: {
        username: username
      }
    })
  }

  createSchool(schoolName,  schoolPrincipalUsername) {
    return axios.post(API_URL + 'create', {
      schoolName,
      schoolPrincipalUsername
    }, {
      headers: authHeader()
    });
  }

  updateSchool(schoolId, schoolName) {
    return axios.put(API_URL + 'update', {
      schoolId,
      schoolName
    }, {
      headers: authHeader()
    });
  }
}

export default new SchoolService();
