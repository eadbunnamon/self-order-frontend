import axios, {create} from 'axios';
import LoginSession from '../stores/LoginSession';

const ADMIN_API_END_POINT = '/v1/';
const CLIENT_API_END_POINT = '/v1/self_order/';

export function setHeader(key, value, api) {
  (api || axios).defaults.headers.common[key] = value;
}

export const adminApi = create({
  baseURL: ADMIN_API_END_POINT,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export const clientApi = create({
  baseURL: CLIENT_API_END_POINT,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

adminApi.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (error.response.status === 401) {
    console.log('Unauthorized')
    await LoginSession.logout();
    window.location.href = '/login';
  }
  return Promise.reject(error);
});
