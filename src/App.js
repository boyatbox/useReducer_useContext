import { useEffct, useState, useReducer, useContext } from "react";
import React from "react";
import data from "./Data";
import css from "./Style.css";

const AppContext = React.createContext();

const initState = [];
function reducer(state, action) {
  switch (action.type) {
    case "GENERATE":
      return action.payload + Math.random() * 100;
      break;
    case "GENERATE_AND_FLOOR":
      return action.payload + Math.floor(Math.random() * 100);
      break;
    case "SELECT_ITEM":
        console.log("SELECT_ITEM ACTION");
        return action.payload;
        break;
    default:
      return new Error('Invalid action type');
      break;
  }

  return "new state";
}

function App() {
  console.log("Rendering app..");

  return (
    // <AppContext.Provider>
    // <div className="App">
    //   <h1>useReducer</h1>
    //   <button onClick={()=>{dispatch('GENERATE')}}>Genearte Random Number</button>
    //   <button onClick={()=>{dispatch('GENERATE_FLOOR');}}>Genearte Floor</button>
    //   <p style={{border:'solid 1px purple',height:'5rem'}}>{state}</p>
    // </div>
    // </AppContext.Provider>
    <Parent />
  );
}

function Parent() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="parent">
        <p>Parent:</p>
        <button
          onClick={() => {
            dispatch({ type: "GENERATE", payload: "=>" });
          }}
        >
          update context value
        </button>
        <div className="container">
          <div className="itemList">
            <ItemList />
          </div>
          <div className="itemDetails">
            <ItemDeatils />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

function ItemList() {
  const ContextRef = React.useContext(AppContext);
  function clickHandler(sitem) {
    console.log('item=',sitem);
    ContextRef.dispatch({type:'SELECT_ITEM',payload:sitem});
  }
  return (
    <>
      <p>Item List:</p>
      {/* <p>ContextData:{ContextRef.state}</p> */}
      <ul className="listStyle">
        {data.map((item) => {
          return (
            <li key={item.id}>
              <button onClick={()=>{clickHandler(item)}}>{item.name}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ItemDeatils() {
  const ContextRef = React.useContext(AppContext);
  return (<>
      <p>Item details:</p>
      {/* <p>ContextData:{ContextRef.state.id}</p> */}
      <p>
        <span className="labelSpan">id:</span>
        <span>{ContextRef.state.id}</span>
      </p>
      <p>
        <span className="labelSpan">name:</span>
        <span>{ContextRef.state.name}</span>
      </p>
      <p>
        <span className="labelSpan">email:</span>
        <span>{ContextRef.state.email}</span>
      </p>
      <p>
        <span className="labelSpan">body:</span>
        <span>{ContextRef.state.body}</span>
      </p>
      <button>Delete</button>
    </>
  );
}

function ItemDeatilsSectionA() {}

function ItemDeatilsSectionB() {}

export default App;
