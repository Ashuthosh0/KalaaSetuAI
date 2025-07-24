<<<<<<< HEAD
// import { useNavigate } from 'react-router-dom';
// import { Plus, Search, FileText, Users, LogOut } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// const ClientDashboard = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const dashboardCards = [
//     {
//       title: 'Post a Requirement',
//       description: 'Create a new job posting to find the perfect artist',
//       icon: Plus,
//       color: 'bg-blue-500',
//       path: '/client/post-requirement'
//     },
//     {
//       title: 'Find Talent',
//       description: 'Browse and discover talented artists',
//       icon: Search,
//       color: 'bg-green-500',
//       path: '/all-artists'
//     },
//     {
//       title: 'My Postings',
//       description: 'View and manage your job requirements',
//       icon: FileText,
//       color: 'bg-amber-500',
//       path: '/client/requirements'
//     },
//     {
//       title: 'My Hires',
//       description: 'View artists you have hired',
//       icon: Users,
//       color: 'bg-purple-500',
//       path: '/client/hires'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
//               <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate('/')}
//                 className="text-gray-600 hover:text-amber-600 font-medium"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={logout}
//                 className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//               >
//                 <LogOut size={16} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {dashboardCards.map((card) => (
//             <div
//               key={card.title}
//               onClick={() => navigate(card.path)}
//               className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
//             >
//               <div className={`${card.color} p-6 text-white`}>
//                 <card.icon size={32} className="mb-4" />
//                 <h3 className="text-xl font-bold mb-2">{card.title}</h3>
//               </div>
//               <div className="p-6">
//                 <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
//                   {card.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-blue-600">0</div>
//               <div className="text-gray-600">Active Requirements</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-green-600">0</div>
//               <div className="text-gray-600">Total Hires</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-amber-600">0</div>
//               <div className="text-gray-600">Applications Received</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;





// import { useNavigate } from 'react-router-dom';
// import { Plus, Search, FileText, Users, LogOut } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// const ClientDashboard = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const dashboardCards = [
//     {
//       title: 'Post a Requirement',
//       description: 'Create a new job posting to find the perfect artist',
//       icon: Plus,
//       color: 'bg-blue-600',
//       path: '/client/post-requirement',
//     },
//     {
//       title: 'Find Talent',
//       description: 'Browse and discover talented artists',
//       icon: Search,
//       color: 'bg-green-600',
//       path: '/all-artists',
//     },
//     {
//       title: 'My Postings',
//       description: 'View and manage your job requirements',
//       icon: FileText,
//       color: 'bg-amber-500',
//       path: '/client/requirements',
//     },
//     {
//       title: 'My Hires',
//       description: 'View artists you have hired',
//       icon: Users,
//       color: 'bg-purple-600',
//       path: '/client/hires',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfaf6] to-[#f9f5f0] font-sans">
//       {/* Header */}
//       <div className="bg-white shadow-md border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-heading font-bold text-amber-800">
//                 Client Dashboard
//               </h1>
//               <p className="text-gray-600 text-sm mt-1">
//                 Welcome back, {user?.firstName}!
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate('/')}
//                 className="text-gray-600 hover:text-amber-700 font-medium transition-colors"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={logout}
//                 className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//               >
//                 <LogOut size={16} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {dashboardCards.map((card) => (
//             <div
//               key={card.title}
//               onClick={() => navigate(card.path)}
//               className="cursor-pointer group transform transition duration-300 hover:-translate-y-1 hover:shadow-xl bg-white rounded-2xl overflow-hidden border border-gray-200"
//             >
//               <div className={`${card.color} p-6 text-white`}>
//                 <card.icon size={32} className="mb-3" />
//                 <h3 className="text-lg font-semibold tracking-wide">
//                   {card.title}
//                 </h3>
//               </div>
//               <div className="p-6">
//                 <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
//                   {card.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-16 bg-white border border-gray-200 rounded-2xl shadow-md p-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 font-heading">
//             Quick Overview
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//             <div>
//               <div className="text-4xl font-extrabold text-blue-600">0</div>
//               <p className="text-sm text-gray-600 mt-1">Active Requirements</p>
//             </div>
//             <div>
//               <div className="text-4xl font-extrabold text-green-600">0</div>
//               <p className="text-sm text-gray-600 mt-1">Total Hires</p>
//             </div>
//             <div>
//               <div className="text-4xl font-extrabold text-amber-600">0</div>
//               <p className="text-sm text-gray-600 mt-1">Applications Received</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;







=======
import React from 'react';
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const dashboardCards = [
    {
      title: 'Post a Requirement',
      description: 'Create a new job posting to find the perfect artist',
      icon: Plus,
<<<<<<< HEAD
      color: 'bg-amber-600',
      path: '/client/post-requirement',
=======
      color: 'bg-blue-500',
      path: '/client/post-requirement'
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
    },
    {
      title: 'Find Talent',
      description: 'Browse and discover talented artists',
      icon: Search,
<<<<<<< HEAD
      color: 'bg-amber-600',
      path: '/all-artists',
=======
      color: 'bg-green-500',
      path: '/all-artists'
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
    },
    {
      title: 'My Postings',
      description: 'View and manage your job requirements',
      icon: FileText,
<<<<<<< HEAD
      color: 'bg-amber-600',
      path: '/client/requirements',
=======
      color: 'bg-amber-500',
      path: '/client/requirements'
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
    },
    {
      title: 'My Hires',
      description: 'View artists you have hired',
      icon: Users,
<<<<<<< HEAD
      color: 'bg-amber-600',
      path: '/client/hires',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfaf6] to-[#f9f5f0] font-sans text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 tracking-tight mb-1">Client Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome back, {user?.firstName}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-amber-700 transition font-medium"
            >
              Home
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-5 rounded-lg transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
=======
      color: 'bg-purple-500',
      path: '/client/hires'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-amber-600 font-medium"
              >
                Home
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
=======
      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
<<<<<<< HEAD
              className="group cursor-pointer bg-white border border-gray-200 rounded-2xl shadow hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${card.color} p-6 text-white rounded-t-2xl`}>
                <card.icon size={32} className="mb-2" />
                <h3 className="text-lg font-semibold tracking-wide">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition">
=======
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
            >
              <div className={`${card.color} p-6 text-white`}>
                <card.icon size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

<<<<<<< HEAD
        {/* Overview Section */}
        <div className="mt-16 bg-white border border-gray-200 rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-tight">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-amber-600">0</div>
              <p className="text-sm text-gray-700 mt-1">Active Requirements</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-amber-600">0</div>
              <p className="text-sm text-gray-700 mt-1">Total Hires</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-amber-600">0</div>
              <p className="text-sm text-gray-700 mt-1">Applications Received</p>
=======
        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Active Requirements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Total Hires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">0</div>
              <div className="text-gray-600">Applications Received</div>
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ClientDashboard;
=======
export default ClientDashboard;
>>>>>>> c9c94d18b2510aac8744471f50a7bc795a0c4f31
