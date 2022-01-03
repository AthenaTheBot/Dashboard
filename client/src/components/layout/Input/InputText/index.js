import { Fragment, useState } from "react";

// Styling
import "./style.css";

const Input = ({ placeHolder, value, id, inputUpdated }) => {
  const [val, setVal] = useState(value);
  return (
    <Fragment>
      <input
        id={id}
        className="athena-input-text"
        type="text"
        value={val}
        placeholder={placeHolder}
        onChange={(e) => {
          setVal(e.currentTarget.value);
          if (inputUpdated) inputUpdated(e.currentTarget.value);
        }}
      />
    </Fragment>
  );
};

export default Input;
