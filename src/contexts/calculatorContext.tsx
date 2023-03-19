import { createContext, ReactNode, useContext, useState } from "react"

interface CalculatorContextProviderProps {
  children: ReactNode
}

type CalculatorContextType = {
  previousOperationText: string;
  currentOperationText: string;
  currentOperation: string;
  addDigit: (digit: string) => void;
  handleOperation: (operation: string) => void;
}

const CalculatorContext = createContext({} as CalculatorContextType)

export function CalculatorContextProvider(
  { children }: CalculatorContextProviderProps
) {
  const [previousOperationText, setPreviousOperationText] = useState("")
  const [currentOperationText, setCurrentOperationText] = useState("0")
  let currentOperation = ""

  const addDigit = (digit: string) => {
    if (digit === "." && currentOperationText.includes(".")) {
      return
    }

    currentOperation = digit
    updateScreen()
  }

  const handleOperation = (operation: string) => {
    let operationValue
    const previous = +previousOperationText.slice(0, -1)
    const current = +currentOperationText

    switch (operation) {
      case "+":
        operationValue = previous + current
        updateScreen(operationValue, operation, current, previous)
        break;

      default:
        break;
    }
  }

  const updateScreen = (
    operationValue: null | number = null,
    operation: null | string = null,
    current: null | number = null,
    previous: null | number = null,
  ) => {
    console.log(operationValue, operation, current, previous);

    if (operationValue === null) {
      setCurrentOperationText(prev => {
        return prev === "0" ?
          currentOperation :
          prev += currentOperation
      })
    } else {
      if (previous === 0) {
        operationValue = current
      }

      setPreviousOperationText(`${operationValue}${operation}`)
      setCurrentOperationText("0")
    }
  }

  return (
    <CalculatorContext.Provider value={{
      previousOperationText,
      currentOperationText,
      currentOperation,
      addDigit,
      handleOperation
    }}>
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculatorContext() {
  return useContext(CalculatorContext)
}
