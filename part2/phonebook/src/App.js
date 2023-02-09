import { useEffect, useState } from "react";
import contactService from "./services/contacts";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    contactService.getAll()
                  .then(initialContacts => setPersons(initialContacts))
                  .catch(err => console.log(err));
  }, []);

  const nameExists = name => persons.some(person => person.name === name);

  const handleSubmit = e => {
    e.preventDefault();

    if (nameExists(newName)) {
      let confirmation = window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`);
      if (!confirmation) return;

      // Relies on the uniqueness of the names
      let contact = persons.find(person => person.name === newName);
      let updatedContact = { ...contact, number: newNum };

      contactService.update(updatedContact)
                    .then(_ => {
                      let updatedPersons = persons.map(person => {
                        return (person.id === contact.id ? updatedContact : person);
                      });

                      setPersons(updatedPersons);
                      setNotification({
                        message: `Updated ${contact.name}'s number.`,
                        type: "success"
                      });
                      setTimeout(() => setNotification({}), 5000);
                    })
                    .catch(err => {
                      console.log(err);
                      setNotification({
                        message: `${contact.name} has been removed from your contacts.`,
                        type: "error"
                      });
                      setPersons(persons.filter(person => person.id !== contact.id));
                      setTimeout(() => setNotification({}), 5000);
                    });
    } else {
      let contactData = {
        name: newName,
        number: newNum  
      };
  
      contactService.create(contactData)
                    .then(newContact => {
                      setPersons(persons.concat(newContact));
                      setNotification({
                        message: `Added ${contactData.name} to the phonebook.`,
                        type: "success"
                      });
                      setTimeout(() => setNotification({}), 5000);
                    })
                    .catch(err => console.log(err));
    }
  };

  const deleteContact = id => {
    let contact = persons.find(person => person.id === id);
    if (!contact) {
      alert(`Contact wiht id ${id} has already been deleted.`);
      setPersons(persons.filter(person => person.id !== id));
    } else if (!window.confirm(`Delete ${contact.name}?`)) return;

    contactService.deleteContact(id)
                  .then(_ => setPersons(persons.filter(person => person.id !== id)))
                  .catch(err => console.log(err));
  }

  const handleFiltering = e => setFilterVal(e.target.value);
  const handleNameInput = e => setNewName(e.target.value);
  const handleNumInput = e => setNewNum(e.target.value);

  const filteredList = filterVal ? persons.filter(person => {
    return person.name.toLowerCase().startsWith(filterVal.toLowerCase());
  }) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Input name="filter_value" label="Filter shown with" val={filterVal} changeHandler={handleFiltering} />
      <h2>Add contact</h2>
      <ContactForm handleSubmit={handleSubmit} handleNameInput={handleNameInput}
                   handleNumInput={handleNumInput} newName={newName} newNum={newNum} />
      <h2>Numbers</h2>
      <Contacts filteredList={filteredList} deleteContact={deleteContact} />
    </div>
  );
}

const Contacts = ({ filteredList, deleteContact }) => (
  <ul>
    {filteredList.map(({ id, name, number }) => {
        return <ContactInfo key={id} name={name} number={number} deleteContact={() => deleteContact(id)} />
    })}
  </ul>
);

const ContactInfo = props => (
  <li>
    {props.name} {props.number}
    <button onClick={props.deleteContact}>delete</button>
  </li>
);

const ContactForm = props => (
  <form onSubmit={props.handleSubmit}>
  <div>
    <Input name="full_name" label="Full Name" val={props.newName} changeHandler={props.handleNameInput} />
    <Input name="phone" label="Phone Number" val={props.newNum} changeHandler={props.handleNumInput} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
);

const Input = props => (
  <p>
    <label htmlFor={props.name}>{props.label}: </label>
    <input name={props.name} value={props.val} onChange={props.changeHandler} /> 
  </p>
);

const Notification = ({ notification }) => {
  if (!notification.message) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}

export default App;