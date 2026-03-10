import { useState } from "react";

function Note({ note, deleteNote, editNote, togglePin }) {

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);

  const saveEdit = () => {
    editNote(note.id, text);
    setEditing(false);
  };

  return (

    <div
      className={`${note.pinned ? "bg-blue-300" : note.color} p-4 rounded-xl shadow-lg transition hover:scale-105`}
    >

      {/* Pinned label */}
      {note.pinned && (
        <p className="text-sm font-bold text-blue-900 mb-2">📌 Pinned</p>
      )}

      {editing ? (
        <>
          <textarea
            className="border w-full p-2 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={saveEdit}
            className="bg-green-500 text-white px-4 py-1 rounded-full mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="font-medium">{note.text}</p>

          <div className="flex gap-2 mt-3">

            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-400 px-3 py-1 rounded-full hover:scale-105 transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-full hover:scale-105 transition"
            >
              Delete
            </button>

            <button
              onClick={() => togglePin(note.id)}
              className="bg-blue-500 text-white px-3 py-1 rounded-full hover:scale-105 transition"
            >
              📌
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Note;