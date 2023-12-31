import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from './Component/HomePage/Home';
import About from './Component/Header/About';
import InfoProvider from './Context/InfoProvider';
import CreatePost from './Component/Blogs/CreatePost';
import PostDetail from './Component/Blogs/PostDetail';
import Update from '../src/Component/Blogs/Update';
import FormLogin from './Component/FormLogin';
import Footer from './Component/Footer';
import Contact from './Component/Contact';
import Navbar3 from './Component/Header/Navbar3'
import LatestBlogs from './Component/Blogs/LatestBlogs';
import Mostviewd from './Component/Blogs/Mostviewd';
import MyProfile from './Component/MyProfile';
import AdminPanel from './Component/AdminPanel/AdminPanel';

const PrivateRoute = ({ isUserAuth,  ...props }) => {
  return isUserAuth ? (
    <>
      <Navbar3/>
      <Outlet />
      <Footer/>
    </>
  ) : (
    <Navigate replace to='/login' />
  );
};

export default function App() {
  const [isUserAuth, setIsUserAuth] = useState(false);

  return (
    <>
      <InfoProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<FormLogin setIsUserAuth={setIsUserAuth} />} />

            <Route path='/' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/postDetail/:id' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/postDetail/:id' element={<PostDetail />} />
            </Route>

            <Route path='/Update/:id' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/Update/:id' element={<Update />} />
            </Route>

             <Route path='/contact' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/contact' element={<Contact />} />
            </Route> 

            
            <Route path='/mostviewd' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/mostviewd' element={<Mostviewd />} />
            </Route>

             <Route path='/latest' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/latest' element={<LatestBlogs />} />
            </Route> 

            
            <Route path='/Profile' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />}>
              <Route path='/Profile' element={<MyProfile />} />
            </Route> 


            <Route path='/AdminPanel' element={<PrivateRoute isUserAuth={isUserAuth} setIsUserAuth={setIsUserAuth} />} >
              <Route path='/AdminPanel' element={<AdminPanel/>} />
            </Route>


          </Routes>
        </BrowserRouter>
      </InfoProvider>
    </>
  );
}
