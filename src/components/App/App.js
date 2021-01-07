import React, { Component } from 'react';

import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
import '../App/App.css';
const shortid = require('shortid');

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //////////////////////////////////////////////////
  componentDidMount() {
    console.log('App componentDidMount ');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  /////////////////////////////////////////////////////
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate ');

    if (this.state.contacts !== prevState.contacts) {
      console.log('обновилось поле contacts, записываю contacts в хранилище');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  /////////////////////////////////////////////////
  addContact = ({ name, number }) => {
    const isNameContacts = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    const isNumberContacts = this.state.contacts.some(
      contact => contact.number === number,
    );

    if (isNameContacts) {
      alert(`${name} is already in contacts`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert('You cannot add such a name and number');
    } else if (isNumberContacts) {
      alert(`${number} is alread in contacts`);
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      //распыляет в массив
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  //удаление контактов
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  /////////////////////////////////////////////////
  render() {
    const visibleContacts = this.visibleContacts();

    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2 className="title">Contacts</h2>
        {visibleContacts.length > 0 ? (
          <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        ) : (
          <Notification message="You have no contacts !!" />
        )}
        <ContactList
          contacts={this.visibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
