import React, { useState } from "react";

function Folder({ data }) {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const handleInput = (e, isFolder) => {
    setOpen(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  if (data.isFolder) {
    console.log("if statement", data.name);

    return (
      <div style={{ marginTop: 5, marginLeft: 5 }}>
        <div className="folder" onClick={() => setOpen(!open)}>
          <span>📁{data.name}</span>
          <button onClick={(e) => handleInput(e, true)}>+Folder</button>
          <button onClick={(e) => handleInput(e, false)}>+File</button>
        </div>
        {showInput.visible && (
          <div>
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input type="text" placeholder={`New ${showInput.isFolder ? "Folder" : "File"}`}  autoFocus  onBlur={() => setShowInput({ ...showInput, visible: false })}/>
          </div>
        )}
        <div style={{ display: open ? "block" : "none", padding:5 }}>
          {data.items.map((e) => {
            return <Folder key={e.id} data={e} />;
          })}
        </div>
      </div>
    );
  } else {
    console.log("else statement", data.name);

    return (
      <div className="file" style={{marginLeft:15}}>
        <span>📄{data.name}</span>

      </div>
    );
  }
}

export default Folder;
