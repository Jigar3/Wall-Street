import React from "react";
import namor from "namor";
import "./index.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
    const company = namor.generate({ words: 1, numbers: 0 });
    const quantity = Math.floor(Math.random() * 100);
    const buyPrice = Math.floor(Math.random() * 2000);
    const currPrice = Math.floor(Math.random() * 1000);
    const shareWorth = quantity * currPrice;
    const profitLoss = (currPrice - buyPrice) * quantity;
  return {
    company,
    quantity,
    buyPrice,
    currPrice,
    shareWorth,
    profitLoss
  };rt-tr -odd
};

export function makeData(len = 100) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
  <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;
