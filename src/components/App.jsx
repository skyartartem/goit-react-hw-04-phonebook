import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const CONTACTS = 'contacts';
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const savedContacts = localStorage.getItem(CONTACTS);
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts)
    }
    else { setContacts(initialContacts);}
  },[]);
  // componentDidMount() {
  //   const savedContacts = localStorage.getItem(CONTACTS);
  //   if (savedContacts !== null) {
  //     const parsedContacts = JSON.parse(savedContacts);
  //     this.setState({contacts: parsedContacts})
  //   }
  //   else { this.setState({ contacts: initialContacts });}
  // }

  useEffect(() => {
    if (!localStorage.getItem(CONTACTS)){return}
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem(
  //       CONTACTS,
  //       JSON.stringify(this.state.contacts)
  //     );
  //   }
  // }

  const onChangeInput = evt => {
    setFilter(evt.currentTarget.value);
  };

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is alredy in contacts`);
    } else {
      setContacts(old => {
        const list = [...old];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return  list ;
      });
    }
  };

  const filterFu = () => {
    // const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const delContact = id => {
    // const { contacts } = this.state;
    const filtred = contacts.filter(item => item.id !== id);
    setContacts( filtred );
  };

  return (
    <div className={css.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeInput={onChangeInput} />
      <ContactList delContact={delContact} contacts={filterFu()} />
    </div>
  );
};
