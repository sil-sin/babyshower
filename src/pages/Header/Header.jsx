import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <div>
        <p>
          Queridos amigos,
          <br />
          <br />
          O Liam está chegando, e queremos compartilhar este momento especial
          com vocês.
          <br />
          <br />
         <b> CHÁ DE BEBÊ VIRTUAL</b>
          <br />
          Domingo, 10 de Abril
          <br /> 11:00 (BRT)
          <br /> <br />
         Clique aqui para abrir o Zoom no dia e horário do evento
         <a  target={"_blank"} href="https://us05web.zoom.us/j/2884854644?pwd=Y0R4aUQ3VmRCN1kvV3g0YTdyZmUwQT09
">
         <button style={{"margin":"0 10px"}}>

          Zoom
          </button> 
          </a>
          <br />
          <br />
          Confirme sua presença e escreva uma mensagem para o Liam abaixo.
          <br />
          Clique aqui se quiser contribuir para o enxoval do bebê <Link to={"/gifts-list"}> <button style={{"margin":"5px 10px"}}>Presentes</button></Link>
          <br />
          <br />
          <br />
          Gi & Sil
        </p>
      </div>

      <div>
        <img className="headerimg" src="./logo512.png" alt="headerimg"></img>
      </div>
    </div>
  );
}
