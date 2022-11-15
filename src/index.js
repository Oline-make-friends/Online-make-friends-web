import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { persistor, store } from "./redux/store";
import { CometChat } from "@cometchat-pro/chat";

import * as CONSTANT from "./constans/constans";
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(CONSTANT.APP_REGION)
  .build();
CometChat.init(CONSTANT.APP_ID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  (error) => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);
CometChat.login(`admin`, CONSTANT.AUTH_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </ChakraProvider>
);

reportWebVitals();
