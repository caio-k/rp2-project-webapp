import serverApi from '../api/server-api'

const PATH_API = '/api/place/';

class PlaceService {

  listAllPlacesBySchoolId(schoolId) {
    return serverApi.get(PATH_API + 'allPlacesBySchool', {
      params: {
        schoolId: schoolId
      }
    });
  }

  createPlace(placeName, placeLimitTimeSeconds, placeMaxPeople, placeType, placeSchoolId) {
    return serverApi.post(PATH_API + 'addPlace', {
      placeName,
      placeLimitTimeSeconds,
      placeMaxPeople,
      placeType,
      placeSchoolId
    });
  }

  updatePlace(placeId, placeName, placeLimitTimeSeconds, placeMaxPeople, placeType) {
    return serverApi.put(PATH_API + 'update', {
      placeId,
      placeName,
      placeLimitTimeSeconds,
      placeMaxPeople,
      placeType
    });
  }

  deletePlace(placeId) {
    return serverApi.delete(PATH_API + 'removePlace', {
      params: {
        placeId: placeId
      }
    });
  }
}

export default new PlaceService();
