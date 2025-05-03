import React, { useState } from 'react'
import Badge from './ui/Badge';

const Header = (props) => {

 const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }



  return (
    <header className="sticky top-0 z-10">
    <nav className="bg-yellow-100 h-16 text-xl px-4 md:h-20 md:flex md:items-center md:justify-between">
        <div className="h-full flex justify-between items-center">
            <p className="cursor-pointer">EzClip</p>
            <button>
                { isMenuOpen ? <img id="close-menu-icon" width="32" height="32"
                    src="https://img.icons8.com/small/32/delete-sign.png" alt="delete-sign" className="md:hidden"
                     onClick={toggleMenu} 
                     /> 
                     :
                     <img id="hamburger-menu-icon" width="32" height="32" src="https://img.icons8.com/small/32/menu.png"
                    alt="menu" className="md:hidden" onClick={toggleMenu} />
                }
            </button>
        </div>
        <div id="menu"
            className={`relative bg-green-100 md:flex flex-col items-center justify-between rounded-lg p-4 gap-2 h-screen md:flex-row md:w-3/5 md:bg-transparent ${isMenuOpen ? '' : 'hidden'}`}>
            <div className="flex flex-col gap-2 items-center justify-center md:flex-row md:gap-4">
                <span className={`${ props.selectedType === 'text_to_video' ? 'text-green-600 font-bold underline' : ''} cursor-pointer hover:underline`} onClick={() => { props.setSelectedType('text_to_video'); setIsMenuOpen(false); }}>Text to Video</span>
                <span className="relative cursor-not-allowed text-gray-400 flex items-center" title="Coming Soon">
                  Title to Video <Badge textColor="text-yellow-100" bgColor="bg-purple-600" className="absolute -top-2 -right-23 md:-top-5 md:-right-5" />
                </span>
                <span className="relative cursor-not-allowed text-gray-400 flex items-center" title="Coming Soon">
                  Audio to Video <Badge textColor="text-yellow-100" bgColor="bg-purple-600" className="absolute -top-2 -right-23 md:-top-5 md:-right-5" />
                </span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center md:flex-row md:gap-4">
                <span className="cursor-pointer hover:underline">Login</span>
                <span className="cursor-pointer hover:underline">Sign up</span>
            </div>
        </div>

    </nav>
</header>
  )
}

export default Header