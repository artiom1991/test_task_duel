import { GameProvider } from "./components/GameProvider";
import { GameCotnainer } from "./components/GameContainer";
import "./styles/App.css";

function App() {
  return (
    <GameProvider>
      <GameCotnainer />
    </GameProvider>
  );
}

export default App;
