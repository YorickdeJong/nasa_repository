import {
  BrowserRouter as Router,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";

import {
  Arwes,
  ThemeProvider,
  createTheme,
} from "arwes";

import { theme, resources } from "./settings";

const App = () => {
  return <ThemeProvider theme={createTheme(theme)}>
    <Arwes animate background={resources.background.large} pattern={resources.pattern}>
      {anim => (
        <Router>
          <AppLayout show={anim.entered} />
        </Router>
      )}
    </Arwes>
  </ThemeProvider>
}

export default App;
