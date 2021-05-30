import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [expression, setExpression] = useState("0");

  function clear() {
    setExpression("0");
  }

  function updateExpression(value) {
    if (value === "d") {
      if (expression !== "0") {
        if (expression.length === 1) {
          setExpression("0");
        } else {
          setExpression((prevExpression) => prevExpression.slice(0, -1));
        }
      }
    } else if (value === ".") {
      const pos = expression.search(/\d+(?:\.\d+)?$/g);
      let currentTerm = "";
      if (pos === -1) {
        currentTerm = expression.slice(0);
      } else {
        currentTerm = expression.slice(pos);
      }
      if (!currentTerm.includes(".")) {
        setExpression((prevExpression) => prevExpression + value);
      }
    } else {
      if (expression === "0") {
        setExpression(value);
      } else {
        setExpression((prevExpression) => prevExpression + value);
      }
    }
  }

  function calculateExpression() {
    if (
      /^[-+]?\d+(?:\.\d+)?(?:[-+/*][-+]{0,2}\d+(?:\.\d+)?)*$/g.test(expression)
    ) {
      const operators = expression.match(
        /[+/*](?=\d)|(?<=\d)[-+/*](?=[-+/*]*-\d)|(?<=\d)[-+/*](?=\d)/g
      );
      const terms = expression
        .split(/(?<=\d)[-+/*]/g)
        .join()
        .split(/,[-+/*]*?(?=-?\d)/g);
      let result = parseFloat(terms[0]);
      for (let i = 0; i < terms.length - 1; i++) {
        if (operators[i] === "-") {
          result -= parseFloat(terms[i + 1]);
        } else if (operators[i] === "+") {
          result += parseFloat(terms[i + 1]);
        } else if (operators[i] === "/") {
          result /= parseFloat(terms[i + 1]);
        } else {
          result *= parseFloat(terms[i + 1]);
        }
      }
      setExpression(result.toString());
    }
  }

  return (
    <div id="calculator">
      <p id="display">{expression}</p>
      <div id="button-pad">
        <div id="number-pad">
          <button
            id="one"
            className="calculator-button"
            onClick={() => {
              updateExpression("1");
            }}
          >
            1
          </button>
          <button
            id="two"
            className="calculator-button"
            onClick={() => {
              updateExpression("2");
            }}
          >
            2
          </button>
          <button
            id="three"
            className="calculator-button"
            onClick={() => {
              updateExpression("3");
            }}
          >
            3
          </button>
          <button
            id="four"
            className="calculator-button"
            onClick={() => {
              updateExpression("4");
            }}
          >
            4
          </button>
          <button
            id="five"
            className="calculator-button"
            onClick={() => {
              updateExpression("5");
            }}
          >
            5
          </button>
          <button
            id="six"
            className="calculator-button"
            onClick={() => {
              updateExpression("6");
            }}
          >
            6
          </button>
          <button
            id="seven"
            className="calculator-button"
            onClick={() => {
              updateExpression("7");
            }}
          >
            7
          </button>
          <button
            id="eight"
            className="calculator-button"
            onClick={() => {
              updateExpression("8");
            }}
          >
            8
          </button>
          <button
            id="nine"
            className="calculator-button"
            onClick={() => {
              updateExpression("9");
            }}
          >
            9
          </button>
          <button
            id="zero"
            className="calculator-button"
            onClick={() => {
              updateExpression("0");
            }}
          >
            0
          </button>
          <button
            id="decimal"
            className="calculator-button"
            onClick={() => {
              updateExpression(".");
            }}
          >
            .
          </button>
          <button
            id="equals"
            className="calculator-button"
            onClick={calculateExpression}
          >
            &#x3d;
          </button>
        </div>
        <div id="operator-pad">
          <button
            id="delete"
            className="calculator-button"
            onClick={() => {
              updateExpression("d");
            }}
          >
            &#x2190;
          </button>
          <button id="clear" className="calculator-button" onClick={clear}>
            AC
          </button>
          <button
            id="divide"
            className="calculator-button"
            onClick={() => {
              updateExpression("/");
            }}
          >
            &#xf7;
          </button>
          <button
            id="multiply"
            className="calculator-button"
            onClick={() => {
              updateExpression("*");
            }}
          >
            &#xd7;
          </button>
          <button
            id="subtract"
            className="calculator-button"
            onClick={() => {
              updateExpression("-");
            }}
          >
            &#x2212;
          </button>
          <button
            id="add"
            className="calculator-button"
            onClick={() => {
              updateExpression("+");
            }}
          >
            &#x2b;
          </button>
        </div>
      </div>
    </div>
  );
}
