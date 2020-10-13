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

  addFavoritePlace(username, placeId) {
    return serverApi.post(PATH_URL + 'addFavoritePlace', null, {
      params: {
        username: username,
        placeId: placeId
      }
    });
  }

  removeFavoritePlace(username, placeId) {
    return serverApi.delete(PATH_URL + 'removeFavoritePlace', {
      params: {
        username: username,
        placeId: placeId
      }
    });
  }
}

export default new UserService();
