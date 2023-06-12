import React, { useEffect, useState } from "react";

const ClubesList = (props) => {
  return (
    <div className="container">
    <ul className="list"></ul>
    <div className="escudo">
      <img src={props.clube.escudos["60x60"]} alt="" />
    </div>
  </div>
  );
};

export default ClubesList;
