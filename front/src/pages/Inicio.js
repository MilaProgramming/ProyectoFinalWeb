import React from 'react';
//import {Typography, Container, TextField, Button } from '@mui/material';
import Navbar from '../components/NavBar';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import UserProfileCard from '../components/UserProfileCard';
import InformacionAcademica from '../components/InformacionAcademica';
import SpecialCapability from '../components/SpecialCapability';
import BankInformation from '../components/BankInformation';
import ExperienciaLaboral from '../components/ExperienciaLaboral';
import ContactoEmergencia from '../components/ContactoEmergencia';
import Idioma from '../components/Idioma';
import Publicacion from '../components/Publicacion';
import Curso from '../components/Curso';
import Formatos from '../components/Formatos';
const user = {
  name: 'Juana Banana',
  email: 'johndoe@example.com',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/5231/5231019.png',
  country: 'USA',
  role: 'admin',
};

const countries = ['USA', 'Canada', 'UK', 'Australia'];
const tipo_doc = ['Cédula','Pasaporte'];
const roles = ['admin', 'user', 'guest'];


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const CurriculumVitae = () => {
  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return (

    <div >
      <Navbar />

      <Box sx={{ bgcolor: '#C8D6C9', width: "80%", marginTop:'8rem', marginLeft:'15%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor= 'black'
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          inkBarStyle={{background: 'black'}}
          sx={{
            backgroundColor: '#27662B',}}
          
          TabIndicatorProps = {{
            sx:{
              backgroundColor: 'Black',}

          }}
        >
          <Tab label="Información Personal" {...a11yProps(0)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Información Académica" {...a11yProps(1)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Capacidades Especiales" {...a11yProps(2)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Información Bancaria" {...a11yProps(3)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Experiencia Laboral" {...a11yProps(4)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Contacto de Emergencia" {...a11yProps(5)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Idioma" {...a11yProps(6)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Publicaciones Académicas" {...a11yProps(7)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="Cursos" {...a11yProps(8)} sx={{fontFamily: 'poppins, sans-serif'}}/>
          <Tab label="..." {...a11yProps(9)} sx={{fontFamily: 'poppins, sans-serif'}}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserProfileCard user={user} countries={countries} roles={roles} tipo_doc={tipo_doc} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <InformacionAcademica/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <SpecialCapability/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <BankInformation/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        <ExperienciaLaboral/>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
        <ContactoEmergencia/>
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
        <Idioma/>
        </TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}>
        <Publicacion/>
        </TabPanel>
        <TabPanel value={value} index={8} dir={theme.direction}>
        <Curso/>
        </TabPanel>
        <TabPanel value={value} index={9} dir={theme.direction}>
          <Formatos/>
        </TabPanel>
      </SwipeableViews>
    </Box>


    </div>
  );
};

export default CurriculumVitae;