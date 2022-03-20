import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import "./Gift.css";
export default function Gift() {
  const [list, setList] = useState([]);
  const[fetchin,setFetching]=useState(true)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/gifts-list`)
      .then((result) => {
        setList(result.data);
        setFetching(false)
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
        .post(`${process.env.REACT_APP_SERVER_URL}/taken`, { _id, taken: false })
        .then((result) => {
          console.log(result.data.taken);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/taken`, { _id, taken: true })
        .then((result) => {
          console.log(result.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if(fetchin){
    <p>Loading</p>
  }
  return (
    <div className="giftBox">
      <h1>Gifts</h1>

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
                      Shop link
                    </a>
                  </div>
                  <button value={e._id} type="submit">
                    Taken
                  </button>
                </li>
              ) : (
                <li
                  value={1}
                  className="gift-list activelist"
                >
                  <img alt={e.gift} src={e.picture} className="giftimg" />
                  <div className="gift-details">
                    <h5 className="giftname">{e.gift}</h5>
                    <a rel="noreferrer noopener"  href={e.link} target="_blank">
                      Shop link
                    </a>
                  </div>
                  <button type="submit">Purchase Gift</button>
                </li>
              )}
            </form>
          );
        })}
      </ul>
    </div>
  );
}
