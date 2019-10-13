import React from 'react';
import { Modal, Form, Divider, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { FormInput } from '../../../../components/formElements';

const Login = (props) => {
    const LOGIN_FORM = useSelector(state => state.authStore.LOGIN_FORM);
    const dispatch = useDispatch();
    return (
      <Modal open size="mini" onClose={props.closeModal} closeIcon closeOnDimmerClick>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <Form>
                    {
                    Object.keys(LOGIN_FORM.fields).map(field => (
                        <FormInput
                            name={field}
                            fieldData={LOGIN_FORM.fields[field]}
                            onChange={(e, result) => dispatch({ type: 'FORM_CHANGE', field, event: e, result, form: 'LOGIN_FORM' })}
                        />
                    ))
                    }
                    <Divider hidden />
                    <Button content="Login"/>
                </Form>
                <p>Not yet a user? {'  '}<Link to="/auth/register">Create New Account Here!!</Link></p>
            </Modal.Content>
        </Modal>
    );
}
export default Login;