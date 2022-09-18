const PersonDetail = ({ person, handlePhonebookDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={handlePhonebookDelete}>delete</button>
  </div>
);

export default PersonDetail;
