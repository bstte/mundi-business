import React from "react";
import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./redux/store";
import {Toaster} from 'sonner'

function App() {
  return (
    <Provider store={store}>
      <Toaster/>
      <AppRoutes />
    </Provider>
  );
}

export default App;
