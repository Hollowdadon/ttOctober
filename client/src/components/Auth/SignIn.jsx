import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '480px',
    margin: '30vh auto',
    padding: '1rem',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button: {
    width: '100%',
    margin: '8px 16px 1rem 8px',
    height: '3.2rem'
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { auth, accessToken } = await response.json();

    if (auth) {
      localStorage.setItem('token', accessToken);

      // reset form
      setEmail('');
      setPassword('');

      // redirect to admin page with page regresh to clear old state
      return window.location = '/admin';
    }

    // TODO: show errors
    console.error('invalid email/password');
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='email'
        label='Email'
        variant='outlined'
        type='email'
        name='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder='user@gmail.com'
        required
        autoFocus
      />
      <TextField
        id='password'
        label='Password'
        variant='outlined'
        type='password'
        name='password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        helperText='Min 8 characters'
      />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        size='large'
        className={classes.button}
      >
        Sign In
      </Button>
      <Typography align='center'>Don't have an account? <Link to='/signup'>Sign up</Link></Typography> 
    </form>
  );
};

export default SignIn;
