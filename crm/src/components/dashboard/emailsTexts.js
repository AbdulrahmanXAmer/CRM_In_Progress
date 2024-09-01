import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CommunicationBarChart() {
  const data = [
    { day: 'Mon', emails: 50, texts: 30 },
    { day: 'Tue', emails: 70, texts: 20 },
    { day: 'Wed', emails: 40, texts: 60 },
    { day: 'Thu', emails: 80, texts: 50 },
    { day: 'Fri', emails: 90, texts: 70 },
    { day: 'Sat', emails: 20, texts: 10 },
    { day: 'Sun', emails: 30, texts: 20 },
  ];

  return (
    <BarChart
      series={[
        { data: data.map(d => d.emails), label: 'Emails Sent' },
        { data: data.map(d => d.texts), label: 'Texts Sent' },
      ]}
      xAxis={[{ data: data.map(d => d.day), scaleType: 'band' }]}
      height={300}
      margin={{ top: 20, bottom: 30, left: 40, right: 20 }}
    />
  );
}
