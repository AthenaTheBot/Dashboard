import { Fragment, useContext, useEffect, useState } from "react";
import ChangesDetected from "../../ChangesDeteced";
import dashContext from "../../../../../context/dash/dashContext";
import InputRole from "../../../../layout/Input/InputRole";
import Loader from "../../../../layout/Loader";
import updateGuildSettings from "../../../../../utils/updateGuildSettings";

function Moderation() {
  const { currentServer: server, setCurrentServer: setServer } =
    useContext(dashContext);
  const [moderation, setModeration] = useState(server?.modules?.moderation);
  const [changeDetected, setChangeDetected] = useState(false);
  const [changesLoading, setChangesLoading] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      if (!server?.availableRoles) return;
      setInit(true);
    } else {
      setChangeDetected(true);
    }
    //eslint-disable-next-line
  }, [moderation, setModeration, setInit]);

  const saveChanges = async (closeMenu) => {
    setChangesLoading(true);

    const success = await updateGuildSettings(
      server?.id,
      "moderation",
      moderation
    );

    if (success) {
      server.modules.moderation = moderation;
    }

    closeMenu(success, 400);

    setTimeout(() => {
      setServer(server);
      setChangesLoading(false);
      setChangeDetected(false);
    }, 1500);
  };

  const resetChanges = (closeMenu) => {
    if (server?.modules?.moderation) {
      setModeration(null);
      closeMenu();

      setTimeout(() => {
        setModeration(server?.modules?.moderation);
        setChangesLoading(false);
        setChangeDetected(false);
      }, 700);
    }
  };

  if (moderation) {
    return (
      <Fragment>
        <div className="module-prop">
          <h3 className="module-prop-title">Admin Role</h3>
          <p className="module-prop-description">
            Change the admin role in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputRole
              onRoleUpdate={(roles) => {
                if (roles?.length === 0) roles[0] = { id: null };
                setModeration((state) => ({
                  ...state,
                  adminRole: roles[0].id,
                }));
              }}
              roleLimit={1}
              roles={
                server?.availableRoles
                  ? server?.availableRoles.map((role) => {
                      return {
                        name: role.name,
                        id: role.id,
                        color: role.color,
                        active: moderation.adminRole === role.id ? true : false,
                      };
                    })
                  : []
              }
            />
          </div>
        </div>

        <div className="module-prop">
          <h3 className="module-prop-title">Mod Role</h3>
          <p className="module-prop-description">
            Change mod role in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputRole
              onRoleUpdate={(roles) => {
                if (roles?.length === 0) roles[0] = { id: null };
                setModeration((state) => ({
                  ...state,
                  modRole: roles[0].id,
                }));
              }}
              roleLimit={1}
              roles={
                server?.availableRoles
                  ? server?.availableRoles.map((role) => {
                      return {
                        name: role.name,
                        id: role.id,
                        color: role.color,
                        active: moderation.modRole === role.id ? true : false,
                      };
                    })
                  : []
              }
            />
          </div>
        </div>

        <div className="module-prop">
          <h3 className="module-prop-title">Auto Role</h3>
          <p className="module-prop-description">
            Change auto role in your server.
          </p>
          <hr />
          <div className="module-prop-body">
            <InputRole
              onRoleUpdate={(roles) => {
                if (roles?.length === 0) roles[0] = { id: null };
                setModeration((state) => ({
                  ...state,
                  autoRole: roles[0].id,
                }));
              }}
              roleLimit={1}
              roles={
                server?.availableRoles
                  ? server?.availableRoles.map((role) => {
                      return {
                        name: role.name,
                        id: role.id,
                        color: role.color,
                        active: moderation.autoRole === role.id ? true : false,
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
    return <Loader loaderMsg="Loading moderation settings.." active={true} />;
  }
}

export default Moderation;
