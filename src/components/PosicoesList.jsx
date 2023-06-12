import React, { useEffect, useState } from "react";

const PosicoesList = (props) => {
  return (
    <div className="container">
    <span className="posicao">
      Posição do atleta: {props.posicao.nome} - {props.posicao.abreviacao}
    </span>
  </div>
  );
};

export default PosicoesList;
