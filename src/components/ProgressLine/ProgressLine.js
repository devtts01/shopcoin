import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

export default function ProgressLine({ value = 35 }) {
    return (
        <>
            {value <= 0 ? (
                <LinearProgress />
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant='determinate' value={value} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                        >{`${Math.round(value)}%`}</Typography>
                    </Box>
                </Box>
            )}
        </>
    );
}
