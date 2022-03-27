import { Fragment, useContext, useEffect, useState } from "react";
import ChangesDetected from "../../ChangesDeteced";
import dashContext from "../../../../../context/dash/dashContext";
import InputSelect from "../../../../layout/Input/InputSelect";
import InputText from "../../../../layout/Input/InputText";
import Loader from "../../../../layout/Loader";
import updateGuildSettings from "../../../../../utils/updateGuildSettings";

function Settings() {
  const {
    currentServer: server,
    setCurrentServer: setServer,
    getAvailableLanguages,
    availableLanguages,
  } = useContext(dashContext);
  const [settings, setSettings] = useState(server?.modules?.settings);
  const [changeDetected, setChangeDetected] = useState(false);
  const [changesLoading, setChangesLoading] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    (async () => {
      if (!availableLanguages) {
        getAvailableLanguages();
      }
    })();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!init) {
      setInit(true);
    } else {
      setChangeDetected(true);
    }
    //eslint-disable-next-line
  }, [settings, setChangeDetected]);

  const saveChanges = async (closeMenu) => {
    setChangesLoading(true);

    const success = await updateGuildSettings(server?.id, "settings", settings);

    if (success) {
      server.modules.settings = settings;
    }

    closeMenu(success, 400);

    setTimeout(() => {
      setServer(server);
      setChangesLoading(false);
      setChangeDetected(false);
    }, 1500);
  };

  const resetChanges = (closeMenu) => {
    if (server?.modules?.settings) {
      setSettings(null);
      closeMenu();

      setTimeout(() => {
        setSettings(server?.modules?.settings);
        setChangesLoading(false);
        setChangeDetected(false);
      }, 700);
    }
  };

  if (settings) {
    return (
      <Fragment>
        <div className="module-prop">
          <h3 className="module-prop-title">Bot Prefix</h3>
          <p className="module-prop-description">
            Change Athena's prefix in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputText
              inputUpdated={(prefix) => {
                setSettings((state) => ({
                  ...state,
                  prefix: prefix,
                }));
              }}
              value={settings?.prefix}
            />
          </div>
        </div>

        <div className="module-prop">
          <h3 className="module-prop-title">Bot Language</h3>
          <p className="module-prop-description">
            Change Athena's language in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputSelect
              inputUpdated={(option) => {
                setSettings((state) => ({
                  ...state,
                  language: option.id,
                }));
              }}
              options={
                availableLanguages
                  ? availableLanguages.map((language) => {
                      return {
                        content: language.label,
                        id: language.id,
                        active:
                          settings?.language === language.id ? true : false,
                      };
                    })
                  : []
              }
            />
          </div>
        </div>

        <ChangesDetected
          resetChanges={resetChanges}
          savedChanges={saveChanges}
          loading={changesLoading}
          active={changeDetected}
        />
      </Fragment>
    );
  } else {
    return <Loader loaderMsg="Loading server settings.." active={true} />;
  }
}

export default Settings;
