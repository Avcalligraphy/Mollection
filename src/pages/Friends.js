import React, { useState } from "react";

import Wrapper from "../components/Calc/Wrapper";
import Screen from "../components/Calc/Screen";
import ButtonBox from "../components/Calc/ButtonBox";
import Button from "../components/Calc/Button";
import AuthenticatedUser from "../Layouts/Authenticated";
import { NavLink, useNavigate } from "react-router-dom";
import { MoneyList } from "../components/BoxMoney/MoneyList";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const zeroDivisionError = "Can't divide with 0";

const Friends = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const buttonClickHandler = (e, btn) => {
    btn === "C" || calc.res === zeroDivisionError
      ? resetClickHandler()
      : btn === "+-"
      ? invertClickHandler()
      : btn === "%"
      ? percentClickHandler()
      : btn === "="
      ? equalsClickHandler()
      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
      ? signClickHandler(e)
      : btn === "."
      ? comaClickHandler(e)
      : numClickHandler(e);
  };
  const displayResultInImages = () => {
    const resultValue = removeSpaces(calc.res);
    console.log(calc.res);

    if (resultValue === zeroDivisionError) {
      return []; // Handle division by zero error
    }

    const resultImages = [];
    let remainingValue = parseInt(resultValue);

    for (let i = 0; i < MoneyList.length; i++) {
      const money = MoneyList[i];
      const moneyValue = parseInt(money.title);

      if (remainingValue >= moneyValue) {
        const count = Math.floor(remainingValue / moneyValue);
        for (let j = 0; j < count; j++) {
          resultImages.push(money.moneyImg);
        }
        remainingValue %= moneyValue;
      }

      if (remainingValue === 0) {
        break; // Exit the loop if the remaining value is zero
      }
    }

    return resultImages;
  };
  const resultImages = displayResultInImages();
  console.log(resultImages);
  return (
    <AuthenticatedUser>
      <div className="flex justify-center items-center pt-[10px] ">
        <Wrapper>
          <Screen value={calc.num ? calc.num : calc.res} />
          <div className="grid grid-cols-2 gap-[10px]">
            {resultImages.map((image, index) => (
              <img key={index} src={image} alt={`Money ${index + 1}`} />
            ))}
          </div>
          <ButtonBox>
            {btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={(e) => buttonClickHandler(e, btn)}
                />
              );
            })}
          </ButtonBox>
        </Wrapper>
      </div>
    </AuthenticatedUser>
  );
};

export default Friends;
