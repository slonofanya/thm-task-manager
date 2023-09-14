import React, { FC, ReactElement } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ITaskHeader } from './interfaces/ITaskHeader';

const TaskHeader: FC<ITaskHeader> = (props): ReactElement => {
  const { id, title = 'Default Title', date = new Date(), onDelete } = props;
  return (
    <Box display="flex" width="100%" justifyContent="space-between" mb={3}>
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip variant="outlined" label={format(date, 'PPP')} />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ color: 'white' }}
          onClick={(e) => onDelete(e, id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default TaskHeader;
