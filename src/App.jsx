import React, { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'

const App = () => {
  const [selectedType, setSelectedType] = useState('text_to_video');

  return (
    <div>
        <Header selectedType={selectedType} setSelectedType={setSelectedType}/>
        <HeroSection selectedType={selectedType}/>
    </div>
  )
}

export default App