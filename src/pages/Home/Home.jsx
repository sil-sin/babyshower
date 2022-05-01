import React from "react";
import Prediction from "../../components/Prediciton/Prediction";
import Header from "../Header/Header";
import Rsvp from "../Rsvp/Rsvp";
import Wishes from "../Wishes/Wishes";
export default function Home(props) {
  return (
    <div className="homepage">
      <Header />
     <div className="section">
     <Prediction/>
     <Wishes/>
     
     </div>
    </div>
  );
}
