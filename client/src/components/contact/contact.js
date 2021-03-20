import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

const Basic = () => (
  <div>
    <h1>Contact an ambassador</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form id>
        <Field id="fullName" name="fullName" placeholder="Kevin Smith" />

        <Field id="email" name="email" placeholder="Email" type="email"/>

        <Field
          id="feedback"
          name="feedback"
          placeholder="What can we help you with?"
        />
        <button type="submit">Send</button>
      </Form>
    </Formik>
  </div>
);
export default Basic;
// ReactDOM.render(<Basic />, document.getElementById('root'));
