import React from "react";
import "./Gift.css";
export default function Gift(props) {
  const { list, removeGift} = props;

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
                    <a href={e.link} target="_blank">
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
                    <a href={e.link} target="_blank">
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
