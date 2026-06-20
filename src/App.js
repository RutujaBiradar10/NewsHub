import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
  render() {
    return (
      <div>
  <Router>
    <Navbar />
        <Routes>
          <Route path='/' element={<News key='general' pageSize={5} country='us' category='general' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
          <Route path='/business' element={<News key='business' pageSize={5} country='us' category='business' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
          <Route path='/entertainment' element={<News key='entertainment' pageSize={5} country='us' category='entertainment' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
          <Route path='/health' element={<News key='health' pageSize={5} country='us' category='health' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
          <Route path='/science' element={<News key='science' pageSize={5} country='us' category='science' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
          <Route path='/sports' element={<News key='sports' pageSize={5} country='us' category='sports' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
          <Route path='/technology' element={<News key='technology' pageSize={5} country='us' category='technology' apiKey="1ee87e79e6dc43a6863fbc35f57890d8"/>} />
        </Routes>
  </Router>
      </div>
    );
  }
}