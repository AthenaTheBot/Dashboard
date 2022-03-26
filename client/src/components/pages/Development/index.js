import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styling
import "./style.css";

// Compontents
import Input from "../../layout/Input/InputText";
import InputSelect from "../../layout/Input/InputSelect";
import InputRole from "../../layout/Input/InputRole";
import Button from "../../layout/Button";

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
          roles={[{ id: "121", name: "Sj", color: "red" }]}
          roleLimit={2}
        />
      </div>
    </div>
  );
}

export default Development;
