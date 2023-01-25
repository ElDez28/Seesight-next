import cookie from "cookie";
function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

module.exports = parseCookies;
