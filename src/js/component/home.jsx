import React from "react";
import { useEffect, useState } from "react";



let count = 0

//create your first component
const Home = () => {
	const[tasks, setTasks] = useState([])
	const newTask = (e) => {
		if(e.key === 'Enter'){
		setTasks (prev => [...prev, e.target.value])
		count++
		}
	}
	const tag = Object.keys(tasks);
	console.log(tag)
	const deleteTask = () => {
		setTasks(tasks.filter((tasks) => tasks !== tasks));
	}

  return (
    <div id="container" class="container container fluid">
      <h1>Todo List</h1>
      <input id="input" type="text" placeholder="Add Task ..." onKeyDown={e => newTask(e)} />
	  {tasks.map((tasks, index) => {
		return <h1 key={index} value={tasks}>{tasks}<button  type="button" class="btn-close" aria-label="Close" onClick={()=> deleteTask(tasks)}></button></h1>
	  })
	  }
	  <h2>"Task: " {count<1? "No" : count}</h2>
    </div>
  );
};

export default Home;
