import { useCalculatorContext } from "../../contexts/calculatorContext"
import styles from "./Screen.module.scss"

export function Screen() {
  const {
    currentOperationText,
    previousOperationText
  } = useCalculatorContext()

  return (
    <div className={styles.screen}>
      <span>{previousOperationText}</span>
      <strong>{currentOperationText}</strong>
    </div>
  )
}
