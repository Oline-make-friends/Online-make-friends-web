import ThemeProvider from './theme';
import Router from "./routes/routes";

function App() {
  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
