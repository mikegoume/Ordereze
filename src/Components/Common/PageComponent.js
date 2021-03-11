import React, { useState } from "react";
import "../../CSS/PageComponent.css";
import { useHistory } from "react-router-dom";

export default function PageComponent(props) {
  const { route } = props;
  const history = useHistory();
  const typeOptions = ["Menu", "Events", "Content"];

  return (
    <div className="pageContainer" onClick={() => history.push(`/singlePage/${route.id}`)}>
      {route.isActive === true ? (
        <div className="circleActive" />
      ) : (
        <div className="circleInactive" />
      )}
      <div className="pageInnerContainer">
        <p className="pageTitle">{route.title}</p>
        <p className="pageDescription">{route.description}</p>
        <p className="pageType">{typeOptions[route.type]}</p>
        <p className="pageDate">{route.publishedOn}</p>
      </div>
    </div>
  );
}
