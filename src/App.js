// import "./App.css"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
// import { useState } from "react"

// function App() {
//   const [box, setBox] = useState([
//     {
//       id: 0,
//       bg: "red",
//     },
//     {
//       id: 1,
//       bg: "green",
//     },
//   ])
//   function handleOnDragEnd(result) {
//     debugger
//     if (!result.destination) return
//     const newBox = Array.from(box)
//     const [draggedItem] = newBox.splice(result.source.index, 1)
//     newBox.splice(result.destination.index, 0, draggedItem)
//     setBox(newBox)
//   }

//   return (
//     <DragDropContext onDragEnd={handleOnDragEnd}>
//       <Droppable droppableId="boxes">
//         {(provided) => (
//           <ul ref={provided.innerRef} {...provided.droppableProps}>
//             {box.map(({ id, bg }, index) => (
//               <Draggable key={id} draggableId={id.toString()} index={index}>
//                 {(provided) => (
//                   <li
//                     ref={provided.innerRef}
//                     {...provided.dragHandleProps}
//                     {...provided.draggableProps}
//                   >
//                     <div className={`box ${bg}`}></div>
//                   </li>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </ul>
//         )}
//       </Droppable>
//     </DragDropContext>
//   )
// }

// export default App
// import "./App.css"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
// import { useState } from "react"

// function App() {
//   function handleOnDragEnd(result) {
//     debugger
//     // if (!result.destination) return
//     // const newBox = Array.from(box)
//     // const [draggedItem] = newBox.splice(result.source.index, 1)
//     // newBox.splice(result.destination.index, 0, draggedItem)
//     // setBox(newBox)
//   }

//   const [answers, setAnswer] = useState([
//     {
//       id: 1,
//       text: "Answer 1",
//     },
//     {
//       id: 2,
//       text: "Answer 2",
//     },
//   ])

//   const [answers2, setAnswer2] = useState([
//     {
//       id: 3,
//       text: "Answer 3",
//     },
//     {
//       id: 4,
//       text: "Answer 4",
//     },
//   ])

//   return (
//     <>
//       <p>Hello</p>
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable type="COLUMN" droppableId="word" key="word">
//           {(provided) => (
//             <div
//               style={{ width: "5rem", height: "5rem", backgroundColor: "red" }}
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {answers.map((answers, idx) => (
//                 <Draggable draggableId={`answer${idx}`} index={idx}>
//                   {(provided, snapshot) => (
//                     <div
//                       style={{ height: "10px", widows: "10px" }}
//                       ref={provided.innerRef}
//                       {...provided.dragHandleProps}
//                       {...provided.draggableProps}
//                     >
//                       {answers.text}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="word2" key="word2">
//           {(provideds) => (
//             <div
//               style={{
//                 width: "5rem",
//                 marginTop: "50px",
//                 height: "5rem",
//                 backgroundColor: "red",
//               }}
//               ref={provideds.innerRef}
//               {...provideds.droppableProps}
//             >
//               {answers2.map((answers, idx) => (
//                 <Draggable draggableId={`answer2${idx}`} index={idx}>
//                   {(provided, snapshot) => (
//                     <div
//                       style={{ height: "10px", widows: "10px" }}
//                       ref={provided.innerRef}
//                       {...provided.dragHandleProps}
//                       {...provided.draggableProps}
//                     >
//                       {answers.text}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </>
//   )
// }

// export default App

import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const App = () => {
  const [words, setWords] = useState([
    { id: "1", text: "Word 1" },
    { id: "2", text: "Word 2" },
    { id: "3", text: "Word 3" },
    { id: "4", text: "Word 4" },
    { id: "5", text: "Word 5" },
  ])

  const [containers, setContainers] = useState({
    container1: [],
    container2: [],
    container3: [],
    container4: [],
    container5: [],
  })

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there is no destination, do nothing
    if (!destination) return

    // If the item is dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Moving within the list of words
    if (source.droppableId === "words" && destination.droppableId === "words") {
      const newWords = Array.from(words)
      const [movedWord] = newWords.splice(source.index, 1)
      newWords.splice(destination.index, 0, movedWord)
      setWords(newWords)
    } else {
      // Moving from the list of words to a container or between containers
      const startContainer =
        source.droppableId === "words" ? words : containers[source.droppableId]
      const finishContainer =
        destination.droppableId === "words"
          ? words
          : containers[destination.droppableId]

      const newStart = Array.from(startContainer)
      const [movedWord] = newStart.splice(source.index, 1)

      const newFinish = Array.from(finishContainer)
      newFinish.splice(destination.index, 0, movedWord)

      if (source.droppableId === "words") {
        setWords(newStart)
      } else {
        setContainers({
          ...containers,
          [source.droppableId]: newStart,
        })
      }

      if (destination.droppableId === "words") {
        setWords(newFinish)
      } else {
        setContainers({
          ...containers,
          [destination.droppableId]: newFinish,
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="words">
        {(provided) => (
          <div
            style={{
              padding: "1rem",
              width: "200px",
              backgroundColor: "#f0f0f0",
              marginBottom: "1rem",
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {words.map((word, index) => (
              <Draggable key={word.id} draggableId={word.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "0.5rem",
                      margin: "0.5rem 0",
                      backgroundColor: "#ffffff",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {word.text}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {[
          "container1",
          "container2",
          "container3",
          "container4",
          "container5",
        ].map((containerId) => (
          <Droppable droppableId={containerId} key={containerId}>
            {(provided) => (
              <div
                style={{
                  padding: "1rem",
                  width: "150px",
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {containers[containerId].map((word, index) => (
                  <Draggable key={word.id} draggableId={word.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "0.5rem",
                          margin: "0.5rem 0",
                          backgroundColor: "#ffffff",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {word.text}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default App
