import { Keyboard } from "./components/Keyboard"
import { Screen } from "./components/Screen"
import styles from "./styles/App.module.scss"

function App() {
  return (
    <div className={styles.main}>
      <Screen />
      <Keyboard />
    </div>
  )
}

export default App
