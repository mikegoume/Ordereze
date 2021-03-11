import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { useHistory } from "react-router-dom";
import "../../CSS/CreatePage.css";

export default function EditPage() {
  const history = useHistory();
  const [pageId, setPageId] = useState(undefined);
  const [page, setPage] = useState(undefined);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [type, setType] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const typeOptions = [
    { value: "0", label: "Menu" },
    { value: "1", label: "Events" },
    { value: "2", label: "Content" },
  ];
  const isActiveOptions = [
    { value: "false", label: "False" },
    { value: "true", label: "True" },
  ];
  if (pageId === undefined) {
    var path = window.location.pathname;
    if (path.split("/")[2] !== undefined) {
      setPageId(path.split("/")[2]);
    }
  }

  useEffect(() => {
    try {
      fetch(
        `https://pagesmanagement.azurewebsites.net/api/ResponsivePages/${pageId}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setPage(responseJson);
          setTitle(responseJson.title);
          setDescription(responseJson.description);
          setType(responseJson.type);
          setIsActive(responseJson.isActive);
        });
    } catch (error) {
      console.log(error);
    }
  }, [pageId]);

  function validate() {
    let errors = {};
    if (!title) {
      errors.title = "Cannot be blank";
    }
    if (!description) {
      errors.description = "Cannot be blank";
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  function submit() {
    const newDate = new Date();
    const newObj = {
      id: pageId,
      title: title,
      description: description,
      type: Number(type),
      isActive: isActive === "true" ? true : false,
      publishedOn: newDate,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObj),
    };
    try {
      fetch(
        `https://pagesmanagement.azurewebsites.net/api/ResponsivePages/${page.id}`,
        requestOptions
      ).then((response) => history.push("/"));
    } catch (error) {
      console.log(error);
    }
  }
  return page ? (
    <div className="mainContainer">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Edit page</h1>
          <label>
            <p className="labelTitle">Title:</p>
            <input
              placeholder="Title"
              type="text"
              name="id"
              onChange={(text) => setTitle(text.target.value)}
              maxLength={50}
              value={title}
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </label>
          <label>
            <p className="labelTitle">Description:</p>
            <input
              placeholder="Description"
              type="text"
              name="id"
              onChange={(text) => setDescription(text.target.value)}
              maxLength={200}
              multiline
              numberOfLines={10}
              value={description}
            />
            {formErrors.description && (
              <span className="error">{formErrors.description}</span>
            )}
          </label>
          <label>
            <p className="labelTitle">Type:</p>
            <Select
              closeOnSelect={true}
              options={typeOptions}
              onChange={(choice) => {
                setType(choice[0].value);
              }}
              style={{
                fontSize: "larger",
                fontWeight: "bold",
                color: "grey",
                paddingLeft: "5%",
              }}
            />
            {formErrors.type && (
              <span className="error">{formErrors.type}</span>
            )}
          </label>
          <label>
            <p className="labelTitle">IsActive:</p>
            <Select
              closeOnSelect={true}
              value={isActiveOptions.filter(
                (option) => option.value === isActive
              )}
              options={isActiveOptions}
              onChange={(choice) => {
                setIsActive(choice[0].value);
              }}
              style={{
                fontSize: "larger",
                fontWeight: "bold",
                color: "grey",
                paddingLeft: "5%",
              }}
            />
            {formErrors.isActive && (
              <span className="error">{formErrors.isActive}</span>
            )}
          </label>
          <input type="submit" value="Submit" className="submitButton" />
        </form>
      </div>
    </div>
  ) : null;
}
