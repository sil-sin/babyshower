import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Gift.css";
import LoadingComponent from "../../components/Loading";
export default function Gift() {
  const [list, setList] = useState([]);
  const [fetchin, setFetching] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gifts-list`)
      .then((result) => {
        setList(result.data);
        setFetching(false);
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/taken`)
          .then((result) => {
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
            throw(err);
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
            throw(err);
            console.log(err);
          });
      }
  };
  if (fetchin) {
    <LoadingComponent />;
  }
  return (
    <div className="giftBox">
      <div className="giftInfo">
        Let’s be honest, we know most of our friends are not experts in baby
        stuff.
        <br />
        To make it easy and stress-free for you, we created this baby gift list
        with our favorites.
        <br />
        <br />
        Thank you! &#128522;
        <br />
        <br />
        <b>Practical information:</b>
        <br />
        -If you purchase something from the list, please click “I’m taking
        this!” to cross the item off the list and avoid double purchases. <br />
        -If you prefer to send it to us directly to our home address instead of
        bringing it with you:
        <br />
        Gisele Russano / Silvi Sinanaj <br />
        Urbanstr. 6 - Berlin 10961
        <br />
        -If buying clothes, size should be between 56-68 (3-6 months)
      </div>
      <ul>
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
                    Taken
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
                  <button type="submit">I’m taking this!</button>
                </li>
              )}
            </form>
          );
        })}
      </ul>
    </div>
  );
}
