import serverApi from '../api/server-api'

const PATH_API = '/api/usePlace/';

class UsePlaceService {
  listAllUses(category, schoolId) {
    return serverApi.get(PATH_API + 'allUses', {
      params: {
        category: category,
        schoolId: schoolId
      }
    });
  }

  listAllUsesOfFavoritePlacesBySchool(username, schoolId) {
    return serverApi.get(PATH_API + 'allUsesFavoritePlaces', {
      params: {
        username: username,
        schoolId: schoolId
      }
    });
  }

  increase(username, placeId, numberOfPeople) {
    return serverApi.put(PATH_API + 'increase', {
      username,
      placeId,
      numberOfPeople
    });
  }

  decrease(username, placeId, numberOfPeople) {
    return serverApi.put(PATH_API + 'decrease', {
      username,
      placeId,
      numberOfPeople
    });
  }
}

export default new UsePlaceService();
