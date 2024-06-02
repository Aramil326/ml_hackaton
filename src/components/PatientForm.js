import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

const PatientForm = ({setPatientData}) => {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [form, setForm] = useState({
        name: '',
        gender: 'Мужской',
        height: '',
        weight: '',
        age: '',
        pulse: '',
        pressure: ''
    });

    const navigate = useNavigate();

    const [valid, setValid] = useState({
        name: false,
        gender: true,
        height: true,
        weight: true,
        age: true,
        pulse: true,
        pressure: true
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        let isValid = true;

        switch (name) {
            case 'name':
                isValid = /^[а-яА-ЯёЁa-zA-Z]+\s[а-яА-ЯёЁa-zA-Z]+\s[а-яА-ЯёЁa-zA-Z]+$/.test(value);
                break;
            case 'gender':
                isValid = value !== '';
                break;
            case 'height':
                isValid = value >= 50 && value <= 250;
                break;
            case 'weight':
                isValid = value >= 10 && value <= 500;
                break;
            case 'age':
                isValid = value >= 0 && value <= 150;
                break;
            case 'pulse':
                isValid = value >= 20 && value <= 200;
                break;
            case 'pressure':
                isValid = /^\d+\/\d+$/.test(value);
                break;
            default:
                break;
        }

        setForm({...form, [name]: value});
        setValid({...valid, [name]: isValid});
    };

    const allValid = Object.values(valid).every(v => v);

    const handleSubmit = () => {
        setPatientData(form);
        navigate('/upload');
        console.log(allValid)
    };

    const prevStep = () => navigate(-1);

    return (
        <Paper elevation={3} sx={{p: 3, mt: 3}}>
            <Typography variant="h5" gutterBottom>
                Данные о пациенте
            </Typography>
            <Box component="form">
                <TextField
                    fullWidth
                    margin="normal"
                    label="ФИО"
                    name="name"
                    onChange={handleChange}
                    error={!valid.name}
                    helperText={!valid.name && "ФИО должно состоять из трех слов разделенных пробелом"}
                />
                <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
                    <FormControlLabel value="Мужской" control={<Radio/>} label="Мужской"/>
                    <FormControlLabel value="Женский" control={<Radio/>} label="Женский"/>
                </RadioGroup>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Рост"
                    name="height"
                    type="number"
                    onChange={handleChange}
                    error={!valid.height}
                    helperText={!valid.height && "Рост должен быть в пределах от 50 до 250"}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Вес"
                    name="weight"
                    type="number"
                    onChange={handleChange}
                    error={!valid.weight}
                    helperText={!valid.weight && "Вес должен быть в пределах от 0 до 500"}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Возраст"
                    name="age"
                    type="number"
                    onChange={handleChange}
                    error={!valid.age}
                    helperText={!valid.age && "Возраст должен быть в пределах от 0 до 150"}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Средний пульс во время исследования"
                    name="pulse"
                    type="number"
                    onChange={handleChange}
                    error={!valid.pulse}
                    helperText={!valid.pulse && "Средний пульс должен быть в пределах от 20 до 200"}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Давление во время исследования"
                    name="pressure"
                    onChange={handleChange}
                    error={!valid.pressure}
                    helperText={!valid.pressure && "Давление должно быть в формате 'число/число'"}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={prevStep}
                                fullWidth
                                sx={{height: isMobile ? '48px' : '56px'}}
                            >
                                Назад
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                fullWidth
                                disabled={!allValid}
                                sx={{height: isMobile ? '48px' : '56px',
                                color: 'white'}}
                            >
                                Сохранить данные пациента
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    );
};

export default PatientForm;