import React from "react";
import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
