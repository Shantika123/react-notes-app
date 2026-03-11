import { useState } from "react";

function AddNote({ addNote }) {

  const [text, setText] = useState("");
  const [color, setColor] = useState("bg-yellow-200");

  const handleAdd = () => {

    if (text.trim() === "") return;

    addNote({
      id: Date.now(),
      text: text,
      color: color,
      pinned: false
    });

    setText("");
  };

  return (

    <div className="mb-8 flex justify-center gap-3 flex-wrap">

      <input
        className="border p-3 rounded-lg w-96 shadow"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Color Picker */}
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="bg-yellow-200">Yellow</option>
        <option value="bg-green-200">Green</option>
        <option value="bg-blue-200">Blue</option>
        <option value="bg-pink-200">Pink</option>
        <option value="bg-purple-200">Purple</option>
      </select>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:scale-105 transition"
      >
        Add
      </button>

    </div>

  );
}

export default AddNote;