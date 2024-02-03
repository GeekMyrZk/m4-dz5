import React, { useState } from "react";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (newTaskText.trim() !== "") {
      setTasks([newTaskText, ...tasks]);
      setNewTaskText("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTaskText(tasks[index]);
  };

  const saveEditing = () => {
    if (editedTaskText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editedTaskText;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTaskText("");
    }
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedTaskText("");
  };

  const toggleCompletion = (index) => {
    const taskToToggle = tasks[index];
    const updatedCompletedTasks = completedTasks.includes(taskToToggle)
        ? completedTasks.filter((task) => task !== taskToToggle)
        : [...completedTasks, taskToToggle];

    setCompletedTasks(updatedCompletedTasks);
  };

  return (
      <>
        <div
            className="toDo"
            style={{
              textAlign: "center",
              margin: "50px auto",
              width: "300px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
        >
          <h1 style={{ color: "#333" }}>Your tasks</h1>
          <input
              style={{
                padding: "8px",
                marginBottom: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
              type="text"
              value={editingIndex !== null ? editedTaskText : newTaskText}
              placeholder={"Enter your task"}
              onChange={(e) =>
                  editingIndex !== null
                      ? setEditedTaskText(e.target.value)
                      : setNewTaskText(e.target.value)
              }
          />
          <button
              onClick={editingIndex !== null ? saveEditing : addTask}
              style={{
                backgroundColor: "#4caf50",
                marginLeft: "15px",
                padding: "8px 15px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseEnter={(event) =>
                  (event.target.style.backgroundColor = "#439a47")
              }
              onMouseLeave={(event) =>
                  (event.target.style.backgroundColor = "#4caf50")
              }
          >
            {editingIndex !== null ? "Save Changes" : "Add Task"}
          </button>

          <ul
              className="tasks"
              style={{
                listStyle: "none",
                padding: "0",
                backgroundColor: "#94c979",
                borderRadius: "4px",
              }}
          >
            {tasks.map((task, index) => (
                <li
                    key={index}
                    style={{
                      marginBottom: "5px",
                      padding: "8px",
                      borderRadius: "4px",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                      textDecoration: completedTasks.includes(task)
                          ? "line-through"
                          : "none",
                    }}
                    onClick={() => toggleCompletion(index)}
                >
                  {editingIndex === index ? (
                      <>
                        <input
                            type="text"
                            value={editedTaskText}
                            onChange={(e) => setEditedTaskText(e.target.value)}
                        />
                        <button
                            style={{
                              backgroundColor: "#4caf50",
                              marginLeft: "15px",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(event) =>
                                (event.target.style.backgroundColor = "#439a47")
                            }
                            onMouseLeave={(event) =>
                                (event.target.style.backgroundColor = "#4caf50")
                            }
                            onClick={saveEditing}>Save</button>
                        <button
                            style={{
                              backgroundColor: "#4caf50",
                              marginLeft: "15px",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(event) =>
                                (event.target.style.backgroundColor = "#439a47")
                            }
                            onMouseLeave={(event) =>
                                (event.target.style.backgroundColor = "#4caf50")
                            }
                            onClick={cancelEditing}>Cancel</button>
                      </>
                  ) : (
                      <>
                        {task}
                        <button
                            style={{
                              backgroundColor: "#4caf50",
                              marginLeft: "15px",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(event) =>
                                (event.target.style.backgroundColor = "#439a47")
                            }
                            onMouseLeave={(event) =>
                                (event.target.style.backgroundColor = "#4caf50")
                            }
                            onClick={() => startEditing(index)}>Edit</button>
                        <button
                            style={{
                              backgroundColor: "#4caf50",
                              marginLeft: "15px",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(event) =>
                                (event.target.style.backgroundColor = "#439a47")
                            }
                            onMouseLeave={(event) =>
                                (event.target.style.backgroundColor = "#4caf50")
                            }
                            onClick={() => removeTask(index)}>Delete</button>
                      </>
                  )}
                </li>
            ))}
          </ul>
        </div>
      </>
  );
}

export default App;
