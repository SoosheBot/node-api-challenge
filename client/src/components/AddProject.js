import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddProject = () => {
  const [addProject, setAddProject] = useState({
    name: "",
    description: ""
  });

  const handleChange = e => {
    setAddProject({ ...addProject, [e.target.name]: e.target.value });
    console.log("handleChange firing");
  };

  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/projects", addProject)
      .then(res => {
        console.log("add success", res);
        setAddProject({
          ...addProject,
          name: "",
          description: ""
        });
        // window.location.reload(false);
      })
      .catch(err => console.log("Could not add project", err));
  };

  return (
    <div className="add-project-form" data-testid="add-project-form">
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          value={addProject.name}
          placeholder="add project name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={addProject.description}
          placeholder="add description"
          onChange={handleChange}
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};
export default AddProject;
