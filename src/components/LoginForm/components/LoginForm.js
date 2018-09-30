import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Formik } from 'formik';

import { validateForm, validationProps } from '../utils/validation';

const FormItem = Form.Item;

const LoginForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={validateForm}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
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

export default LoginForm;
