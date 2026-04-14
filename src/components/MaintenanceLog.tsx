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
import { Plus, Search, Wrench } from 'lucide-react';
import { useFacilityData } from '@/src/lib/storage';

export default function MaintenanceLog() {
  const { maintenance } = useFacilityData();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = maintenance.filter(m => 
    m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search work orders..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" /> New Work Order
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px]">WO ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="max-w-[250px]">Description</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-mono text-xs">{m.id}</TableCell>
                <TableCell className="text-sm">{m.dateReported}</TableCell>
                <TableCell className="text-sm">
                  <Badge variant="secondary" className="font-normal">{m.type}</Badge>
                </TableCell>
                <TableCell className="text-sm">{m.location}</TableCell>
                <TableCell className="text-sm truncate max-w-[250px]">{m.description}</TableCell>
                <TableCell className="text-sm">{m.assignedTo}</TableCell>
                <TableCell className="text-sm font-medium">₦{m.cost.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={m.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {m.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
