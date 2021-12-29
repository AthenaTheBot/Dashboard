// Modules
import { Fragment, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";

// Context
import dashContext from "../../../context/dash/dashContext";

// Other Comp
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Loader from "../../layout/Loader/Loader";
import Command from "./Command/Command";

// Styling
import "./Commands.css";

const Commands = () => {
  // General Variables
  let commandKeyCount = 0;
  let categoryKeyCount = 0;

  const { getCommands, commands } = useContext(dashContext);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);

  useEffect(() => {
    getCommands();
  }, []);

  useEffect(() => {
    if (commands) {
      setCategories(commands);
      setNewCategories(commands);
      setShow(true);
    } else {
      setShow(false);
    }
    //eslint-disable-next-line
  }, [commands]);

  const loadCategory = (selectedCategory, event) => {
    if (!selectedCategory) return;
    let newData;
    if (selectedCategory === "All") newData = categories;
    else {
      let updateArray = [];
      updateArray.push(categories);
      newData = updateArray.filter((x) => x.category !== selectedCategory);

      for (var i = 0; i < newData.length; i++) {
        newData[i].commands = [];
      }

      newData.push(categories.find((x) => x.category === selectedCategory));
    }

    const category = document.getElementsByClassName("category");

    for (var t = 0; t < category.length; t++) {
      category[t].classList = ["category"];
    }

    setNewCategories(newData);
    event.currentTarget.classList.add("activeCategory");

    $(".command .command-active").removeClass("command-active");
  };

  return (
    <Fragment>
      <Helmet>
        <title>Commands - Athena</title>
      </Helmet>
      <Navbar activeElement="commands" />
      <div className="command-page-header">
        <h1 style={{ color: "var(--primary-theme)" }}>Commands</h1>
        <p>List of all commands that is currently running on Athena.</p>
      </div>
      <main>
        <div className="commands-container">
          {show ? (
            <Fragment>
              <div className="categories">
                <h5
                  className="category activeCategory"
                  onClick={(event) => {
                    loadCategory("All", event);
                  }}
                >
                  All
                </h5>
                {categories.map((d) => {
                  categoryKeyCount++;
                  return (
                    <h5
                      onClick={(event) => {
                        loadCategory(d.category, event);
                      }}
                      key={categoryKeyCount}
                      className="category"
                    >
                      {d.category}
                    </h5>
                  );
                })}
              </div>
              <div className="commands">
                {newCategories.map((d) => {
                  const commands = d.commands.map((command) => {
                    commandKeyCount++;
                    return (
                      <Command
                        name={command.name}
                        usage={command.usage}
                        description={command.description}
                        reqPerms={command.required_perms}
                        reqBotPerms={command.required_bot_perms}
                        key={commandKeyCount}
                      />
                    );
                  });

                  return commands;
                })}
              </div>
            </Fragment>
          ) : (
            <Loader active={true} />
          )}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Commands;
