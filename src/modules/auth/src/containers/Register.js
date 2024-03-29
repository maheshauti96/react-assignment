import React, { useState } from 'react';
import { Modal, Form, Button, Divider } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { FormInput } from '../../../../components/formElements';
import Auth from '../../../../api/auth';
import Database from '../../../../api/dataBase';
import formHandler from '../../../../services/utilites/src/formHandler';

const Register = (props) => {
    const [loading, setLoader] = useState(false);
    const [error, setError] = useState('');
    const REGISTER_FORM = useSelector(state => state.authStore.REGISTER_FORM, () => {});
    const dispatch = useDispatch();
    const register = async () => {
        const payload = formHandler.EvaluateFormData({ form: REGISTER_FORM });
        setLoader(true);
        try {
            const res = await Auth.register(payload);
            console.log(res);
            await Database.set('users', { ...payload, uid: res.user.uid });
            props.success();
        } catch (error) {
            setError(error.message);
        }
        setLoader(false);
    }
    return (
            <Modal open size="mini" onClose={props.closeModal} closeIcon closeOnDimmerClick>
                <Modal.Header className="center-align">Sign Up</Modal.Header>
                <Modal.Content>
                    <Form >
                        {
                        Object.keys(REGISTER_FORM.fields).map(field => (
                            <FormInput
                                name={field}
                                fieldData={REGISTER_FORM.fields[field]}
                                onChange={(e, result) => dispatch({ type: 'FORM_CHANGE', field, event: e, result, form: 'REGISTER_FORM' })}
                            />
                        ))
                        }
                        <Divider hidden />
                        <Button loading={loading} disabled={!REGISTER_FORM.meta.isValid} content="Register" onClick={register} />
                        {error &&
                        (<p style={{ color: 'red' }}>{error}</p>)
                        }
                    </Form>
                </Modal.Content>
            </Modal>
          );
}

export default Register;