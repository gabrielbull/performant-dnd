import { createGlobalStyle } from "styled-components";
import { Appointments } from "./components/appointments.tsx";
import { DndProvider } from "./providers/dnd-provider.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <DndProvider>
        <Appointments />
      </DndProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

export default App;
