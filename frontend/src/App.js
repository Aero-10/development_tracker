import { useEffect } from "react";
import api from "./api/axios";

const App = () => {
  useEffect(() => {
    api.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Developer Learning & Project Tracker</h1>
      <p>Check console for backend response</p>
    </div>
  );
};

export default App;
