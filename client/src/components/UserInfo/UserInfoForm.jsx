import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '480px',
    margin: '15vh auto',
    padding: '1rem',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button: {
    width: '100%',
    margin: '8px 16px 1rem 8px',
    height: '3.2rem',
  },
}));

const UserInfoForm = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [ssn, setSsn] = useState('');
  const [address, setAddress] = useState('');

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setSsn('');
    setAddress('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: add validation to input data
    const userInfoDTO = {
      firstName,
      lastName,
      phone,
      address,
      ssn,
    };

    console.log(userInfoDTO);

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfoDTO),
    });

    const { ok } = response;
    if (ok) {
      clearForm();
      // TODO: redirect user?
    } else {
      // TODO: show errors
      const errorResponse = await response.json();
      console.error(errorResponse);
    }
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='firstName'
        label='First name'
        variant='outlined'
        type='text'
        name='firstName'
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        placeholder='John'
        required
        autoFocus
      />
      <TextField
        id='lastName'
        label='Last name'
        variant='outlined'
        type='text'
        name='lastName'
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        placeholder='Doe'
        required
      />
      <TextField
        id='phone'
        label='Phone'
        variant='outlined'
        type='tel'
        name='phone'
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        required
      />
      <TextField
        id='ssn'
        label='SSN'
        variant='outlined'
        type='text'
        name='ssn'
        value={ssn}
        onChange={(event) => setSsn(event.target.value)}
        placeholder='000-00-0000'
        helperText='Format: 000-00-0000'
        required
      />
      <TextField
        id='address'
        label='Address'
        variant='outlined'
        type='text'
        multiline
        name='address'
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        placeholder='Full Address'
        title='Address'
        required
      />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        size='large'
        className={classes.button}
      >
        Add user info
      </Button>
    </form>
  );
};

export default UserInfoForm;
