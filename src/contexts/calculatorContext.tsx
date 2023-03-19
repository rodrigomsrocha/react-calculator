import { createContext, ReactNode, useContext, useState } from "react"

interface CalculatorContextProviderProps {
  children: ReactNode
}

type CalculatorContextType = {
  previousOperationText: string;
  currentOperationText: string;
  currentOperation: string;
  addDigit: (digit: string) => void;
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

  const updateScreen = () => {
    setCurrentOperationText(prev => {
      return prev === "0" ?
        currentOperation :
        prev += currentOperation
    })
  }

  return (
    <CalculatorContext.Provider value={{
      previousOperationText,
      currentOperationText,
      currentOperation,
      addDigit
    }}>
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculatorContext() {
  return useContext(CalculatorContext)
}
