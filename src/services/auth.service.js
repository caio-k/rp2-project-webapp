import serverApi from '../api/server-api'

const PATH_API = "/api/auth/";

class AuthService {
  login(username, password) {
    return serverApi
      .post(PATH_API + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("school");
  }

  register(username, email, role, password) {
    return serverApi.post(PATH_API + "signup", {
      username,
      email,
      role,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
