// Modules
import { Fragment, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";

// Context
import dashContext from "../../../context/dash/dashContext";

// Other Comp
import Navbar from "../../layout/Navbar/";
import Footer from "../../layout/Footer/";
import Loader from "../../layout/Loader/";
import Command from "./Command";

// Styling
import "./style.css";

const Commands = () => {
  // General Variables
  let commandKeyCount = 0;
  let categoryKeyCount = 0;

  const { getCommands, commands } = useContext(dashContext);
  const [categories, setCategories] = useState(commands ? commands : []);
  const [newCategories, setNewCategories] = useState(commands ? commands : []);
  const [show, setShow] = useState(commands ? true : false);

  useEffect(() => {
    setTimeout(() => {
      getCommands();
    }, 600);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (commands) {
      setCategories(commands);
      setNewCategories(commands);
      setShow(true);
    } else {
      setCategories([]);
      setNewCategories([]);
      setShow(false);
    }
  }, [commands]);

  const loadCategory = (selectedCategory, event) => {
    if (!selectedCategory || !categories || !commands) return;
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
        <p>List of all active commands</p>
      </div>
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
              {categories?.map((d) => {
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
      <Footer />
    </Fragment>
  );
};

export default Commands;
