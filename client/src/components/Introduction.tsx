import React from "react";

export const Introduction = () => {
  return (
    <>
      <h1>Spark</h1>
      <h3 className="description">
        This is a tool to retrieve{" "}
        <a
          href="https://shemonasingh.com/applying-zettelkasten-to-notion"
          target="_blank"
          rel="noreferrer"
        >
          zettels
        </a>{" "}
        from my{" "}
        <a
          href="https://www.notion.so/35de7cb65366432eb56d815a97a4767e"
          target="_blank"
          rel="noreferrer"
        >
          slip-box
        </a>{" "}
        of growing highlights. In order for it to work, you must run the server
        by following the instructions{" "}
        <a
          href="https://github.com/singhshemona/spark-v2"
          target="_blank"
          rel="noreferrer"
        >
          outlined in the repo here
        </a>
        . Click on the "New Spark" button for a different highlight.
      </h3>
    </>
  );
};
