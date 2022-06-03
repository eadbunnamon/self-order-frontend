import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppLayout from '../layouts/AppLayout'
import SelfOrderLayout from '../layouts/SelfOrderLayout'
import BackendLayout from '../layouts/BackendLayout'

import LoginPage from '../pages/LoginPage'

// backend
import DashboardPage from '../pages/backend/DashboardPage'

// self-order
import SelfOrderHomePage from '../pages/self_order/HomePage'

// setup
import HomePage from '../pages/HomePage'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AppLayout />} >
          <Route path="/" element={<HomePage />} /> {/*nested routes*/}
        </Route>

        <Route path="/self-order" element={<SelfOrderLayout />} >
          <Route path="/self-order" element={<SelfOrderHomePage />} /> {/*nested routes*/}
        </Route>

        <Route path="/backend" element={<BackendLayout />} >
          <Route path="/backend/dashboard" element={<DashboardPage />} /> {/*nested routes*/}
        </Route>
      </Routes>
    </Router>
  )
};

export default AppRoutes
