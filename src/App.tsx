import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import AddChannelPage from './pages/AddChannelPage';
import Login from './components/Login';
import RequireAuth from './helpers/RequireAuth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes> 
          <Route path="/login" element={<Login />} /> {/* Login route at the top level */} 
          <Route 
            path="/" 
            element={
              <RequireAuth> 
                <div> 
                  <Navbar /> 
                  <main className="container mx-auto px-2 py-10"> 
                    <Home /> 
                  </main> 
                </div> 
              </RequireAuth>
            } 
          />
          <Route 
            path="/video/:videoId" 
            element={
              <RequireAuth> 
                <div> 
                  <Navbar /> 
                  <main className="container mx-auto px-2 py-10"> 
                    <VideoPlayer /> 
                  </main> 
                </div> 
              </RequireAuth>
            } 
          />
          <Route 
            path="/add-channel" 
            element={
              <RequireAuth> 
                <div> 
                  <Navbar /> 
                  <main className="container mx-auto px-2 py-10"> 
                    <AddChannelPage /> 
                  </main> 
                </div> 
              </RequireAuth>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
