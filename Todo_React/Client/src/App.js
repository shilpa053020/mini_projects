import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios";

const App = () => {

  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [todos, settodos] = useState([]);
  const [edit, setedit] = useState(false)
  const [currenttodo, setcurrenttodo] = useState(" ")


  const gettodos = () => {
    axios.get("http://localhost:1000/todo").then((res) => {
      console.log("gettodoresponse", res.data);
      settodos(res.data);
    });
  };

  const data = {
    title: title,
    description: description
  }
  console.log(data, "data");

  const createtodo = () => {

    axios.post("http://localhost:1000/todo", data).then((res) => {
      console.log("createresponse", res);
      gettodos();
      settitle(" ")
      setdescription(" ")
    })
  }

  const updatetodo = (todo) => {
    setedit(true);
    settitle(todo.title);
    setdescription(todo.description);
    setcurrenttodo(todo)
  }

  const handleupdate = async () => {
    try {
      if (currenttodo) {
        const id = currenttodo._id
        console.log("id,", id);
      }
      const updateData = {
        title: title,
        description: description
      }
      console.log("updatadta", updateData);
      const id = currenttodo._id


      const response = await axios.put(
        `http://localhost:1000/todo/${id}`,
        updateData
      );
      console.log("update", response);
      gettodos();
      setedit(false)
      settitle("")
      setdescription("")
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  }





  const deletetodo = async (id) => {
    try {
      const deleteid = id;
      const res = await axios.delete(`http://localhost:1000/todo/${deleteid}`)
      console.log("resdelte", res);
      gettodos();
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }

  }

  useEffect(() => {
    gettodos();
  }, [])

  return (
    <div>
      <div class="todo">
        <h1>Todo Application</h1>
        <label>Title:</label>
        <input id="title"
          onChange={(e) => settitle(e.target.value)}
          value={title}
        />
        <label>Description:</label>
        <textarea id="description"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
        />

        {edit ? (
          <button id="btn" onClick={handleupdate}>Update</button>
        ) : (
          <button id="btn" onClick={createtodo}>Save</button>
        )}

      </div>
      <div class="listitem">
        {(todos.map((item) => (
          <ul id="todoList" key={item._id}>
            <li>{item.title} : {item.description}
              <button id="btne" onClick={() => updatetodo(item)}>Edit </button>
              <button id="btnd" onClick={() => { deletetodo(item._id) }}>Delete</button>
            </li>
          </ul>
        )))}

      </div>

    </div>

  )
}

export default App;       