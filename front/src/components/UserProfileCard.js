// UserProfileCard.js
import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        fontFamily: 'poppins, sans-serif',
      },
    
      formContainer: {
        flex: 1,
        padding: '1rem 2rem',
      },
      
      avatarContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        flexDirection: 'column',
        borderRadius: '50%',
        width: "100%",
        height: "100%",
      },
    
      avatar: {
        width: "100%",
        height: "100%",
      },
}));

const UserProfileCard = ({ user, countries, roles }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        
        <div className={classes.avatarContainer}>
            <Avatar className={classes.avatar} alt={user.name} src={user.avatarUrl} />
            <Typography variant="h6" align="center">
            {user.name}
            </Typography>
        </div> 

      <div className={classes.formContainer}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={user.name}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={user.email}
        />
        {/* Add more personal data fields here */}
        <div className={classes.comboContainer}>
          <Typography variant="subtitle1">Country:</Typography>
          <Autocomplete
            options={countries}
            defaultValue={user.country}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </div>
        <div className={classes.comboContainer}>
          <Typography variant="subtitle1">Role:</Typography>
          <Select
            value={user.role}
            variant="outlined"
            fullWidth
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
