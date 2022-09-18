import PersonDetail from "./PersonDetail";

const Persons = ({ persons, handlePhonebookDelete }) =>
  persons.map((person) => (
    <PersonDetail
      person={person}
      key={person.name}
      handlePhonebookDelete={handlePhonebookDelete(person)}
    />
  ));

export default Persons;
