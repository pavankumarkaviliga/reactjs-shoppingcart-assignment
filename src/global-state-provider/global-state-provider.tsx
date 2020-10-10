import * as React from "react";
import { IInitialState } from "../app-types";
import { initialState } from "./initial-state";
import rootReducer from "./root-reducer";

const globalContext = React.createContext<{ state: IInitialState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null
});

const GlobalContextProvider: React.SFC = ({ children }) => {
    const [state, dispatch] = React.useReducer(rootReducer, initialState);
    return <globalContext.Provider value={{ state, dispatch }}>{children}</globalContext.Provider>
}

export { globalContext, GlobalContextProvider };

