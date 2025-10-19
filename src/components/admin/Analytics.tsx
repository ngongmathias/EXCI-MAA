import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, LinearProgress } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

const Analytics: React.FC = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      title: 'Page Views',
      value: '12,345',
      change: '+12.5%',
      trend: 'up',
      icon: <VisibilityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Unique Visitors',
      value: '8,234',
      change: '+8.2%',
      trend: 'up',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Bounce Rate',
      value: '34.2%',
      change: '-2.1%',
      trend: 'down',
      icon: <TrendingDownIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+15.3%',
      trend: 'up',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    },
  ];

  const topPages = [
    { page: '/services', views: 2341, percentage: 85 },
    { page: '/about', views: 1892, percentage: 72 },
    { page: '/contact', views: 1456, percentage: 58 },
    { page: '/events', views: 1234, percentage: 45 },
    { page: '/insights', views: 987, percentage: 38 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          View performance metrics and insights
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {metric.title}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>
                    {metric.icon}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: metric.trend === 'up' ? 'success.main' : 'error.main',
                      fontWeight: 'bold',
                    }}
                  >
                    {metric.change}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Data */}
      <Grid container spacing={3}>
        {/* Top Pages */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Top Pages
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {topPages.map((page, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {page.page}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {page.views.toLocaleString()} views
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={page.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: 'primary.main',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Traffic Sources */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Traffic Sources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { source: 'Direct', percentage: 45, color: 'primary.main' },
                { source: 'Google Search', percentage: 32, color: 'success.main' },
                { source: 'Social Media', percentage: 15, color: 'info.main' },
                { source: 'Referrals', percentage: 8, color: 'warning.main' },
              ].map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {item.source}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: item.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
