const { hostname, port, protocol } = window.location;
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${protocol}//${hostname}:${port}/`
    : `http://127.0.0.1:7466`;

export default {
  projectName: "ACG Door",
  copyright: "© 2019 All Rights Reserved ACG",
  powered: "ACG",
  enableAuth: false,

  http: {
    baseURL: baseUrl,
    noToken: false,

    timeout: 10 * 1000
  },
  powerURL: "acg.com",
  restURL: "http://127.0.0.1:" + "6321"
};
