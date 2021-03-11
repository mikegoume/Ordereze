import React, { useState, useEffect } from "react";
import "../../CSS/PageComponent.css";
import { useHistory } from "react-router-dom";

export default function PageComponent(props) {
  const [page, setPage] = useState(undefined);

  useEffect(() => {
    const { route } = props;
    if (page === undefined || page !== route) {
      setPage(route);
    }
  }, []);

  const history = useHistory();
  const typeOptions = ["Menu", "Events", "Content"];

  return page ? (
    <div
      className="pageContainer"
      onClick={() => history.push(`/singlePage/${page.id}`)}
    >
      {page.isActive === true ? (
        <div className="circleActive" />
      ) : (
        <div className="circleInactive" />
      )}
      <div className="pageInnerContainer">
        <p className="pageDescription">{page.description}</p>
        <p className="pageDescription">{page.id}</p>
        <p className="pageDescription">{page.publishedOn}</p>
        <p className="pageTitle">{page.title}</p>
        <p className="pageType">{typeOptions[page.type]}</p>
      </div>
    </div>
  ) : null;
}
