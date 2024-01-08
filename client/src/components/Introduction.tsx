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
          href="https://shemona.notion.site/35de7cb65366432eb56d815a97a4767e?v=e456dfbbc1f64e99a4d6920c7fc2e741"
          target="_blank"
          rel="noreferrer"
        >
          slip-box
        </a>{" "}
        of growing highlights. Click on the button for a different highlight.
      </h3>
    </>
  );
};
