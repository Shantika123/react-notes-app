import { useState } from "react";

function AddNote({ addNote }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    addNote(text);
    setText("");
  };

  return (
    <div className="mb-8 flex justify-center gap-3">

      <input
        className="border p-3 rounded-lg w-96 shadow"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

     
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