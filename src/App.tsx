/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Wrench, 
  CalendarClock, 
  Package, 
  Zap, 
  Users,
  FileText,
  Settings as SettingsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Dashboard from './components/Dashboard';
import ComplaintRegister from './components/ComplaintRegister';
import MaintenanceLog from './components/MaintenanceLog';
import InventoryTracker from './components/InventoryTracker';
import GeneratorLog from './components/GeneratorLog';
import DailyReportView from './components/DailyReportView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: <Dashboard /> },
    { id: 'complaints', label: 'Complaints', icon: ClipboardList, component: <ComplaintRegister /> },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, component: <MaintenanceLog /> },
    { id: 'inventory', label: 'Inventory', icon: Package, component: <InventoryTracker /> },
    { id: 'generator', label: 'Generator', icon: Zap, component: <GeneratorLog /> },
    { id: 'reports', label: 'Reports', icon: FileText, component: <DailyReportView /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">FacilityPro</h1>
            <p className="text-xs text-gray-500 font-medium">Management System v1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Facility Manager</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <Users className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            <TabsList className="bg-white border p-1 h-auto inline-flex whitespace-nowrap">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 gap-2"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabs.find(t => t.id === activeTab)?.component}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-6 text-center text-gray-500 text-xs">
        &copy; 2024 Facility Management System Pro. All rights reserved.
      </footer>
    </div>
  );
}
