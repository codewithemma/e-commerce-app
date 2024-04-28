import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <FontAwesomeIcon
      icon={faCircleNotch}
      spin
      size="lg"
      style={{ color: "#fff" }}
    />
  );
};

export default Loader;
