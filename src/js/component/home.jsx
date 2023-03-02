import React from "react";
import { useEffect, useState } from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Mynerve&family=Roboto+Mono:ital,wght@1,100&display=swap');
</style>;

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState([]);

  const newTask = async (e) => {
    if (e.key === "Enter") {
      const newTask = {
        label: e.target.value,
        done: false,
      };
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/nano",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([...tasks, newTask]),
          }
        );
        const data = await response.json();
        setTasks((prev) => [...prev, newTask]);
        console.log(tasks);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteTask = async (task) => {
    setTasks((prev) => prev.filter((t) => t !== task));
  };

  useEffect(() => {
    async function updateTask() {
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/nano",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks),
          }
        )
      } catch (error) {
        console.log(error);
      }
    }
    updateTask();
  }, [tasks]);
  

  const done = (index) => {
    tasks[index].done = true;
    console.log(tasks)
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/nano",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div class="image-back">
      <div id="container" class="container-fluid post-it">
        <div class="try">
          <h1 class="fontTodo">Todo List</h1>
          <div id="center">
            <input
              id="input"
              type="text"
              placeholder="Add Task ..."
              onKeyDown={(e) => newTask(e)}
            />
          </div>
          {tasks.map((task, index) => {
            return (
              <h3 key={index} value={task} class="fontTask position-relative">
                {task.label}
                <button
                  type="button"
                  class="bt btn btn-outline-dark position-absolute top-50 start-100 translate-middle"
                >
                  {task.done ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-check-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-stopwatch"
                      viewBox="0 0 16 16"
                      onClick={() => done(index)}
                    >
                      <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                      <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  class="btn-close xs position-absolute top-50 end-0 translate-middle-y"
                  aria-label="Close"
                  onClick={() => deleteTask(task)}
                ></button>
              </h3>
            );
          })}
          <h6 id="count">
            {tasks.filter((task) => !task.done).length === 0
              ? "No pending tasks"
              : `Tasks to complete: ${
                  tasks.filter((task) => !task.done).length
                }`}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Home;
