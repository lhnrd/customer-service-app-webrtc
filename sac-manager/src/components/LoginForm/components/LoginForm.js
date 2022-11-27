import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Box, FormField, TextInput, Text } from 'grommet';

import * as actions from 'src/actions/auth';
import { validateForm } from '../utils/validation';

const LoginForm = ({ authMessage, onSubmit }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={validateForm}
    onSubmit={onSubmit}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid,
    }) => (
      <form onSubmit={handleSubmit}>
        <FormField
          htmlFor="email-input"
          label="E-mail"
          placeholder="email@email.com"
          error={touched.email && errors.email}
        >
          <TextInput
            id="email-input"
            name="email"
            type="email"
            placeholder="email@email.com"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            required
          />
        </FormField>
        <FormField
          htmlFor="password-input"
          label="Password"
          error={touched.password && errors.password}
        >
          <TextInput
            id="password-input"
            name="password"
            type="password"
            placeholder="******"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            required
          />
        </FormField>
        {authMessage && (
          <Box margin={{ left: 'small', right: 'small' }}>
            <Text color="status-error">{authMessage}</Text>
          </Box>
        )}
        <Button
          color="neutral-3"
          disabled={!isValid || isSubmitting}
          label="Log in"
          type="submit"
          margin={{ top: 'medium' }}
          fill
          primary
        />
      </form>
    )}
  </Formik>
);

LoginForm.propTypes = {
  authMessage: PropTypes.string,
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  authMessage: null,
  onSubmit: null,
};

const mapStateToProps = state => ({
  authMessage: state.auth.errorMessage,
});

const mapDispatchToProps = {
  authenticate: actions.authenticate,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onSubmit: ({ authenticate }) => (values, { setSubmitting }) => {
      authenticate(values);
      setSubmitting(false);
    },
  })
)(LoginForm);
