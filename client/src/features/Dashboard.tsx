import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import ContentArea from '@/components/contentArea/ContentArea';

const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <ContentArea />
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
