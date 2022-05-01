import React from "react";
import data from "./date.json";
import "./prediction.css";
import "../../App.css";
export default function Prediction() {
  return (
    <div className="predictionBox">
     <h3> Date of Birth Prediction</h3>
      <ul>
        {data.map((e) => {
          return (
            <li className="predictionList">
              <span>{e.name}</span><span>{e.date} May</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
