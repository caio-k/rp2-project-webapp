import serverApi from '../api/server-api'

const PATH_URL = '/api/user/';

class UserService {

  addSchool(schoolId, username) {
    return serverApi.post(PATH_URL + 'addSchool', {
      schoolId,
      username
    });
  }

  removeSchool(schoolId, username) {
    return serverApi.delete(PATH_URL + 'removeSchool', {
      data: {
        schoolId,
        username
      }
    });
  }
}

export default new UserService();
