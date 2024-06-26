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
import { GoogleOAuthProvider } from '@react-oauth/google';
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
import Admin_Student from './screens/Admin/studentRelated/Admin_Student.jsx'
import Admin_Teacher from './screens/Admin/teacherRelated/Admin_Teacher.jsx'
import NotFoundPage from './screens/NotFoundPage.jsx'
import Admin_StudRegistration  from './screens/Admin/studentRelated/Admin_StudRegistration.jsx'
import AuthorizedRoute from './components/AuthorizedRoute.jsx'
import Admin_TeachRegister from './screens/Admin/teacherRelated/Admin_TeachRegister.jsx'
import Admin_Class from './screens/Admin/classRelated/Admin_Class.jsx'
import AddClass from './screens/Admin/classRelated/AddClass.jsx'
import Admin_Subject  from './screens/Admin/subjectRelated/Admin_Subject.jsx'
import AddSubject from './screens/Admin/subjectRelated/AddSubject.jsx'
import StudentList from './screens/Teacher/StudentList.jsx'
import AddAttendance from './screens/Teacher/AddAttendance.jsx'
import AddMarks from './screens/Teacher/AddMarks.jsx'
import Marks_StudentList from './screens/Teacher/Marks_StudentList.jsx'
import Attendance from './screens/Student/Attendance.jsx'
import StudNotice from './screens/Student/StudNotice.jsx'
import ExamScore from './screens/Student/ExamScore.jsx'
import StudentChat from './screens/Student/StudentChat.jsx'
import Notice from './screens/Admin/Notice/addNotice.jsx'
import ShowNotice from './screens/Admin/Notice/showNotice.jsx'
import PasswordResetPage from './screens/PasswordResetPage.jsx'
import FeePayment from './screens/Student/FeePayment.jsx'
import FeeHistory from './screens/Student/FeeHistory.jsx'
import TeacherRating from './screens/Student/TeacherRating.jsx'
import Dashboard from './screens/Admin/Dashbord/Dashboard.jsx'
import Chat from './screens/Teacher/Chat.jsx'
import StarRating from './components/StarRating.jsx'
import StudentVideoChat from './screens/Student/StudentVideoChat.jsx'
import Room from './screens/Room.jsx'
import ChatRoom from './screens/Teacher/ChatRoom.jsx'
import TeacherVideoChat from './screens/Teacher/TeacherVideoChat.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      {/* User details */}
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/OtpVerification' element={<OtpVerification/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/regeneratePassword' element={<PasswordResetPage/>}/>
      <Route path='' element={<PrivateRoute />}>
      <Route path='/userLandingPage' element={<UserLandingPage />} />
        <Route path='/Profile' element={<ProfileScreen />} />
        <Route path='/editProfile' element={<ProfileScreen />} />
      </Route>
      {/* Admin details */}
      <Route path=''  element={<AuthorizedRoute allowedRoles={['admin']} />}>
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/studRegister' element={<Admin_StudRegistration/>}/>
            <Route path='/admin/student' element={<Admin_Student /> } /> 
            <Route path='/teachRegister' element={< Admin_TeachRegister/>}/>     
            <Route path='/admin/teacher' element={<Admin_Teacher/>}/>
            <Route path='/admin/class' element={<Admin_Class/>}/>
            <Route path='/admin/subject' element={<Admin_Subject/>}/>
            <Route path='/addSubject' element={<AddSubject/>}/>
            <Route path='/addClass' element={<AddClass/>}/>
            <Route path='/admin/Profile' element={<ProfileScreen />} />
             <Route path='/notice' element={<Notice />} /> 
             <Route path='/admin/listNotice' element={<ShowNotice/>}/>
             <Route path='/admin/dashboard' element={<Dashboard/>}/>
            
      </Route>

      {/* Teacher details */}
      <Route path='' element={<AuthorizedRoute allowedRoles={['teacher']} />}>
          <Route path='/studentlist' element={<StudentList/>}/>
          <Route path='/attendance' element={<AddAttendance/>}/>
          <Route path='/exam/:userId'  element={<AddMarks/>}/>
          <Route path='/MarkStudentList' element={<Marks_StudentList/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/videoChat' element={<TeacherVideoChat/>}/>
          <Route path='/chatRoom/:roomID' element={<ChatRoom/>}/>
      </Route>

       {/* Student details */}
       <Route path='' element={<AuthorizedRoute allowedRoles={['student']} />}>
          <Route path='/studAttendance' element={<Attendance/>}/>
          <Route path='/studMarks' element={<ExamScore/>}/>
          <Route path='/studNotice' element={<StudNotice/>}/>
          <Route path='/studFee' element={<FeePayment/>}/>
          <Route path='/studChat' element={<StudentChat/>}/>
          <Route path='/teachRating' element={<TeacherRating/>}/>
          <Route path='/starRating' element={<StarRating/>}/>
          <Route path='/studentVideoChat' element={<StudentVideoChat/>}/>
          <Route path='/room/:roomID' element={<Room/>}/>
          
      </Route>
      <Route path='*' element={<NotFoundPage/>}/>
     
     
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <GoogleOAuthProvider clientId="82950343806-08m4k8jvbs0a55rf2d291p2id2j5723r.apps.googleusercontent.com">
      <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);
