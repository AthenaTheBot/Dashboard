// Modules
import $ from "jquery";

// Styling
import "./style.css";

const Command = ({ name, usage, description, reqPerms, reqBotPerms }) => {
  const expandCommand = (e) => {
    if (
      $(e.currentTarget).children(".command-expand").hasClass("command-active")
    ) {
      $(e.currentTarget)
        .children(".command-expand")
        .removeClass("command-active");
    } else {
      $(e.currentTarget).children(".command-expand").addClass("command-active");
    }
  };

  return (
    <div className="command" onClick={expandCommand}>
      <h5>
        at! <span id="command-name">{name}</span>{" "}
        <code>{usage ? usage : "None"}</code>
      </h5>
      <div className="command-expand">
        <p>
          Description:{" "}
          <span id="command-desc">{description ? description : "None"}</span>
        </p>
        <p>
          Required Perms:{" "}
          {reqPerms && reqPerms.length > 0
            ? reqPerms.map((botPerm) => {
                return <code>{botPerm}</code>;
              })
            : "None"}
        </p>
        <p>
          Required Bot Perms:{" "}
          {reqBotPerms && reqBotPerms.length > 0
            ? reqBotPerms.map((botPerm) => {
                return <code>{botPerm}</code>;
              })
            : "None"}
        </p>
      </div>
    </div>
  );
};

export default Command;
