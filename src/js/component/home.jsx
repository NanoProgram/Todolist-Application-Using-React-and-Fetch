import React from "react";
import { useEffect, useState } from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Mynerve&family=Roboto+Mono:ital,wght@1,100&display=swap');
</style>;

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("nano");

  const createUser = (event) => {
    if (event.key === "Enter") {
      setUser(event.target.value);
      console.log(user);
    }
  };

  const submitUser = async (input) => {
    try {
      console.log(user);
      const res = await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/${user}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{}]),
        }
      );
      if (res.ok) {
        // user was successfully created
        alert(`User created successfully`);
      } else {
        // user already exists
        alert(`User already exists`);
        setUser("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://assets.breatheco.de/apis/fake/todos/user/${user}`,
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

  useEffect(() => {
    async function updateTask() {
      try {
        const response = fetch(
          `https://assets.breatheco.de/apis/fake/todos/user/${user}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks),
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    updateTask();
  }, [tasks]);

  const newTask = async (e) => {
    if (e.key === "Enter") {
      const newTask = {
        label: e.target.value,
        done: false,
      };
      try {
        const response = await fetch(
          `https://assets.breatheco.de/apis/fake/todos/user/${user}`,
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
        e.target.value = "";
        console.log(tasks);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteTask = (task) => {
    setTasks((prev) => prev.filter((t) => t !== task));
  };

  const deleteAllTask = () => {
    setTasks((prev) => []);
    setUser((prev) => []);
  };

  const done = (index) => {
    const change = [...tasks];
    change[index].done = true;
    setTasks(change);
    console.log(tasks);
  };

  return (
    <div class="image-back">
      <div id="container" class="container-fluid post-it">
        <div>
          <div
            class="modal fade"
            id="create"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Create User
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body modalBody position-relative">
                  <input
                    id="input"
                    type="text"
                    placeholder="Add New User"
                    class="position-absolute top-50 start-50 translate-middle"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createUser(e);
                        submitUser();
                      }
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        createUser(e);
                        submitUser();
                      }
                    }}
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="position-relative">
          <div class="blackboard position-absolute top-0 start-0">
            <h2>Hi {user}</h2>
            <br></br>
            <h4>Quick Guide</h4>
            <br></br>
            <div class="guidetext">
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-radioactive"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
                  <path d="M9.653 5.496A2.986 2.986 0 0 0 8 5c-.61 0-1.179.183-1.653.496L4.694 2.992A5.972 5.972 0 0 1 8 2c1.222 0 2.358.365 3.306.992L9.653 5.496Zm1.342 2.324a2.986 2.986 0 0 1-.884 2.312 3.01 3.01 0 0 1-.769.552l1.342 2.683c.57-.286 1.09-.66 1.538-1.103a5.986 5.986 0 0 0 1.767-4.624l-2.994.18Zm-5.679 5.548 1.342-2.684A3 3 0 0 1 5.005 7.82l-2.994-.18a6 6 0 0 0 3.306 5.728ZM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>{" "}
                : Delete User
              </h5>
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-patch-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                </svg>{" "}
                : Create User
              </h5>
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-check-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                </svg>{" "}
                : Task Done
              </h5>
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-stopwatch"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                </svg>{" "}
                : Pending Task
              </h5>
              <br></br>
              <h4 class="click">Click</h4>
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-stopwatch"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                </svg>{" "}
                : Mark Task to Done
              </h5>
            </div>
          </div>
          <div class="try">
            <h1 class="fontTodo">
              Todo List
              <button
                type="button"
                class="nuclear btn btn-outline-info"
                data-bs-toggle="modal"
                data-bs-target="#create"
                disabled={user.length > 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-patch-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
              <button
                type="button"
                class="nuclear btn btn-outline-warning"
                onClick={() => deleteAllTask()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-radioactive"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
                  <path d="M9.653 5.496A2.986 2.986 0 0 0 8 5c-.61 0-1.179.183-1.653.496L4.694 2.992A5.972 5.972 0 0 1 8 2c1.222 0 2.358.365 3.306.992L9.653 5.496Zm1.342 2.324a2.986 2.986 0 0 1-.884 2.312 3.01 3.01 0 0 1-.769.552l1.342 2.683c.57-.286 1.09-.66 1.538-1.103a5.986 5.986 0 0 0 1.767-4.624l-2.994.18Zm-5.679 5.548 1.342-2.684A3 3 0 0 1 5.005 7.82l-2.994-.18a6 6 0 0 0 3.306 5.728ZM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>
              </button>
            </h1>
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
                    onClick={() => done(index)}
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
    </div>
  );
};

export default Home;
