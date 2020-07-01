import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppProvider';
// import Switch from "react-switch";

const ThemeSwitcher = () => {
  const { toggleTheme, themeMode } = useContext(AppContext);
  const handleThemeChange = (e: any) => {
    toggleTheme();
  };
  return <div className="ThemeSwitcher"></div>;
  // return (
  //   <Root>
  //     <h1>Toggle Theme</h1>
  //     <Switch
  //       checked={themeMode === "lightTheme" ? true : false}
  //       className="test"
  //       height={50}
  //       width={120}
  //       checkedIcon={
  //         <Sun
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100%",
  //             fontSize: 35,
  //             paddingLeft: 10,
  //           }}
  //           color={themeMode === "lightTheme" ? "white" : "grey"}
  //           className="light"
  //         />
  //       }
  //       uncheckedIcon={
  //         <Moon
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100%",
  //             fontSize: 35,
  //             paddingLeft: 24,
  //           }}
  //           color={themeMode === "darkTheme" ? "blue" : "blue"}
  //           className="dark"
  //         />
  //       }
  //       onChange={handleThemeChange}
  //     />
  //   </Root>
  // );
};

export default ThemeSwitcher;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .custom-classname .react-toggle--checked .react-toggle-track {
    background-color: red;
    height: 200px;
    width: 200px;
    padding: 30px;
  }
`;
