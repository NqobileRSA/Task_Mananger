const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name, createdAt, updatedAt } = task;
        return `
          <div class="card mb-3 ${completed ? "bg-light" : ""}">
            <div class="card-body">
              <h5 class="card-title ${
                completed ? "completed-task" : ""
              }">${name}</h5>
              <p class="card-text">
                <small class="text-muted">
                  Created: ${new Date(createdAt).toLocaleString()}<br>
                  Updated: ${new Date(updatedAt).toLocaleString()}
                </small>
              </p>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-sm btn-outline-primary toggle-btn" data-id="${taskID}">
                  ${
                    completed
                      ? '<i class="fas fa-times-circle"></i> Mark Incomplete'
                      : '<i class="fas fa-check-circle"></i> Mark Complete'
                  }
                </button>
                <a href="task.html?id=${taskID}" class="btn btn-sm btn-outline-secondary">
                  <i class="fas fa-edit"></i> Edit
                </a>
                <button type="button" class="btn btn-sm btn-outline-danger delete-btn" data-id="${taskID}">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

// Toggle task completion
tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (
    el.classList.contains("toggle-btn") ||
    el.parentElement.classList.contains("toggle-btn")
  ) {
    loadingDOM.style.visibility = "visible";
    const id = el.dataset.id || el.parentElement.dataset.id;
    try {
      const {
        data: { task },
      } = await axios.get(`/api/v1/tasks/${id}`);
      const { completed } = task;
      await axios.patch(`/api/v1/tasks/${id}`, { completed: !completed });
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// delete task /api/tasks/:id
tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (
    el.classList.contains("delete-btn") ||
    el.parentElement.classList.contains("delete-btn")
  ) {
    loadingDOM.style.visibility = "visible";
    const id = el.dataset.id || el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `Success, task added`;
    formAlertDOM.classList.add("alert-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `Error, please try again`;
    formAlertDOM.classList.add("alert-danger");
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("alert-success", "alert-danger");
  }, 3000);
});
