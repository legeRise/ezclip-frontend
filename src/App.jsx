import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedType, setSelectedType] = useState('signup');


  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      setIsAuthenticated(true);
      setSelectedType('text_to_video'); // or whatever form you want to show after login
    }
  }, []);

  return (
    <div>
        <Header selectedType={selectedType} setSelectedType={setSelectedType} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <HeroSection selectedType={selectedType} setSelectedType={setSelectedType} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </div>
  )
}

export default App