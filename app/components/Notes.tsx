import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Notes: React.FC<{ text: string }> = ({ text }) => {
  //   const [markdown, setMarkdown] = useState<string>("");
  // const [markdown, setMarkdown] = useState<string>(text);
  //   const [isEditing, setIsEditing] = useState<boolean>(false);

  //   // Switch to editing mode on click
  //   const handleClick = () => {
  //     setIsEditing(true);
  //   };
  //   // When the textarea loses focus, switch back to viewing mode
  //   const handleBlur = () => {
  //     setIsEditing(false);
  //   };

  //   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setMarkdown(e.target.value);
  //   };
  return (
    <div className="card">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default Notes;
