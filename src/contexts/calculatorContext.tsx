import { createContext, ReactNode, useContext, useState } from "react";

interface CalculatorContextProviderProps {
  children: ReactNode;
}

type CalculatorContextType = {
  previousOperation: string;
  currentOperation: string;
  handleTyping: (key: string) => void;
};

const CalculatorContext = createContext({} as CalculatorContextType);

export function CalculatorContextProvider({
  children,
}: CalculatorContextProviderProps) {
  const [previousOperation, setPreviousOperation] = useState("");
  const [currentOperation, setCurrentOperation] = useState("0");

  const handleTyping = (key: string) => {
    const nonDisplayingOperations = ["c", "<", "="];
    const mathOperations = ["+", "-", "x", "/"];

    if (mathOperations.includes(key)) {
      handleMathOperations();
    }

    if (nonDisplayingOperations.includes(key)) {
      if (key === "=" && !currentOperation.match(/[\+\-\x/]/)) return;
      handleNonDisplayingOperations(key);
      return;
    }

    setCurrentOperation((prev) => {
      if (key.match(/[\+\-\x\/]/)) {
        return `${prev}${key}`;
      } else if (prev === "0") {
        return key;
      } else if (
        prev[prev.length - 1].match(/[\+\-\x/]/) &&
        key.match(/[\+\-\x/]/)
      ) {
        return prev;
      } else if (prev.includes(".") && key === ".") return prev;
      return (prev += key);
    });
  };

  const handleMathOperations = () => {
    const alreadyHasAnOperation = currentOperation.match(/(?<!^)[\+\-\x\/]/);
    if (alreadyHasAnOperation) {
      setPreviousOperation(currentOperation);
      const result = calculateExpression();
      setCurrentOperation(`${result}`);
      return;
    }
  };

  const handleNonDisplayingOperations = (key: string) => {
    switch (key) {
      case "c":
        setPreviousOperation("");
        setCurrentOperation("0");
        break;
      case "<":
        setCurrentOperation((prev) => {
          return prev.length === 1 ? "0" : prev.slice(0, -1);
        });
        break;
      case "=":
        setPreviousOperation("");
        const result = calculateExpression();
        setCurrentOperation(`${result}`);
        break;
      default:
        break;
    }
  };

  const calculateExpression = () => {
    let firstTerm;
    let secondTerm;
    let currentOperator;
    if (currentOperation.startsWith("-")) {
      const currentOperationWithoutMinus = currentOperation.slice(
        1,
        currentOperation.length
      );
      const indexOfOperator = currentOperationWithoutMinus.search(/[\+\-\x/]/);
      firstTerm = +`-${currentOperationWithoutMinus.slice(0, indexOfOperator)}`;
      currentOperator = currentOperationWithoutMinus[indexOfOperator];
      secondTerm = +currentOperationWithoutMinus.slice(
        indexOfOperator + 1,
        currentOperationWithoutMinus.length
      );
    } else {
      const indexOfOperator = currentOperation.search(/[\+\-\x/]/);
      firstTerm = +currentOperation.slice(0, indexOfOperator);
      currentOperator = currentOperation[indexOfOperator];
      secondTerm = +currentOperation.slice(
        indexOfOperator + 1,
        currentOperation.length
      );
    }

    console.log(firstTerm, secondTerm, currentOperator);

    switch (currentOperator) {
      case "+":
        return firstTerm + secondTerm;
      case "-":
        return firstTerm - secondTerm;
      case "x":
        return firstTerm * secondTerm;
      case "/":
        return firstTerm / secondTerm;
      default:
        break;
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        previousOperation,
        currentOperation,
        handleTyping,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculatorContext() {
  return useContext(CalculatorContext);
}
