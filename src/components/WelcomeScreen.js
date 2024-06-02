import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/form');
    };

    return (
        <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    px: { xs: 2, sm: 5, md: 10 },
                    position: 'relative',
                    zIndex: 1,
                    color: 'black',
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontFamily: 'monospace',
                        fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
                        letterSpacing: 5,
                    }}
                >
                    Обследование нового пациента
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStart}
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                        px: { xs: 2, sm: 5, md: 10 },
                        color: 'white'
                    }}
                >
                    Начать
                </Button>
            </Box>
        </Box>
    );
};

export default WelcomeScreen;
