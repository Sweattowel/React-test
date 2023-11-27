import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Home from './Home/Home';
import About from './About/About';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MyContextProvider } from './Context';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyContextProvider>
      <ChakraProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <SideBar />
        </Router>
      </ChakraProvider>
    </MyContextProvider>
  </React.StrictMode>,
);