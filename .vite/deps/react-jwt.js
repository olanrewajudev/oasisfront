import {
  require_react
} from "./chunk-PWUE5V7V.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/react-jwt/dist/index.modern.js
var import_react = __toESM(require_react());
for (n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = /* @__PURE__ */ new Map(), o = 0; o < n.length; o++) {
  a = o.toString(2);
  a = "0".repeat(6 - a.length) + a, t.set(n.charCodeAt(o), a);
}
var a;
var n;
var t;
var o;
function l(e2) {
  try {
    if ("string" != typeof e2 || 3 !== e2.split(".").length)
      return null;
    var r2 = function(e3) {
      for (var r3 = "", n2 = 0; n2 < e3.length; n2++)
        r3 += t.get(e3.charCodeAt(n2));
      r3 = r3.slice(0, r3.length - r3.length % 8);
      for (var o = [], a = 0; a < r3.length / 8; a++)
        o.push(r3.slice(8 * a, 8 * a + 8));
      return o;
    }(e2.split(".")[1].replaceAll("=", "").replaceAll("-", "+").replaceAll("_", "/")).map(function(e3) {
      return parseInt(e3, 2);
    }), n = decodeURIComponent(function(e3) {
      for (var r3, n2 = "", t = e3.length, o = 0; o < t; o++)
        r3 = e3[o], n2 += String.fromCodePoint(r3 > 251 && r3 < 254 && o + 5 < t ? 1073741824 * (r3 - 252) + (e3[++o] - 128 << 24) + (e3[++o] - 128 << 18) + (e3[++o] - 128 << 12) + (e3[++o] - 128 << 6) + e3[++o] - 128 : r3 > 247 && r3 < 252 && o + 4 < t ? (r3 - 248 << 24) + (e3[++o] - 128 << 18) + (e3[++o] - 128 << 12) + (e3[++o] - 128 << 6) + e3[++o] - 128 : r3 > 239 && r3 < 248 && o + 3 < t ? (r3 - 240 << 18) + (e3[++o] - 128 << 12) + (e3[++o] - 128 << 6) + e3[++o] - 128 : r3 > 223 && r3 < 240 && o + 2 < t ? (r3 - 224 << 12) + (e3[++o] - 128 << 6) + e3[++o] - 128 : r3 > 191 && r3 < 224 && o + 1 < t ? (r3 - 192 << 6) + e3[++o] - 128 : r3);
      return n2;
    }(r2));
    return JSON.parse(n);
  } catch (e3) {
    return console.error("There was an error decoding token: ", e3), null;
  }
}
function i(e2) {
  var r2 = l(e2), n = true;
  if (r2 && r2.exp) {
    var t = /* @__PURE__ */ new Date(0);
    t.setUTCSeconds(r2.exp), n = t.valueOf() < (/* @__PURE__ */ new Date()).valueOf();
  }
  return n;
}
function c(n) {
  var t = (0, import_react.useState)(false), o = t[0], a = t[1], c2 = (0, import_react.useState)(null), u = c2[0], f = c2[1];
  (0, import_react.useEffect)(function() {
    p(n);
  }, [n]);
  var p = function(e2) {
    f(l(e2)), a(i(e2));
  };
  return { isExpired: o, decodedToken: u, reEvaluateToken: p };
}
export {
  l as decodeToken,
  i as isExpired,
  c as useJwt
};
//# sourceMappingURL=react-jwt.js.map
