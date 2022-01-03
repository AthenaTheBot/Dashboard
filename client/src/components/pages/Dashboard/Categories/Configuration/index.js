import { Fragment, useContext } from "react";

import dashContext from "../../../../../context/dash/dashContext";

import InputSelect from "../../../../layout/Input/InputSelect";
import InputText from "../../../../layout/Input/InputText";

import "./style.css";

function Configuration() {
  const { currentServer } = useContext(dashContext);
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
            <InputText
              value={currentServer?.settings?.prefix}
              inputUpdated={settingChanged}
            />
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
                  active:
                    currentServer?.settings?.language === "en_US"
                      ? true
                      : false,
                },
                {
                  content: "Turkish",
                  active:
                    currentServer?.settings?.language === "tr_TR"
                      ? true
                      : false,
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
