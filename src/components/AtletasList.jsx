import React, { useEffect, useState } from "react";
import ClubesList from "./ClubesList";
import PosicoesList from "./PosicoesList";

const AtletasList = (props) => {
  const procurarClube = (id) => {
    const clubeCorreto = props.clubes.find((clube) => {
      return clube.id == parseInt(id);
    });

    return clubeCorreto;
  };

  const procurarPosicao = (id) => {
    const posicaoCorreta = props.posicoes.find((posicao) => {
      return posicao.id == parseInt(id);
    });

    return posicaoCorreta;
  };

  return (
    <div className="container">
      <h2 >Atletas mais pontuados da última rodada:</h2>
      <ul className="list">
        {props.atletas.map((atleta, index) => (
          <li key={index} className="list-item player-card">
            <img src={atleta.foto.replace("FORMATO", "220x220")} alt="" />
            <img
              className="club-flag"
              src={procurarClube(atleta.clube_id).escudos["60x60"]}
              alt=""
            />
            <div className="player-info">
              <span className="player-name">{atleta.apelido}</span>
              <br /><span className="player-position">
                {procurarPosicao(atleta.posicao_id).nome} -{" "}
                {procurarPosicao(atleta.posicao_id).abreviacao}
              </span>
            </div>
            <span className="player-score">Pontuação: {atleta.pontuacao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AtletasList;
