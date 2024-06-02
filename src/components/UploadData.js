import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, CircularProgress, Grid, Paper, Typography, useMediaQuery} from '@mui/material';
import axios from 'axios';

const UploadData = ({setFiles}) => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [fileName1, setFileName1] = useState('');
    const [fileName2, setFileName2] = useState('');
    const [dragOver1, setDragOver1] = useState(false);
    const [dragOver2, setDragOver2] = useState(false);
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange1 = (e) => {
        setFile1(e.target.files[0]);
        setFileName1(e.target.files[0].name);
    };
    const handleFileChange2 = (e) => {
        setFile2(e.target.files[0]);
        setFileName2(e.target.files[0].name);
    };

    const handleDrop1 = (e) => {
        e.preventDefault();
        setFile1(e.dataTransfer.files[0]);
        setFileName1(e.dataTransfer.files[0].name);
        setDragOver1(false);
    };
    const handleDrop2 = (e) => {
        e.preventDefault();
        setFile2(e.dataTransfer.files[0]);
        setFileName2(e.dataTransfer.files[0].name);
        setDragOver2(false);
    };

const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
        setLoading(true);
        const response = await axios.post('http://127.0.0.1:8000/getData', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        navigate('/report', { state: { data: response.data } }); // передача данных в navigate
    } catch (error) {
        console.error('Ошибка при отправке файлов', error);
    } finally {
        setLoading(false);
    }
};


    const prevStep = () => navigate(-1);

    return (<Paper elevation={3} sx={{p: 3, mt: 3}}>
        <Typography variant="h5" gutterBottom>
            Загрузка данных исследования
        </Typography>
        <Box component="form">
            <Grid container spacing={2}>
                <Grid item sx={{
                    width: 'auto', marginRight: isMobile ? '20px' : '0px'
                }}>
                    <Button variant="contained" component="label" sx={{
                        width: 'auto', height: isMobile ? '48px' : '56px'
                    }}>
                        Загрузить данные 1
                        <input type="file" hidden onChange={handleFileChange1}/>
                    </Button>
                    <Box sx={{
                        border: dragOver1 ? '2px dashed grey' : '1px dashed grey',
                        mt: 2,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: isMobile ? '48px' : '56px'
                    }}
                         onDragOver={(e) => {
                             e.preventDefault();
                             setDragOver1(true);
                         }}
                         onDragLeave={() => setDragOver1(false)}
                         onDrop={handleDrop1}
                    >
                        <Typography variant="body1">Перетащите файл</Typography>
                    </Box>
                    {fileName1 && <Box sx={{
                        width: 'auto',
                        mt: 2,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: isMobile ? '48px' : '56px'
                    }}>
                        <Typography variant="body2">{fileName1}</Typography>
                    </Box>}
                </Grid>
                <Grid item sx={{width: 'auto'}}>
                    <Button variant="contained" component="label" sx={{
                        width: 'auto', height: isMobile ? '48px' : '56px'
                    }}>
                        Загрузить данные 2
                        <input type="file" hidden onChange={handleFileChange2}/>
                    </Button>
                    <Box sx={{
                        border: dragOver2 ? '2px dashed grey' : '1px dashed grey',
                        mt: 2,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: isMobile ? '48px' : '56px'
                    }}
                         onDragOver={(e) => {
                             e.preventDefault();
                             setDragOver2(true);
                         }}
                         onDragLeave={() => setDragOver2(false)}
                         onDrop={handleDrop2}
                    >
                        <Typography variant="body1">Перетащите файл</Typography>
                    </Box>
                    {fileName2 && <Box sx={{
                        width: 'auto',
                        mt: 2,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: isMobile ? '48px' : '56px'
                    }}>
                        <Typography variant="body2">{fileName2}</Typography>
                    </Box>}
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" mt={4} mb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="outlined" color="secondary" onClick={prevStep} fullWidth
                                sx={{height: isMobile ? '48px' : '56px'}}>
                            Назад
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth
                                sx={{height: isMobile ? '48px' : '56px',
                                color: 'white'}}>
                            Начать исследование
                        </Button>

                    </Grid>
                </Grid>

                {/*<Button variant="contained" color="primary" onClick={handleSubmit} disabled={!file1 || !file2}>*/}
                {/*    Начать исследование*/}
                {/*</Button>*/}
            </Box>
            <Box display="flex" justifyContent="center">
                {loading && <CircularProgress/>}
            </Box>
        </Box>
    </Paper>);
};

export default UploadData;