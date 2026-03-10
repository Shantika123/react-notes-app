import { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";

function App() {

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false); // ⭐ Dark Mode

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

  // ⭐ Add note with color
  const addNote = (text, color) => {
    const newNote = {
      id: Date.now(),
      text,
      color,
      pinned: false
    };

    setNotes([...notes, newNote]);
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

  // 📌 Toggle pin
  const togglePin = (id) => {

    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );

    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  // 📌 Sort pinned notes first
  const sortedNotes = [...filteredNotes].sort((a, b) => b.pinned - a.pinned);

  return (

    <div className={`min-h-screen p-10 ${darkMode ? "bg-gray-900 text-white" : "bg-white-900 text-black"}`}>

      {/* ⭐ Dark Mode Toggle */}
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
        notes={sortedNotes}
        deleteNote={deleteNote}
        editNote={editNote}
        togglePin={togglePin}
      />

    </div>

  );
}

export default App;