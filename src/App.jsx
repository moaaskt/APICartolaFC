import AtletasList from "./components/AtletasList";
import PosicoesList from "./components/PosicoesList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [atletas, setAtletas] = useState([]);
  const [atletasPesquisados, setAtletasPesquisados] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [posicoes, setPosicoes] = useState([]);
  const [valorPesquisado, setValorPesquisado] = useState("");
  const [ordenarPorPontuacao, setOrdenarPorPontuacao] = useState(false);
  const [rodadaSelecionada, setRodadaSelecionada] = useState(1)

  const pesquisarJogador = () => {
    const atletasPesquisados = atletas.filter((atleta) => {
      return removerAcentos(atleta.apelido).includes(
        removerAcentos(valorPesquisado)
      );
    });

    if (atletasPesquisados.length === 0) {
      alert("Atleta não encontrado");
    } else {
      if (ordenarPorPontuacao) {
        atletasPesquisados.sort((a, b) => b.pontuacao - a.pontuacao);
        console.log(atletasPesquisados);
      }
      setAtletasPesquisados(atletasPesquisados);
    }
  };

  const toggleOrdenarPorPontuacao = () => {
    setOrdenarPorPontuacao(!ordenarPorPontuacao);
  };

  const removerAcentos = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    const ordernarAtletas = atletas
    if (ordenarPorPontuacao) {
      const atletasOrdenados = ordernarAtletas.sort((a, b) => b.pontuacao - a.pontuacao);
      setAtletasPesquisados(atletasOrdenados);
    }
  }, [ordenarPorPontuacao]);

  useEffect(() => {
    const fetchAtletas = async () => {
      try {
        const response = await axios.get(
          `https://api.cartola.globo.com/atletas/pontuados/${rodadaSelecionada}` 
        );
        setAtletas(Object.values(response.data.atletas));
        setAtletasPesquisados(Object.values(response.data.atletas));
        setClubes(Object.values(response.data.clubes));
        setPosicoes(Object.values(response.data.posicoes));
        setOrdenarPorPontuacao(false)
      } catch (error) {
        console.error("Error fetching atletas:", error);
      }
    };

    fetchAtletas();
  }, [rodadaSelecionada]);

  return (
    <div>
      <img className="logopng" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cartola_FC_logo.svg/2560px-Cartola_FC_logo.svg.png" alt="" />
      <div className="content">
      <input
        onChange={(event) => setValorPesquisado(event.target.value)}
        type="text"
        placeholder="Nome do jogador"
      />{" "}
      <button onClick={pesquisarJogador}>Pesquisar</button>
      <button onClick={toggleOrdenarPorPontuacao}>
        
        {ordenarPorPontuacao
          ? "Ordenado por Pontuação"
          : "Ordenar por Pontuação"}
      </button>
      <select onChange={ (event)=>{
        setRodadaSelecionada(event.target.value)
      }}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </select>
      </div>
      {atletasPesquisados && (
        <AtletasList
          atletas={atletasPesquisados}
          clubes={clubes}
          posicoes={posicoes}
        />
      )}
    </div>
  );
};

export default App;
