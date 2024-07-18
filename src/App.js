import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddBlog from './pages/AddBlog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import BlogsDetails from './pages/BlogsDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog/:id' element={<BlogsDetails />} />
            <Route path='/addBlog' element={<AddBlog />} />
            <Route path='/editBlog/:id' element={<AddBlog />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
