/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { useFacilityData } from '@/src/lib/storage';

export default function DailyReportView() {
  const { dailyReports } = useFacilityData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" /> Daily Operations Reports
        </h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> New Daily Report
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Date</TableHead>
              <TableHead>Officer</TableHead>
              <TableHead>Weather</TableHead>
              <TableHead>Gen Hrs</TableHead>
              <TableHead>Diesel (L)</TableHead>
              <TableHead>Complaints (R/S)</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailyReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="text-sm">{report.date}</TableCell>
                <TableCell className="text-sm font-medium">{report.officerName}</TableCell>
                <TableCell className="text-sm">{report.weather}</TableCell>
                <TableCell className="text-sm">{report.generatorHours}h</TableCell>
                <TableCell className="text-sm">{report.dieselUsed}L</TableCell>
                <TableCell className="text-sm">{report.complaintsReceived} / {report.complaintsResolved}</TableCell>
                <TableCell className="text-sm font-semibold">₦{report.totalCost.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Download PDF</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
