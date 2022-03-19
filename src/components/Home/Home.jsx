import React from "react";
import Header from "../Header/Header";
import Rsvp from "../Rsvp/Rsvp";
import Wishes from "../Wishes/Wishes";
export default function Home(props) {
  const { list } = props;
  return (
    <div className="homepage">
      <Header />
      <div className="section">
        <Rsvp />
        <Wishes />
      </div>
    </div>
  );
}
