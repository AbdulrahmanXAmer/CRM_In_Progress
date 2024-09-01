import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function EarningsGauge() {
  const earnings = 75000;  // Example earnings
  const target = 100000;
  const percentage = (earnings / target) * 100;

  return (
    <Gauge
      value={percentage}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: 'translate(0px, 0px)',
        },
      }}
      text={() => `${percentage.toFixed(2)}%`}
      max={100}
      height={200}
      width={400}
    />
  );
}
