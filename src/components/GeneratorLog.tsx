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
import { Plus, Zap } from 'lucide-react';
import { useFacilityData } from '@/src/lib/storage';

export default function GeneratorLog() {
  const { generators } = useFacilityData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" /> Generator & Diesel Tracking
        </h3>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" /> Log Daily Usage
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Date</TableHead>
              <TableHead>Opening (L)</TableHead>
              <TableHead>Added (L)</TableHead>
              <TableHead>Closing (L)</TableHead>
              <TableHead>Consumed (L)</TableHead>
              <TableHead>Runtime (Hrs)</TableHead>
              <TableHead>Efficiency (L/Hr)</TableHead>
              <TableHead>Cost (₦)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generators.map((log) => {
              const consumed = log.openingLevel + log.dieselAdded - log.closingLevel;
              const start = new Date(`2000-01-01T${log.startTime}`);
              const stop = new Date(`2000-01-01T${log.stopTime}`);
              const runtime = (stop.getTime() - start.getTime()) / (1000 * 60 * 60);
              const efficiency = runtime > 0 ? consumed / runtime : 0;
              const totalCost = log.dieselAdded * log.costPerLiter;

              return (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">{log.date}</TableCell>
                  <TableCell className="text-sm">{log.openingLevel}L</TableCell>
                  <TableCell className="text-sm">{log.dieselAdded}L</TableCell>
                  <TableCell className="text-sm">{log.closingLevel}L</TableCell>
                  <TableCell className="text-sm font-medium text-orange-600">{consumed}L</TableCell>
                  <TableCell className="text-sm">{runtime.toFixed(1)} hrs</TableCell>
                  <TableCell className="text-sm">{efficiency.toFixed(2)} L/hr</TableCell>
                  <TableCell className="text-sm font-semibold">₦{totalCost.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
