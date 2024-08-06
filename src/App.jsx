import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  //used for deleting todo
  //app checks if the item with given id is present
  //makes a new array which consists of every other todo than targeted one
  //rerenders the todos by passing new array to setTodos
  const handleDelete = (e, id) => {
    if (confirm("Do you really want to delete it?")) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
    }
    saveToLS();
  };

  //adds the current value of todo in the todos array of object containing {id,todo,isCompleted}
  //and again sets the value of variable todo as blank for inserting new todo
  const handleAdd = () => {
    let t = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(t);
    setTodo("")
    saveToLS();
  };

  //Sets the value of variable 'todo'
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  //
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-slate-300 rounded-xl p-5 min-h-[80vh]">
        <div className="addTodo my-2">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="seperator">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-1/2"
            />
            <button onClick={handleAdd} className="addBtn">
              Add
            </button>
          </div>
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div>No Todos to display.</div>}
          {todos.map((item) => {
            return (
              <div key={item.id} className="todo seperator my-3">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex gap-8 mx-9">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

// see from 48:14
