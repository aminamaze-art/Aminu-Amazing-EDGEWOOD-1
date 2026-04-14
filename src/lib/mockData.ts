/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Complaint, MaintenanceLog, MaintenanceSchedule, InventoryItem, GeneratorLog, Vendor, DailyReport } from '../types';

export const mockComplaints: Complaint[] = [
  {
    id: 'CMP-001',
    dateReported: '2024-03-10',
    time: '09:00',
    reportedBy: 'Mrs. Adebayo',
    department: 'Admin',
    location: 'Admin Block',
    category: 'AC/Cooling',
    details: 'AC in Principal office not cooling',
    priority: 'High',
    assignedTo: 'Mr. Okafor',
    status: 'Open'
  },
  {
    id: 'CMP-002',
    dateReported: '2024-03-12',
    time: '11:30',
    reportedBy: 'Mr. Chen',
    department: 'Science',
    location: 'Science Lab',
    category: 'Plumbing',
    details: 'Leaking tap in Lab 2',
    priority: 'Medium',
    assignedTo: 'Mr. Ibrahim',
    status: 'In Progress'
  }
];

export const mockMaintenance: MaintenanceLog[] = [
  {
    id: 'WO-0001',
    dateReported: '2024-03-05',
    type: 'Corrective',
    category: 'Electrical',
    location: 'Library',
    description: 'Replace faulty fluorescent tubes',
    priority: 'Medium',
    assignedTo: 'Mr. Okafor',
    status: 'Completed',
    dateStarted: '2024-03-06',
    dateCompleted: '2024-03-06',
    partsUsed: '4x 40W Tubes',
    cost: 12000,
    vendor: 'Internal'
  }
];

export const mockSchedule: MaintenanceSchedule[] = [
  {
    id: 'PM-001',
    equipment: 'Generator',
    location: 'Generator Room',
    description: 'Full service: oil change, filter replacement',
    frequency: 'Monthly',
    lastCompleted: '2024-02-15',
    nextDueDate: '2024-03-15',
    assignedTo: 'Mr. Ibrahim',
    estimatedCost: 45000,
    status: 'Pending'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'AST-0001',
    category: 'Generator',
    itemName: 'Mikano 50KVA',
    brandModel: 'Perkins',
    location: 'Generator Room',
    serialNumber: 'MK-50-9921',
    quantity: 1,
    condition: 'Good',
    unitCost: 8500000,
    purchaseDate: '2022-01-10',
    supplier: 'Mikano International'
  }
];

export const mockGenerators: GeneratorLog[] = [
  {
    id: 'GEN-001',
    date: '2024-03-13',
    openingLevel: 450,
    dieselAdded: 200,
    costPerLiter: 1200,
    closingLevel: 610,
    startTime: '08:00',
    stopTime: '14:00',
    phcnHours: 2,
    remarks: 'Normal operation'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: 'VEN-001',
    name: 'Cool Breeze Services',
    serviceType: 'AC Technician',
    contactPerson: 'Mr. James',
    phone: '08012345678',
    email: 'cool@breeze.com',
    address: '12 Lagos Way',
    servicesOffered: 'AC Repair and Maintenance',
    rating: 4.5,
    contractStatus: 'Active'
  }
];

export const mockDailyReports: DailyReport[] = [
  {
    id: 'DR-001',
    date: '2024-03-13',
    officerName: 'Mr. Adeleke',
    weather: 'Sunny',
    phcnHours: 4,
    generatorHours: 6,
    dieselUsed: 40,
    waterStatus: 'Stable',
    complaintsReceived: 2,
    complaintsResolved: 1,
    maintenanceJobsDone: 1,
    techniciansOnSite: 2,
    inspectionsDone: 3,
    totalCost: 48000
  }
];
