import { useCalculatorContext } from "../../contexts/calculatorContext"
import styles from "./Keyboard.module.scss"

export function Keyboard() {
  const { addDigit } = useCalculatorContext()

  return (
    <div className={styles.keyboard}>
      <button className={styles.operation}>c</button>
      <button className={styles.operation}>&lt;</button>
      <button className={styles.operation}>/</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>7</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>8</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>9</button>
      <button className={styles.operation}>x</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>4</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>5</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>6</button>
      <button className={styles.operation}>-</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>1</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>2</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>3</button>
      <button className={styles.operation}>+</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>.</button>
      <button onClick={(e) => addDigit(e.currentTarget.innerText)}>0</button>
      <button className={styles.operation}>=</button>
    </div>
  )
}
