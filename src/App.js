import React, { useState } from "react";
import "./App.css";

import classNames from "classnames";

import QuoteBuilder from "./QuoteBuilder";

import { garments } from "./lib";

function App() {
  const [activeGarmentName, setActiveGarmentName] = useState(null);

  return (
    <div className="App">
      <main>
        {garments.map((garment, i) => {
          const isActive = activeGarmentName === garment.name;
          return (
            <div
              key={i}
              className={classNames("garmet", { "garmet--active": isActive })}
            >
              <div className="garmetCard">
                <img
                  src={garment.imageUrl}
                  className="garmetImg"
                  alt={garment.name}
                />
                <h2>{garment.name}</h2>
                <p>{garment.description}</p>
                {isActive ? (
                  <button onClick={() => setActiveGarmentName(null)}>
                    Close
                </button>
                ) : (
                    <button onClick={() => setActiveGarmentName(garment.name)}>
                      Get Quote
                </button>
                  )}
              </div>

              {isActive && <QuoteBuilder garment={garment} />}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
