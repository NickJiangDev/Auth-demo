import * as React from "react";
import { render } from "react-dom";
import { setAuthority } from "./authorityUtil";
import App from "./App";

const loginSuccess = (loginInfo: any) => {
  const { auth = [] } = loginInfo;
  setAuthority(auth);
};

const rootElement = document.getElementById("root");
loginSuccess({ auth: ["1", "4"] });
render(<App />, rootElement);
