import React from "react";
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
          Zoom: <a href="http://">Link</a>
          <br />
          <br />
          Confirme sua presença e escreva uma mensagem para o Liam abaixo.
          <br />
          A lista de presentes está disponível no link acima.
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
