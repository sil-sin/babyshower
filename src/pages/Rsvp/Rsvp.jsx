import React, { useState } from "react";
import "./Rsvp.css";
import config from "../../config";
import { init, send } from "@emailjs/browser";
init(process.env.MAIL_USER_ID);

function Rsvp() {
  const [error, upError] = useState(false);
  const [success, upSuccess] = useState(false);
  const [toSend, setToSend] = useState({
    firstname: null,
    lastname: null,
    coming: null,
  });
  // email send for rsvm emailjs
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, coming } = e.target;
    if (!firstname.value || !lastname.value||!coming.value) {
      console.log("empty");
      upError(true);
      setToSend({
        firstname: null,
        lastname: null,
        coming:null,
        
      });
    } else {
      console.log("sending", toSend);
      send(config.SERVICE_ID, config.MAIL_TEMPLATE, toSend, config.MAIL_USER_ID)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);

          upSuccess(true);
          // eslint-disable-next-line no-unused-vars
          const timeId = setTimeout(() => {
            upSuccess(false);
          }, 6000);
          // eslint-disable-next-line no-unused-vars
          const timedId = setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setToSend({ ...toSend, [e.target.name]: e.target.value });
    upError(false);
  };

  return (
    <div className="rsvp">
      <h3>RSVP</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label for="firstname">Nome<i>*</i></label>
        <input
          onChange={handleChange}
          name="firstname"
          type="text"
          placeholder="Nome*"
        />
        <label for="lastname">Sobrenome<i>*</i></label>
        <input
          onChange={handleChange}
          name="lastname"
          type="text"
          placeholder="Sobrenome*"
        />
        <label>Você vai participar?</label>
        <select onChange={handleChange} id="coming" name="coming">
          <option disabled selected style={{color:"green"}}>
         Resposta
        </option>
          <option value="coming">Sim</option>
          <option value="not coming">Não</option>
        </select>
        <button type="submit">Enviar</button>
        {error && <div id="error">Please fill all the fields!</div>}
        {success && <div id="success">Message was sent succesfully</div>}
      </form>
    </div>
  );
}
export default Rsvp;
