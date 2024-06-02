import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import PatientForm from './components/PatientForm';
import UploadData from './components/UploadData';
import Report from './components/Report';
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './components/Header';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7AA73E',
        },
        secondary: {
            main: '#425F33',
        },
        background: {
            default: '#FEFEFE',
        },
    },
});

function App() {
    const [patientData, setPatientData] = useState({});
    const [files, setFiles] = useState([]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header />
            <Container style={{ backgroundImage: 'url(./assets/background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<WelcomeScreen/>}/>
                        <Route path="/form" element={<PatientForm setPatientData={setPatientData}/>}/>
                        <Route path="/upload" element={<UploadData setFiles={setFiles}/>}/>
                        <Route path="/report" element={<Report patientData={patientData} files={files}/>}/>
                    </Routes>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

export default App;
