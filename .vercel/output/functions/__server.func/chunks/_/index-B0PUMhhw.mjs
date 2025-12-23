import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { U as User } from "./user-management-BWdgOkBv.mjs";
import { B as Button } from "./button-GGUcpVGc.mjs";
import { memo } from "react";
import { a as createReactComponent } from "./router-ChUkarf1.mjs";
import "./auth-client-Di1Pgm1o.mjs";
import "nanostores";
import "@better-fetch/fetch";
import "@better-auth/core/utils";
import "@base-ui/react/avatar";
import "@base-ui/react/popover";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "./server.mjs";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "zod";
import "./server-FFq0J1Wz.mjs";
import "drizzle-orm";
import "drizzle-orm/sqlite-core";
import "drizzle-zod";
import "uuid";
import "@better-auth/core/context";
import "@better-auth/utils/random";
import "@better-auth/core/error";
import "@better-auth/utils/hex";
import "@better-auth/utils/hash";
import "better-call";
import "@better-auth/core/env";
import "@better-auth/core/api";
import "@better-auth/core/db";
import "kysely";
import "@better-auth/core/db/adapter";
import "@noble/hashes/hkdf.js";
import "@noble/hashes/sha2.js";
import "jose";
import "@better-auth/utils/base64";
import "@better-auth/utils/binary";
import "@better-auth/utils/hmac";
import "@noble/ciphers/chacha.js";
import "@noble/ciphers/utils.js";
import "@better-auth/core/social-providers";
import "jose/errors";
import "@noble/hashes/scrypt.js";
import "@noble/hashes/utils.js";
import "@better-auth/telemetry";
import "@better-auth/utils/otp";
import "drizzle-orm/libsql";
const __iconNode = [["path", { "d": "M10 14l11 -11", "key": "svg-0" }], ["path", { "d": "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5", "key": "svg-1" }]];
const IconSend = createReactComponent("outline", "send", "Send", __iconNode);
const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`
    };
    return /* @__PURE__ */ jsxs("span", { className: `relative inline-block ${className}`, children: [
      /* @__PURE__ */ jsx("span", { className: "sr-only", children }),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "animate-aurora relative bg-[length:200%_auto] bg-clip-text text-transparent",
          style: gradientStyle,
          "aria-hidden": "true",
          children
        }
      )
    ] });
  }
);
AuroraText.displayName = "AuroraText";
const Hero = () => {
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-screen flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-2 right-2", children: /* @__PURE__ */ jsx(User, {}) }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen relative", children: /* @__PURE__ */ jsxs("div", { className: "text-center flex flex-col gap-6 justify-start pt-56", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("span", { children: "Trojan Takedown" }),
        " ",
        /* @__PURE__ */ jsx(
          AuroraText,
          {
            className: "text-5xl font-bold",
            colors: ["#3a5ba0", "#f7c873", "#6ea3c1", "#a04a6c"],
            speed: 0.7,
            children: "Outstanding Wrestler"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/vote", children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: "cursor-pointer text-lg font-semibold",
          size: "lg",
          children: [
            /* @__PURE__ */ jsx(IconSend, {}),
            "Vote Now"
          ]
        }
      ) })
    ] }) })
  ] });
};
function App() {
  return /* @__PURE__ */ jsx(Hero, {});
}
export {
  App as component
};
