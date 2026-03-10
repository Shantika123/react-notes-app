import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Note from "./Note";

function NotesList({ notes, deleteNote, editNote, togglePin, setNotes }) {

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setNotes(items);
  };

  return (

    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >

            {notes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Note
                      note={note}
                      deleteNote={deleteNote}
                      editNote={editNote}
                      togglePin={togglePin}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

          </div>
        )}
      </Droppable>
    </DragDropContext>

  );
}

export default NotesList;