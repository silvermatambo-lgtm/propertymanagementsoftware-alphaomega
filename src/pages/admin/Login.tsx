import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../lib/store';
import { Lock, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/mtsa-logo.svg" alt="MTSA Holdings" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin Login
          </h1>
          <p className="text-stone-400 text-sm mt-1">MTSA Holdings Property Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
          <p className="mt-4 text-center text-xs text-stone-500">
            Presentation password: <span className="font-mono text-navy-700">280385</span>
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-gold-400 text-sm">
            <ArrowLeft size={16} /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
