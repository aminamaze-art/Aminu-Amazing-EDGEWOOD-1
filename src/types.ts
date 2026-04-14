/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Status = 'Open' | 'In Progress' | 'Completed' | 'Closed' | 'Pending';
export type Priority = 'URGENT' | 'High' | 'Medium' | 'Low';
export type MaintenanceType = 'Corrective' | 'Preventive' | 'Emergency' | 'Routine' | 'Inspection';
export type Frequency = 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual';
export type Condition = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Needs Replacement';

export interface Complaint {
  id: string;
  dateReported: string;
  time: string;
  reportedBy: string;
  department: string;
  location: string;
  category: string;
  details: string;
  priority: Priority;
  assignedTo: string;
  status: Status;
  dateResolved?: string;
  actionTaken?: string;
  remarks?: string;
}

export interface MaintenanceLog {
  id: string;
  dateReported: string;
  type: MaintenanceType;
  category: string;
  location: string;
  description: string;
  priority: Priority;
  assignedTo: string;
  status: Status;
  dateStarted?: string;
  dateCompleted?: string;
  partsUsed?: string;
  cost: number;
  vendor: string;
  notes?: string;
}

export interface MaintenanceSchedule {
  id: string;
  equipment: string;
  location: string;
  description: string;
  frequency: Frequency;
  lastCompleted?: string;
  nextDueDate: string;
  assignedTo: string;
  estimatedCost: number;
  status: Status;
  actualCost?: number;
  dateCompleted?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  category: string;
  itemName: string;
  brandModel: string;
  location: string;
  serialNumber: string;
  quantity: number;
  condition: Condition;
  unitCost: number;
  purchaseDate: string;
  warrantyExpiry?: string;
  lastServiceDate?: string;
  nextServiceDue?: string;
  supplier: string;
  notes?: string;
}

export interface GeneratorLog {
  id: string;
  date: string;
  openingLevel: number;
  dieselAdded: number;
  costPerLiter: number;
  closingLevel: number;
  startTime: string;
  stopTime: string;
  phcnHours: number;
  maintenanceDone?: string;
  issues?: string;
  remarks?: string;
}

export interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  servicesOffered: string;
  rating: number;
  contractStatus: 'Active' | 'Inactive' | 'Contract' | 'Blacklisted';
  notes?: string;
}

export interface DailyReport {
  id: string;
  date: string;
  officerName: string;
  weather: 'Sunny' | 'Rainy' | 'Cloudy' | 'Stormy';
  phcnHours: number;
  generatorHours: number;
  dieselUsed: number;
  waterStatus: 'Stable' | 'Intermittent' | 'Low Pressure' | 'No Water';
  complaintsReceived: number;
  complaintsResolved: number;
  maintenanceJobsDone: number;
  techniciansOnSite: number;
  inspectionsDone: number;
  safetyIssues?: string;
  materialsUsed?: string;
  totalCost: number;
  pendingIssues?: string;
  recommendations?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}
