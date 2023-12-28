import { useState } from "react";
import { Introduction } from "./components";

const App = () => {
  const [title, setTitle] = useState<string>();
  
  return (
    <div>
      <Introduction />
      <button
        type="button"
        onClick={() => {
          fetch("http://localhost:8000/")
            .then((response) => response.json())
            .then((payload) => {
              if(payload) {
                console.log(payload);
                setTitle(payload.properties.Title.title[0].plain_text);
              }
            });
        }}
      >
        Fetch List
      </button>
      {title}
    </div>
  );
};

export default App;
