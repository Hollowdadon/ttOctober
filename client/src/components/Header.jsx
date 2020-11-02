import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: theme.palette.background.paper
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location = '/'; // to refresh page, clear state and redirect to home
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' className={classes.title}>
            <Typography variant='h6' >
              SomeApp
            </Typography>
          </Link>

          {Object.keys(user).length ? (
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color='inherit' href='/signup'>
                Sign up
              </Button>
              <Button color='inherit' href='/signin'>
                Sign in
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
