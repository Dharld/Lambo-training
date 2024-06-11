import React from "react";
import ReactDOM from "react-dom/client";
import { ToasterProvider } from "./hooks/toast.hook.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.jsx";
import "./_index.scss";
import { ModalProvider } from "./hooks/modal.hook.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <ToasterProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ToasterProvider>
    </ModalProvider>
  </React.StrictMode>
);
