import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ClientsPerDayChart() {
  const data = [
    { day: 'Mon', clients: 5 },
    { day: 'Tue', clients: 8 },
    { day: 'Wed', clients: 7 },
    { day: 'Thu', clients: 6 },
    { day: 'Fri', clients: 9 },
    { day: 'Sat', clients: 4 },
    { day: 'Sun', clients: 2 },
  ];

  return (
    <LineChart
      series={[
        { data: data.map(d => d.clients), label: 'Clients Signed In' }
      ]}
      xAxis={[{ data: data.map(d => d.day), scaleType: 'band' }]}
      height={300}
      margin={{ top: 20, bottom: 30, left: 40, right: 20 }}
    />
  );
}
