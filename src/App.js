import { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";

function App() {

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      const updatedNotes = savedNotes.map(note => ({
        ...note,
        pinned: note.pinned || false,
        color: note.color || "bg-yellow-200"
      }));
      setNotes(updatedNotes);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, newText) => {
    const updated = notes.map(note =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updated);
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className={`min-h-screen p-10 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-full"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className="text-4xl font-bold text-center mb-6">
        React Notes App
      </h1>

      <SearchBar setSearch={setSearch} />

      <AddNote addNote={addNote} />

      <NotesList
        notes={filteredNotes}
        deleteNote={deleteNote}
        editNote={editNote}
        togglePin={togglePin}
        setNotes={setNotes}
      />

    </div>

  );
}

export default App;