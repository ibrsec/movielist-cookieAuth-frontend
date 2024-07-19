import AppRotuer from "./router/AppRotuer";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "./app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <CookiesProvider defaultSetOptions={{ path: "/" }}>
          </CookiesProvider> */}
            <AppRotuer />
        </PersistGate>
      </Provider>

      <ToastContainer />
    </div>
  );
}

export default App;
