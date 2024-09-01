import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ConnectionsChart() {
  const data = [
    { type: 'Clients', count: 50 },
    { type: 'Prospects', count: 30 },
    { type: 'Realtors', count: 20 },
  ];

  return (
    <BarChart
      series={[
        { data: data.map(d => d.count), label: 'Connections Made' }
      ]}
      xAxis={[{ data: data.map(d => d.type), scaleType: 'band' }]}
      height={300}
      margin={{ top: 20, bottom: 30, left: 40, right: 20 }}
    />
  );
}
