import { Fragment } from "react";
import InputSelect from "../../../../layout/Input/InputSelect";
import InputText from "../../../../layout/Input/InputText";

import "./style.css";

function Configuration() {
  const settingChanged = () => {};

  return (
    <Fragment>
      <div className="module-configuration-container">
        <div className="module-prop">
          <h3 className="module-prop-title">Bot Prefix</h3>
          <p className="module-prop-description">
            Change Athena's prefix in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputText inputUpdated={settingChanged} />
          </div>
        </div>
      </div>

      <div className="module-configuration-container">
        <div className="module-prop">
          <h3 className="module-prop-title">Bot Language</h3>
          <p className="module-prop-description">
            Change Athena's language in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputSelect
              options={[
                {
                  content: "English",
                  active: true,
                },
                {
                  content: "Haha",
                  active: false,
                },
                {
                  content: "Lo",
                  active: false,
                },
                {
                  content: "Koş",
                  active: false,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Configuration;
