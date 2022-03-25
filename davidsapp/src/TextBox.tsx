import React from 'react';

type TextBoxConfig = {
    id: string,
    label: string,
    change: React.Dispatch<string>
}


function TextBox(props: TextBoxConfig) {
  return (
    <div className="TextBox">
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} type ="text" onChange={
            (e) => props.change(e.target.value)
        }></input>
    </div>
  );
}

export default TextBox;
