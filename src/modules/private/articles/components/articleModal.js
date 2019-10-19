import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import { Modal, Button, Header } from 'semantic-ui-react'
import { HtmlEditor, FormInput } from '../../../../components/formElements'
import withStore from '../../../../components/HOCs/src/withStore';
import dataBase from '../../../../api/dataBase';
import formHandler from '../../../../services/utilites/src/formHandler';
import moment from 'moment';

const ArticleModal = (props) => {
    const [loading, setLoader] = useState('');
    const closeModal = () => props.history.push('/app/articles');
    const { ARTICLE_FORM, formChange } = props.articleStore;
    const save = async (status='DRAFT') => {
      setLoader(status);
      const uid = localStorage.getItem('loggedInUserId');
      await dataBase.push('articles',{uid, lastUpdatedDate: moment().format('LL'), ...formHandler.EvaluateFormData({form: ARTICLE_FORM}), status});
      setLoader('');     
      if (status === 'PUBLISHED') {
        closeModal();
      } 
    }
    console.log('ARTICLE_FORM', ARTICLE_FORM);
    return (
        <Modal closeIcon open size="fullscreen" onClose={closeModal} >
        <Modal.Header>Create New Article</Modal.Header>
        <Modal.Content>
         <Header as="h4">Title</Header>
         <FormInput
          className ='title'
          size='large'
          hideTitle
          fieldData={ARTICLE_FORM.fields.title}
          onChange={(e, result) => formChange({field: 'title', event: e, result, form: 'ARTICLE_FORM'})}
          />
         <br />
         <Header as="h4">Description</Header>
         <HtmlEditor
          onChange={(result) => formChange({field: 'description', result, form: 'ARTICLE_FORM'})}         
         />
        </Modal.Content>
        <Modal.Actions>
          <Button color='red'>
            cancel
          </Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content="Save"
            loading={loading==='DRAFT'}
            onClick={() => save()}
            disabled={!ARTICLE_FORM.meta.isValid}
          />
          <Button
            color="blue"
            icon='checkmark'
            labelPosition='right'
            content="Publish"
            loading={loading==='PUBLISHED'}
            onClick={() => save('PUBLISHED')}
            disabled={!ARTICLE_FORM.meta.isValid}
          />
        </Modal.Actions>
      </Modal>
    )
}

export default withRouter(withStore(ArticleModal, 'articleStore'))