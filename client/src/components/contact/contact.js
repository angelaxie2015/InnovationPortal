import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button
} from '@material-ui/core';


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
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600, backgroundColor: '#dadada', marginTop: '10%', borderRadius: '15px'}}>
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
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="firstName"
                    component={TextField}
                    type="text"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="lastName"
                    component={TextField}
                    type="text"
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="feedback"
                    required
                    component={TextField}
                    multiline
                    label="What can we help you with?"
                  />
                </Grid>
               
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
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default MyForm;
//ReactDOM.render(<App />, document.querySelector('#root'));