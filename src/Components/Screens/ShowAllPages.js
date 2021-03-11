import React, { useState, useEffect } from "react";
import "../../CSS/ShowAllPages.css";
import PageComponent from "../Common/PageComponent";
import { IoAddCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

function ShowAllPages() {
  const [data, setData] = useState(undefined);
  const [menu, setMenu] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [menuActive, setMenuActive] = useState(false);
  const [eventActive, setEventActive] = useState(false);
  const [contentActive, setContentActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    try {
      fetch("https://pagesmanagement.azurewebsites.net/api/ResponsivePages")
      .then((response) => response.json())
      .then((responseJson) => {
        const menuArray = [];
        const eventsArray = [];
        const contentArray = [];
        for (const i in responseJson) {
          const date = responseJson[i].publishedOn;
          const splitDate = date.split("T");
          responseJson[i].publishedOn = splitDate[0] + " " + splitDate[1]
          if (responseJson[i].type === 0) {
            menuArray.push(responseJson[i]);
          } else if (responseJson[i].type === 1) {
            eventsArray.push(responseJson[i]);
          } else {
            contentArray.push(responseJson[i]);
          }
        }
        setMenu(menuArray);
        setEvents(eventsArray);
        setContent(contentArray);
        setData(responseJson);
      });      
    } catch (error) {
      console.log(error);
    }
  }, []);

  return data ? (
    <div className="SAPmainContainer">
      <div className="choicesContainer">
        <p className="choicesTitle">Filters</p>
        <div className="choicesOptionContainer">
          <p className="choicesOptionTitle">Type</p>
          <div className="optionLine">
            <input
              id="SAPinput"
              name="isGoing"
              type="checkbox"
              checked={menuActive}
              onChange={() => {
                setMenuActive(!menuActive);
              }}
            />
            <p className="optionText">Menu</p>
            <p className="optionNo">({menu.length})</p>
          </div>
          <div className="optionLine">
            <input
              id="SAPinput"
              name="isGoing"
              type="checkbox"
              checked={eventActive}
              onChange={() => {
                setEventActive(!eventActive);
              }}
            />
            <p className="optionText">Event</p>
            <p className="optionNo">({events.length})</p>
          </div>
          <div className="optionLine">
            <input
              id="SAPinput"
              name="isGoing"
              type="checkbox"
              checked={contentActive}
              onChange={() => {
                setContentActive(!contentActive);
              }}
            />
            <p className="optionText">Content</p>
            <p className="optionNo">({content.length})</p>
          </div>
        </div>
      </div>
      {data ? (
        <div className="pagesContainer">
          <p className="pagesTitle">Available pages</p>
          <div className="pagesInnerContainer">
            <div
              className="addNewPageContainer"
              onClick={() => history.push(`/newPage`)}
            >
              <IoAddCircleOutline size={120} />
              <p className="newPageTitle">Add a new page</p>
            </div>
            {menuActive && menu.map((page) => <PageComponent route={page} />)}
            {contentActive &&
              content.map((page) => <PageComponent route={page} />)}
            {eventActive &&
              events.map((page) => <PageComponent route={page} />)}
            {!eventActive &&
              !menuActive &&
              !contentActive &&
              data.map((page) => <PageComponent route={page} />)}
          </div>
        </div>
      ) : (
        <p>Waiting to load the pages</p>
      )}
    </div>
  ) : null;
}

export default ShowAllPages;
