import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Notes: React.FC<{ text: string }> = ({ text }) => {
  //   const [markdown, setMarkdown] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>(text);
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
      {/* {isEditing ? (
        <textarea
          autoFocus
          value={markdown}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full h-full p-2 border-none outline-none"
        />
      ) : ( */}
      <ReactMarkdown>{markdown}</ReactMarkdown>
      {/* )} */}
    </div>
  );
};

export default Notes;

// const Notes: React.FC<{text: string}> = ({text}) => {
// 	const [markdown, setMarkdown] = useState<string>(text);

// 	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
// 		setMarkdown(event.target.value);
// 	};

// 	return (
// <div className="card">
// 	<textarea
// 		className="markdown-input"
// 		value={markdown}
// 		onChange={handleChange}
// 	/>
// 			<ReactMarkdown className="body-text">{markdown}</ReactMarkdown>
// 		</div>
// 	);
// };

// export default Notes;
