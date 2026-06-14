'use client'

import React, { useState } from 'react';
import {
  FiBriefcase,
  FiCreditCard,
  FiUsers,
  FiShield,
  FiGlobe,
  FiMail,
  FiClock,
  FiDollarSign,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiMenu,
  FiX
} from 'react-icons/fi';

export default function OrganizationSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [profileData, setProfileData] = useState({
    orgName: 'Apex Events Ltd.',
    bio: 'Premium tech conferences and cultural events organizer in Bangladesh.',
    website: 'https://apexevents.com.bd',
    email: 'contact@apexevents.com',
    phone: '+880 1712-345678',
    timezone: 'GMT+6 (Dhaka)',
    currency: 'BDT (৳)'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings updated successfully!');
    }, 1000);
  };

  const menuItems = [
    { id: 'profile', label: 'Organization Profile', icon: <FiBriefcase className="w-4 h-4" /> },
    { id: 'payments', label: 'Payouts & Gateways', icon: <FiCreditCard className="w-4 h-4" /> },
    { id: 'team', label: 'Team Management', icon: <FiUsers className="w-4 h-4" /> },
    { id: 'policies', label: 'Policies & Legal', icon: <FiShield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      
    {/* navbar */}
      <header className="sticky top-7 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
        
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/20">
              S
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Settings</span>
          </div>

          {/* Desktop navbar */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium  transition-all ${
                  activeTab === item.id
                    ? 'border-b border-white text-white shadow-md shadow-indigo-600/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

         {/* md screen and mobile menu */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden flex items-center space-x-1.5 px-3.5 py-2 border border-slate-700 rounded-xl bg-slate-800 text-white active:scale-95 transition"
          >
            <FiMenu className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium hidden sm:inline">Menu</span>
          </button>
        </div>
      </header>

     {/* dark bg */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

     {/* mobile and md screen menu */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-slate-900 border-l border-slate-800 p-6 shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2 border border-slate-800 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
          Logged in as: <span className="font-medium text-slate-300">Dulal Ahmed</span>
        </div>
      </div>

  {/* main content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-4xl mx-auto w-full">
        
        {/* TAB 1: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800">
            <div className="border-b border-slate-800 pb-5 mb-6">
              <h3 className="text-lg font-bold text-white">Organization Profile</h3>
              <p className="text-sm text-slate-400">Update your company public information and global branding assets.</p>
            </div>

            {/* লোগো আপলোড */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6">
              <div className="h-20 w-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md shrink-0">
                AE
              </div>
              <div>
                <button type="button" className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 shadow-sm transition">
                  <FiUploadCloud className="w-4 h-4 text-slate-400" />
                  <span>Upload New Logo</span>
                </button>
                <p className="text-xs text-slate-500 mt-1.5">PNG, JPG up to 2MB. Recommended 512x512px.</p>
              </div>
            </div>

            {/* ফর্ম গ্রিড */}
            <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Organization Name</label>
                <input
                  type="text"
                  name="orgName"
                  value={profileData.orgName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm text-white transition-colors"
                  required
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Bio / Description</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm text-white transition-colors"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Website URL</label>
                <div className="relative rounded-xl shadow-sm flex items-center">
                  <FiGlobe className="absolute left-3 w-4 h-4 text-slate-500" />
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Public Email</label>
                <div className="relative rounded-xl shadow-sm flex items-center">
                  <FiMail className="absolute left-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Default Timezone</label>
                <div className="relative rounded-xl shadow-sm flex items-center">
                  <FiClock className="absolute left-3 w-4 h-4 text-slate-500" />
                  <select
                    name="timezone"
                    value={profileData.timezone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm text-white transition-colors appearance-none"
                  >
                    <option className="bg-slate-900">GMT+6 (Dhaka)</option>
                    <option className="bg-slate-900">GMT+0 (London)</option>
                    <option className="bg-slate-900">GMT-5 (New York)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Default Currency</label>
                <div className="relative rounded-xl shadow-sm flex items-center">
                  <FiDollarSign className="absolute left-3 w-4 h-4 text-slate-500" />
                  <select
                    name="currency"
                    value={profileData.currency}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm text-white transition-colors appearance-none"
                  >
                    <option className="bg-slate-900">BDT (৳)</option>
                    <option className="bg-slate-900">USD ($)</option>
                    <option className="bg-slate-900">EUR (€)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* বাটনসমূহ */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-3">
              <button type="button" className="w-full sm:w-auto px-4 py-2.5 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition shadow-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-5 py-2.5 justify-center rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition disabled:opacity-50 flex items-center space-x-2"
              >
                {isSaving ? 'Saving Changes...' : 'Save Settings'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800">
            <div className="border-b border-slate-800 pb-5 mb-6">
              <h3 className="text-lg font-bold text-white">Payout & Payment Gateways</h3>
              <p className="text-sm text-slate-400">Configure secure channels to accept automated ticket payouts.</p>
            </div>
            
            <div className="p-4 bg-amber-950/40 border border-amber-900/60 rounded-xl text-sm text-amber-300 flex items-start space-x-3 mb-6">
              <FiAlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
              <span>Integration Sandbox Mode Active. Remember to swap production API keys before going public with actual paid event bookings.</span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border border-slate-800 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-800/40 transition duration-200 gap-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-950/40 text-pink-400 rounded-xl flex items-center justify-center font-extrabold text-sm tracking-tight border border-pink-900/50 shrink-0">bkash</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">bKash Checkout Merchant API</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Automated instantly processed mobile wallet payouts.</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-xs font-bold text-indigo-400 bg-indigo-950/50 border border-indigo-900 rounded-xl hover:bg-indigo-900 transition w-full sm:w-auto">Connect Gateway</button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border border-slate-800 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-800/40 transition duration-200 gap-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-950/40 text-indigo-400 rounded-xl flex items-center justify-center font-extrabold text-sm border border-indigo-900/50 shrink-0">stripe</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Stripe Global Connect</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Accept worldwide local credit cards and smart debit schemes.</p>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 rounded-xl border border-emerald-900/50 w-full sm:w-auto">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>Configured</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEAM MANAGEMENT */}
        {activeTab === 'team' && (
          <div className="bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-y-3">
              <div>
                <h3 className="text-lg font-bold text-white">Team & Permissions</h3>
                <p className="text-sm text-slate-400">Add operational members and configure explicit dashboard feature controls.</p>
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 rounded-xl transition w-full sm:w-auto">
                + Invite New Member
              </button>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">System Access Role</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 font-semibold text-white">Dulal Ahmed</td>
                    <td className="py-4 text-slate-400">Workspace Owner (Admin)</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 rounded-full">Active</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 font-semibold text-white">Sabbir Rahman</td>
                    <td className="py-4 text-slate-400">Event Scanner / Field Staff</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700 rounded-full">Invited</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: POLICIES & LEGAL */}
        {activeTab === 'policies' && (
          <div className="bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800 text-slate-400">
            <h3 className="text-lg font-bold text-white mb-2">Policies & Legal</h3>
            <p className="text-sm">Terms of service, privacy policy configurations statement content goes here...</p>
          </div>
        )}

      </main>
    </div>
  );
}