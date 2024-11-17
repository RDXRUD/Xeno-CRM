// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Routes instead of Switch
// import { useAuth } from './context/AuthContext';  // Import the useAuth hook
// import CampaignPage from './components/CampaignPage';
// import AudiencePage from './components/AudiencePage';
// import CampaignHistoryPage from './components/CampaignHistoryPage';
// import './App.css';

// function App() {
//   const { user, login, logout } = useAuth();  // Use the useAuth hook to get the user state

//   return (
//     <Router>
//       <div className="App">
//         <h1>Welcome to the Campaign Management System</h1>
        
//         {user ? (
//           <div>
//             <h2>Hello, {user.displayName}</h2>
//             <button onClick={logout}>Logout</button>
//           </div>
//         ) : (
//           <div>
//             <button onClick={login}>Login with Google</button>
//           </div>
//         )}

//         <nav>
//           <ul>
//             <li>
//               <Link to="/audience">Audience</Link>
//             </li>
//             <li>
//               <Link to="/campaign">Campaign</Link>
//             </li>
//             <li>
//               <Link to="/campaign-history">Campaign History</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>  {/* Replace Switch with Routes */}
//           <Route path="/campaign" element={<CampaignPage />} />
//           <Route path="/audience" element={<AudiencePage />} />
//           <Route path="/campaign-history" element={<CampaignHistoryPage />} />
//           <Route path="/" element={<AudiencePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CampaignPage from './components/CampaignPage';
import AudiencePage from './components/AudiencePage';
import CampaignHistoryPage from './components/CampaignHistoryPage';
import LoginPage from './components/LoginPage';
import SendMessagePage from './components/SendMessagePage';
import './App.css';
import CommunicationLogPage from './components/CommunicationLogPage';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from the backend
    useEffect(() => {
      fetch('http://localhost:5001/api/auth/user', {
          credentials: 'include', // Include cookies in the request
      })
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Not authenticated');
          })
          .then(data => {
              setUser(data.user); // Set user if authenticated
              console.log(data.user)
              setLoading(false);
          })
          .catch(() => {
              setLoading(false);
          });
  }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                <Route
                    path="/campaign"
                    element={user ? <CampaignPage user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/audience"
                    element={user ? <AudiencePage user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/campaign-history"
                    element={user ? <CampaignHistoryPage user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/sendMessage"
                    element={user ? <SendMessagePage user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/communicationLog"
                    element={user ? <CommunicationLogPage user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/"
                    element={user ? <Navigate to="/campaign" /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;