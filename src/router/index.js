import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppLayout from '../layouts/AppLayout'
import SelfOrderLayout from '../layouts/SelfOrderLayout'
import BackendLayout from '../layouts/BackendLayout'

import RequireAuth from '../components/RequireAuth'

import LoginPage from '../pages/LoginPage'

// backend
import DashboardPage from '../pages/backend/DashboardPage'

// self-order
import SelfOrderHomePage from '../pages/self_order/HomePage'

// setup
import HomePage from '../pages/HomePage'
import RestaurantsPage from '../pages/setup/restaurants/RestaurantsPage'
import RestaurantPage from '../pages/setup/restaurants/RestaurantPage'
import RestaurantForm from '../pages/setup/restaurants/RestaurantForm'
import RestaurantEditForm from '../pages/setup/restaurants/RestaurantEditForm'
import PrintQrPage from '../pages/setup/tables/PrintQrPage'

import CategoriesPage from '../pages/setup/categories/CategoriesPage'
import ItemsPage from '../pages/setup/items/ItemsPage'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AppLayout />} >
          <Route path="/" element={<HomePage />} /> {/*nested routes*/}
        </Route>

        <Route path="/setup" element={<RequireAuth><AppLayout /></RequireAuth>} >
          {/*nested routes*/} 
          <Route path="/setup/restaurants" element={<RestaurantsPage />} />
          <Route path="/setup/restaurants/:id" element={<RestaurantPage />} />
          <Route path="/setup/create_restaurant" element={<RestaurantForm />} />
          <Route path="/setup/edit_restaurant/:id" element={<RestaurantEditForm />} />
          <Route path="/setup/:restaurant_id/categories" element={<CategoriesPage />} />
          <Route path="/setup/:restaurant_id/:category_id/items" element={<ItemsPage />} />
          <Route path="/setup/restaurants/:id/print_qr_codes/:table_id" element={<PrintQrPage />} />
          <Route path="/setup/restaurants/:id/print_qr_codes/all_tables" element={<PrintQrPage />} />
        </Route>

        <Route path="/self-order" element={<SelfOrderLayout />} >
          {/*nested routes*/}
          <Route path="/self-order/:restaurant_id/table_id/:table_id/orders" element={<SelfOrderHomePage />} />
        </Route>

        <Route path="/backend" element={<RequireAuth><BackendLayout /></RequireAuth>} >
          {/*nested routes*/}
          <Route path="/backend/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default AppRoutes
