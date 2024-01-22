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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/OtpVerification' element={<OtpVerification/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/about' element={<About/>} />
      <Route path='' element={<PrivateRoute />}>
      <Route path='/userLandingPage' element={<UserLandingPage />} />
        <Route path='/Profile' element={<ProfileScreen />} />
        <Route path='/editProfile' element={<ProfileScreen />} />
      </Route>
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
