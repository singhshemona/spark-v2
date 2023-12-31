import { useState } from "react";
import { Introduction } from "./components";

// type Block = {
//   object: string;
//   id: string;
//   parent: {
//     type: string;
//     page_id: string;
//   };
//   created_time: string;
//   last_edited_time: string;
//   created_by: { object: string; id: string };
//   last_edited_by: { object: string; id: string };
//   has_children: boolean;
//   archived: boolean;
//   type: string;
//   paragraph: {
//     color: string;
//     text: {
//       plain_text: string;
//     }[];
//   };
// };

// type Payload = {
//   title: string;
//   quote: Block[];
//   source: Block[];
// };

const App = () => {
  const [title, setTitle] = useState<string>();
  const [quote, setQuote] = useState<string>();
  const [source, setSource] = useState<string>();

  return (
    <div>
      <Introduction />
      <button
        type="button"
        onClick={() => {
          fetch("http://localhost:8000/")
            .then((response) => response.json())
            .then((payload) => {
              if (payload) {
                console.log(payload);

                setTitle(payload.title.title[0].plain_text);
                setQuote(payload.quote[0].paragraph.text[0].plain_text);
                setSource(
                  payload.source.properties.Medium.select.name +
                    payload.source.properties.Title.title[0].plain_text
                );
              }
            });
        }}
      >
        Fetch List
      </button>
      {title}
      {quote}
      {source}
    </div>
  );
};

export default App;
