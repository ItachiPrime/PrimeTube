import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, User } from 'lucide-react';
import SearchBar from '../SearchBar';
import { auth } from '../../../firebase.config';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const logoutRef = useRef<HTMLDivElement>(null); 

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login'); 
    } catch (error) {
      console.error('Logout Error:', error);
      // Handle logout error (e.g., display an error message)
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
        setShowLogout(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2">
            <img src="Logo.png" alt="PrimeTube Logo" className="h-7 w-11" />
            <h1 className="text-xl text-white hidden md:block" style={{ fontFamily:'Orbitron' , fontWeight:'700'}}>PrimeTube</h1>
          </Link>
          <div className="flex justify-center gap-5 items-center" style={{ height: '40px', width:'500px' ,maxWidth:'76vw'}}>
            <div className='flex-grow'>
              <SearchBar onSearch={handleSearch}/>
            </div>
            <Link 
              to="/add-channel" 
              className="flex items-center gap-2 text-gray-700 text-white">
              <PlusCircle size={30} />
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="text-white focus:outline-none py-1"
                >
                  <User size={28} />
                </button>
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50" ref={logoutRef}> 
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link> 
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
