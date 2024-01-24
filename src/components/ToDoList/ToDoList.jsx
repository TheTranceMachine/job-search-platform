import { useState, useRef } from 'react';

function ToDoList() {
  const [toDoList, setToDoList] = useState([]);
  const titleRef = useRef('');

  const addToDo = () => {
    const title = titleRef.current.value;
    setToDoList((prev) => [...prev, { id: prev.length + 1, title }]);
    titleRef.current.value = '';
  };

  const removeToDo = (id) => {
    const filteredList = toDoList.filter((item) => item.id !== id);
    setToDoList(filteredList);
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Add your task" ref={titleRef} />
        <div>
          <button onClick={addToDo}>Submit</button>
        </div>
      </div>
      <ul>
        {toDoList.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <button onClick={() => removeToDo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
