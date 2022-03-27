import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <div>
        <p>
          Baby Liam is coming, and we will be very happy to celebrate this
          moment with our friends at his baby shower.
          <br />
          <br />
          April 9th
          <br />
          3 pm - 5 pm
          <br />
          Urbanstr. 6 - courtyard (to be confirmed)
          <br />
          <br />
          We hope to see you there!
          <br />
          <br />
          Gi and Sil
          <br />
          <br />
          <br />
          Please RSVP below.
          <br />
          Baby gift registry available <i>above</i>
          <br />
          Easy and quick way to do a Schnelltest before you come: Testzentrum Urbanstr. 1
        </p>
      </div>

      <div>
        <img className="headerimg" src="./logo512.png" alt="headerimg"></img>
      </div>
    </div>
  );
}
