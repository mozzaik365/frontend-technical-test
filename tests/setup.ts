import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());

beforeEach(() => {
  window.scrollTo = vitest.fn();
});

afterEach(() => {
  server.resetHandlers();
  vitest.clearAllMocks();
  cleanup();
});
afterAll(() => server.close());
