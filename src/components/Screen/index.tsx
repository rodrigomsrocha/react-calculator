import { useCalculatorContext } from "../../contexts/calculatorContext";
import styles from "./Screen.module.scss";

export function Screen() {
  const { currentOperation, previousOperation } = useCalculatorContext();

  return (
    <div className={styles.screen}>
      <span>{previousOperation}</span>
      <strong>{currentOperation}</strong>
    </div>
  );
}
