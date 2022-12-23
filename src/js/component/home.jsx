import React from "react";
import { useEffect, useState } from "react";





//create your first component
const Home = () => {
	const[task, setTask] = useState([])
	const newTask = (e) => {
		if(e.key === 'Enter'){
		setTask (prev => [...prev, e.target.value])
		}
	}
  return (
    <div id="container" class="container container fluid">
      <h1>Todo List</h1>
      <input id="input" type="text" placeholder="Add Task ..." onKeyDown={e => newTask(e)} />
	  {task.map((task) => {
		return <h1>{task}</h1>
	  })
	  }
    </div>
  );
};

export default Home;
