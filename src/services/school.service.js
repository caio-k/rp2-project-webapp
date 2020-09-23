import serverApi from '../api/server-api'

const PATH_API = '/api/school/';

class SchoolService {

  listAllSchoolsByUsername(username) {
    return serverApi.get(PATH_API + 'allSchoolsByUser', {
      params: {
        username: username
      }
    });
  }

  listAdminSchoolByUsername(username) {
    return serverApi.get(PATH_API + 'adminSchool', {
      params: {
        username: username
      }
    })
  }

  createSchool(schoolName,  schoolPrincipalUsername) {
    return serverApi.post(PATH_API + 'create', {
      schoolName,
      schoolPrincipalUsername
    });
  }

  updateSchool(schoolId, schoolName) {
    return serverApi.put(PATH_API + 'update', {
      schoolId,
      schoolName
    });
  }
}

export default new SchoolService();
