import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon } from '@radix-ui/react-icons';

function ToDoList() {
  const allToDos = useSelector((state) => state.todos.todos);
  const [toDoList, setToDoList] = useState([]);

  const errors = useSelector((state) => state.todos.todos);
  const allToDosLoading = useSelector((state) => state.todos.todos);

  console.log(allToDos);
  console.log(allToDosLoading);

  const titleRef = useRef('');
  const dispatch = useDispatch();

  const addToDo = () => {
    const title = titleRef.current.value;
    setToDoList((prev) => [...prev, { id: prev.length + 1, title }]);
    titleRef.current.value = '';
  };

  const removeToDo = (id) => {
    const filteredList = toDoList.filter((item) => item.id !== id);
    setToDoList(filteredList);
  };

  useEffect(() => {
    dispatch({ type: 'TODO_ALL_REQUESTED' });
  }, []);

  useEffect(() => {
    setToDoList(allToDos);
  }, [allToDos]);

  return (
    <>
      <div>
        <input type="text" placeholder="Add your task" ref={titleRef} />
        <div className="my-2">
          <button
            onClick={addToDo}
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded p-2 w-full text-white"
          >
            Submit
          </button>
        </div>
      </div>
      <ul className="my-8">
        {toDoList.map((item) => (
          <li
            key={item.id}
            className="my-2 bg-indigo-300/50 p-2 shadow-sm shadow-indigo-400/50 rounded border border-indigo-300/30 flex justify-between text-white"
          >
            <span>{item.title}</span>
            <button
              className="bg-red-500 shadow-sm shadow-indigo-800/50 text-red-800 text-xs p-1 ml-2 rounded"
              onClick={() => removeToDo(item.id)}
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
