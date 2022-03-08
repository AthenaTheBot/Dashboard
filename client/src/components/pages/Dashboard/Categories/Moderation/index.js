import { Fragment, useContext, useEffect, useState } from "react";
import ChangesDetected from "../../ChangesDeteced";
import dashContext from "../../../../../context/dash/dashContext";
import InputSelect from "../../../../layout/Input/InputSelect";
import Loader from "../../../../layout/Loader";
import updateGuildSettings from "../../../../../utils/updateGuildSettings";
import getAvailableRoles from "../../../../../utils/getAvailableRoles";

function Moderation() {
  const { currentServer: server, setCurrentServer: setServer } =
    useContext(dashContext);
  const [moderation, setModeration] = useState(server?.modules?.moderation);
  const [changeDetected, setChangeDetected] = useState(false);
  const [changesLoading, setChangesLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [availableRoles, setAvailableRoles] = useState();

  useEffect(() => {
    (async () => {
      if (!availableRoles) {
        const roles = await getAvailableRoles(server.id);
        if (roles) {
          roles?.push({
            id: null,
            name: "Not selected",
          });
          setAvailableRoles(roles);
        }
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
  }, [moderation, setModeration]);

  const saveChanges = async (closeMenu) => {
    setChangesLoading(true);

    const success = await updateGuildSettings(
      server.id,
      "moderation",
      moderation
    );

    if (success) {
      server.modules.moderation = moderation;
    }

    setServer(server);

    closeMenu();

    setTimeout(() => {
      setChangesLoading(false);
      setChangeDetected(false);
    }, 700);
  };

  const resetChanges = (closeMenu) => {
    if (server?.modules?.moderation) {
      setModeration(null);
      closeMenu();

      setTimeout(() => {
        setModeration(server.modules.moderation);
        setChangesLoading(false);
        setChangeDetected(false);
      }, 700);
    }
  };

  if (moderation) {
    return (
      <Fragment>
        <div className="module-moderation-container">
          <div className="module-configuration-container">
            <div className="module-prop">
              <h3 className="module-prop-title">Admin Role</h3>
              <p className="module-prop-description">
                Change the admin role in your server.
              </p>
              <hr />
              <div className="module-prop-body">
                <InputSelect
                  inputUpdated={(option) => {
                    setModeration((state) => ({
                      ...state,
                      adminRole: option.id,
                    }));
                  }}
                  options={
                    availableRoles
                      ? availableRoles.map((role) => {
                          return {
                            content: role.name,
                            id: role.id,
                            active:
                              moderation.adminRole === role.id ? true : false,
                          };
                        })
                      : []
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="module-moderation-container">
          <div className="module-configuration-container">
            <div className="module-prop">
              <h3 className="module-prop-title">Mod Role</h3>
              <p className="module-prop-description">
                Change mod role in your server.
              </p>
              <hr />
              <div className="module-prop-body">
                <InputSelect
                  inputUpdated={(option) => {
                    setModeration((state) => ({
                      ...state,
                      modRole: option.id,
                    }));
                  }}
                  options={
                    availableRoles
                      ? availableRoles.map((role) => {
                          return {
                            content: role.name,
                            id: role.id,
                            active:
                              moderation.modRole === role.id ? true : false,
                          };
                        })
                      : []
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="module-moderation-container">
          <div className="module-configuration-container">
            <div className="module-prop">
              <h3 className="module-prop-title">Auto Role</h3>
              <p className="module-prop-description">
                Change auto role in your server.
              </p>
              <hr />
              <div className="module-prop-body">
                <InputSelect
                  inputUpdated={(option) => {
                    setModeration((state) => ({
                      ...state,
                      autoRole: option.id,
                    }));
                  }}
                  options={
                    availableRoles
                      ? availableRoles.map((role) => {
                          return {
                            content: role.name,
                            id: role.id,
                            active:
                              moderation.autoRole === role.id ? true : false,
                          };
                        })
                      : []
                  }
                />
              </div>
            </div>
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
    return <Loader loaderMsg="Loading moderation settings.." active={true} />;
  }
}

export default Moderation;
