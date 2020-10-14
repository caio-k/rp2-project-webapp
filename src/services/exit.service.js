import serverApi from '../api/server-api'

const PATH_API = '/api/exit/';

class ExitService {

  listAllExitsBySchoolId(schoolId) {
    return serverApi.get(PATH_API + 'allExitsBySchool', {
      params: {
        schoolId: schoolId
      }
    });
  }

  createExit(exitName, schoolId) {
    return serverApi.post(PATH_API + 'add', {
      exitName,
      schoolId
    });
  }

  updateExit(exitId, exitName) {
    return serverApi.put(PATH_API + 'update', {
      exitId,
      exitName
    });
  }

  deleteExit(exitId) {
    return serverApi.delete(PATH_API + 'remove', {
      params: {
        exitId: exitId
      }
    });
  }

  addExitLog(username, exitId) {
    return serverApi.post(PATH_API + 'addExitLog', null, {
      params: {
        username: username,
        exitId: exitId
      }
    });
  }

  allValidTimestampsByExitId(exitId) {
    return serverApi.get(PATH_API + 'allValidTimestampsByExitId', {
      params: {
        exitId: exitId
      }
    });
  }
}

export default new ExitService();
