import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './components/layouts/AdminLayout';
import Product from './pages/Product';
import Profile from './pages/Profile';
import CategoryList from './pages/category/CategoryList';
import CategoryCreate from './pages/category/CategoryCreate';
import CategoryEdit from './pages/category/CategoryEdit';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route element={<AdminLayout />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<Product></Product>}></Route>
            <Route path="/categories" element={<CategoryList></CategoryList>}></Route>
            <Route path="/categories/create" element={<CategoryCreate></CategoryCreate>}></Route>
            <Route path="/categories/edit/:id" element={<CategoryEdit></CategoryEdit>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
          </Route>

          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App