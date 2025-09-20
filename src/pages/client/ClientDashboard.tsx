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
      color: 'bg-amber-600',
      path: '/client/post-requirement',
    },
    {
      title: 'Find Talent',
      description: 'Browse and discover talented artists',
      icon: Search,
      color: 'bg-amber-600',
      path: '/all-artists',
    },
    {
      title: 'My Postings',
      description: 'View and manage your job requirements',
      icon: FileText,
      color: 'bg-amber-600',
      path: '/client/requirements',
    },
    {
      title: 'My Hires',
      description: 'View artists you have hired',
      icon: Users,
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
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="group cursor-pointer bg-white border border-gray-200 rounded-2xl shadow hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${card.color} p-6 text-white rounded-t-2xl`}>
                <card.icon size={32} className="mb-2" />
                <h3 className="text-lg font-semibold tracking-wide">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
