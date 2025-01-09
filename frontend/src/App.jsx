import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homePage'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { useSelector } from 'react-redux'
import Spinner from './componets/spinner'
import ProtectedRoute from './componets/protectedRoute'
import PublicRoute from './componets/publicRoute'
import ApplyDoctor from './pages/applaydoctor'
import AllNotification from './pages/allnotification'
import Users from './pages/admin/users'
import Doctors from './pages/admin/doctors'
import Profile from './pages/doctor/profile'
import Appointments from './pages/doctor/appointments'
import UserAppointment from './pages/user/userAppointment'
import Bookingpage from './componets/bookingpage'
import UserProfile from './pages/user/userprofile'
import Adminprofile from './pages/admin/profile'


function App() {

  const { loading } = useSelector(state => state.alerts)

  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner />
          :
          <Routes >
            <Route path="/" element={
              <ProtectedRoute >
                <HomePage />
              </ProtectedRoute>
            } />

            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <AllNotification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/appointments"
              element={
                <ProtectedRoute>
                  <UserAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/user/appointment/:doctorId`}
              element={
                <ProtectedRoute>
                  <Bookingpage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/user/profile`}
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/admin/profile`}
              element={
                <ProtectedRoute>
                  <Adminprofile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={
              <PublicRoute >
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute >
                <Register />
              </PublicRoute>
            } />
          </Routes>
        }
      </BrowserRouter>
    </>
  )
}
export default App
