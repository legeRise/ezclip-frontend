import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsMenuOpen(false);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }

  return (
    <header className="sticky top-0 z-10">
     <nav className="bg-yellow-100 h-16 text-xl px-4 md:h-20 md:flex md:items-center md:justify-between">
        <div className="h-full flex justify-between items-center">
          <Link to="/" className="cursor-pointer">EzClip</Link>
          <button>
            {isMenuOpen ? (
              <img id="close-menu-icon" width="32" height="32"
                src="https://img.icons8.com/small/32/delete-sign.png" alt="delete-sign" className="md:hidden"
                onClick={toggleMenu}
              />
            ) : (
              <img id="hamburger-menu-icon" width="32" height="32" src="https://img.icons8.com/small/32/menu.png"
                alt="menu" className="md:hidden" onClick={toggleMenu} />
            )}
          </button>
        </div>
        <div id="menu"
          className={`fixed inset-0 bg-green-100 flex flex-col items-center justify-between rounded-lg p-4 gap-2 h-screen z-50 md:static md:bg-transparent md:p-0 md:h-auto md:flex-row md:w-3/5 ${isMenuOpen ? '' : 'hidden'} md:flex`}>
          <div className={`flex flex-col gap-2 items-center justify-center md:flex-row md:gap-4 ${isAuthenticated ? 'md:justify-between md:w-full' : 'md:justify-end md:w-full'}`}>
            {isAuthenticated ? (
              <>
                <div className="flex flex-col gap-2 items-center md:flex-row md:gap-4">
                  <Link to="/" className="cursor-pointer hover:underline" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link to="/generate-video" className="cursor-pointer hover:underline" onClick={() => setIsMenuOpen(false)}>Generate Video</Link>
                  <Link to="/my-creations" className="cursor-pointer hover:underline" onClick={() => setIsMenuOpen(false)}>My Creations</Link>
                </div>
              <div className="flex flex-col items-center md:flex-row md:gap-4">
            <span
              className="inline-block align-middle bg-cyan-600 text-yellow-100 font-extrabold rounded-full px-3 py-1 text-sm shadow"
            >
              {userInfo?.email}
            </span>
                <span className="cursor-pointer hover:underline" onClick={handleLogout}>Logout</span>
              </div>
              </>
            ) : (
              <div className="flex flex-col items-center md:flex-row md:gap-4">
                <Link to="/login" className="cursor-pointer hover:underline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="cursor-pointer hover:underline" onClick={() => setIsMenuOpen(false)}>Signup</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header