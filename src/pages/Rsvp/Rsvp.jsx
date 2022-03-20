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
      <h2>RSVP</h2>
      <a
        target="_blank" rel="noreferrer noopener"
        href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=M2tycWo4MTg4ZDYwaW5zY3NmNTU4dmszbmUgc2lsdmliZXJhdEBt&amp;tmsrc=silviberat%40gmail.com"
      >
        <img alt="google"
          border="0"
          src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"
        />
      </a>
      <form className="form" onSubmit={handleSubmit}>
        <label for="firstname">First Name</label>
        <input
          onChange={handleChange}
          name="firstname"
          type="text"
          placeholder="First Name"
        />
        <label for="firstname">Last Name</label>
        <input
          onChange={handleChange}
          name="lastname"
          type="text"
          placeholder="Last Name"
        />
        <h4>Are you coming?</h4>
        <select onChange={handleChange} id="coming" name="coming">
          <option disabled selected>
            Your Answer
          </option>
          <option value="coming">Yes</option>
          <option value="not coming">No</option>
        </select>
        <h4 for="plusOne">Are you bringing a +1?</h4>
        <select onChange={handleChange} id="plusOne" name="plusOne">
          <option disabled selected>
            Your Answer
          </option>
          <option value="bringing">Yes</option>
          <option value="not bringing">No</option>
        </select>
        <button type="submit">Send</button>
        {error && <div id="error">Please fill all the fields!</div>}
        {success && <div id="success">Message was sent succesfully</div>}
      </form>
    </div>
  );
}
export default Rsvp;
