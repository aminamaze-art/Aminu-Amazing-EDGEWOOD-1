/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { mockComplaints, mockMaintenance, mockSchedule, mockInventory, mockGenerators, mockVendors, mockDailyReports } from './mockData';
import { Task } from '../types';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useFacilityData() {
  const [complaints, setComplaints] = useLocalStorage('complaints', mockComplaints);
  const [maintenance, setMaintenance] = useLocalStorage('maintenance', mockMaintenance);
  const [schedule, setSchedule] = useLocalStorage('schedule', mockSchedule);
  const [inventory, setInventory] = useLocalStorage('inventory', mockInventory);
  const [generators, setGenerators] = useLocalStorage('generators', mockGenerators);
  const [vendors, setVendors] = useLocalStorage('vendors', mockVendors);
  const [dailyReports, setDailyReports] = useLocalStorage('dailyReports', mockDailyReports);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [
    { id: '1', text: 'Check generator oil level', completed: false, createdAt: new Date().toISOString() },
    { id: '2', text: 'Review pending complaints', completed: true, createdAt: new Date().toISOString() },
  ]);

  return {
    complaints, setComplaints,
    maintenance, setMaintenance,
    schedule, setSchedule,
    inventory, setInventory,
    generators, setGenerators,
    vendors, setVendors,
    dailyReports, setDailyReports,
    tasks, setTasks
  };
}
