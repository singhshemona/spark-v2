import { useState } from "react";
import { Introduction } from "./components";

export const App = () => {
  const [title, setTitle] = useState<string>();
  const [quote, setQuote] = useState<string>();
  const [source, setSource] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Introduction />
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          fetch("http://localhost:8000/")
            .then((response) => response.json())
            .then((payload) => {
              if (payload) {
                console.log(payload);

                const title = payload.title.title[0].plain_text;
                const quote = payload.quote[0].paragraph.text[0].plain_text;
                const source = payload.source.properties.Medium.select
                  ? payload.source.properties.Medium.select.name +
                    ": " +
                    payload.source.properties.Title.title[0].plain_text
                  : payload.source.icon.emoji +
                    ": " +
                    payload.source.properties.Title.title[0].plain_text;

                setTitle(title);
                setQuote(quote);
                setSource(source);
              }
            })
            .catch((error) => console.log(error))
            .then(() => setLoading(false));
        }}
      >
        {loading ? "Loading..." : "New page"}
      </button>
      {title && <p>{title}</p>}
      {quote && <p>{quote}</p>}
      {source && <p>{source}</p>}
    </div>
  );
};
