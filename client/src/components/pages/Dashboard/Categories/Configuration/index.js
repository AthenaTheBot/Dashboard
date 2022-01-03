import { Fragment, useContext, useState } from "react";
import Button from "../../../../layout/Button";
import dashContext from "../../../../../context/dash/dashContext";
import InputSelect from "../../../../layout/Input/InputSelect";
import InputText from "../../../../layout/Input/InputText";

function Configuration() {
  const { currentServer, setCurrentServer } = useContext(dashContext);

  const [currentPrefix, setCurretPrefix] = useState(
    currentServer?.settings?.prefix
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    currentServer?.settings?.language
  );

  const updatePrefix = async () => {
    const data = await fetch(`/api/guilds/${currentServer?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix: currentPrefix,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        return { successfull: false };
      });

    if (data?.successfull) {
      currentServer.settings.prefix = currentPrefix;
      setCurrentServer(currentServer);
    }
  };

  const updateLanguage = async () => {
    const data = await fetch(`/api/guilds/${currentServer?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: currentLanguage,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        return { successfull: false };
      });

    if (data?.successfull) {
      currentServer.settings.language = currentLanguage;
      setCurrentServer(currentServer);
    } else {
      setCurrentLanguage(currentServer);
    }
  };

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
            <InputText inputUpdated={setCurretPrefix} value={currentPrefix} />
            <Button buttonClicked={updatePrefix}>Update</Button>
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
              inputUpdated={(x) => {
                setCurrentLanguage(x.id);
              }}
              options={[
                {
                  content: "English",
                  id: "en_US",
                  active: currentLanguage === "en_US" ? true : false,
                },
                {
                  content: "Turkish",
                  id: "tr_TR",
                  active: currentLanguage === "tr_TR" ? true : false,
                },
              ]}
            />
            <Button buttonClicked={updateLanguage}>Update</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Configuration;
