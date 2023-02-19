import React from "react";
import { useEffect, useState } from "react";
<style>
@import url('https://fonts.googleapis.com/css2?family=Mynerve&family=Roboto+Mono:ital,wght@1,100&display=swap');
</style>







//create your first component
const Home = () => {
	const[tasks, setTasks] = useState([]);
	const [count, setCount] = useState(0);
	const newTask = (e) => {
		if(e.key === 'Enter'){
		setTasks (prev => [...prev, e.target.value])
		setCount((prev) => prev + 1)
		}
	}
	const deleteTask = (task) => {
		setTasks((prev) => prev.filter((t) => t !== task));
		setCount((prev) => prev - 1);
	}

  return (
	<div class="image-back">
    <div id="container" class="container-fluid post-it">
      <div class="try"><h1 class="fontTodo">Todo List</h1>
      <div id="center"><input id="input" type="text" placeholder="Add Task ..." onKeyDown={e => newTask(e)} /></div>
	  {tasks.map((task, index) => {
		return <h3 key={index} value={task} class="fontTask position-relative">{task}<button  type="button" class="btn-close xs position-absolute top-50 end-0 translate-middle-y" aria-label="Close" onClick={()=> deleteTask(task)}></button></h3>
	  })
	  }
	  <h6 id="count">"Tasks to complete: " {count<1? "No pending tasks" : count}</h6>
	  </div>
    </div>
	</div>
  );
};

export default Home;
