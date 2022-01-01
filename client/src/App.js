import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main/";
import Commands from "./components/pages/Commands/";
import PageNotFound from "./components/pages/PageNotFound/";
import Legal from "./components/pages/Legal/";
import Error from "./components/pages/Error/";
import dashContext from "./context/dash/dashContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App = () => {
  const { getUser } = useContext(dashContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/commands" element={<Commands />} />

        <Route path="/privacy" element={<Legal page="privacy" />} />

        <Route path="/tos" element={<Legal page="terms" />} />

        <Route path="/error" element={<Error />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
