import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { authProvider, dataProvider, liveProvider } from "./provider"
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { Home, ForgotPassword, Login, Register } from "./pages";
import { App as AntdApp } from "antd";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { TasksListPage } from "./pages/tasks/list";
import { CompanyListPage } from "./pages/company/list";
import { CompanyCreateModal } from "./pages/company/create";
import { CompanyEditPage } from "./pages/company/edit";
function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "TBq6AB-Zl2301-ykJa67",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<Navigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/companies">
                    <Route index element={<CompanyListPage />} />
                    <Route path="new" element={<CompanyCreateModal />} />
                    <Route path="edit/:id" element={<CompanyEditPage />} />
                  </Route>
                  <Route path="/tasks" element={<TasksListPage />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter >
  );
}

export default App;
