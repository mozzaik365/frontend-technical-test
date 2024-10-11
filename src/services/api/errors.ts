export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not Found");
  }
}

export class ServerError extends Error {
  constructor() {
    super("Internal server error");
  }
}

export class ApiError extends Error {
  constructor() {
    super("Internal error");
  }
}
