import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  InputAdornment,
  Container
} from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';


const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const reset = (values) => {
  values.firstName = '';
  values.lastName = '';
  values.email = '';
  values.feedback = '';
  window.alert('Testing on reset')

  return values;
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.feedback) {
    errors.feedback = 'Required';
  }
  return errors;
};

function MyForm() {
  return (
    <Grid container xs={12} alignContent="center" justify="center" style= {{width: "50vh", margin: "auto"}}>
    <Paper elevation={3} style={{padding: 20}}>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Contact an ambassador
      </Typography>
      <Typography paragraph align="center">
        Fill out the following fields to get in contact with an ambassador.
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        reset={reset}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Field
                    fullWidth
                    required
                    variant="filled"
                    name="firstName"
                    component={TextField}
                    type="text"
                    label="First Name"
                    style={{ marginBottom: 8}}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                        </InputAdornment>
                      ),
                      }}
                  />
              <Field
                    fullWidth
                    required
                    variant="filled"
                    name="lastName"
                    component={TextField}
                    type="text"
                    label="Last Name"
                    style={{ marginBottom: 8 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
              />
              <Field
                    name="email"
                    fullWidth
                    required
                    variant="filled"
                    component={TextField}
                    type="email"
                    label="Email"
                    style={{ marginBottom: 8 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <EmailOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                />
                <Field
                    fullWidth
                    name="feedback"
                    required
                    variant="filled"
                    style={{ marginBottom: 8 }}
                    component={TextField}
                    multiline
                    label="What can we help you with?"
                />    
               
               <Grid container item xs={12} spacing={2}>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button item style={{backgroundColor: '#62d98a', color: 'black'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
                </Grid>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Paper>
    </Grid>
  );
}

export default MyForm;
//ReactDOM.render(<App />, document.querySelector('#root'));
