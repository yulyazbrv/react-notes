import React, { useState } from "react";

interface TableProps {
  notes: Note[];
  removeNote: (index: number) => void;
  changeNote: (index: number) => void;
}

const Table = (props: TableProps) => {
  const { notes, removeNote, changeNote } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredNotes = notes.filter((note) => {
    return note.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  return (
    <table>
      <TableHeader setSearchValue={setSearchValue}></TableHeader>
      <TableBody
        filteredNotes={filteredNotes}
        removeNote={removeNote}
        changeNote={changeNote}
      ></TableBody>
    </table>
  );
};

interface TableHeaderProps {
  setSearchValue: (a: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  const { setSearchValue } = props;

  return (
    <thead>
      <tr>
        <th>
          <div className="header">
            <p>Notes</p>
          </div>
        </th>
        <th>
          <div className="header">
            <p>Tags</p>
            <input
              className="search"
              type="search"
              placeholder="Sesrch here..."
              onChange={(event) => setSearchValue(event.target.value)}
            ></input>
          </div>
        </th>
      </tr>
    </thead>
  );
};

interface TableBodyProps {
  removeNote: (index: number) => void;
  filteredNotes: Note[];
  changeNote: (index: number) => void;
}

const TableBody = (props: TableBodyProps) => {
  const { removeNote, filteredNotes, changeNote } = props;

  const replaceTags = (match: string): string => {
    return `<span class='selected-tag'>${match}</span>`;
  };

  const rows = filteredNotes.map((row, index) => {
    return (
      <tr key={index}>
        <td
          dangerouslySetInnerHTML={{
            __html: row.name.replace(/(#[a-z\d-]+)/gi, replaceTags),
          }}
        ></td>
        <td>{row.tag}</td>
        <td>
          <button onClick={() => removeNote(index)}>Delete</button>
        </td>
        <td>
          <button onClick={() => changeNote(index)}>Change</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
