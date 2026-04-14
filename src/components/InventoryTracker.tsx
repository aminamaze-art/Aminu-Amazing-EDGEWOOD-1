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
import { Plus, Search, Package } from 'lucide-react';
import { useFacilityData } from '@/src/lib/storage';

export default function InventoryTracker() {
  const { inventory } = useFacilityData();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = inventory.filter(i => 
    i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.brandModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search assets..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Add Asset
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px]">Asset ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Total Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="text-sm font-medium">{item.itemName}</TableCell>
                <TableCell className="text-sm">{item.category}</TableCell>
                <TableCell className="text-sm">{item.location}</TableCell>
                <TableCell className="text-sm">{item.quantity}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={item.condition === 'Excellent' ? 'text-green-600' : 'text-amber-600'}>
                    {item.condition}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">₦{item.unitCost.toLocaleString()}</TableCell>
                <TableCell className="text-sm font-semibold">₦{(item.unitCost * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
