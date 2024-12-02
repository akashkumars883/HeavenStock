import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Photos from './pages/Photos';
import Videos from './pages/Videos';
import Illustrations from './pages/Illustrations';
import UploadPage from './pages/Upload';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/photos' element={<Photos/>} />
          <Route path='/videos' element={<Videos/>} />
          <Route path='/illustrations' element={<Illustrations/>} />
          <Route path='/upload' element={<UploadPage/>} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;