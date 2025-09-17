import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface RegistrationData {
  id: string;
  registrationType?: string;
  studentName?: string;
  institutionName?: string;
  campType?: string;
  campName?: string;
  submittedAt?: { seconds: number; nanoseconds: number };
  [key: string]: any;
}

interface OrderData {
  id: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    country?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  deliveryOption: string;
  status: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export default function Admin() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationData[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [activeTab, setActiveTab] = useState<'registrations' | 'orders'>('registrations');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch registrations
        const regQuery = query(collection(db, 'registrations'), orderBy('submittedAt', 'desc'));
        const regSnapshot = await getDocs(regQuery);
        const regData: RegistrationData[] = regSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<RegistrationData, 'id'>) }));
        setRegistrations(regData);
        setFilteredRegistrations(regData);

        // Fetch orders
        const orderQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const orderSnapshot = await getDocs(orderQuery);
        const orderData: OrderData[] = orderSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<OrderData, 'id'>) }));
        setOrders(orderData);
        setFilteredOrders(orderData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Filter and search functionality
  useEffect(() => {
    if (activeTab === 'registrations') {
      let filtered = [...registrations];

      // Filter by type
      if (filterType !== 'all') {
        filtered = filtered.filter(reg => reg.registrationType === filterType);
      }

      // Search functionality
      if (searchTerm) {
        filtered = filtered.filter(reg => 
          (reg.studentName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (reg.institutionName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (reg.campName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (reg.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Sort functionality
      if (sortBy === 'newest') {
        filtered.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0));
      } else if (sortBy === 'oldest') {
        filtered.sort((a, b) => (a.submittedAt?.seconds || 0) - (b.submittedAt?.seconds || 0));
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => {
          const nameA = a.registrationType === 'individual' ? a.studentName || '' : a.institutionName || '';
          const nameB = b.registrationType === 'individual' ? b.studentName || '' : b.institutionName || '';
          return nameA.localeCompare(nameB);
        });
      }

      setFilteredRegistrations(filtered);
    } else {
      let filtered = [...orders];

      // Filter by status
      if (filterType !== 'all') {
        filtered = filtered.filter(order => order.status === filterType);
      }

      // Search functionality
      if (searchTerm) {
        filtered = filtered.filter(order => 
          (order.customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.customer.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())))
        );
      }

      // Sort functionality
      if (sortBy === 'newest') {
        filtered.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      } else if (sortBy === 'oldest') {
        filtered.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.customer.fullName.localeCompare(b.customer.fullName));
      }

      setFilteredOrders(filtered);
    }
  }, [registrations, orders, searchTerm, filterType, sortBy, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError('Invalid credentials or user does not exist.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const openModal = (registration: RegistrationData) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  // Editing state inside modal
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<RegistrationData | null>(null);

  const startEdit = () => {
    setEditData(selectedRegistration ? { ...selectedRegistration } : null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const saveEdit = async () => {
    if (!editData) return;
    try {
      const docRef = doc(db, 'registrations', editData.id);
      const dataToUpdate = { ...editData } as any;
      delete dataToUpdate.id;
      await updateDoc(docRef, dataToUpdate);
      // Refresh local list
      setRegistrations(prev => prev.map(r => r.id === editData.id ? editData : r));
      setFilteredRegistrations(prev => prev.map(r => r.id === editData.id ? editData : r));
      setSelectedRegistration(editData);
      setIsEditing(false);
      setEditData(null);
    } catch (err) {
      console.error('Failed to save changes:', err);
      alert('Failed to save changes. Check console for details.');
    }
  };

  const handleEditChange = (key: string, value: any) => {
    if (!editData) return;
    setEditData({ ...editData, [key]: value });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const ok = confirm('Are you sure you want to delete this registration? This action cannot be undone.');
    if (!ok) return;
    try {
      await deleteDoc(doc(db, 'registrations', id));
      setRegistrations(prev => prev.filter(r => r.id !== id));
      setFilteredRegistrations(prev => prev.filter(r => r.id !== id));
      closeModal();
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete. Check console for details.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRegistration(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h2>
            <p className="text-gray-600">Access your dashboard</p>
          </div>
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{authError}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 text-lg font-medium">Manage registration orders and shop orders</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="bg-slate-100/70 rounded-2xl p-2 backdrop-blur-sm">
              <nav className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('registrations')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'registrations'
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Camp Registrations ({registrations.length})</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'orders'
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Shop Orders ({orders.length})</span>
                  </span>
                </button>
              </nav>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-2xl p-4 mr-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {activeTab === 'registrations' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    )}
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white/90 mb-1">
                    {activeTab === 'registrations' ? 'Total Registrations' : 'Total Orders'}
                  </h3>
                  <p className="text-3xl font-bold text-white">
                    {activeTab === 'registrations' ? registrations.length : orders.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Search & Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      activeTab === 'registrations' 
                        ? "Search by name, email, or camp..." 
                        : "Search by customer name, email, or items..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                  />
                  <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {activeTab === 'registrations' ? 'Filter by Type' : 'Filter by Status'}
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  {activeTab === 'registrations' ? (
                    <>
                      <option value="all">All Types</option>
                      <option value="individual">Individual</option>
                      <option value="institution">Institution</option>
                    </>
                  ) : (
                    <>
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </>
                  )}
                </select>
              </div>
              
              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  {activeTab === 'registrations' ? (
                    <option value="name">Name A-Z</option>
                  ) : (
                    <>
                      <option value="customer">Customer A-Z</option>
                      <option value="total">Total Amount</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 p-3 bg-slate-100/50 rounded-xl">
              <p className="text-sm font-medium text-slate-600">
                Showing {activeTab === 'registrations' ? filteredRegistrations.length : filteredOrders.length} 
                of {activeTab === 'registrations' ? registrations.length : orders.length} 
                {activeTab === 'registrations' ? ' registrations' : ' orders'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">
                Loading {activeTab === 'registrations' ? 'registrations' : 'orders'}...
              </span>
            </div>
          ) : (activeTab === 'registrations' ? filteredRegistrations : filteredOrders).length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {activeTab === 'registrations' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                )}
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm || filterType !== 'all' 
                  ? `No matching ${activeTab}` 
                  : `No ${activeTab}`
                }
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : `No ${activeTab} have been submitted yet.`
                }
              </p>
            </div>
          ) : (
            <>
              {activeTab === 'registrations' ? (
                <>
              {/* Mobile Card View */}
              <div className="block md:hidden space-y-6">
                {filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-800 mb-2">
                          {reg.registrationType === 'individual' ? reg.studentName : reg.institutionName}
                        </h3>
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          reg.registrationType === 'individual' 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                            : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                        }`}>
                          {reg.registrationType === 'individual' ? 'Individual' : 'Institution'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
                        </svg>
                        <span className="text-slate-600"><strong>Camp:</strong> {reg.campName || reg.campType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m-6 4h6" />
                        </svg>
                        <span className="text-slate-600"><strong>Submitted:</strong> {reg.submittedAt ? new Date(reg.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      {reg.email && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-slate-600"><strong>Email:</strong> {reg.email}</span>
                        </div>
                      )}
                      {reg.phone && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-slate-600"><strong>Phone:</strong> {reg.phone}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => openModal(reg)}
                      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      View Full Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Camp</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-slate-200">
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-white/80 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              reg.registrationType === 'individual' 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                                : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                            }`}>
                              {reg.registrationType === 'individual' ? 'Individual' : 'Institution'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-slate-900">
                              {reg.registrationType === 'individual' ? reg.studentName : reg.institutionName}
                            </div>
                            {reg.registrationType === 'individual' && reg.age && (
                              <div className="text-sm text-slate-500">Age: {reg.age}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">{reg.email}</div>
                            <div className="text-sm text-slate-500">{reg.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                            {reg.campName || reg.campType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {reg.submittedAt ? new Date(reg.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openModal(reg)}
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
                </>
              ) : (
                <>
                  {/* Orders Mobile Card View */}
                  <div className="block md:hidden space-y-6">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">
                              Order #{order.id.slice(-8)}
                            </h3>
                            <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              order.status === 'delivered' 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                                : order.status === 'shipped'
                                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                                : order.status === 'processing'
                                ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
                                : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700'
                            }`}>
                              {order.status || 'pending'}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-slate-600"><strong>Customer:</strong> {order.customer.fullName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="text-slate-600"><strong>Total:</strong> ₹{order.total}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-slate-600"><strong>Items:</strong> {order.items.length} item(s)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-slate-600"><strong>Type:</strong> {order.deliveryOption}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m-6 4h6" />
                            </svg>
                            <span className="text-slate-600"><strong>Ordered:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-slate-600"><strong>Email:</strong> {order.customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-slate-600"><strong>Phone:</strong> {order.customer.phone}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          View Full Details
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Orders Desktop Table View */}
                  <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Ordered</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-slate-200">
                          {filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/80 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-slate-900">
                                  #{order.id.slice(-8)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-slate-900">
                                  {order.customer.fullName}
                                </div>
                                <div className="text-sm text-slate-500">{order.customer.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-slate-900 font-medium">{order.items.length} item(s)</div>
                                <div className="text-sm text-slate-500 capitalize">{order.deliveryOption}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">
                                ₹{order.total}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                  order.status === 'delivered' 
                                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                                    : order.status === 'shipped'
                                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                                    : order.status === 'processing'
                                    ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
                                    : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700'
                                }`}>
                                  {order.status || 'pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedRegistration.registrationType === 'individual' 
                        ? selectedRegistration.studentName 
                        : selectedRegistration.institutionName
                      }
                    </h2>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-1 ${
                      selectedRegistration.registrationType === 'individual' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedRegistration.registrationType === 'individual' ? 'Individual Registration' : 'Institution Registration'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: main info */}
                <div className="lg:col-span-2 space-y-6">
                  {selectedRegistration.registrationType === 'individual' ? (
                    <>
                      {/* Student Information */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">🎓</span>
                          Student Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Name</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.studentName}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.studentName ?? ''} onChange={(e) => handleEditChange('studentName', e.target.value)} />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Age</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.age}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.age ?? ''} onChange={(e) => handleEditChange('age', e.target.value)} />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Grade</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.grade}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.grade ?? ''} onChange={(e) => handleEditChange('grade', e.target.value)} />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">School</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.school || 'Not specified'}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.school ?? ''} onChange={(e) => handleEditChange('school', e.target.value)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Parent/Guardian Information */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">👨‍👩‍👧‍👦</span>
                          Parent/Guardian
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Name</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.parentName}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.parentName ?? ''} onChange={(e) => handleEditChange('parentName', e.target.value)} />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.email}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.email ?? ''} onChange={(e) => handleEditChange('email', e.target.value)} />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Address</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.address || 'Not provided'}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.address ?? ''} onChange={(e) => handleEditChange('address', e.target.value)} />
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Phone</label>
                            {!isEditing ? (
                              <p className="text-gray-900">{selectedRegistration.phone}</p>
                            ) : (
                              <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.phone ?? ''} onChange={(e) => handleEditChange('phone', e.target.value)} />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">🏢</span>
                        Institution Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Institution Name</label>
                          <p className="text-gray-900">{selectedRegistration.institutionName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Type</label>
                          <p className="text-gray-900">{selectedRegistration.institutionType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Number of Students</label>
                          <p className="text-gray-900">{selectedRegistration.numberOfStudents}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Age Range</label>
                          <p className="text-gray-900">{selectedRegistration.ageRangeMin}-{selectedRegistration.ageRangeMax} years</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Contact Person</label>
                          <p className="text-gray-900">{selectedRegistration.contactPersonName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Title</label>
                          <p className="text-gray-900">{selectedRegistration.contactPersonTitle}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email</label>
                          <p className="text-gray-900">{selectedRegistration.institutionEmail}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone</label>
                          <p className="text-gray-900">{selectedRegistration.institutionPhone}</p>
                        </div>
                        <div className="col-span-2">
                          <label className="text-sm font-medium text-gray-600">Address</label>
                          <p className="text-gray-900">{selectedRegistration.institutionAddress || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camp Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">🏕️</span>
                      Camp Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Camp</label>
                        {!isEditing ? (
                          <p className="text-gray-900">{selectedRegistration.campName || selectedRegistration.campType}</p>
                        ) : (
                          <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.campName ?? editData?.campType ?? ''} onChange={(e) => handleEditChange('campName', e.target.value)} />
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Experience Level</label>
                        {!isEditing ? (
                          <p className="text-gray-900 capitalize">{selectedRegistration.experience}</p>
                        ) : (
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={editData?.experience ?? ''} onChange={(e) => handleEditChange('experience', e.target.value)}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        )}
                      </div>
                    
                    </div>
                  </div>
                </div>

                {/* Right Column - Status & Actions */}
                <div className="space-y-6">
                  {/* Application Status */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      📊 Application Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Submitted
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Submitted</span>
                        <p className="text-sm text-gray-900">
                          {selectedRegistration.submittedAt 
                            ? new Date(selectedRegistration.submittedAt.seconds * 1000).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : 'N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Additional Information */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="font-medium text-gray-600">Medical Conditions</label>
                        <p className="text-gray-900">{selectedRegistration.medicalConditions || 'None'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-600">Dietary Restrictions</label>
                        <p className="text-gray-900">{selectedRegistration.dietaryRestrictions || 'None'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-600">Special Requests</label>
                        <p className="text-gray-900">{selectedRegistration.specialRequests || 'None'}</p>
                      </div>
                    </div>
                  </div>
                   {/* Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions</h3>
                    <div className="flex flex-col space-y-3">
                      {!isEditing ? (
                        <>
                          <button
                            onClick={startEdit}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => selectedRegistration && handleDelete(selectedRegistration.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={saveEdit}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
                      Order #{selectedOrder.id.slice(-8)}
                    </h2>
                    <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-full ${
                      selectedOrder.status === 'delivered' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                        : selectedOrder.status === 'shipped'
                        ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                        : selectedOrder.status === 'processing'
                        ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
                        : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700'
                    }`}>
                      {selectedOrder.status || 'pending'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-slate-400 hover:text-slate-600 text-3xl font-bold bg-slate-100 hover:bg-slate-200 rounded-2xl w-12 h-12 flex items-center justify-center transition-all duration-200"
                >
                  ×
                </button>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Customer Information</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3">{selectedOrder.customer.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                      <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                      <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3">{selectedOrder.customer.phone}</p>
                    </div>
                    {selectedOrder.customer.city && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                        <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3">
                          {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.zip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Order Summary</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Order ID</label>
                      <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3">#{selectedOrder.id.slice(-8)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Order Date</label>
                      <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3">
                        {new Date(selectedOrder.createdAt.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Option</label>
                      <p className="text-slate-900 font-semibold bg-white/60 rounded-xl p-3 capitalize">{selectedOrder.deliveryOption}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                      <select
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize font-semibold bg-white/80 backdrop-blur-sm"
                        value={selectedOrder.status}
                        onChange={e => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Ordered Items</span>
                </h3>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-slate-100 to-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="bg-white/60 hover:bg-white/80 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                            ₹{item.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span>Payment Summary</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm bg-white/60 rounded-xl p-3">
                    <span className="text-slate-600 font-medium">Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm bg-white/60 rounded-xl p-3">
                    <span className="text-slate-600 font-medium">Shipping:</span>
                    <span className="font-bold text-slate-900">₹{selectedOrder.shipping}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-lg bg-white/80 rounded-xl p-4 shadow-lg">
                    <span className="text-slate-800 font-bold">Total:</span>
                    <span className="text-slate-900 font-bold text-xl">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
                <button
                  onClick={async () => {
                    if (!selectedOrder) return;
                    try {
                      const docRef = doc(db, 'orders', selectedOrder.id);
                      await updateDoc(docRef, { status: selectedOrder.status });
                      alert('Order status updated!');
                      setSelectedOrder(null);
                      // Optionally, refresh orders list here
                    } catch (err) {
                      alert('Failed to update order status.');
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
