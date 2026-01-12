// import React from "react";
// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";
// import Home from "./pages/Dashboard/Home";
// import Income from "./pages/Dashboard/Income";
// import Expense from "./pages/Dashboard/Expense";
// import UserProvider from "./context/UserContext";
// import DashboardLayout from "./components/layouts/layouts/DashboardLayout";
// import { Toaster } from "react-hot-toast";


// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// const App = () => {
//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Root />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />

//           {/* Protected Dashboard Pages */}
//           <Route
//             path="/dashboard"
//             element={
//               <DashboardLayout activeMenu="dashboard">
//                 <Home />
//               </DashboardLayout>
//             }
//           />

//           <Route
//             path="/income"
//             element={
//               <DashboardLayout activeMenu="income">
//                 <Income />
//               </DashboardLayout>
//             }
//           />

//           <Route
//             path="/expense"
//             element={
//               <DashboardLayout activeMenu="expense">
//                 <Expense />
//               </DashboardLayout>
//             }
//           />
//         </Routes>
//       </Router>

//       <Toaster
//         toastOptions={{
//           className: "",
//           style: {
//             fontSize: "13px",
//           },
//         }}
//       />
//     </UserProvider>
//   );
// };

// export default App;

// const Root = () => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return isAuthenticated ? (
//     <Navigate to="/dashboard" replace />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };




import React from 'react';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import { Toaster } from 'react-hot-toast';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 
import DashboardLayout from './components/layouts/layouts/DashboardLayout';

const App = () => {
  return (
      <UserProvider>
        <Router>
            <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            
          </Routes>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: '13px'
            },
          }}
        />
        </Router>
                
    </UserProvider>
  )
};

export default App;

const Root = () => {
  //check if tocken exixts in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
