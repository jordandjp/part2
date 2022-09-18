import Input from "./Input";

const PersonForm = ({
  nameValue,
  nameOnChange,
  numberValue,
  numberOnChange,
  handlePhonebookAdd,
}) => (
  <form>
    <Input label={"name"} value={nameValue} onChange={nameOnChange} />
    <Input label={"number"} value={numberValue} onChange={numberOnChange} />
    <div>
      <button type="submit" onClick={handlePhonebookAdd}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
