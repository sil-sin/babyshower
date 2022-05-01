import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import "./Wishes.css";
export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [error, upError] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/wishes`)
      .then((result) => {
        setWishes(result.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  const postWish = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    if (e.key == 13) {
      e.preventDefault();
      return false;
    }
    let name = e.target.name.value;
    if (!message || !name) {
      upError(true);
      setTimeout(() => {
        upError(false);
      }, 10000);
    } else {
      axios
        .post(`${config.API_URL}/wishes`, { name, message })
        .then((result) => {
          console.log("success");
          upError(false);
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="wishes">
      <h3>Wishes for baby Liam</h3>
      <form onSubmit={postWish} className="post-form" method="post">
        <label for="name">
          Nome<i>*</i>
        </label>
        <input type="text" name="name" id="name" placeholder="Nome*" />
        <label for="message">
          Sua mensagem para o Liam<i>*</i>
        </label>
        <textarea
          type="text"
          name="message"
          id="message"
          placeholder="Sua mensagem para o Liam*"
        />
        <button type="submit">Enviar</button>
        {error && <div id="error">Please fill all the fields!</div>}
      </form>
      <div className="posts">
        {wishes &&
          wishes.map((wish) => {
            return (
              <div>
                <h5 className="post-from">{wish.name} :</h5>
                <p className="post">{wish.message}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
