import { useEffct, useState, useReducer, useContext, useEffect } from "react";
import React from "react";
import data from "./Data";
import css from "./Style.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getDataAwait } from "./API";
import axios from "axios";
import Account from "./Account";
import Layout from "./Layout";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import theme from "./MatTheme";
import { ReactQueryDevtools } from "react-query/devtools";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient();
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: twentyFourHoursInMs,
//     },
//   },
// });
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
      return new Error("Invalid action type");
      break;
  }

  return "new state";
}

function App() {
  console.log("Rendering app..");
  const [state, setState] = useState(Date.now);

  // useEffect(() => {
  //   let response = getData();

  //   response
  //     .then((res) => {
  //       if(res?.data){
  //         console.log("data", res.data);
  //         console.log("status", res.status);
  //       }else{
  //         console.log("data missing");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("in catch", err);
  //     });
  // });
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ThemeProvider theme={theme}>
        {/* <Parent /> */}
        {/* <MatList/> */}
        <Layout />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Parent() {
  const [state, dispatch] = useReducer(reducer, initState);

  const { isLoading, isError, data } = useQuery("testdata", getDataAwait);

  if (isLoading) {
    return "loading..";
  }

  if (isError) {
    return "Error";
  }

  return (
    <div>
      {data.map((o) => {
        return (
          <p>
            {o.id} - {o.email}
          </p>
        );
      })}
    </div>
  );
}

function ItemList() {
  const ContextRef = React.useContext(AppContext);
  function clickHandler(sitem) {
    console.log("item=", sitem);
    ContextRef.dispatch({ type: "SELECT_ITEM", payload: sitem });
  }
  return (
    <>
      <p>Item List:</p>
      {/* <p>ContextData:{ContextRef.state}</p> */}
      <ul className="listStyle">
        {data.map((item) => {
          return (
            <li key={item.id}>
              <button
                onClick={() => {
                  clickHandler(item);
                }}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ItemDeatils() {
  const ContextRef = React.useContext(AppContext);
  return (
    <>
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
