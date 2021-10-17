import axios from 'axios';
import contactsActions from './contacts-actions';

const fetchContacts = () => async dispatch => {
  dispatch(contactsActions.fetchContactRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(contactsActions.fetchContactSuccess(data));
  } catch (error) {
    dispatch(contactsActions.fetchContactError(error.message));
  }
};

const addContact = text => async dispatch => {
  dispatch(contactsActions.addContactRequest());

  try {
    const { data } = await axios.post('/contacts', text);
    dispatch(contactsActions.addContactSuccess(data));
  } catch (error) {
    dispatch(contactsActions.addContactError(error.message));
  }
};

const removeContact = contactId => async dispatch => {
  dispatch(contactsActions.removeContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);
    dispatch(contactsActions.removeContactSuccess(contactId));
  } catch (error) {
    dispatch(contactsActions.removeContactError(error.message));
  }
};

const contactsOperations = { addContact, removeContact, fetchContacts };

export default contactsOperations;
