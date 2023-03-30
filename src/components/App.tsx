import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import TableTags from "./TableTags";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<string>("");
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const notes: string | null = localStorage.getItem("notes");
    const tags: string | null = localStorage.getItem("tags");

    if (notes) {
      setNotes(JSON.parse(notes));
    }

    if (tags) {
      setTags(JSON.parse(tags));
    }
  }, []);

  useEffect(() => {
    if (notes.length) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    if (tags.length) {
      localStorage.setItem("tags", JSON.stringify(tags));
    }
  }, [tags]);

  const removeNote = (index: number): void => {
    const newNotes = notes.filter((character, i) => {
      return i !== index;
    });
    setNotes(newNotes);
  };

  const removeTag = (index: number): void => {
    const newTags = tags.filter((character, i) => {
      return i !== index;
    });
    setTags(newTags);
  };

  const addNote = (): void => {
    if (activeNote.length === 0) {
      setError("Type your text here...");
    } else {
      if (activeNoteIndex !== null) {
        // change note
        if (activeNote) {
          const newNotes = notes.map((item, index) => {
            if (index === activeNoteIndex) {
              const tagList = getAndSaveTags();
              return { name: activeNote, tag: tagList };
            } else {
              return item;
            }
          });
          setNotes(newNotes);
          setActiveNoteIndex(null);
          setActiveNote("");
        } else {
          setError("Type your text here...");
        }
      } else {
        // add new note
        const tagList = getAndSaveTags();
        setNotes([...notes, { name: activeNote, tag: tagList }]);
        //console.log('tags ' + tags)
        setActiveNote("");
        setError("");
      }
    }
  };

  const handleChangeNote = (noteIndex: number): void => {
    const currentNote = notes.find((item, index) => index === noteIndex);
    if (currentNote) {
      setActiveNote(currentNote.name);
      setActiveNoteIndex(noteIndex);
    }
  };

  const getAndSaveTags = (): string => {
    const tagList: string[] | null =
      JSON.stringify(activeNote).match(/(#[a-z\d-]+)/gi);
    if (tagList && tagList.length !== 0) {
      setTags([...new Set([...tags, ...tagList])]);
      return tagList.join();
    } else {
      return "#default";
    }
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <div className="container">
        <Table
          notes={notes}
          removeNote={removeNote}
          changeNote={handleChangeNote}
        />
        <Form
          error={error}
          addNote={addNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <TableTags tags={tags} removeTag={removeTag} />
      </div>
    </div>
  );
};

export default App;
