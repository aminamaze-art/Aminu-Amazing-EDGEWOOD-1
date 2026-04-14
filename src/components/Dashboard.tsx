/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  AlertCircle, CheckCircle2, Clock, Wrench, 
  Calendar, Package, Zap, Users, Plus, Trash2, CheckCircle
} from 'lucide-react';
import { useFacilityData } from '@/src/lib/storage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  const { complaints, maintenance, schedule, inventory, generators, tasks, setTasks } = useFacilityData();
  const [newTask, setNewTask] = useState('');
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    setTaskToDelete(null);
  };

  const openComplaints = complaints.filter(c => c.status === 'Open').length;
  const inProgressMaint = maintenance.filter(m => m.status === 'In Progress').length;
  const overdueSchedule = schedule.filter(s => {
    const dueDate = new Date(s.nextDueDate);
    return dueDate < new Date() && s.status !== 'Completed';
  }).length;

  const totalAssetValue = inventory.reduce((sum, item) => sum + (item.unitCost * item.quantity), 0);

  const complaintStats = [
    { name: 'Open', value: complaints.filter(c => c.status === 'Open').length },
    { name: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length },
    { name: 'Completed', value: complaints.filter(c => c.status === 'Completed').length },
    { name: 'Closed', value: complaints.filter(c => c.status === 'Closed').length },
  ];

  const maintenanceCosts = maintenance.slice(-5).map(m => ({
    name: m.id,
    cost: m.cost
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Open Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{openComplaints}</div>
            <p className="text-xs text-blue-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-600">In Progress Jobs</CardTitle>
            <Wrench className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{inProgressMaint}</div>
            <p className="text-xs text-green-600 mt-1">Active maintenance</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">Overdue Tasks</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{overdueSchedule}</div>
            <p className="text-xs text-amber-600 mt-1">Preventive maintenance</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">Asset Value</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-900">
              ₦{totalAssetValue.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 mt-1">Total inventory value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Quick Tasks</CardTitle>
            <CheckCircle className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add a new task..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <Button onClick={addTask} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between p-2 rounded-lg border bg-white group hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="h-3 w-3" />}
                      </button>
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.text}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setTaskToDelete(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm italic">
                  No tasks for today. Add one above!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the task from your list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => taskToDelete && deleteTask(taskToDelete)}
                className="bg-red-600 hover:bg-red-700"
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Complaints Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complaintStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complaintStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Maintenance Costs</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceCosts}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
