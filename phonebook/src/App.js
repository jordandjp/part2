import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const NOTIFICATION_SUCCESS = "success";
const NOTIFICATION_ERROR = "error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const showNotificationMessage = (message, type, timeout = 5000) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage("");
      setNotificationType("");
    }, timeout);
  };

  const handlePhonebookAdd = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(({ name }) => name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            showNotificationMessage(
              `Updated ${returnedPerson.name}`,
              NOTIFICATION_SUCCESS
            );
          })
          .catch((error) => {
            showNotificationMessage(
              `Information of ${existingPerson.name} has already been removed from server`,
              NOTIFICATION_ERROR
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
      return;
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      showNotificationMessage(
        `Added ${returnedPerson.name}`,
        NOTIFICATION_SUCCESS
      );
    });
  };

  const handlePhonebookDelete = (personObj) => () => {
    if (window.confirm(`Delete ${personObj.name} ?`)) {
      personService
        .remove(personObj.id)
        .then(
          setPersons(persons.filter((person) => person.id !== personObj.id))
        );
      showNotificationMessage(
        `Deleted ${personObj.name}`,
        NOTIFICATION_SUCCESS
      );
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        label={"filter shown with"}
        value={search}
        onChange={handleSearch}
      />
      <h3>Add a new</h3>
      <PersonForm
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handlePhoneNumberChange}
        handlePhonebookAdd={handlePhonebookAdd}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        handlePhonebookDelete={handlePhonebookDelete}
      />
      <Notification message={notificationMessage} type={notificationType} />
    </div>
  );
};

export default App;
