import axios, {create} from 'axios'

const ADMIN_API_END_POINT = '/v1/';
const CLIENT_API_END_POINT = '/v1/self_order/';

export function createApi(options) {
  return create(options)
}

export function setHeader(key, value, api) {
  (api || axios).defaults.headers.common[key] = value;
}

export const adminApi = create({
  baseURL: ADMIN_API_END_POINT,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export const clientApi = create({
  baseURL: CLIENT_API_END_POINT,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})
