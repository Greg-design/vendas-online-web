import type { Router as RemixRouter } from "@remix-run/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { loginRoutes } from "./modules/login/routes";
import { productScreens } from "./modules/product/routes";
import { useNotification } from "./shared/hooks/useNotification";

const router: RemixRouter = createBrowserRouter([...firstScreenRoutes, ...loginRoutes, ...productScreens]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
