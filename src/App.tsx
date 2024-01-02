import { useState } from "react";
import { Introduction, Loader } from "./components";
import "./styles.css";

export const App = () => {
  const [title, setTitle] = useState<string>();
  const [quote, setQuote] = useState<string>();
  const [source, setSource] = useState<string>();
  const [link, setLink] = useState<string>();
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
                setTitle(payload.title.title[0].plain_text);
                setQuote(payload.quote[0].paragraph.text[0].plain_text);
                setSource(payload.source.properties.Title.title[0].plain_text);
                setLink(payload.link);
              }
            })
            .catch((error) => console.log(error))
            .then(() => setLoading(false));
        }}
      >
        Load new spark
      </button>
      <div className="content">
        {loading ? (
          <Loader />
        ) : (
          <>
            {title && <p className="title">{title}</p>}
            {quote && <p className="quote">{quote}</p>}
            {source && <p className="source">Source: {source}</p>}
            {link && (
              <a href={link} target="_blank" rel="noreferrer">
                Link to Notion page &#x2197;
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};
