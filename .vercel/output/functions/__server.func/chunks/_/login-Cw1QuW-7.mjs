import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button, c as cn } from "./button-GGUcpVGc.mjs";
import { s as signIn } from "./auth-client-Di1Pgm1o.mjs";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./router-ChUkarf1.mjs";
import "@tanstack/react-router";
import "react";
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
import "@better-auth/core/utils";
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
import "nanostores";
import "@better-fetch/fetch";
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      "data-size": size,
      className: cn("ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col", className),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-4 group-data-[size=sm]/card:px-3", className),
      ...props
    }
  );
}
function RouteComponent() {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/manage"
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Welcome to Wrestler of the Day" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Sign in to continue" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Button, { onClick: handleGoogleSignIn, variant: "outline", size: "lg", className: "w-full", children: [
      /* @__PURE__ */ jsx("svg", { className: "mr-2", width: "18", height: "18", viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
        /* @__PURE__ */ jsx("path", { d: "M17.6 9.2l-.1-1.8H9v3.4h4.8C13.6 12 13 13 12 13.6v2.2h3a8.8 8.8 0 0 0 2.6-6.6z", fill: "#4285F4", fillRule: "nonzero" }),
        /* @__PURE__ */ jsx("path", { d: "M9 18c2.4 0 4.5-.8 6-2.2l-3-2.2a5.4 5.4 0 0 1-8-2.9H1V13a9 9 0 0 0 8 5z", fill: "#34A853", fillRule: "nonzero" }),
        /* @__PURE__ */ jsx("path", { d: "M4 10.7a5.4 5.4 0 0 1 0-3.4V5H1a9 9 0 0 0 0 8l3-2.3z", fill: "#FBBC05", fillRule: "nonzero" }),
        /* @__PURE__ */ jsx("path", { d: "M9 3.6c1.3 0 2.5.4 3.4 1.3L15 2.3A9 9 0 0 0 1 5l3 2.4a5.4 5.4 0 0 1 5-3.7z", fill: "#EA4335", fillRule: "nonzero" })
      ] }) }),
      "Sign in with Google"
    ] }) })
  ] }) });
}
export {
  RouteComponent as component
};
