const { hostname, port, protocol } = window.location;
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${protocol}//${hostname}:${port}/`
    : `http://127.0.0.1:8866`;

export default {
  projectName: "JuvoS Resume",
  copyright: "© 2020 All Rights Reserved JuvoS",
  powered: "JuvoS",
  version: "0.0.1",
  enableAuth: false,

  http: {
    baseURL: baseUrl,
    noToken: false,

    timeout: 10 * 1000
  },
  powerURL: "resume.qimuren.com",
  restURL: "http://127.0.0.1:" + "8866"
};
