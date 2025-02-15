import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Notes: React.FC = (props) => {
  const text = props.text;
  const [markdown, setMarkdown] = useState<string>("");
  return (
    <div className="card">
      <ReactMarkdown className="body-text">{text}</ReactMarkdown>
    </div>
  );
};

export default Notes;
