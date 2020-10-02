import serverApi from '../api/server-api'

const PATH_API = '/api/school/';

class SchoolService {

  getCurrentSchool() {
    return JSON.parse(localStorage.getItem('school'));
  }

  setCurrentSchool(school) {
    localStorage.setItem("school", JSON.stringify(school));
  }

  listAllSchoolsByUsername(username) {
    return serverApi.get(PATH_API + 'allSchoolsByUser', {
      params: {
        username: username
      }
    });
  }

  listAllTeachersBySchoolId(schoolId) {
    return serverApi.get(PATH_API + 'allUsersBySchool', {
      params: {
        schoolId: schoolId
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

  createSchool(schoolName, schoolPrincipalUsername) {
    return serverApi
      .post(PATH_API + 'create', {
        schoolName,
        schoolPrincipalUsername
      })
      .then(response => {
        if (response.data) {
          this.setCurrentSchool(response.data);
        }

        return response.data;
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
