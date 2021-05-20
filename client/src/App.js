import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import styles from './index.css'
import {AuthContext} from './context/authContext'
import { useRoutes } from './routes';
import {Loader} from './components/Loader'
import {Navbar} from './components/navbar'
import 'materialize-css'
function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthentificated = !!token
  const routes = useRoutes(isAuthentificated)

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthentificated
    }}>
    <Router>
      {isAuthentificated && <Navbar/>}
      <div className="container">
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
