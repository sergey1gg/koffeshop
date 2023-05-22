import api from "./api";
import TokenService from "./token.service";

const register = (phone, password, name, country, code) => {
  return api.post("/customer", {
    phone,
    password,
    name,
    country,
    code
  });
};

const login = (phone, password) => {
  return api
    .post("/customer/login", {
      phone,
      password
    })
    .then((response) => {
      if (response.data.access_token) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const sendSMS = (phone) => {
  return api
    .post("/customer/sms", {
      phone
    })
    .then((response) => {
      console.log(response.data);
      return;
    });
};

const sendSecondSMS = (phone) => {
  return api
    .post("/customer/second_sms", {
      phone
    })
    .then((response) => {
      console.log(response.data);
      return;
    });
};

const changePassword = (phone, password, code) => {
  return api.post("/customer/change_password", {
    phone,
    password,
    code
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserInfo = async () => {
  const response = await api.post('/customer/get_info', {pass: 'pass'});
  return response
};

const AuthService = {
  sendSMS,
  register,
  login,
  logout,
  changePassword,
  sendSecondSMS,
  getCurrentUser,
  getUserInfo,
};

export default AuthService;