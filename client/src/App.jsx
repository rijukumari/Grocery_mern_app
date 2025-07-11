import React, { useContext } from 'react';
import {Routes,Route, useLocation} from "react-router-dom"
import Home from './pages/Home';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { AppContext } from './context/AppContext';
import MyOrders from './pages/MyOrders';
import Auth from './models/Auth';
import ProductCategory from './pages/ProductCategory';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import AddAddress from './pages/AddAddress';
import SellerLayout from './seller/SellerLayout';
import SellerLogin from './components/seller/SellerLogin';
import AddProduct from './seller/AddProduct';
import ProductList from './seller/ProductList';
import Order from './seller/Order';
import Loader from './components/Loader';

function App() {
  const {isSeller,showUserLogin} = useContext(AppContext)
  const isSellerPath  = useLocation().pathname.includes("seller")
  return (
    <>
    <div className='text-default min-h-screen'>
      {isSellerPath ? null : <Navbar/>}
      {
        showUserLogin ? <Auth/> : null
      }
      <Toaster/>
      <div className='px-6 md:px-16 lg:px24 xl:px-32'>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/products' element = {<Product/>} />
        <Route path='/product/:category/:id' element = {<ProductDetails/>} />
        <Route path='/products/:category/' element = {<ProductCategory/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/my-orders' element = {<MyOrders/>} />
        <Route path='/add-address' element = {<AddAddress/>} />
        <Route path='/loader' element = {<Loader/>} />

        <Route path='/seller' element = {isSeller?<SellerLayout/>:<SellerLogin/>} >
        <Route index  element = {isSeller ? <AddProduct/> : null} />
        <Route path='product-list' element = {isSeller ? <ProductList/> : null} />
        <Route path='orders' element = {isSeller ? <Order/> : null} />
        
        </Route>
      </Routes>

      </div>
      {isSellerPath ? null : <Footer/>}
    </div>
    </>
  )
}

export default App
