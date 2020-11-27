import * as React from "react";
import "./styles.css";
import Authorized from "./authorityUtil";
import previleges from "./authorityUtil/previleges";

const hasPermission = Authorized.hasPermission;
export default function App() {
  const [allowSearch, setAllowSearch] = React.useState(false);
  const [sendLoading, setSendLoading] = React.useState(false);

  const onBtnClick = (
    key: "add" | "update" | "delete" | "search",
    allowCheck?: boolean
  ) => {
    const checkAuth = (auth: string | string[], allowCheck?: boolean) => {
      if (hasPermission(auth, allowCheck)) {
        alert(`Sussess, ${key} auth pass!`);
      } else {
        alert("Error, No auth!");
      }
    };
    switch (key) {
      case "add":
        checkAuth(previleges.add);
        break;
      case "update":
        checkAuth(previleges.update);
        break;
      case "delete":
        checkAuth(previleges.delete);
        break;
      case "search":
        checkAuth(previleges.search, allowCheck);
        break;
      default:
        break;
    }
  };

  const send = () => {
    // mock http request
    setSendLoading(true);
    setTimeout(() => {
      setAllowSearch(true);
      setSendLoading(false);
    }, 3000);
  };

  return (
    <div className="App">
      <h3>Component Auth Control</h3>
      <Authorized authority={previleges.add}>
        <button>Add</button>
      </Authorized>
      <Authorized authority={previleges.delete}>
        <button>Delete</button>
      </Authorized>
      <Authorized
        authority={previleges.update}
        noMatch={<button disabled>Update</button>}
      >
        <button>Update</button>
      </Authorized>
      <Authorized authority={previleges.search} allowCheck={allowSearch}>
        <button>Search</button>
      </Authorized>
      <h3>Function Auth Control</h3>
      <button onClick={() => onBtnClick("add")}>Add</button>
      <button onClick={() => onBtnClick("delete")}>Delete</button>
      <button onClick={() => onBtnClick("update")}>Update</button>
      <button onClick={() => onBtnClick("search", allowSearch)}>Search</button>
      <h3>Mock Request</h3>
      <button onClick={send} disabled={sendLoading}>
        Sand Request
      </button>
    </div>
  );
}
