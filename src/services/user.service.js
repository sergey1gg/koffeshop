import api from "./api";


const getCurrentLocation = () => {
  return JSON.parse(localStorage.getItem('location'));;
}

const getCategiriesContent = async (kioskId) => {
  try {
    const response = await api.post('/kiosk/menu_category_list', { kiosk_id: kioskId });
    return response;
  } catch (error) {
    throw error;
  }
};
const getProductsContent = (categiryId) => {
  //return api.get(API_URL + 'all');
  try {
    const response= api.post('/kiosk/product_list', { category_id: categiryId });
    return response;
  } catch (error) {
    throw error;
  }

}

const getSityList = async (countryId) => {
  const response = await api.post('/customer/city_list', {country_id: countryId});
  return response
}

const getLocationList = async (countryId, cityName) => {
  const response = await api.post('/customer/location_list', {country: countryId, city: cityName});
  return response
}

const getHistoryOrders = async () => {
  const response = await api.post('/ustomer/order_history', {pass: 'pass'});
  return response
}

const getPaymentState = async (orderId) => {
  const response = await api.post('/customer/pay_state',  {order_id: orderId});
  return response
}

const postOrderData = async (kioskId, orders) => {
  const response = await api.post('/customer/add_order',  {kiosk_id: kioskId,  items: orders})
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch(err => {
      // console.log(err);     
      return Promise.reject(err);
    })
  return response
}

// const postPay = async (orderId) => {
//   const response = await api.post('/pay_state',  {order_id: orderId})
//     .then((res) => {
//       console.log(res.data);
//       return res;
//     })
//     .catch(err => {  
//       return Promise.reject(err);
//     })
//   return response
// }

const UserService = {
  getCurrentLocation,
  getCategiriesContent,
  getProductsContent,
  getSityList,
  getLocationList,
  postOrderData,
  getHistoryOrders,
  getPaymentState,
};

export default UserService;
