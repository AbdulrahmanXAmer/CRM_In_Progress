import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const DashboardMetrics = () => {
  const cards = [
    {
      title: 'Clients Taken Today',
      value: '35',
      percentage: '8.2%',
      isPositive: true,
      chartColor: 'green',
    },
    {
      title: 'Earnings YTD',
      value: '150,000',
      percentage: '12.6%',
      isPositive: false,
      chartColor: 'red',
    },
    {
      title: 'Average Deal Size',
      value: '$5,000',
      percentage: '15.3%',
      isPositive: true,
      chartColor: 'orange',
    },
  ];

  return (
    <Grid container spacing={4}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" color="textSecondary">
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {card.value}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {card.isPositive ? (
                  <ArrowUpwardIcon sx={{ color: 'green' }} />
                ) : (
                  <ArrowDownwardIcon sx={{ color: 'red' }} />
                )}
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: card.isPositive ? 'green' : 'red' }}
                >
                  {card.percentage} last week
                </Typography>
              </Box>
            </CardContent>
            <Box sx={{ width: 50, height: 50 }}>
              {/* Placeholder for the mini chart */}
              <svg width="100%" height="100%">
                <path
                  d="M0,30 C10,20 30,10 50,20"
                  stroke={card.chartColor}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardMetrics;
