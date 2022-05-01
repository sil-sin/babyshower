import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <div>
        <p>
          Baby Liam is coming, and we will be very happy to celebrate this
          moment with our friends.
          <br />
          <br />
          Gi and Sil
          <br />
          <br />
          <br />
          Baby gift registry available at the <b>Gifts</b> tab above.
          <br />
         Update on Birth coming soon ...
        </p>
      </div>

      <div>
        <img className="headerimg" src="./logo512.png" alt="headerimg"></img>
      </div>
    </div>
  );
}
