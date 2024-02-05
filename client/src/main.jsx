import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store.js'
import {Provider} from 'react-redux'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx'; 
import OtpVerification from './screens/OtpVerification.jsx'
import UserLandingPage from './screens/UserLandingPage.jsx' 
import PrivateRoute from './components/PrivateRoute.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import About from './screens/About.jsx'
import UserLogin from './screens/UserLogin.jsx'
import Admin_Student from './screens/Admin/Admin_Student.jsx'
import Admin_Teacher from './screens/Admin/Admin_Teacher.jsx'
import NotFoundPage from './screens/NotFoundPage.jsx'
import Admin_StudRegistration  from './screens/Admin/Admin_StudRegistration.jsx'
import AuthorizedRoute from './components/AuthorizedRoute.jsx'
import Admin_TeachRegister from './screens/Admin/Admin_TeachRegister.jsx'
import Admin_Class from './screens/Admin/Admin_Class.jsx'
import AddClass from './screens/Admin/classRelated/AddClass.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      {/* User details */}
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/OtpVerification' element={<OtpVerification/>} />
      <Route path='/about' element={<About/>} />

      <Route path='' element={<PrivateRoute />}>
      <Route path='/userLandingPage' element={<UserLandingPage />} />
        <Route path='/Profile' element={<ProfileScreen />} />
        <Route path='/editProfile' element={<ProfileScreen />} />
      </Route>
      {/* Admin details */}
      <Route path=''  element={<AuthorizedRoute/>}>
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/studRegister' element={<Admin_StudRegistration/>}/>
            <Route path='/student' element={<Admin_Student /> } /> 
            <Route path='/teachRegister' element={< Admin_TeachRegister/>}/>     
            <Route path='/teacher' element={<Admin_Teacher/>}/>
            <Route path='/class' element={<Admin_Class/>}/>
            <Route path='/addClass' element={<AddClass/>}/>
            <Route path='/Profile' element={<ProfileScreen />} />
      </Route>

      <Route path='*' element={<NotFoundPage/>}/>

     
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
