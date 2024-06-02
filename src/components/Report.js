import React from 'react';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';

const Report = ({patientData}) => {
    const location = useLocation();
    const data = location.state.data;
    const bmi = (patientData.weight / ((patientData.height / 100) ** 2)).toFixed(2);
    const getCategory = (bmi) => {
        if (bmi < 18.5) return 'Недостаточный вес';
        if (bmi < 24.9) return 'Нормальный вес';
        if (bmi < 29.9) return 'Избыточный вес';
        if (bmi < 34.9) return 'Ожирение 1-й категории';
        if (bmi < 39.9) return 'Ожирение 2-й категории';
        return 'Ожирение 3-й категории';
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Недостаточный вес':
            case 'Избыточный вес':
            case 'Ожирение 1-й категории':
            case 'Ожирение 2-й категории':
            case 'Ожирение 3-й категории':
                return 'red';
            case 'Нормальный вес':
                return 'green';
            default:
                return 'black';
        }
    };

    const generate = () => {
        alert("скоро будет введено в эксплуатацию")
    }
    const generate2 = () => {
        alert("скоро будет введено в эксплуатацию")
    }

    const category = getCategory(bmi);
    const categoryColor = getCategoryColor(category);

    return (
        <Paper elevation={3} sx={{p: 3, mt: 3}}>
            <Typography variant="h5" gutterBottom>
                Отчет
            </Typography>
            <Box sx={{border: '1px solid #7AA73E', borderRadius: '4px', p: 2, mb: 2}}>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>ФИО: {patientData.name}</Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>Пол: {patientData.gender}</Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>Рост: {patientData.height} см</Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>Вес: {patientData.weight} кг</Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>Возраст: {patientData.age}</Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>Средний пульс во время
                    исследования: {patientData.pulse}</Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>Давление во время
                    исследования: {patientData.pressure}</Typography>
            </Box>
            <Box sx={{border: '1px solid #7AA73E', borderRadius: '4px', p: 2, mb: 2}}>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>ИМТ: {!isNaN(bmi) ?
                    <span style={{color: categoryColor}}>{bmi} ({category})</span> : '[Ошибка сервера]'}</Typography>
            </Box>
            <Box sx={{border: '1px solid #7AA73E', borderRadius: '4px', p: 2}}>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                    Наличие болезни: {data.is_weak === "да" ? " болезнь имеется" : "болезнь отсутствует"}
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                    Вероятность развития болезни: {Number(data.score * 100).toFixed(1)}%
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                    Индекс апноэ для TST: {Number(data.ai).toFixed(1)}
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                    Индекс гипопноэ для TST: {Number(data.hi).toFixed(1)}
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                    Индекс пноэ-гипопноэ для TST: {Number(data.ahi).toFixed(1)}
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                    Длительность записи: {Number(data.hour_time).toFixed(1)} ч.
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="outlined" color="secondary" onClick={generate} fullWidth>
                            Сохранить документ
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="outlined" color="secondary" onClick={generate2} fullWidth>
                            Распечатать документ
                        </Button>
                    </Grid>
                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth*/}
                    {/*            sx={{height: isMobile ? '48px' : '56px'}}>*/}
                    {/*        Начать исследование*/}
                    {/*    </Button>*/}
                    {/*</Grid>*/}
                </Grid>
                {/*{loading && <CircularProgress/>}*/}
            </Box>
        </Paper>

    );
};

export default Report;
