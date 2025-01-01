import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homePage'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { useSelector } from 'react-redux'
import Spinner from './componets/spinner'
import ProtectedRoute from './componets/protectedRoute'
import PublicRoute from './componets/publicRoute'
import ApplyDoctor from './componets/applaydoctor'
import Allnotification from './componets/allnotification'

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
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Allnotification />
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
