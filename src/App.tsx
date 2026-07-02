import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { UserProgressProvider } from './contexts/UserProgressContext';
import Languages from './pages/Languages';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProgressProvider>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 3000,
              style: {
                fontWeight: 700,
              },
            }}
          />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/languages'
              element={
                <ProtectedRoute>
                  <Languages />
                </ProtectedRoute>
              }
            />
            <Route
              path='/languages/:languageId/lessons/:lessonId'
              element={
                <ProtectedRoute>
                  <Lesson />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
