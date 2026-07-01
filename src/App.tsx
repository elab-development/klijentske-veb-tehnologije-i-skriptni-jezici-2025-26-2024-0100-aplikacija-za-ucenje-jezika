import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Language from './pages/Language';
import Languages from './pages/Languages';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/languages' element={<Languages />} />
          <Route path='/language/:id' element={<Language />} />
        </Routes>
      </BrowserRouter>{' '}
    </>
  );
}

export default App;
