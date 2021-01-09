import { useState, useEffect } from 'react';

import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
import '../App/App.css';
const shortid = require('shortid');

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');
  ///////////////////////////////////////////
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //////////////////////////////////////////
  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const isNameContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    const isNumberContacts = contacts.find(
      contact => contact.number === number,
    );

    isNameContacts || isNumberContacts
      ? alert(`${name}or ${number} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);

    // if (isNameContacts) {
    //   alert(`${name} is already in contacts`);
    // } else if (name.trim() === '' || number.trim() === '') {
    //   alert('You cannot add such a name and number');
    // } else if (isNumberContacts) {
    //   alert(`${number} is alread in contacts`);
    // } else {
    //   const contact = {
    //     id: shortid.generate(),
    //     name,
    //     number,
    //   };
    //   //распыляет в массив
    //   setContacts([contact, ...contacts]);
    // }
  };

  /////////////////////////////
  const onChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  /////////////////////////////////////
  const visibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };
  //////////////////////////////////удаление контактов
  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <Form onSubmit={addContact} />

      <h2 className="title">Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} onChange={onChangeFilter} />
      ) : (
        <Notification message="You have no contacts !!" />
      )}
      <ContactList
        contacts={visibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
