import _ from 'lodash';
import { adminApi } from '../api'

export class ApiService {
  apiGet(url) {
    return adminApi.request({
      method: 'get',
      url: url
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error
    });
  }

  apiPost(url, payload={}) {
    return adminApi.request({
      method: 'post',
      url: url,
      data: payload
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error
    });
  }

  apiPut(url, payload={}) {
    return adminApi.request({
      method: 'put',
      url: url,
      data: payload
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error
    });
  }

  apiDelete(url) {
    return adminApi.request({
      method: 'delete',
      url: url
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error
    });
  }
}

export default new ApiService();