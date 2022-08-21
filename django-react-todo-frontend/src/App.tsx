import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <Container className="App bg-light">
      <Header />
      <Main />
    </Container>
  );
}

export default App;
