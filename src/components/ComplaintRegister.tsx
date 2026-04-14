/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { useFacilityData } from '@/src/lib/storage';
import { STATUSES, PRIORITIES } from '@/src/constants';

export default function ComplaintRegister() {
  const { complaints, setComplaints } = useFacilityData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComplaints = complaints.filter(c => 
    c.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800 border-red-200';
      case 'In Progress': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-red-600 font-bold';
      case 'High': return 'text-orange-600 font-semibold';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-green-600';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search complaints..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> New Complaint
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reported By</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="max-w-[300px]">Details</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-mono text-xs">{complaint.id}</TableCell>
                  <TableCell className="text-sm">{complaint.dateReported}</TableCell>
                  <TableCell className="text-sm">{complaint.reportedBy}</TableCell>
                  <TableCell className="text-sm">{complaint.location}</TableCell>
                  <TableCell className="text-sm truncate max-w-[300px]">{complaint.details}</TableCell>
                  <TableCell>
                    <span className={`text-xs ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                  No complaints found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
