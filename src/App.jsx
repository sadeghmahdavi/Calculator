import React, { Component } from "react";
import "./App.css";

function applyOperation(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return opsserand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

export default class App extends Component {
  state = {
    numbers: [],
    result: "",
    test: "",
  };

  makeNewNumber = (enteredNumber) => {
    let newNumber = this.state.result;
    newNumber += enteredNumber;
    this.setState({ result: newNumber });
  };

  addNumbersToVector = (operation) => {
    let newNumber = this.state.result;
    let operationsCount = this.state.operationsCount;
    if (this.state.numbers.length == 0) {
      this.setState((prevState) => {
        const numbers = [newNumber, operation];
        return { numbers, result: "", operationsCount: operationsCount++ };
      });
    } else {
      this.setState((prevState) => {
        const numbers = [...prevState.numbers, newNumber, operation];
        return { numbers, result: "", operationsCount: operationsCount++ };
      });
    }
  };

  calculateExpression = () => {
    this.setState((prevState) => {
      const numbers = [...prevState.numbers, this.state.result];
      let arr = numbers;
      let tmp = [];
      for (let i = 1; i < arr.length; i += 2) {
        if (arr[i] === "*" || arr[i] === "/") {
          const left = Number(arr[i - 1]);
          const right = Number(arr[i + 1]);
          const result = applyOperation(left, arr[i], right);
          tmp[tmp.length - 1] = result.toString();
          i++;
        } else {
          tmp.push(arr[i - 1]);
          tmp.push(arr[i]);
          tmp.push(arr[i + 1]);
        }
      }

      arr = tmp.length ? tmp : arr;
      tmp = [];
      let result = Number(arr[0]);

      for (let i = 1; i < arr.length; i += 2) {
        result = applyOperation(result, arr[i], Number(arr[i + 1]));
      }

      this.setState({ numbers: [], result: result.toString() });
    });
  };

  resetNewNumber = () => {
    this.setState({ result: "" });
  };

  resetAllCalculation = () => {
    this.setState({ numbers: [], result: "" });
  };

  render() {
    return (
      <div className="main">
        <p className="result">{this.state.result}</p>
        <table className="table">
          <tr>
            <th className="unusual"></th>
            <th
              className="unusual"
              onClick={this.resetNewNumber}
              onDoubleClick={this.resetAllCalculation}
            >
              AC
            </th>
            <th className="unusual"></th>
            <th
              className="element"
              onClick={() => this.addNumbersToVector("/")}
            >
              ÷
            </th>
          </tr>
          <tr>
            <th className="number" onClick={() => this.makeNewNumber("7")}>
              7
            </th>
            <th className="number" onClick={() => this.makeNewNumber("8")}>
              8
            </th>
            <th className="number" onClick={() => this.makeNewNumber("9")}>
              9
            </th>
            <th
              className="element"
              onClick={() => this.addNumbersToVector("*")}
            >
              ×
            </th>
          </tr>
          <tr>
            <th className="number" onClick={() => this.makeNewNumber("4")}>
              4
            </th>
            <th className="number" onClick={() => this.makeNewNumber("5")}>
              5
            </th>
            <th className="number" onClick={() => this.makeNewNumber("6")}>
              6
            </th>
            <th
              className="element"
              onClick={() => this.addNumbersToVector("-")}
            >
              -
            </th>
          </tr>
          <tr>
            <th className="number" onClick={() => this.makeNewNumber("1")}>
              1
            </th>
            <th className="number" onClick={() => this.makeNewNumber("2")}>
              2
            </th>
            <th className="number" onClick={() => this.makeNewNumber("3")}>
              3
            </th>
            <th
              className="element"
              onClick={() => this.addNumbersToVector("+")}
            >
              +
            </th>
          </tr>
          <tr>
            <th
              className="unusual"
              onClick={() => this.makeNewNumber("0")}
            ></th>
            <th className="unusual" onClick={() => this.makeNewNumber("0")}>
              0
            </th>
            <th
              className="unusual"
              onClick={() => this.makeNewNumber("0")}
            ></th>
            <th className="element" onClick={this.calculateExpression}>
              =
            </th>
          </tr>
        </table>
      </div>
    );
  }
}
