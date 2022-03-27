import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styling
import "./style.css";

// Compontents
import Input from "../../layout/Input/InputText";
import InputSelect from "../../layout/Input/InputSelect";
import InputRole from "../../layout/Input/InputRole";

function Development() {
  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      navigate("/");
    }
  });

  return (
    <div className="athena-dev-container">
      <div className="athena-test-div">
        <Input placeHolder={"Write something"} />
      </div>

      <div className="athena-test-div">
        <InputSelect options={[{ id: 1 }]} />
      </div>

      <div className="athena-test-div">
        <InputRole
          roles={[
            { id: "1", name: "Testing Role", color: "red", active: false },
            { id: "2", name: "Shiny Role", color: "blue", active: false },
          ]}
          roleLimit={5}
        />
      </div>
    </div>
  );
}

export default Development;
