import React from "react";
import ReactDOM from "react-dom/client";
import { ToasterProvider } from "./hooks/toast.hook.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.jsx";
import "./_index.scss";
import { ModalProvider } from "./hooks/modal.hook.jsx";
import { DataProvider } from "./pages/admin/components/DataPovider/DataProvider.jsx";
import LandingDataProvider from "./pages/admin/components/EditDraftCourse/components/LandingProvider.jsx";
import { ContentProvider } from "./pages/admin/components/ContentProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <ToasterProvider>
        <Provider store={store}>
          <ContentProvider>
            <DataProvider>
              <LandingDataProvider>
                <RouterProvider router={router} />
              </LandingDataProvider>
            </DataProvider>
          </ContentProvider>
        </Provider>
      </ToasterProvider>
    </ModalProvider>
  </React.StrictMode>
);
