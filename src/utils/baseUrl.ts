//in local development, front-end is making requests to localhost:4000
//but, in deployed production, we're making requests to https://to-do-app-faithod.herokuapp.com/

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://to-do-app-faithod.herokuapp.com/"
    : "localhost:4000";

//process.env.NODE_ENV is automatically set to "production" or "development" on the right environment
//
