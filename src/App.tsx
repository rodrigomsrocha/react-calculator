import { Keyboard } from "./components/Keyboard"
import { Screen } from "./components/Screen"
import { CalculatorContextProvider } from "./contexts/calculatorContext"
import styles from "./styles/App.module.scss"

function App() {
  return (
    <div className={styles.main}>
      <CalculatorContextProvider>
        <Screen />
        <Keyboard />
      </CalculatorContextProvider>
    </div>
  )
}

export default App
