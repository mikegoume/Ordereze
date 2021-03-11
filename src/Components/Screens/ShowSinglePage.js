import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "../../CSS/ShowSinglePage.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";

export default function ShowSinglePage(props) {
  const [pageId, setPageId] = useState(undefined);
  const [page, setPage] = useState(undefined);
  const [showOptions, setShowOptions] = useState(false);
  const typeOptions = ["Menu", "Events", "Content"];
  const history = useHistory();

  if (pageId === undefined) {
    var path = window.location.pathname;
    if (path.split("/")[2] !== undefined) {
      setPageId(path.split("/")[2]);
    }
  }

  useEffect(() => {
    console.log(pageId);
    try {
      fetch(
        `https://pagesmanagement.azurewebsites.net/api/ResponsivePages/${pageId}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          const dates = responseJson.publishedOn.split("T");
          responseJson.publishedOn = dates[0] + " " + dates[1];
          setPage(responseJson);
        });
    } catch (error) {
      console.log(error);
    }
  }, [pageId]);

  function handleShowModal() {
    setShowOptions(!showOptions);
  }

  function deletePage(id) {
    console.log("i deleted");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      fetch(
        `https://pagesmanagement.azurewebsites.net/api/ResponsivePages/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((responseJson) => history.push("/"));
    } catch (error) {
      console.log(error);
    }
  }

  return page ? (
    <div
      id="SPpageContainer"
      onClick={() => {
        if (showOptions === true) setShowOptions(false);
      }}
    >
      <div id="SPoptionsLine">
        <AiOutlineMenu
          size={25}
          style={{ color: "grey", cursor: "pointer" }}
          onClick={() => handleShowModal()}
        />

        {page.isActive === true ? (
          <div id="SPcircleActive" />
        ) : (
          <div id="SPcircleInactive" />
        )}
      </div>
      {showOptions && (
        <div id="modalContainer">
          <div id="modalChoice1">
            <AiOutlineEdit size={20} />
            <p id="modalChoiceText"> Edit page</p>
          </div>
          <div id="modalChoice2" onClick={() => deletePage(pageId)}>
            <AiOutlineDelete size={20} style={{ color: "red" }} />
            <p id="modalChoiceText"> Delete page</p>
          </div>
        </div>
      )}
      <div id="SPpageInnerContainer">
        <p id="SPpageTitle">{page.title}</p>
        <p id="SPpageDescription">{page.description}</p>
        <p id="SPpageType">{typeOptions[page.type]}</p>
        <p id="SPpageDate">{page.publishedOn}</p>
      </div>
    </div>
  ) : null;
}
