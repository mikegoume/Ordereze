import "./App.css";
import React from "react";
import ShowAllPages from "./Components/Screens/ShowAllPages";
import CreatePage from "./Components/Screens/CreatePage";
import ShowSinglePage from "./Components/Screens/ShowSinglePage";
import { BrowserRouter, Route } from 'react-router-dom';
import EditPage from "./Components/Screens/EditPage";

function App() {
  return (
    <div 
        style={{
          width: '100%',
          maxWidth: '1440px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          
          marginLeft: 'auto',
          marginRight: 'auto',
          
        }}
        className="App"
      >
        <BrowserRouter>
          <Route exact path='/' component={ShowAllPages} />
          <Route path='/newPage' component={CreatePage} />
          <Route path='/singlePage/:id' component={ShowSinglePage} />
          <Route path='/editPage/:id' component={EditPage} />
        </BrowserRouter>
      </div>
  );
}

export default App;
