import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Gift.css";
import LoadingComponent from "../../components/Loading";
export default function Gift() {
  const [list, setList] = useState([]);
  const [fetchin, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gifts-list`)
      .then((result) => {
        console.log(isTaken);
        setList(result.data);
        setFetching(false);
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/taken`)
          .then((result) => {
            setIsTaken(result.data);
            setFetching(false);
          });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const removeGift = (event) => {
    event.preventDefault();

    let _id = event.target.name;
    let value = event.target.children[0].value;
    if (isTaken) {
      setError(true);
    } else {
      if (value === 0) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/taken`, {
            _id,
            taken: false,
          })
          .then((result) => {
            console.log(result.data.taken);
            setTimeout(function () {
              window.location.reload();
            });
          })
          .catch((err) => {
            setError(true);
            console.log(err);
          });
      } else {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/taken`, {
            _id,
            taken: true,
          })
          .then((result) => {
            console.log(result.data);
            setTimeout(function () {
              window.location.reload();
            });
          })
          .catch((err) => {
            setError(true);
            console.log(err);
          });
      }
    }
  };
  if (fetchin) {
    <LoadingComponent />;
  }
  return (
    <div className="giftBox">
      <div className="giftInfo">
        <p>
          O mais importante para nós é que o chá de bebê virtual é uma
          oportunidade de ver nossos amigos que estão longe, e compartilhar a
          alegria deste momento com vocês.
        </p>
        <p>O presente realmente é opcional.</p>
        <p>
          Como estamos longe, a maneira mais fácil de presentear seria uma
          compra online em uma das lojas daqui. Criamos uma lista com alguns
          itens e o link para as lojas para facilitar.
        </p>
        <ul className="comoList">
          Como comprar:
          <li className="comoItems">
           <b> -</b>  escolha um item da lista e clique em ‘shop link’
          </li>
          <li className="comoItems">
           <b> -</b>  os sites estão em alemão, então aconselhamos usar o tradutor antes
            de fazer a compra
          </li>
          <li className="comoItems">
           <b> -</b>  as opções de pagamento provavelmente serão cartão de crédito
            internacional ou Paypal, e o preço será em euro 😬
          </li>
          <li className="comoItems">
           <b> -</b>  o endereço de entrega é:
          </li>
            <p>
              Gisele Russano / Silvi Sinanaj <br />
              (rua) Urbanstr. 6 <br />
              (código postal) 10961
              <br />
              (cidade) Berlin
            </p>
          <li className="comoItems">
           <b> -</b>  se decidir comprar um presente da lista, por favor volte para este
            site e clique no botão ‘Comprei!’ para que o presente saia da lista
            (e assim evitamos que duas pessoas comprem o mesmo presente)
          </li>
        </ul>
        <p>
          Muito complicado? Sem stress! Lembrem-se que o mais importante para
          nós será a sua presença!{" "}
        </p>
        <p>Obrigado! 😊</p>
      </div>
      <ul>
        {error && (
          <div className="error">
            Somebody just took this gift. Please refresh the page and try
            another!
          </div>
        )}
        {list.map((e) => {
          return (
            <form
              key={e._id}
              name={e._id}
              value={e.taken}
              onSubmit={removeGift}
              className="giftlist"
            >
              {e.taken ? (
                <li value={0} className="gift-list disable">
                  <img alt={e.gift} src={`${e.picture}`} className="giftimg" />
                  <div className="gift-details">
                    <h5 className="disable giftname">{e.gift}</h5>
                    <a href={e.link} target="_blank" rel="noreferrer noopener">
                      Shop link{" "}
                      <img className="shopIcon" src=".\cart-icon.png" />
                    </a>
                  </div>
                  <button value={e._id} type="submit" disabled>
                    &#10004;
                  </button>
                </li>
              ) : (
                <li value={1} className="gift-list activelist">
                  <img alt={e.gift} src={e.picture} className="giftimg" />
                  <div className="gift-details">
                    <h5 className="giftname">{e.gift}</h5>
                    <a rel="noreferrer noopener" href={e.link} target="_blank">
                      Shop link{" "}
                      <img className="shopIcon" src=".\cart-icon.png" />
                    </a>
                  </div>
                  <button type="submit">Comprei!</button>
                </li>
              )}
            </form>
          );
        })}
      </ul>
    </div>
  );
}
