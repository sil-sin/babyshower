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
      
      <iframe src="https://lista.lavembebe.com.br/t8f9bi" width="100%" height="100%"/>
    </div>
  );
}
