import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminProfilePage from './pages/AdminProfilePage';
import ServerDetailsPage from './pages/ServerDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
      <Router>
        <AuthProvider>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/user-profile"
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <UserProfilePage />
                      </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-profile"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminProfilePage />
                      </ProtectedRoute>
                    }
                />
                <Route path="/server/:id" element={<ServerDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;