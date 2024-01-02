import { useState } from "react";
import { Introduction } from "./components";
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
                const title = payload.title.title[0].plain_text;
                const quote = payload.quote[0].paragraph.text[0].plain_text;
                const link = payload.link;

                const { Medium, Title } = payload.source.properties;
                const { emoji } = payload.source.icon.emoji;

                const source =
                  Medium.select !== undefined || null
                    ? `${Medium.select.name}, ${Title.title[0].plain_text}`
                    : `${emoji}, ${Title.title[0].plain_text}`;

                setTitle(title);
                setQuote(quote);
                setLink(link);
                setSource(source);
              }
            })
            .catch((error) => console.log(error))
            .then(() => setLoading(false));
        }}
      >
        {loading ? "Loading..." : "New page"}
      </button>
      {title && <p className="title">{title}</p>}
      {quote && <p className="quote">{quote}</p>}
      {source && <p className="source">Source: {source}</p>}
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          Link to page
        </a>
      )}
    </div>
  );
};
