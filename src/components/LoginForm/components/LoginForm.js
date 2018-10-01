import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Formik } from 'formik';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import * as actions from 'src/actions/auth';
import { validateForm, validationProps } from '../utils/validation';

const FormItem = Form.Item;

const LoginForm = ({ onSubmit }) => (
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
      <Form onSubmit={handleSubmit}>
        <FormItem
          colon={false}
          label="E-mail"
          {...validationProps('email', errors, touched)}
        >
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            type="email"
            placeholder="email@email.com"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
        </FormItem>
        <FormItem
          colon={false}
          label="Password"
          {...validationProps('password', errors, touched)}
        >
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            type="password"
            placeholder="*******"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
        </FormItem>
        <FormItem>
          <Button
            disabled={!isValid || isSubmitting}
            type="primary"
            htmlType="submit"
            block
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    )}
  </Formik>
);

const mapDispatchToProps = {
  authenticate: actions.authenticate,
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withHandlers({
    onSubmit: ({ authenticate }) => (values, { setSubmitting }) => {
      authenticate(values);
      setSubmitting(false);
    },
  })
)(LoginForm);
