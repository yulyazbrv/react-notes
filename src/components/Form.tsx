import React from "react";

interface FormProps {
  addNote: () => void;
  error: string;
  activeNote: string;
  setActiveNote: (a: string) => void;
}

const Form = (props: FormProps) => {
  const { addNote, error, activeNote, setActiveNote } = props;

  return (
    <form>
      <label htmlFor="name">Add note</label>
      <input
        type="text"
        name="addNote"
        style={{ border: error ? "2px solid red" : "1px solid black" }}
        placeholder={error}
        id="name"
        value={activeNote}
        onChange={(e) => setActiveNote(e.target.value)}
      ></input>

      <input type="button" value="Submit" onClick={addNote}></input>
    </form>
  );
};
export default Form;
