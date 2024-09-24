import React, { PropsWithChildren } from "react";
import {
  ListenerFn,
  Outlet,
  RouterEvents,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";

function createTestRouter(
  component: (...args: any) => React.ReactNode,
  currentUrl: string,
) {
  const rootRoute = createRootRoute({
    component: Outlet,
  });

  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: currentUrl.split("?")[0],
    component,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: createMemoryHistory({ initialEntries: [currentUrl] }),
  });

  return router;
}

type RenderWithRouterParams = {
  component: (...args: any) => React.ReactNode;
  Wrapper?: React.ComponentType<PropsWithChildren>;
  onNavigate?: ListenerFn<RouterEvents["onBeforeNavigate"]>;
  currentUrl?: string;
};

export function renderWithRouter({
  component,
  Wrapper = React.Fragment,
  onNavigate = () => {},
  currentUrl = "/",
}: RenderWithRouterParams) {
  const router = createTestRouter(component, currentUrl);
  router.subscribe("onBeforeNavigate", onNavigate);
  const renderResult = render(
    <Wrapper>
      {/* @ts-expect-error */}
      <RouterProvider router={router} />;
    </Wrapper>,
  );

  return {
    router,
    renderResult,
  };
}
