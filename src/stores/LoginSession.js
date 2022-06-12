import { EventEmitter } from 'events'
import _ from 'lodash';

import {adminApi, setHeader} from '../api'

const SESSION_STORAGE_KEY = 'auth_session'

export class LoginSession {
  constructor() {
    this.events = new EventEmitter()
    this.loadSessionFromStorage()
  }

  get current() {
    return this._session
  }

  get authToken() {
    return _.get(this.current, 'auth_token') || null
  }

  get username() {
    return _.get(this.current, 'username') || null
  }

  get currentRoles() {
    return _.get(this.current, 'roles') || []
  }

  loadSessionFromStorage() {
    this._session = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || null)
    if (this._session) {
      var token = this._session.auth_token;
      setHeader('Authorization', 'Bearer ' + token, adminApi)
    } else {
      console.log('Clear Token')
      setHeader('Authorization', null)
    }
  }

  logout() {
    this._session = null;
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setHeader('Authorization', null)
    this.events.emit('change')
  }

  login(username, password) {
    return adminApi.post('login', {username: username, password: password}).then((response) => {
      var session = response.data;
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
      this.loadSessionFromStorage()
      this.events.emit('change')
    }, function(error) {
      throw error;
    })
  }
}

export default new LoginSession()
