import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {

  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    console.log(message(error))
    message(error)
    clearError()
    
  }, [error, message, clearError])

  const changeHandler = event => {
    console.log(event.target.name)
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
    }
  }


    return (
        <div>
      <div class="row">
    <div class="col s12 m6">
      <div class="card blue darken-1">
        <div class="card-content white-text">
          <span class="card-title">Авторизация</span>

          <div className="input-field">
              <label for="email"></label>
              <input placeholder="Введите email" 
              name="email" id="email" type="text"
              value={form.email}
              onChange={changeHandler}/>
          </div>

          <div className="input-field">
              <label for="password"></label>
              <input 
              onChange={changeHandler} 
              name="password"
              value={form.password}
              placeholder="Введите пароль" id="password" type="password"/>
          </div>
        </div>
        <div class="card-action">
          <button 
          className="btn yellow darken-4" 
          style={{marginRight: 10}}
          disabled={loading}
          onClick={loginHandler}>
            Войти
            </button>
          <button
           className="btn grey lighten-1 black-text"
           onClick={registerHandler}
           disabled={loading}>
            Регистрация
            </button>
        </div>
      </div>
    </div>
  </div>
        </div>
    )
}