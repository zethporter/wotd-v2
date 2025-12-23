import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, HeadContent, Scripts, redirect } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, createContext, forwardRef, createElement, useContext } from "react";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1 } from "sonner";
import { e as createServerFn, g as getRequestHeaders, T as TSS_SERVER_FUNCTION, f as getServerFnById } from "./server.mjs";
import * as z from "zod";
import z__default from "zod";
import { c as wrestlerUpdateSchema, b as baseWrestlersSchema } from "./server-FFq0J1Wz.mjs";
import { runWithAdapter, getCurrentAdapter, hasRequestState, runWithRequestState, runWithTransaction, runWithEndpointContext, defineRequestState, getCurrentAuthContext } from "@better-auth/core/context";
import { createRandomStringGenerator } from "@better-auth/utils/random";
import { BASE_ERROR_CODES, BetterAuthError } from "@better-auth/core/error";
import { hex } from "@better-auth/utils/hex";
import { createHash } from "@better-auth/utils/hash";
import { APIError, createRouter as createRouter$1, toResponse } from "better-call";
import { defineErrorCodes, safeJSONParse, generateId } from "@better-auth/core/utils";
import { logger, env, isDevelopment, shouldPublishLog, isTest, isProduction, createLogger } from "@better-auth/core/env";
import { createAuthEndpoint, createAuthMiddleware } from "@better-auth/core/api";
import * as import___better_auth_core_db from "@better-auth/core/db";
import { getAuthTables } from "@better-auth/core/db";
import { sql as sql$1, SqliteDialect, MysqlDialect, PostgresDialect, MssqlDialect, Kysely } from "kysely";
import { createAdapterFactory, initGetModelName, initGetFieldName } from "@better-auth/core/db/adapter";
import { hkdf } from "@noble/hashes/hkdf.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { jwtVerify, createRemoteJWKSet, calculateJwkThumbprint, base64url, EncryptJWT, SignJWT, jwtDecrypt } from "jose";
import { base64Url } from "@better-auth/utils/base64";
import { binary } from "@better-auth/utils/binary";
import { createHMAC } from "@better-auth/utils/hmac";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { utf8ToBytes, bytesToHex, managedNonce, hexToBytes } from "@noble/ciphers/utils.js";
import { SocialProviderListEnum, socialProviders } from "@better-auth/core/social-providers";
import { JWTExpired } from "jose/errors";
import { scryptAsync } from "@noble/hashes/scrypt.js";
import { hexToBytes as hexToBytes$1 } from "@noble/hashes/utils.js";
import { createTelemetry } from "@better-auth/telemetry";
import { count, desc, asc, sql, inArray, notInArray, like, lt, lte, ne, gt, gte, eq, and, or } from "drizzle-orm";
import { createOTP } from "@better-auth/utils/otp";
import { drizzle } from "drizzle-orm/libsql";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "drizzle-zod";
import "uuid";
var version = "5.0.1";
function wait(durationMs, resolveWith) {
  return new Promise((resolve) => setTimeout(resolve, durationMs, resolveWith));
}
function releaseEventLoop() {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => resolve();
    channel.port2.postMessage(null);
  });
}
function requestIdleCallbackIfAvailable(fallbackTimeout, deadlineTimeout = Infinity) {
  const { requestIdleCallback } = window;
  if (requestIdleCallback) {
    return new Promise((resolve) => requestIdleCallback.call(window, () => resolve(), { timeout: deadlineTimeout }));
  } else {
    return wait(Math.min(fallbackTimeout, deadlineTimeout));
  }
}
function isPromise$1(value) {
  return !!value && typeof value.then === "function";
}
function awaitIfAsync(action, callback) {
  try {
    const returnedValue = action();
    if (isPromise$1(returnedValue)) {
      returnedValue.then((result) => callback(true, result), (error2) => callback(false, error2));
    } else {
      callback(true, returnedValue);
    }
  } catch (error2) {
    callback(false, error2);
  }
}
async function mapWithBreaks(items, callback, loopReleaseInterval = 16) {
  const results = Array(items.length);
  let lastLoopReleaseTime = Date.now();
  for (let i = 0; i < items.length; ++i) {
    results[i] = callback(items[i], i);
    const now2 = Date.now();
    if (now2 >= lastLoopReleaseTime + loopReleaseInterval) {
      lastLoopReleaseTime = now2;
      await releaseEventLoop();
    }
  }
  return results;
}
function suppressUnhandledRejectionWarning(promise) {
  promise.then(void 0, () => void 0);
  return promise;
}
function includes(haystack, needle) {
  for (let i = 0, l = haystack.length; i < l; ++i) {
    if (haystack[i] === needle) {
      return true;
    }
  }
  return false;
}
function excludes(haystack, needle) {
  return !includes(haystack, needle);
}
function toInt(value) {
  return parseInt(value);
}
function toFloat(value) {
  return parseFloat(value);
}
function replaceNaN(value, replacement) {
  return typeof value === "number" && isNaN(value) ? replacement : value;
}
function countTruthy(values) {
  return values.reduce((sum, value) => sum + (value ? 1 : 0), 0);
}
function round(value, base = 1) {
  if (Math.abs(base) >= 1) {
    return Math.round(value / base) * base;
  } else {
    const counterBase = 1 / base;
    return Math.round(value * counterBase) / counterBase;
  }
}
function parseSimpleCssSelector(selector) {
  var _a, _b;
  const errorMessage = `Unexpected syntax '${selector}'`;
  const tagMatch = /^\s*([a-z-]*)(.*)$/i.exec(selector);
  const tag = tagMatch[1] || void 0;
  const attributes = {};
  const partsRegex = /([.:#][\w-]+|\[.+?\])/gi;
  const addAttribute = (name, value) => {
    attributes[name] = attributes[name] || [];
    attributes[name].push(value);
  };
  for (; ; ) {
    const match = partsRegex.exec(tagMatch[2]);
    if (!match) {
      break;
    }
    const part = match[0];
    switch (part[0]) {
      case ".":
        addAttribute("class", part.slice(1));
        break;
      case "#":
        addAttribute("id", part.slice(1));
        break;
      case "[": {
        const attributeMatch = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(part);
        if (attributeMatch) {
          addAttribute(attributeMatch[1], (_b = (_a = attributeMatch[4]) !== null && _a !== void 0 ? _a : attributeMatch[5]) !== null && _b !== void 0 ? _b : "");
        } else {
          throw new Error(errorMessage);
        }
        break;
      }
      default:
        throw new Error(errorMessage);
    }
  }
  return [tag, attributes];
}
function getUTF8Bytes(input) {
  const result = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (charCode > 127) {
      return new TextEncoder().encode(input);
    }
    result[i] = charCode;
  }
  return result;
}
function x64Add(m, n) {
  const m0 = m[0] >>> 16, m1 = m[0] & 65535, m2 = m[1] >>> 16, m3 = m[1] & 65535;
  const n0 = n[0] >>> 16, n1 = n[0] & 65535, n2 = n[1] >>> 16, n3 = n[1] & 65535;
  let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
  o3 += m3 + n3;
  o2 += o3 >>> 16;
  o3 &= 65535;
  o2 += m2 + n2;
  o1 += o2 >>> 16;
  o2 &= 65535;
  o1 += m1 + n1;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o0 += m0 + n0;
  o0 &= 65535;
  m[0] = o0 << 16 | o1;
  m[1] = o2 << 16 | o3;
}
function x64Multiply(m, n) {
  const m0 = m[0] >>> 16, m1 = m[0] & 65535, m2 = m[1] >>> 16, m3 = m[1] & 65535;
  const n0 = n[0] >>> 16, n1 = n[0] & 65535, n2 = n[1] >>> 16, n3 = n[1] & 65535;
  let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
  o3 += m3 * n3;
  o2 += o3 >>> 16;
  o3 &= 65535;
  o2 += m2 * n3;
  o1 += o2 >>> 16;
  o2 &= 65535;
  o2 += m3 * n2;
  o1 += o2 >>> 16;
  o2 &= 65535;
  o1 += m1 * n3;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o1 += m2 * n2;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o1 += m3 * n1;
  o0 += o1 >>> 16;
  o1 &= 65535;
  o0 += m0 * n3 + m1 * n2 + m2 * n1 + m3 * n0;
  o0 &= 65535;
  m[0] = o0 << 16 | o1;
  m[1] = o2 << 16 | o3;
}
function x64Rotl(m, bits) {
  const m0 = m[0];
  bits %= 64;
  if (bits === 32) {
    m[0] = m[1];
    m[1] = m0;
  } else if (bits < 32) {
    m[0] = m0 << bits | m[1] >>> 32 - bits;
    m[1] = m[1] << bits | m0 >>> 32 - bits;
  } else {
    bits -= 32;
    m[0] = m[1] << bits | m0 >>> 32 - bits;
    m[1] = m0 << bits | m[1] >>> 32 - bits;
  }
}
function x64LeftShift(m, bits) {
  bits %= 64;
  if (bits === 0) {
    return;
  } else if (bits < 32) {
    m[0] = m[1] >>> 32 - bits;
    m[1] = m[1] << bits;
  } else {
    m[0] = m[1] << bits - 32;
    m[1] = 0;
  }
}
function x64Xor(m, n) {
  m[0] ^= n[0];
  m[1] ^= n[1];
}
const F1 = [4283543511, 3981806797];
const F2 = [3301882366, 444984403];
function x64Fmix(h) {
  const shifted = [0, h[0] >>> 1];
  x64Xor(h, shifted);
  x64Multiply(h, F1);
  shifted[1] = h[0] >>> 1;
  x64Xor(h, shifted);
  x64Multiply(h, F2);
  shifted[1] = h[0] >>> 1;
  x64Xor(h, shifted);
}
const C1 = [2277735313, 289559509];
const C2 = [1291169091, 658871167];
const M$1 = [0, 5];
const N1 = [0, 1390208809];
const N2 = [0, 944331445];
function x64hash128(input, seed) {
  const key = getUTF8Bytes(input);
  seed = seed || 0;
  const length = [0, key.length];
  const remainder = length[1] % 16;
  const bytes = length[1] - remainder;
  const h1 = [0, seed];
  const h2 = [0, seed];
  const k1 = [0, 0];
  const k2 = [0, 0];
  let i;
  for (i = 0; i < bytes; i = i + 16) {
    k1[0] = key[i + 4] | key[i + 5] << 8 | key[i + 6] << 16 | key[i + 7] << 24;
    k1[1] = key[i] | key[i + 1] << 8 | key[i + 2] << 16 | key[i + 3] << 24;
    k2[0] = key[i + 12] | key[i + 13] << 8 | key[i + 14] << 16 | key[i + 15] << 24;
    k2[1] = key[i + 8] | key[i + 9] << 8 | key[i + 10] << 16 | key[i + 11] << 24;
    x64Multiply(k1, C1);
    x64Rotl(k1, 31);
    x64Multiply(k1, C2);
    x64Xor(h1, k1);
    x64Rotl(h1, 27);
    x64Add(h1, h2);
    x64Multiply(h1, M$1);
    x64Add(h1, N1);
    x64Multiply(k2, C2);
    x64Rotl(k2, 33);
    x64Multiply(k2, C1);
    x64Xor(h2, k2);
    x64Rotl(h2, 31);
    x64Add(h2, h1);
    x64Multiply(h2, M$1);
    x64Add(h2, N2);
  }
  k1[0] = 0;
  k1[1] = 0;
  k2[0] = 0;
  k2[1] = 0;
  const val = [0, 0];
  switch (remainder) {
    case 15:
      val[1] = key[i + 14];
      x64LeftShift(val, 48);
      x64Xor(k2, val);
    // fallthrough
    case 14:
      val[1] = key[i + 13];
      x64LeftShift(val, 40);
      x64Xor(k2, val);
    // fallthrough
    case 13:
      val[1] = key[i + 12];
      x64LeftShift(val, 32);
      x64Xor(k2, val);
    // fallthrough
    case 12:
      val[1] = key[i + 11];
      x64LeftShift(val, 24);
      x64Xor(k2, val);
    // fallthrough
    case 11:
      val[1] = key[i + 10];
      x64LeftShift(val, 16);
      x64Xor(k2, val);
    // fallthrough
    case 10:
      val[1] = key[i + 9];
      x64LeftShift(val, 8);
      x64Xor(k2, val);
    // fallthrough
    case 9:
      val[1] = key[i + 8];
      x64Xor(k2, val);
      x64Multiply(k2, C2);
      x64Rotl(k2, 33);
      x64Multiply(k2, C1);
      x64Xor(h2, k2);
    // fallthrough
    case 8:
      val[1] = key[i + 7];
      x64LeftShift(val, 56);
      x64Xor(k1, val);
    // fallthrough
    case 7:
      val[1] = key[i + 6];
      x64LeftShift(val, 48);
      x64Xor(k1, val);
    // fallthrough
    case 6:
      val[1] = key[i + 5];
      x64LeftShift(val, 40);
      x64Xor(k1, val);
    // fallthrough
    case 5:
      val[1] = key[i + 4];
      x64LeftShift(val, 32);
      x64Xor(k1, val);
    // fallthrough
    case 4:
      val[1] = key[i + 3];
      x64LeftShift(val, 24);
      x64Xor(k1, val);
    // fallthrough
    case 3:
      val[1] = key[i + 2];
      x64LeftShift(val, 16);
      x64Xor(k1, val);
    // fallthrough
    case 2:
      val[1] = key[i + 1];
      x64LeftShift(val, 8);
      x64Xor(k1, val);
    // fallthrough
    case 1:
      val[1] = key[i];
      x64Xor(k1, val);
      x64Multiply(k1, C1);
      x64Rotl(k1, 31);
      x64Multiply(k1, C2);
      x64Xor(h1, k1);
  }
  x64Xor(h1, length);
  x64Xor(h2, length);
  x64Add(h1, h2);
  x64Add(h2, h1);
  x64Fmix(h1);
  x64Fmix(h2);
  x64Add(h1, h2);
  x64Add(h2, h1);
  return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
}
function errorToObject(error2) {
  var _a;
  return {
    name: error2.name,
    message: error2.message,
    stack: (_a = error2.stack) === null || _a === void 0 ? void 0 : _a.split("\n"),
    // The fields are not enumerable, so TS is wrong saying that they will be overridden
    ...error2
  };
}
function isFunctionNative(func) {
  return /^function\s.*?\{\s*\[native code]\s*}$/.test(String(func));
}
function isFinalResultLoaded(loadResult) {
  return typeof loadResult !== "function";
}
function loadSource(source, sourceOptions) {
  const sourceLoadPromise = suppressUnhandledRejectionWarning(new Promise((resolveLoad) => {
    const loadStartTime = Date.now();
    awaitIfAsync(source.bind(null, sourceOptions), (...loadArgs) => {
      const loadDuration = Date.now() - loadStartTime;
      if (!loadArgs[0]) {
        return resolveLoad(() => ({ error: loadArgs[1], duration: loadDuration }));
      }
      const loadResult = loadArgs[1];
      if (isFinalResultLoaded(loadResult)) {
        return resolveLoad(() => ({ value: loadResult, duration: loadDuration }));
      }
      resolveLoad(() => new Promise((resolveGet) => {
        const getStartTime = Date.now();
        awaitIfAsync(loadResult, (...getArgs) => {
          const duration = loadDuration + Date.now() - getStartTime;
          if (!getArgs[0]) {
            return resolveGet({ error: getArgs[1], duration });
          }
          resolveGet({ value: getArgs[1], duration });
        });
      }));
    });
  }));
  return function getComponent() {
    return sourceLoadPromise.then((finalizeSource) => finalizeSource());
  };
}
function loadSources(sources2, sourceOptions, excludeSources, loopReleaseInterval) {
  const includedSources = Object.keys(sources2).filter((sourceKey) => excludes(excludeSources, sourceKey));
  const sourceGettersPromise = suppressUnhandledRejectionWarning(mapWithBreaks(includedSources, (sourceKey) => loadSource(sources2[sourceKey], sourceOptions), loopReleaseInterval));
  return async function getComponents() {
    const sourceGetters = await sourceGettersPromise;
    const componentPromises = await mapWithBreaks(sourceGetters, (sourceGetter) => suppressUnhandledRejectionWarning(sourceGetter()), loopReleaseInterval);
    const componentArray = await Promise.all(componentPromises);
    const components = {};
    for (let index2 = 0; index2 < includedSources.length; ++index2) {
      components[includedSources[index2]] = componentArray[index2];
    }
    return components;
  };
}
function isTrident() {
  const w = window;
  const n = navigator;
  return countTruthy([
    "MSCSSMatrix" in w,
    "msSetImmediate" in w,
    "msIndexedDB" in w,
    "msMaxTouchPoints" in n,
    "msPointerEnabled" in n
  ]) >= 4;
}
function isEdgeHTML() {
  const w = window;
  const n = navigator;
  return countTruthy(["msWriteProfilerMark" in w, "MSStream" in w, "msLaunchUri" in n, "msSaveBlob" in n]) >= 3 && !isTrident();
}
function isChromium() {
  const w = window;
  const n = navigator;
  return countTruthy([
    "webkitPersistentStorage" in n,
    "webkitTemporaryStorage" in n,
    (n.vendor || "").indexOf("Google") === 0,
    "webkitResolveLocalFileSystemURL" in w,
    "BatteryManager" in w,
    "webkitMediaStream" in w,
    "webkitSpeechGrammar" in w
  ]) >= 5;
}
function isWebKit() {
  const w = window;
  const n = navigator;
  return countTruthy([
    "ApplePayError" in w,
    "CSSPrimitiveValue" in w,
    "Counter" in w,
    n.vendor.indexOf("Apple") === 0,
    "RGBColor" in w,
    "WebKitMediaKeys" in w
  ]) >= 4;
}
function isDesktopWebKit() {
  const w = window;
  const { HTMLElement, Document } = w;
  return countTruthy([
    "safari" in w,
    !("ongestureend" in w),
    !("TouchEvent" in w),
    !("orientation" in w),
    HTMLElement && !("autocapitalize" in HTMLElement.prototype),
    Document && "pointerLockElement" in Document.prototype
  ]) >= 4;
}
function isSafariWebKit() {
  const w = window;
  return (
    // Filters-out Chrome, Yandex, DuckDuckGo (macOS and iOS), Edge
    isFunctionNative(w.print) && // Doesn't work in Safari < 15.4
    String(w.browser) === "[object WebPageNamespace]"
  );
}
function isGecko() {
  var _a, _b;
  const w = window;
  return countTruthy([
    "buildID" in navigator,
    "MozAppearance" in ((_b = (_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : {}),
    "onmozfullscreenchange" in w,
    "mozInnerScreenX" in w,
    "CSSMozDocumentRule" in w,
    "CanvasCaptureMediaStream" in w
  ]) >= 4;
}
function isChromium86OrNewer() {
  const w = window;
  return countTruthy([
    !("MediaSettingsRange" in w),
    "RTCEncodedAudioFrame" in w,
    "" + w.Intl === "[object Intl]",
    "" + w.Reflect === "[object Reflect]"
  ]) >= 3;
}
function isChromium122OrNewer() {
  const w = window;
  const { URLPattern } = w;
  return countTruthy([
    "union" in Set.prototype,
    "Iterator" in w,
    URLPattern && "hasRegExpGroups" in URLPattern.prototype,
    "RGB8" in WebGLRenderingContext.prototype
  ]) >= 3;
}
function isWebKit606OrNewer() {
  const w = window;
  return countTruthy([
    "DOMRectList" in w,
    "RTCPeerConnectionIceEvent" in w,
    "SVGGeometryElement" in w,
    "ontransitioncancel" in w
  ]) >= 3;
}
function isWebKit616OrNewer() {
  const w = window;
  const n = navigator;
  const { CSS, HTMLButtonElement } = w;
  return countTruthy([
    !("getStorageUpdates" in n),
    HTMLButtonElement && "popover" in HTMLButtonElement.prototype,
    "CSSCounterStyleRule" in w,
    CSS.supports("font-size-adjust: ex-height 0.5"),
    CSS.supports("text-transform: full-width")
  ]) >= 4;
}
function isIPad() {
  if (navigator.platform === "iPad") {
    return true;
  }
  const s = screen;
  const screenRatio = s.width / s.height;
  return countTruthy([
    // Since iOS 13. Doesn't work in Chrome on iPadOS <15, but works in desktop mode.
    "MediaSource" in window,
    // Since iOS 12. Doesn't work in Chrome on iPadOS.
    !!Element.prototype.webkitRequestFullscreen,
    // iPhone 4S that runs iOS 9 matches this, but it is not supported
    // Doesn't work in incognito mode of Safari ≥17 with split screen because of tracking prevention
    screenRatio > 0.65 && screenRatio < 1.53
  ]) >= 2;
}
function getFullscreenElement() {
  const d = document;
  return d.fullscreenElement || d.msFullscreenElement || d.mozFullScreenElement || d.webkitFullscreenElement || null;
}
function exitFullscreen() {
  const d = document;
  return (d.exitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen).call(d);
}
function isAndroid() {
  const isItChromium = isChromium();
  const isItGecko = isGecko();
  const w = window;
  const n = navigator;
  const c = "connection";
  if (isItChromium) {
    return countTruthy([
      !("SharedWorker" in w),
      // `typechange` is deprecated, but it's still present on Android (tested on Chrome Mobile 117)
      // Removal proposal https://bugs.chromium.org/p/chromium/issues/detail?id=699892
      // Note: this expression returns true on ChromeOS, so additional detectors are required to avoid false-positives
      n[c] && "ontypechange" in n[c],
      !("sinkId" in new Audio())
    ]) >= 2;
  } else if (isItGecko) {
    return countTruthy(["onorientationchange" in w, "orientation" in w, /android/i.test(n.appVersion)]) >= 2;
  } else {
    return false;
  }
}
function isSamsungInternet() {
  const n = navigator;
  const w = window;
  const audioPrototype = Audio.prototype;
  const { visualViewport } = w;
  return countTruthy([
    "srLatency" in audioPrototype,
    "srChannelCount" in audioPrototype,
    "devicePosture" in n,
    visualViewport && "segments" in visualViewport,
    "getTextInformation" in Image.prototype
    // Not available in Samsung Internet 21
  ]) >= 3;
}
function getAudioFingerprint() {
  if (doesBrowserPerformAntifingerprinting$1()) {
    return -4;
  }
  return getUnstableAudioFingerprint();
}
function getUnstableAudioFingerprint() {
  const w = window;
  const AudioContext2 = w.OfflineAudioContext || w.webkitOfflineAudioContext;
  if (!AudioContext2) {
    return -2;
  }
  if (doesBrowserSuspendAudioContext()) {
    return -1;
  }
  const hashFromIndex = 4500;
  const hashToIndex = 5e3;
  const context = new AudioContext2(1, hashToIndex, 44100);
  const oscillator = context.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.value = 1e4;
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  oscillator.connect(compressor);
  compressor.connect(context.destination);
  oscillator.start(0);
  const [renderPromise, finishRendering] = startRenderingAudio(context);
  const fingerprintPromise = suppressUnhandledRejectionWarning(renderPromise.then((buffer) => getHash(buffer.getChannelData(0).subarray(hashFromIndex)), (error2) => {
    if (error2.name === "timeout" || error2.name === "suspended") {
      return -3;
    }
    throw error2;
  }));
  return () => {
    finishRendering();
    return fingerprintPromise;
  };
}
function doesBrowserSuspendAudioContext() {
  return isWebKit() && !isDesktopWebKit() && !isWebKit606OrNewer();
}
function doesBrowserPerformAntifingerprinting$1() {
  return (
    // Safari ≥17
    isWebKit() && isWebKit616OrNewer() && isSafariWebKit() || // Samsung Internet ≥26
    isChromium() && isSamsungInternet() && isChromium122OrNewer()
  );
}
function startRenderingAudio(context) {
  const renderTryMaxCount = 3;
  const renderRetryDelay = 500;
  const runningMaxAwaitTime = 500;
  const runningSufficientTime = 5e3;
  let finalize = () => void 0;
  const resultPromise = new Promise((resolve, reject) => {
    let isFinalized = false;
    let renderTryCount = 0;
    let startedRunningAt = 0;
    context.oncomplete = (event) => resolve(event.renderedBuffer);
    const startRunningTimeout = () => {
      setTimeout(() => reject(makeInnerError(
        "timeout"
        /* InnerErrorName.Timeout */
      )), Math.min(runningMaxAwaitTime, startedRunningAt + runningSufficientTime - Date.now()));
    };
    const tryRender = () => {
      try {
        const renderingPromise = context.startRendering();
        if (isPromise$1(renderingPromise)) {
          suppressUnhandledRejectionWarning(renderingPromise);
        }
        switch (context.state) {
          case "running":
            startedRunningAt = Date.now();
            if (isFinalized) {
              startRunningTimeout();
            }
            break;
          // Sometimes the audio context doesn't start after calling `startRendering` (in addition to the cases where
          // audio context doesn't start at all). A known case is starting an audio context when the browser tab is in
          // background on iPhone. Retries usually help in this case.
          case "suspended":
            if (!document.hidden) {
              renderTryCount++;
            }
            if (isFinalized && renderTryCount >= renderTryMaxCount) {
              reject(makeInnerError(
                "suspended"
                /* InnerErrorName.Suspended */
              ));
            } else {
              setTimeout(tryRender, renderRetryDelay);
            }
            break;
        }
      } catch (error2) {
        reject(error2);
      }
    };
    tryRender();
    finalize = () => {
      if (!isFinalized) {
        isFinalized = true;
        if (startedRunningAt > 0) {
          startRunningTimeout();
        }
      }
    };
  });
  return [resultPromise, finalize];
}
function getHash(signal) {
  let hash = 0;
  for (let i = 0; i < signal.length; ++i) {
    hash += Math.abs(signal[i]);
  }
  return hash;
}
function makeInnerError(name) {
  const error2 = new Error(name);
  error2.name = name;
  return error2;
}
async function withIframe(action, initialHtml, domPollInterval = 50) {
  var _a, _b, _c;
  const d = document;
  while (!d.body) {
    await wait(domPollInterval);
  }
  const iframe = d.createElement("iframe");
  try {
    await new Promise((_resolve, _reject) => {
      let isComplete = false;
      const resolve = () => {
        isComplete = true;
        _resolve();
      };
      const reject = (error2) => {
        isComplete = true;
        _reject(error2);
      };
      iframe.onload = resolve;
      iframe.onerror = reject;
      const { style } = iframe;
      style.setProperty("display", "block", "important");
      style.position = "absolute";
      style.top = "0";
      style.left = "0";
      style.visibility = "hidden";
      if (initialHtml && "srcdoc" in iframe) {
        iframe.srcdoc = initialHtml;
      } else {
        iframe.src = "about:blank";
      }
      d.body.appendChild(iframe);
      const checkReadyState = () => {
        var _a2, _b2;
        if (isComplete) {
          return;
        }
        if (((_b2 = (_a2 = iframe.contentWindow) === null || _a2 === void 0 ? void 0 : _a2.document) === null || _b2 === void 0 ? void 0 : _b2.readyState) === "complete") {
          resolve();
        } else {
          setTimeout(checkReadyState, 10);
        }
      };
      checkReadyState();
    });
    while (!((_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body)) {
      await wait(domPollInterval);
    }
    return await action(iframe, iframe.contentWindow);
  } finally {
    (_c = iframe.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(iframe);
  }
}
function selectorToElement(selector) {
  const [tag, attributes] = parseSimpleCssSelector(selector);
  const element = document.createElement(tag !== null && tag !== void 0 ? tag : "div");
  for (const name of Object.keys(attributes)) {
    const value = attributes[name].join(" ");
    if (name === "style") {
      addStyleString(element.style, value);
    } else {
      element.setAttribute(name, value);
    }
  }
  return element;
}
function addStyleString(style, source) {
  for (const property of source.split(";")) {
    const match = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(property);
    if (match) {
      const [, name, value, , priority] = match;
      style.setProperty(name, value, priority || "");
    }
  }
}
function isAnyParentCrossOrigin() {
  let currentWindow = window;
  for (; ; ) {
    const parentWindow = currentWindow.parent;
    if (!parentWindow || parentWindow === currentWindow) {
      return false;
    }
    try {
      if (parentWindow.location.origin !== currentWindow.location.origin) {
        return true;
      }
    } catch (error2) {
      if (error2 instanceof Error && error2.name === "SecurityError") {
        return true;
      }
      throw error2;
    }
    currentWindow = parentWindow;
  }
}
const testString = "mmMwWLliI0O&1";
const textSize = "48px";
const baseFonts = ["monospace", "sans-serif", "serif"];
const fontList = [
  // This is android-specific font from "Roboto" family
  "sans-serif-thin",
  "ARNO PRO",
  "Agency FB",
  "Arabic Typesetting",
  "Arial Unicode MS",
  "AvantGarde Bk BT",
  "BankGothic Md BT",
  "Batang",
  "Bitstream Vera Sans Mono",
  "Calibri",
  "Century",
  "Century Gothic",
  "Clarendon",
  "EUROSTILE",
  "Franklin Gothic",
  "Futura Bk BT",
  "Futura Md BT",
  "GOTHAM",
  "Gill Sans",
  "HELV",
  "Haettenschweiler",
  "Helvetica Neue",
  "Humanst521 BT",
  "Leelawadee",
  "Letter Gothic",
  "Levenim MT",
  "Lucida Bright",
  "Lucida Sans",
  "Menlo",
  "MS Mincho",
  "MS Outlook",
  "MS Reference Specialty",
  "MS UI Gothic",
  "MT Extra",
  "MYRIAD PRO",
  "Marlett",
  "Meiryo UI",
  "Microsoft Uighur",
  "Minion Pro",
  "Monotype Corsiva",
  "PMingLiU",
  "Pristina",
  "SCRIPTINA",
  "Segoe UI Light",
  "Serifa",
  "SimHei",
  "Small Fonts",
  "Staccato222 BT",
  "TRAJAN PRO",
  "Univers CE 55 Medium",
  "Vrinda",
  "ZWAdobeF"
];
function getFonts() {
  return withIframe(async (_, { document: document2 }) => {
    const holder = document2.body;
    holder.style.fontSize = textSize;
    const spansContainer = document2.createElement("div");
    spansContainer.style.setProperty("visibility", "hidden", "important");
    const defaultWidth = {};
    const defaultHeight = {};
    const createSpan = (fontFamily) => {
      const span = document2.createElement("span");
      const { style } = span;
      style.position = "absolute";
      style.top = "0";
      style.left = "0";
      style.fontFamily = fontFamily;
      span.textContent = testString;
      spansContainer.appendChild(span);
      return span;
    };
    const createSpanWithFonts = (fontToDetect, baseFont) => {
      return createSpan(`'${fontToDetect}',${baseFont}`);
    };
    const initializeBaseFontsSpans = () => {
      return baseFonts.map(createSpan);
    };
    const initializeFontsSpans = () => {
      const spans = {};
      for (const font of fontList) {
        spans[font] = baseFonts.map((baseFont) => createSpanWithFonts(font, baseFont));
      }
      return spans;
    };
    const isFontAvailable = (fontSpans) => {
      return baseFonts.some((baseFont, baseFontIndex) => fontSpans[baseFontIndex].offsetWidth !== defaultWidth[baseFont] || fontSpans[baseFontIndex].offsetHeight !== defaultHeight[baseFont]);
    };
    const baseFontsSpans = initializeBaseFontsSpans();
    const fontsSpans = initializeFontsSpans();
    holder.appendChild(spansContainer);
    for (let index2 = 0; index2 < baseFonts.length; index2++) {
      defaultWidth[baseFonts[index2]] = baseFontsSpans[index2].offsetWidth;
      defaultHeight[baseFonts[index2]] = baseFontsSpans[index2].offsetHeight;
    }
    return fontList.filter((font) => isFontAvailable(fontsSpans[font]));
  });
}
function getPlugins() {
  const rawPlugins = navigator.plugins;
  if (!rawPlugins) {
    return void 0;
  }
  const plugins = [];
  for (let i = 0; i < rawPlugins.length; ++i) {
    const plugin = rawPlugins[i];
    if (!plugin) {
      continue;
    }
    const mimeTypes = [];
    for (let j = 0; j < plugin.length; ++j) {
      const mimeType = plugin[j];
      mimeTypes.push({
        type: mimeType.type,
        suffixes: mimeType.suffixes
      });
    }
    plugins.push({
      name: plugin.name,
      description: plugin.description,
      mimeTypes
    });
  }
  return plugins;
}
function getCanvasFingerprint() {
  return getUnstableCanvasFingerprint(doesBrowserPerformAntifingerprinting());
}
function getUnstableCanvasFingerprint(skipImages) {
  let winding = false;
  let geometry;
  let text2;
  const [canvas, context] = makeCanvasContext();
  if (!isSupported(canvas, context)) {
    geometry = text2 = "unsupported";
  } else {
    winding = doesSupportWinding(context);
    if (skipImages) {
      geometry = text2 = "skipped";
    } else {
      [geometry, text2] = renderImages(canvas, context);
    }
  }
  return { winding, geometry, text: text2 };
}
function makeCanvasContext() {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return [canvas, canvas.getContext("2d")];
}
function isSupported(canvas, context) {
  return !!(context && canvas.toDataURL);
}
function doesSupportWinding(context) {
  context.rect(0, 0, 10, 10);
  context.rect(2, 2, 6, 6);
  return !context.isPointInPath(5, 5, "evenodd");
}
function renderImages(canvas, context) {
  renderTextImage(canvas, context);
  const textImage1 = canvasToString(canvas);
  const textImage2 = canvasToString(canvas);
  if (textImage1 !== textImage2) {
    return [
      "unstable",
      "unstable"
      /* ImageStatus.Unstable */
    ];
  }
  renderGeometryImage(canvas, context);
  const geometryImage = canvasToString(canvas);
  return [geometryImage, textImage1];
}
function renderTextImage(canvas, context) {
  canvas.width = 240;
  canvas.height = 60;
  context.textBaseline = "alphabetic";
  context.fillStyle = "#f60";
  context.fillRect(100, 1, 62, 20);
  context.fillStyle = "#069";
  context.font = '11pt "Times New Roman"';
  const printedText = `Cwm fjordbank gly ${String.fromCharCode(55357, 56835)}`;
  context.fillText(printedText, 2, 15);
  context.fillStyle = "rgba(102, 204, 0, 0.2)";
  context.font = "18pt Arial";
  context.fillText(printedText, 4, 45);
}
function renderGeometryImage(canvas, context) {
  canvas.width = 122;
  canvas.height = 110;
  context.globalCompositeOperation = "multiply";
  for (const [color, x, y] of [
    ["#f2f", 40, 40],
    ["#2ff", 80, 40],
    ["#ff2", 60, 80]
  ]) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, 40, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
  context.fillStyle = "#f9c";
  context.arc(60, 60, 60, 0, Math.PI * 2, true);
  context.arc(60, 60, 20, 0, Math.PI * 2, true);
  context.fill("evenodd");
}
function canvasToString(canvas) {
  return canvas.toDataURL();
}
function doesBrowserPerformAntifingerprinting() {
  return isWebKit() && isWebKit616OrNewer() && isSafariWebKit();
}
function getTouchSupport() {
  const n = navigator;
  let maxTouchPoints = 0;
  let touchEvent;
  if (n.maxTouchPoints !== void 0) {
    maxTouchPoints = toInt(n.maxTouchPoints);
  } else if (n.msMaxTouchPoints !== void 0) {
    maxTouchPoints = n.msMaxTouchPoints;
  }
  try {
    document.createEvent("TouchEvent");
    touchEvent = true;
  } catch (_a) {
    touchEvent = false;
  }
  const touchStart = "ontouchstart" in window;
  return {
    maxTouchPoints,
    touchEvent,
    touchStart
  };
}
function getOsCpu() {
  return navigator.oscpu;
}
function getLanguages() {
  const n = navigator;
  const result = [];
  const language = n.language || n.userLanguage || n.browserLanguage || n.systemLanguage;
  if (language !== void 0) {
    result.push([language]);
  }
  if (Array.isArray(n.languages)) {
    if (!(isChromium() && isChromium86OrNewer())) {
      result.push(n.languages);
    }
  } else if (typeof n.languages === "string") {
    const languages = n.languages;
    if (languages) {
      result.push(languages.split(","));
    }
  }
  return result;
}
function getColorDepth() {
  return window.screen.colorDepth;
}
function getDeviceMemory() {
  return replaceNaN(toFloat(navigator.deviceMemory), void 0);
}
function getScreenResolution() {
  if (isWebKit() && isWebKit616OrNewer() && isSafariWebKit()) {
    return void 0;
  }
  return getUnstableScreenResolution();
}
function getUnstableScreenResolution() {
  const s = screen;
  const parseDimension = (value) => replaceNaN(toInt(value), null);
  const dimensions = [parseDimension(s.width), parseDimension(s.height)];
  dimensions.sort().reverse();
  return dimensions;
}
const screenFrameCheckInterval = 2500;
const roundingPrecision = 10;
let screenFrameBackup;
let screenFrameSizeTimeoutId;
function watchScreenFrame() {
  if (screenFrameSizeTimeoutId !== void 0) {
    return;
  }
  const checkScreenFrame = () => {
    const frameSize = getCurrentScreenFrame();
    if (isFrameSizeNull(frameSize)) {
      screenFrameSizeTimeoutId = setTimeout(checkScreenFrame, screenFrameCheckInterval);
    } else {
      screenFrameBackup = frameSize;
      screenFrameSizeTimeoutId = void 0;
    }
  };
  checkScreenFrame();
}
function getUnstableScreenFrame() {
  watchScreenFrame();
  return async () => {
    let frameSize = getCurrentScreenFrame();
    if (isFrameSizeNull(frameSize)) {
      if (screenFrameBackup) {
        return [...screenFrameBackup];
      }
      if (getFullscreenElement()) {
        await exitFullscreen();
        frameSize = getCurrentScreenFrame();
      }
    }
    if (!isFrameSizeNull(frameSize)) {
      screenFrameBackup = frameSize;
    }
    return frameSize;
  };
}
function getScreenFrame() {
  if (isWebKit() && isWebKit616OrNewer() && isSafariWebKit()) {
    return () => Promise.resolve(void 0);
  }
  const screenFrameGetter = getUnstableScreenFrame();
  return async () => {
    const frameSize = await screenFrameGetter();
    const processSize = (sideSize) => sideSize === null ? null : round(sideSize, roundingPrecision);
    return [processSize(frameSize[0]), processSize(frameSize[1]), processSize(frameSize[2]), processSize(frameSize[3])];
  };
}
function getCurrentScreenFrame() {
  const s = screen;
  return [
    replaceNaN(toFloat(s.availTop), null),
    replaceNaN(toFloat(s.width) - toFloat(s.availWidth) - replaceNaN(toFloat(s.availLeft), 0), null),
    replaceNaN(toFloat(s.height) - toFloat(s.availHeight) - replaceNaN(toFloat(s.availTop), 0), null),
    replaceNaN(toFloat(s.availLeft), null)
  ];
}
function isFrameSizeNull(frameSize) {
  for (let i = 0; i < 4; ++i) {
    if (frameSize[i]) {
      return false;
    }
  }
  return true;
}
function getHardwareConcurrency() {
  return replaceNaN(toInt(navigator.hardwareConcurrency), void 0);
}
function getTimezone() {
  var _a;
  const DateTimeFormat = (_a = window.Intl) === null || _a === void 0 ? void 0 : _a.DateTimeFormat;
  if (DateTimeFormat) {
    const timezone = new DateTimeFormat().resolvedOptions().timeZone;
    if (timezone) {
      return timezone;
    }
  }
  const offset = -getTimezoneOffset();
  return `UTC${offset >= 0 ? "+" : ""}${offset}`;
}
function getTimezoneOffset() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return Math.max(
    // `getTimezoneOffset` returns a number as a string in some unidentified cases
    toFloat(new Date(currentYear, 0, 1).getTimezoneOffset()),
    toFloat(new Date(currentYear, 6, 1).getTimezoneOffset())
  );
}
function getSessionStorage() {
  try {
    return !!window.sessionStorage;
  } catch (error2) {
    return true;
  }
}
function getLocalStorage() {
  try {
    return !!window.localStorage;
  } catch (e) {
    return true;
  }
}
function getIndexedDB() {
  if (isTrident() || isEdgeHTML()) {
    return void 0;
  }
  try {
    return !!window.indexedDB;
  } catch (e) {
    return true;
  }
}
function getOpenDatabase() {
  return !!window.openDatabase;
}
function getCpuClass() {
  return navigator.cpuClass;
}
function getPlatform() {
  const { platform } = navigator;
  if (platform === "MacIntel") {
    if (isWebKit() && !isDesktopWebKit()) {
      return isIPad() ? "iPad" : "iPhone";
    }
  }
  return platform;
}
function getVendor() {
  return navigator.vendor || "";
}
function getVendorFlavors() {
  const flavors = [];
  for (const key of [
    // Blink and some browsers on iOS
    "chrome",
    // Safari on macOS
    "safari",
    // Chrome on iOS (checked in 85 on 13 and 87 on 14)
    "__crWeb",
    "__gCrWeb",
    // Yandex Browser on iOS, macOS and Android (checked in 21.2 on iOS 14, macOS and Android)
    "yandex",
    // Yandex Browser on iOS (checked in 21.2 on 14)
    "__yb",
    "__ybro",
    // Firefox on iOS (checked in 32 on 14)
    "__firefox__",
    // Edge on iOS (checked in 46 on 14)
    "__edgeTrackingPreventionStatistics",
    "webkit",
    // Opera Touch on iOS (checked in 2.6 on 14)
    "oprt",
    // Samsung Internet on Android (checked in 11.1)
    "samsungAr",
    // UC Browser on Android (checked in 12.10 and 13.0)
    "ucweb",
    "UCShellJava",
    // Puffin on Android (checked in 9.0)
    "puffinDevice"
    // UC on iOS and Opera on Android have no specific global variables
    // Edge for Android isn't checked
  ]) {
    const value = window[key];
    if (value && typeof value === "object") {
      flavors.push(key);
    }
  }
  return flavors.sort();
}
function areCookiesEnabled() {
  const d = document;
  try {
    d.cookie = "cookietest=1; SameSite=Strict;";
    const result = d.cookie.indexOf("cookietest=") !== -1;
    d.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return result;
  } catch (e) {
    return false;
  }
}
function getFilters() {
  const fromB64 = atob;
  return {
    abpIndo: [
      "#Iklan-Melayang",
      "#Kolom-Iklan-728",
      "#SidebarIklan-wrapper",
      '[title="ALIENBOLA" i]',
      fromB64("I0JveC1CYW5uZXItYWRz")
    ],
    abpvn: [".quangcao", "#mobileCatfish", fromB64("LmNsb3NlLWFkcw=="), '[id^="bn_bottom_fixed_"]', "#pmadv"],
    adBlockFinland: [
      ".mainostila",
      fromB64("LnNwb25zb3JpdA=="),
      ".ylamainos",
      fromB64("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")
    ],
    adBlockPersian: [
      "#navbar_notice_50",
      ".kadr",
      'TABLE[width="140px"]',
      "#divAgahi",
      fromB64("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")
    ],
    adBlockWarningRemoval: [
      "#adblock-honeypot",
      ".adblocker-root",
      ".wp_adblock_detect",
      fromB64("LmhlYWRlci1ibG9ja2VkLWFk"),
      fromB64("I2FkX2Jsb2NrZXI=")
    ],
    adGuardAnnoyances: [
      ".hs-sosyal",
      "#cookieconsentdiv",
      'div[class^="app_gdpr"]',
      ".as-oil",
      '[data-cypress="soft-push-notification-modal"]'
    ],
    adGuardBase: [
      ".BetterJsPopOverlay",
      fromB64("I2FkXzMwMFgyNTA="),
      fromB64("I2Jhbm5lcmZsb2F0MjI="),
      fromB64("I2NhbXBhaWduLWJhbm5lcg=="),
      fromB64("I0FkLUNvbnRlbnQ=")
    ],
    adGuardChinese: [
      fromB64("LlppX2FkX2FfSA=="),
      fromB64("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
      "#widget-quan",
      fromB64("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
      fromB64("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")
    ],
    adGuardFrench: [
      "#pavePub",
      fromB64("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
      ".mobile_adhesion",
      ".widgetadv",
      fromB64("LmFkc19iYW4=")
    ],
    adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
    adGuardJapanese: [
      "#kauli_yad_1",
      fromB64("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
      fromB64("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
      fromB64("LmFkZ29vZ2xl"),
      fromB64("Ll9faXNib29zdFJldHVybkFk")
    ],
    adGuardMobile: [
      fromB64("YW1wLWF1dG8tYWRz"),
      fromB64("LmFtcF9hZA=="),
      'amp-embed[type="24smi"]',
      "#mgid_iframe1",
      fromB64("I2FkX2ludmlld19hcmVh")
    ],
    adGuardRussian: [
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
      fromB64("LnJlY2xhbWE="),
      'div[id^="smi2adblock"]',
      fromB64("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
      "#psyduckpockeball"
    ],
    adGuardSocial: [
      fromB64("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),
      fromB64("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
      ".etsy-tweet",
      "#inlineShare",
      ".popup-social"
    ],
    adGuardSpanishPortuguese: ["#barraPublicidade", "#Publicidade", "#publiEspecial", "#queTooltip", ".cnt-publi"],
    adGuardTrackingProtection: [
      "#qoo-counter",
      fromB64("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
      fromB64("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),
      fromB64("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
      "#top100counter"
    ],
    adGuardTurkish: [
      "#backkapat",
      fromB64("I3Jla2xhbWk="),
      fromB64("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
      fromB64("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
      fromB64("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")
    ],
    bulgarian: [fromB64("dGQjZnJlZW5ldF90YWJsZV9hZHM="), "#ea_intext_div", ".lapni-pop-over", "#xenium_hot_offers"],
    easyList: [
      ".yb-floorad",
      fromB64("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
      fromB64("LnRyYWZmaWNqdW5reS1hZA=="),
      ".textad_headline",
      fromB64("LnNwb25zb3JlZC10ZXh0LWxpbmtz")
    ],
    easyListChina: [
      fromB64("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
      fromB64("LmZyb250cGFnZUFkdk0="),
      "#taotaole",
      "#aafoot.top_box",
      ".cfa_popup"
    ],
    easyListCookie: [
      ".ezmob-footer",
      ".cc-CookieWarning",
      "[data-cookie-number]",
      fromB64("LmF3LWNvb2tpZS1iYW5uZXI="),
      ".sygnal24-gdpr-modal-wrap"
    ],
    easyListCzechSlovak: [
      "#onlajny-stickers",
      fromB64("I3Jla2xhbW5pLWJveA=="),
      fromB64("LnJla2xhbWEtbWVnYWJvYXJk"),
      ".sklik",
      fromB64("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")
    ],
    easyListDutch: [
      fromB64("I2FkdmVydGVudGll"),
      fromB64("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
      ".adstekst",
      fromB64("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
      "#semilo-lrectangle"
    ],
    easyListGermany: [
      "#SSpotIMPopSlider",
      fromB64("LnNwb25zb3JsaW5rZ3J1ZW4="),
      fromB64("I3dlcmJ1bmdza3k="),
      fromB64("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")
    ],
    easyListItaly: [
      fromB64("LmJveF9hZHZfYW5udW5jaQ=="),
      ".sb-box-pubbliredazionale",
      fromB64("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")
    ],
    easyListLithuania: [
      fromB64("LnJla2xhbW9zX3RhcnBhcw=="),
      fromB64("LnJla2xhbW9zX251b3JvZG9z"),
      fromB64("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
      fromB64("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
      fromB64("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")
    ],
    estonian: [fromB64("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
    fanboyAnnoyances: ["#ac-lre-player", ".navigate-to-top", "#subscribe_popup", ".newsletter_holder", "#back-top"],
    fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
    fanboyEnhancedTrackers: [
      ".open.pushModal",
      "#issuem-leaky-paywall-articles-zero-remaining-nag",
      "#sovrn_container",
      'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
      ".BlockNag__Card"
    ],
    fanboySocial: ["#FollowUs", "#meteored_share", "#social_follow", ".article-sharer", ".community__social-desc"],
    frellwitSwedish: [
      fromB64("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),
      fromB64("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
      "article.category-samarbete",
      fromB64("ZGl2LmhvbGlkQWRz"),
      "ul.adsmodern"
    ],
    greekAdBlock: [
      fromB64("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
      fromB64("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),
      fromB64("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),
      "DIV.agores300",
      "TABLE.advright"
    ],
    hungarian: [
      "#cemp_doboz",
      ".optimonk-iframe-container",
      fromB64("LmFkX19tYWlu"),
      fromB64("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
      "#hirdetesek_box"
    ],
    iDontCareAboutCookies: [
      '.alert-info[data-block-track*="CookieNotice"]',
      ".ModuleTemplateCookieIndicator",
      ".o--cookies--container",
      "#cookies-policy-sticky",
      "#stickyCookieBar"
    ],
    icelandicAbp: [fromB64("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
    latvian: [
      fromB64("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="),
      fromB64("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")
    ],
    listKr: [
      fromB64("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
      fromB64("I2xpdmVyZUFkV3JhcHBlcg=="),
      fromB64("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
      fromB64("aW5zLmZhc3R2aWV3LWFk"),
      ".revenue_unit_item.dable"
    ],
    listeAr: [
      fromB64("LmdlbWluaUxCMUFk"),
      ".right-and-left-sponsers",
      fromB64("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
      fromB64("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
      fromB64("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")
    ],
    listeFr: [
      fromB64("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
      fromB64("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
      fromB64("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
      ".site-pub-interstitiel",
      'div[id^="crt-"][data-criteo-id]'
    ],
    officialPolish: [
      "#ceneo-placeholder-ceneo-12",
      fromB64("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
      fromB64("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),
      fromB64("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),
      fromB64("ZGl2I3NrYXBpZWNfYWQ=")
    ],
    ro: [
      fromB64("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),
      fromB64("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
      'a[href^="/url/"]'
    ],
    ruAd: [
      fromB64("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
      fromB64("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
      fromB64("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
      "#pgeldiz",
      ".yandex-rtb-block"
    ],
    thaiAds: [
      "a[href*=macau-uta-popup]",
      fromB64("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
      fromB64("LmFkczMwMHM="),
      ".bumq",
      ".img-kosana"
    ],
    webAnnoyancesUltralist: [
      "#mod-social-share-2",
      "#social-tools",
      fromB64("LmN0cGwtZnVsbGJhbm5lcg=="),
      ".zergnet-recommend",
      ".yt.btn-link.btn-md.btn"
    ]
  };
}
async function getDomBlockers({ debug } = {}) {
  if (!isApplicable()) {
    return void 0;
  }
  const filters = getFilters();
  const filterNames = Object.keys(filters);
  const allSelectors = [].concat(...filterNames.map((filterName) => filters[filterName]));
  const blockedSelectors = await getBlockedSelectors(allSelectors);
  if (debug) {
    printDebug(filters, blockedSelectors);
  }
  const activeBlockers = filterNames.filter((filterName) => {
    const selectors = filters[filterName];
    const blockedCount = countTruthy(selectors.map((selector) => blockedSelectors[selector]));
    return blockedCount > selectors.length * 0.6;
  });
  activeBlockers.sort();
  return activeBlockers;
}
function isApplicable() {
  return isWebKit() || isAndroid();
}
async function getBlockedSelectors(selectors) {
  var _a;
  const d = document;
  const root = d.createElement("div");
  const elements = new Array(selectors.length);
  const blockedSelectors = {};
  forceShow(root);
  for (let i = 0; i < selectors.length; ++i) {
    const element = selectorToElement(selectors[i]);
    if (element.tagName === "DIALOG") {
      element.show();
    }
    const holder = d.createElement("div");
    forceShow(holder);
    holder.appendChild(element);
    root.appendChild(holder);
    elements[i] = element;
  }
  while (!d.body) {
    await wait(50);
  }
  d.body.appendChild(root);
  try {
    for (let i = 0; i < selectors.length; ++i) {
      if (!elements[i].offsetParent) {
        blockedSelectors[selectors[i]] = true;
      }
    }
  } finally {
    (_a = root.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(root);
  }
  return blockedSelectors;
}
function forceShow(element) {
  element.style.setProperty("visibility", "hidden", "important");
  element.style.setProperty("display", "block", "important");
}
function printDebug(filters, blockedSelectors) {
  let message = "DOM blockers debug:\n```";
  for (const filterName of Object.keys(filters)) {
    message += `
${filterName}:`;
    for (const selector of filters[filterName]) {
      message += `
  ${blockedSelectors[selector] ? "🚫" : "➡️"} ${selector}`;
    }
  }
  console.log(`${message}
\`\`\``);
}
function getColorGamut() {
  for (const gamut of ["rec2020", "p3", "srgb"]) {
    if (matchMedia(`(color-gamut: ${gamut})`).matches) {
      return gamut;
    }
  }
  return void 0;
}
function areColorsInverted() {
  if (doesMatch$5("inverted")) {
    return true;
  }
  if (doesMatch$5("none")) {
    return false;
  }
  return void 0;
}
function doesMatch$5(value) {
  return matchMedia(`(inverted-colors: ${value})`).matches;
}
function areColorsForced() {
  if (doesMatch$4("active")) {
    return true;
  }
  if (doesMatch$4("none")) {
    return false;
  }
  return void 0;
}
function doesMatch$4(value) {
  return matchMedia(`(forced-colors: ${value})`).matches;
}
const maxValueToCheck = 100;
function getMonochromeDepth() {
  if (!matchMedia("(min-monochrome: 0)").matches) {
    return void 0;
  }
  for (let i = 0; i <= maxValueToCheck; ++i) {
    if (matchMedia(`(max-monochrome: ${i})`).matches) {
      return i;
    }
  }
  throw new Error("Too high value");
}
function getContrastPreference() {
  if (doesMatch$3("no-preference")) {
    return 0;
  }
  if (doesMatch$3("high") || doesMatch$3("more")) {
    return 1;
  }
  if (doesMatch$3("low") || doesMatch$3("less")) {
    return -1;
  }
  if (doesMatch$3("forced")) {
    return 10;
  }
  return void 0;
}
function doesMatch$3(value) {
  return matchMedia(`(prefers-contrast: ${value})`).matches;
}
function isMotionReduced() {
  if (doesMatch$2("reduce")) {
    return true;
  }
  if (doesMatch$2("no-preference")) {
    return false;
  }
  return void 0;
}
function doesMatch$2(value) {
  return matchMedia(`(prefers-reduced-motion: ${value})`).matches;
}
function isTransparencyReduced() {
  if (doesMatch$1("reduce")) {
    return true;
  }
  if (doesMatch$1("no-preference")) {
    return false;
  }
  return void 0;
}
function doesMatch$1(value) {
  return matchMedia(`(prefers-reduced-transparency: ${value})`).matches;
}
function isHDR() {
  if (doesMatch("high")) {
    return true;
  }
  if (doesMatch("standard")) {
    return false;
  }
  return void 0;
}
function doesMatch(value) {
  return matchMedia(`(dynamic-range: ${value})`).matches;
}
const M = Math;
const fallbackFn = () => 0;
function getMathFingerprint() {
  const acos = M.acos || fallbackFn;
  const acosh = M.acosh || fallbackFn;
  const asin = M.asin || fallbackFn;
  const asinh = M.asinh || fallbackFn;
  const atanh = M.atanh || fallbackFn;
  const atan = M.atan || fallbackFn;
  const sin = M.sin || fallbackFn;
  const sinh = M.sinh || fallbackFn;
  const cos = M.cos || fallbackFn;
  const cosh = M.cosh || fallbackFn;
  const tan = M.tan || fallbackFn;
  const tanh = M.tanh || fallbackFn;
  const exp = M.exp || fallbackFn;
  const expm1 = M.expm1 || fallbackFn;
  const log1p = M.log1p || fallbackFn;
  const powPI = (value) => M.pow(M.PI, value);
  const acoshPf = (value) => M.log(value + M.sqrt(value * value - 1));
  const asinhPf = (value) => M.log(value + M.sqrt(value * value + 1));
  const atanhPf = (value) => M.log((1 + value) / (1 - value)) / 2;
  const sinhPf = (value) => M.exp(value) - 1 / M.exp(value) / 2;
  const coshPf = (value) => (M.exp(value) + 1 / M.exp(value)) / 2;
  const expm1Pf = (value) => M.exp(value) - 1;
  const tanhPf = (value) => (M.exp(2 * value) - 1) / (M.exp(2 * value) + 1);
  const log1pPf = (value) => M.log(1 + value);
  return {
    acos: acos(0.12312423423423424),
    acosh: acosh(1e308),
    acoshPf: acoshPf(1e154),
    asin: asin(0.12312423423423424),
    asinh: asinh(1),
    asinhPf: asinhPf(1),
    atanh: atanh(0.5),
    atanhPf: atanhPf(0.5),
    atan: atan(0.5),
    sin: sin(-1e300),
    sinh: sinh(1),
    sinhPf: sinhPf(1),
    cos: cos(10.000000000123),
    cosh: cosh(1),
    coshPf: coshPf(1),
    tan: tan(-1e300),
    tanh: tanh(1),
    tanhPf: tanhPf(1),
    exp: exp(1),
    expm1: expm1(1),
    expm1Pf: expm1Pf(1),
    log1p: log1p(10),
    log1pPf: log1pPf(10),
    powPI: powPI(-100)
  };
}
const defaultText = "mmMwWLliI0fiflO&1";
const presets = {
  /**
   * The default font. User can change it in desktop Chrome, desktop Firefox, IE 11,
   * Android Chrome (but only when the size is ≥ than the default) and Android Firefox.
   */
  default: [],
  /** OS font on macOS. User can change its size and weight. Applies after Safari restart. */
  apple: [{ font: "-apple-system-body" }],
  /** User can change it in desktop Chrome and desktop Firefox. */
  serif: [{ fontFamily: "serif" }],
  /** User can change it in desktop Chrome and desktop Firefox. */
  sans: [{ fontFamily: "sans-serif" }],
  /** User can change it in desktop Chrome and desktop Firefox. */
  mono: [{ fontFamily: "monospace" }],
  /**
   * Check the smallest allowed font size. User can change it in desktop Chrome, desktop Firefox and desktop Safari.
   * The height can be 0 in Chrome on a retina display.
   */
  min: [{ fontSize: "1px" }],
  /** Tells one OS from another in desktop Chrome. */
  system: [{ fontFamily: "system-ui" }]
};
function getFontPreferences() {
  return withNaturalFonts((document2, container) => {
    const elements = {};
    const sizes = {};
    for (const key of Object.keys(presets)) {
      const [style = {}, text2 = defaultText] = presets[key];
      const element = document2.createElement("span");
      element.textContent = text2;
      element.style.whiteSpace = "nowrap";
      for (const name of Object.keys(style)) {
        const value = style[name];
        if (value !== void 0) {
          element.style[name] = value;
        }
      }
      elements[key] = element;
      container.append(document2.createElement("br"), element);
    }
    for (const key of Object.keys(presets)) {
      sizes[key] = elements[key].getBoundingClientRect().width;
    }
    return sizes;
  });
}
function withNaturalFonts(action, containerWidthPx = 4e3) {
  return withIframe((_, iframeWindow) => {
    const iframeDocument = iframeWindow.document;
    const iframeBody = iframeDocument.body;
    const bodyStyle = iframeBody.style;
    bodyStyle.width = `${containerWidthPx}px`;
    bodyStyle.webkitTextSizeAdjust = bodyStyle.textSizeAdjust = "none";
    if (isChromium()) {
      iframeBody.style.zoom = `${1 / iframeWindow.devicePixelRatio}`;
    } else if (isWebKit()) {
      iframeBody.style.zoom = "reset";
    }
    const linesOfText = iframeDocument.createElement("div");
    linesOfText.textContent = [...Array(containerWidthPx / 20 << 0)].map(() => "word").join(" ");
    iframeBody.appendChild(linesOfText);
    return action(iframeDocument, iframeBody);
  }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
}
function isPdfViewerEnabled() {
  return navigator.pdfViewerEnabled;
}
function getArchitecture() {
  const f = new Float32Array(1);
  const u8 = new Uint8Array(f.buffer);
  f[0] = Infinity;
  f[0] = f[0] - f[0];
  return u8[3];
}
function getApplePayState() {
  const { ApplePaySession } = window;
  if (typeof (ApplePaySession === null || ApplePaySession === void 0 ? void 0 : ApplePaySession.canMakePayments) !== "function") {
    return -1;
  }
  if (willPrintConsoleError()) {
    return -3;
  }
  try {
    return ApplePaySession.canMakePayments() ? 1 : 0;
  } catch (error2) {
    return getStateFromError(error2);
  }
}
const willPrintConsoleError = isAnyParentCrossOrigin;
function getStateFromError(error2) {
  if (error2 instanceof Error && error2.name === "InvalidAccessError" && /\bfrom\b.*\binsecure\b/i.test(error2.message)) {
    return -2;
  }
  throw error2;
}
function getPrivateClickMeasurement() {
  var _a;
  const link = document.createElement("a");
  const sourceId = (_a = link.attributionSourceId) !== null && _a !== void 0 ? _a : link.attributionsourceid;
  return sourceId === void 0 ? void 0 : String(sourceId);
}
const STATUS_NO_GL_CONTEXT = -1;
const STATUS_GET_PARAMETER_NOT_A_FUNCTION = -2;
const validContextParameters = /* @__PURE__ */ new Set([
  10752,
  2849,
  2884,
  2885,
  2886,
  2928,
  2929,
  2930,
  2931,
  2932,
  2960,
  2961,
  2962,
  2963,
  2964,
  2965,
  2966,
  2967,
  2968,
  2978,
  3024,
  3042,
  3088,
  3089,
  3106,
  3107,
  32773,
  32777,
  32777,
  32823,
  32824,
  32936,
  32937,
  32938,
  32939,
  32968,
  32969,
  32970,
  32971,
  3317,
  33170,
  3333,
  3379,
  3386,
  33901,
  33902,
  34016,
  34024,
  34076,
  3408,
  3410,
  3411,
  3412,
  3413,
  3414,
  3415,
  34467,
  34816,
  34817,
  34818,
  34819,
  34877,
  34921,
  34930,
  35660,
  35661,
  35724,
  35738,
  35739,
  36003,
  36004,
  36005,
  36347,
  36348,
  36349,
  37440,
  37441,
  37443,
  7936,
  7937,
  7938
  // SAMPLE_ALPHA_TO_COVERAGE (32926) and SAMPLE_COVERAGE (32928) are excluded because they trigger a console warning
  // in IE, Chrome ≤ 59 and Safari ≤ 13 and give no entropy.
]);
const validExtensionParams = /* @__PURE__ */ new Set([
  34047,
  35723,
  36063,
  34852,
  34853,
  34854,
  34229,
  36392,
  36795,
  38449
  // MAX_VIEWS_OVR
]);
const shaderTypes = ["FRAGMENT_SHADER", "VERTEX_SHADER"];
const precisionTypes = ["LOW_FLOAT", "MEDIUM_FLOAT", "HIGH_FLOAT", "LOW_INT", "MEDIUM_INT", "HIGH_INT"];
const rendererInfoExtensionName = "WEBGL_debug_renderer_info";
const polygonModeExtensionName = "WEBGL_polygon_mode";
function getWebGlBasics({ cache: cache2 }) {
  var _a, _b, _c, _d, _e, _f;
  const gl = getWebGLContext(cache2);
  if (!gl) {
    return STATUS_NO_GL_CONTEXT;
  }
  if (!isValidParameterGetter(gl)) {
    return STATUS_GET_PARAMETER_NOT_A_FUNCTION;
  }
  const debugExtension = shouldAvoidDebugRendererInfo() ? null : gl.getExtension(rendererInfoExtensionName);
  return {
    version: ((_a = gl.getParameter(gl.VERSION)) === null || _a === void 0 ? void 0 : _a.toString()) || "",
    vendor: ((_b = gl.getParameter(gl.VENDOR)) === null || _b === void 0 ? void 0 : _b.toString()) || "",
    vendorUnmasked: debugExtension ? (_c = gl.getParameter(debugExtension.UNMASKED_VENDOR_WEBGL)) === null || _c === void 0 ? void 0 : _c.toString() : "",
    renderer: ((_d = gl.getParameter(gl.RENDERER)) === null || _d === void 0 ? void 0 : _d.toString()) || "",
    rendererUnmasked: debugExtension ? (_e = gl.getParameter(debugExtension.UNMASKED_RENDERER_WEBGL)) === null || _e === void 0 ? void 0 : _e.toString() : "",
    shadingLanguageVersion: ((_f = gl.getParameter(gl.SHADING_LANGUAGE_VERSION)) === null || _f === void 0 ? void 0 : _f.toString()) || ""
  };
}
function getWebGlExtensions({ cache: cache2 }) {
  const gl = getWebGLContext(cache2);
  if (!gl) {
    return STATUS_NO_GL_CONTEXT;
  }
  if (!isValidParameterGetter(gl)) {
    return STATUS_GET_PARAMETER_NOT_A_FUNCTION;
  }
  const extensions = gl.getSupportedExtensions();
  const contextAttributes = gl.getContextAttributes();
  const unsupportedExtensions = [];
  const attributes = [];
  const parameters = [];
  const extensionParameters = [];
  const shaderPrecisions = [];
  if (contextAttributes) {
    for (const attributeName of Object.keys(contextAttributes)) {
      attributes.push(`${attributeName}=${contextAttributes[attributeName]}`);
    }
  }
  const constants = getConstantsFromPrototype(gl);
  for (const constant of constants) {
    const code = gl[constant];
    parameters.push(`${constant}=${code}${validContextParameters.has(code) ? `=${gl.getParameter(code)}` : ""}`);
  }
  if (extensions) {
    for (const name of extensions) {
      if (name === rendererInfoExtensionName && shouldAvoidDebugRendererInfo() || name === polygonModeExtensionName && shouldAvoidPolygonModeExtensions()) {
        continue;
      }
      const extension = gl.getExtension(name);
      if (!extension) {
        unsupportedExtensions.push(name);
        continue;
      }
      for (const constant of getConstantsFromPrototype(extension)) {
        const code = extension[constant];
        extensionParameters.push(`${constant}=${code}${validExtensionParams.has(code) ? `=${gl.getParameter(code)}` : ""}`);
      }
    }
  }
  for (const shaderType of shaderTypes) {
    for (const precisionType of precisionTypes) {
      const shaderPrecision = getShaderPrecision(gl, shaderType, precisionType);
      shaderPrecisions.push(`${shaderType}.${precisionType}=${shaderPrecision.join(",")}`);
    }
  }
  extensionParameters.sort();
  parameters.sort();
  return {
    contextAttributes: attributes,
    parameters,
    shaderPrecisions,
    extensions,
    extensionParameters,
    unsupportedExtensions
  };
}
function getWebGLContext(cache2) {
  if (cache2.webgl) {
    return cache2.webgl.context;
  }
  const canvas = document.createElement("canvas");
  let context;
  canvas.addEventListener("webglCreateContextError", () => context = void 0);
  for (const type of ["webgl", "experimental-webgl"]) {
    try {
      context = canvas.getContext(type);
    } catch (_a) {
    }
    if (context) {
      break;
    }
  }
  cache2.webgl = { context };
  return context;
}
function getShaderPrecision(gl, shaderType, precisionType) {
  const shaderPrecision = gl.getShaderPrecisionFormat(gl[shaderType], gl[precisionType]);
  return shaderPrecision ? [shaderPrecision.rangeMin, shaderPrecision.rangeMax, shaderPrecision.precision] : [];
}
function getConstantsFromPrototype(obj) {
  const keys = Object.keys(obj.__proto__);
  return keys.filter(isConstantLike);
}
function isConstantLike(key) {
  return typeof key === "string" && !key.match(/[^A-Z0-9_x]/);
}
function shouldAvoidDebugRendererInfo() {
  return isGecko();
}
function shouldAvoidPolygonModeExtensions() {
  return isChromium() || isWebKit();
}
function isValidParameterGetter(gl) {
  return typeof gl.getParameter === "function";
}
function getAudioContextBaseLatency() {
  const isAllowedPlatform = isAndroid() || isWebKit();
  if (!isAllowedPlatform) {
    return -2;
  }
  if (!window.AudioContext) {
    return -1;
  }
  const latency = new AudioContext().baseLatency;
  if (latency === null || latency === void 0) {
    return -1;
  }
  if (!isFinite(latency)) {
    return -3;
  }
  return latency;
}
function getDateTimeLocale() {
  if (!window.Intl) {
    return -1;
  }
  const DateTimeFormat = window.Intl.DateTimeFormat;
  if (!DateTimeFormat) {
    return -2;
  }
  const locale = DateTimeFormat().resolvedOptions().locale;
  if (!locale && locale !== "") {
    return -3;
  }
  return locale;
}
const sources = {
  // READ FIRST:
  // See https://github.com/fingerprintjs/fingerprintjs/blob/master/contributing.md#how-to-add-an-entropy-source
  // to learn how entropy source works and how to make your own.
  // The sources run in this exact order.
  // The asynchronous sources are at the start to run in parallel with other sources.
  fonts: getFonts,
  domBlockers: getDomBlockers,
  fontPreferences: getFontPreferences,
  audio: getAudioFingerprint,
  screenFrame: getScreenFrame,
  canvas: getCanvasFingerprint,
  osCpu: getOsCpu,
  languages: getLanguages,
  colorDepth: getColorDepth,
  deviceMemory: getDeviceMemory,
  screenResolution: getScreenResolution,
  hardwareConcurrency: getHardwareConcurrency,
  timezone: getTimezone,
  sessionStorage: getSessionStorage,
  localStorage: getLocalStorage,
  indexedDB: getIndexedDB,
  openDatabase: getOpenDatabase,
  cpuClass: getCpuClass,
  platform: getPlatform,
  plugins: getPlugins,
  touchSupport: getTouchSupport,
  vendor: getVendor,
  vendorFlavors: getVendorFlavors,
  cookiesEnabled: areCookiesEnabled,
  colorGamut: getColorGamut,
  invertedColors: areColorsInverted,
  forcedColors: areColorsForced,
  monochrome: getMonochromeDepth,
  contrast: getContrastPreference,
  reducedMotion: isMotionReduced,
  reducedTransparency: isTransparencyReduced,
  hdr: isHDR,
  math: getMathFingerprint,
  pdfViewerEnabled: isPdfViewerEnabled,
  architecture: getArchitecture,
  applePay: getApplePayState,
  privateClickMeasurement: getPrivateClickMeasurement,
  audioBaseLatency: getAudioContextBaseLatency,
  dateTimeLocale: getDateTimeLocale,
  // Some sources can affect other sources (e.g. WebGL can affect canvas), so it's important to run these sources
  // after other sources.
  webGlBasics: getWebGlBasics,
  webGlExtensions: getWebGlExtensions
};
function loadBuiltinSources(options) {
  return loadSources(sources, options, []);
}
const commentTemplate = "$ if upgrade to Pro: https://fpjs.dev/pro";
function getConfidence(components) {
  const openConfidenceScore = getOpenConfidenceScore(components);
  const proConfidenceScore = deriveProConfidenceScore(openConfidenceScore);
  return { score: openConfidenceScore, comment: commentTemplate.replace(/\$/g, `${proConfidenceScore}`) };
}
function getOpenConfidenceScore(components) {
  if (isAndroid()) {
    return 0.4;
  }
  if (isWebKit()) {
    return isDesktopWebKit() && !(isWebKit616OrNewer() && isSafariWebKit()) ? 0.5 : 0.3;
  }
  const platform = "value" in components.platform ? components.platform.value : "";
  if (/^Win/.test(platform)) {
    return 0.6;
  }
  if (/^Mac/.test(platform)) {
    return 0.5;
  }
  return 0.7;
}
function deriveProConfidenceScore(openConfidenceScore) {
  return round(0.99 + 0.01 * openConfidenceScore, 1e-4);
}
function componentsToCanonicalString(components) {
  let result = "";
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    const value = "error" in component ? "error" : JSON.stringify(component.value);
    result += `${result ? "|" : ""}${componentKey.replace(/([:|\\])/g, "\\$1")}:${value}`;
  }
  return result;
}
function componentsToDebugString(components) {
  return JSON.stringify(components, (_key, value) => {
    if (value instanceof Error) {
      return errorToObject(value);
    }
    return value;
  }, 2);
}
function hashComponents(components) {
  return x64hash128(componentsToCanonicalString(components));
}
function makeLazyGetResult(components) {
  let visitorIdCache;
  const confidence = getConfidence(components);
  return {
    get visitorId() {
      if (visitorIdCache === void 0) {
        visitorIdCache = hashComponents(this.components);
      }
      return visitorIdCache;
    },
    set visitorId(visitorId) {
      visitorIdCache = visitorId;
    },
    confidence,
    components,
    version
  };
}
function prepareForSources(delayFallback = 50) {
  return requestIdleCallbackIfAvailable(delayFallback, delayFallback * 2);
}
function makeAgent(getComponents, debug) {
  const creationTime = Date.now();
  return {
    async get(options) {
      const startTime = Date.now();
      const components = await getComponents();
      const result = makeLazyGetResult(components);
      if (debug || (options === null || options === void 0 ? void 0 : options.debug)) {
        console.log(`Copy the text below to get the debug data:

\`\`\`
version: ${result.version}
userAgent: ${navigator.userAgent}
timeBetweenLoadAndGet: ${startTime - creationTime}
visitorId: ${result.visitorId}
components: ${componentsToDebugString(components)}
\`\`\``);
      }
      return result;
    }
  };
}
function monitor() {
  if (window.__fpjs_d_m || Math.random() >= 1e-3) {
    return;
  }
  try {
    const request = new XMLHttpRequest();
    request.open("get", `https://m1.openfpcdn.io/fingerprintjs/v${version}/npm-monitoring`, true);
    request.send();
  } catch (error2) {
    console.error(error2);
  }
}
async function load(options = {}) {
  var _a;
  if ((_a = options.monitoring) !== null && _a !== void 0 ? _a : true) {
    monitor();
  }
  const { delayFallback, debug } = options;
  await prepareForSources(delayFallback);
  const getComponents = loadBuiltinSources({ cache: {}, debug });
  return makeAgent(getComponents, debug);
}
var index = { load, hashComponents, componentsToDebugString };
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { middleware })
      );
    },
    inputValidator: (inputValidator) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { inputValidator })
      );
    },
    client: (client) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { client })
      );
    },
    server: (server) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { server })
      );
    }
  };
};
const appCss = "/assets/styles-CiTkEIKp.css";
const initialState$1 = {
  theme: "system",
  // Default for initial server render
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState$1);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setThemeState] = useState(defaultTheme);
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    setThemeState(storedTheme);
  }, [defaultTheme, storageKey]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (newTheme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
      setThemeState(newTheme);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const initialState = {
  fingerprint: null
};
const FingerprintProviderContext = createContext(initialState);
function FingerprintProvider({
  children,
  defaultFingerprint = null,
  storageKey = "calculated-fingerprint",
  ...props
}) {
  const [fingerprint, setFingerprint] = useState(
    defaultFingerprint
  );
  useEffect(() => {
    const storedFingerprint = localStorage.getItem(storageKey);
    if (storedFingerprint) {
      setFingerprint(storedFingerprint);
    } else {
      index.load().then((fingerPrint) => fingerPrint.get()).then((res) => {
        setFingerprint(res.visitorId);
        localStorage.setItem(storageKey, res.visitorId);
      }).catch(() => setFingerprint(defaultFingerprint));
    }
  }, [defaultFingerprint, storageKey]);
  return /* @__PURE__ */ jsx(FingerprintProviderContext.Provider, { ...props, value: { fingerprint }, children });
}
const useFingerprint = () => {
  const context = useContext(FingerprintProviderContext);
  return context;
};
var defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
const createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
  const Component = forwardRef(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) => createElement(
      "svg",
      {
        ref,
        ...defaultAttributes[type],
        width: size,
        height: size,
        className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
        ...type === "filled" ? {
          fill: color
        } : {
          strokeWidth: stroke,
          stroke: color
        },
        ...rest
      },
      [
        title && createElement("title", { key: "svg-title" }, title),
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  Component.displayName = `${iconNamePascal}`;
  return Component;
};
const __iconNode$4 = [["path", { "d": "M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z", "key": "svg-0" }], ["path", { "d": "M12 8v4", "key": "svg-1" }], ["path", { "d": "M12 16h.01", "key": "svg-2" }]];
const IconAlertOctagon = createReactComponent("outline", "alert-octagon", "AlertOctagon", __iconNode$4);
const __iconNode$3 = [["path", { "d": "M12 9v4", "key": "svg-0" }], ["path", { "d": "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z", "key": "svg-1" }], ["path", { "d": "M12 16h.01", "key": "svg-2" }]];
const IconAlertTriangle = createReactComponent("outline", "alert-triangle", "AlertTriangle", __iconNode$3);
const __iconNode$2 = [["path", { "d": "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M9 12l2 2l4 -4", "key": "svg-1" }]];
const IconCircleCheck = createReactComponent("outline", "circle-check", "CircleCheck", __iconNode$2);
const __iconNode$1 = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 9h.01", "key": "svg-1" }], ["path", { "d": "M11 12h1v4h1", "key": "svg-2" }]];
const IconInfoCircle = createReactComponent("outline", "info-circle", "InfoCircle", __iconNode$1);
const __iconNode = [["path", { "d": "M12 6l0 -3", "key": "svg-0" }], ["path", { "d": "M16.25 7.75l2.15 -2.15", "key": "svg-1" }], ["path", { "d": "M18 12l3 0", "key": "svg-2" }], ["path", { "d": "M16.25 16.25l2.15 2.15", "key": "svg-3" }], ["path", { "d": "M12 18l0 3", "key": "svg-4" }], ["path", { "d": "M7.75 16.25l-2.15 2.15", "key": "svg-5" }], ["path", { "d": "M6 12l-3 0", "key": "svg-6" }], ["path", { "d": "M7.75 7.75l-2.15 -2.15", "key": "svg-7" }]];
const IconLoader = createReactComponent("outline", "loader", "Loader", __iconNode);
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx(IconCircleCheck, { className: "size-4" }),
        info: /* @__PURE__ */ jsx(IconInfoCircle, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx(IconAlertTriangle, { className: "size-4" }),
        error: /* @__PURE__ */ jsx(IconAlertOctagon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx(IconLoader, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      toastOptions: {
        classNames: {
          toast: "cn-toast"
        }
      },
      ...props
    }
  );
};
const Route$5 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Trojan Takedown"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsx(ThemeProvider, { defaultTheme: "system", storageKey: "vite-ui-theme", children: /* @__PURE__ */ jsxs(
      FingerprintProvider,
      {
        defaultFingerprint: null,
        storageKey: "calculated-fingerprint",
        children: [
          /* @__PURE__ */ jsxs("body", { children: [
            children,
            /* @__PURE__ */ jsx(Scripts, {})
          ] }),
          /* @__PURE__ */ jsx(Toaster, {})
        ]
      }
    ) })
  ] });
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getAllWrestlers_createServerFn_handler = createSsrRpc("dc5575e1597bb3e4a610bdbdfee2f8fe77e08c2e899e3326e8635f6ba5fca976");
const getAllWrestlers = createServerFn({
  method: "GET"
}).handler(getAllWrestlers_createServerFn_handler);
const getAllVotes_createServerFn_handler = createSsrRpc("2325302c7035482b494b455b1e0f01db51897bf75cc174eebb4aeda75f640087");
createServerFn({
  method: "GET"
}).handler(getAllVotes_createServerFn_handler);
const getWrestlers_createServerFn_handler = createSsrRpc("8b6e1261a0cb5fdf8fb26c5c338aecc3981b29a594676ccfcd89d8da1efbd79f");
createServerFn({
  method: "GET"
}).inputValidator((data) => ({
  cursor: data.cursor,
  pageSize: data.pageSize ?? 20,
  search: data.search ?? ""
})).handler(getWrestlers_createServerFn_handler);
const submitVote_createServerFn_handler = createSsrRpc("2ffe74429b89e07aeba6eb9cca167a2293bd910474af4f1722aed2dbc5d76466");
const submitVote = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(submitVote_createServerFn_handler);
const updateWrestler_createServerFn_handler = createSsrRpc("8d187bc956eef3c4b3810b8a2afbe71ec37ded6abc16e95a7758dd8d3ab9c123");
const updateWrestler = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  try {
    return wrestlerUpdateSchema.parse(data);
  } catch (error2) {
    console.error(error2);
    if (error2 instanceof z__default.ZodError) {
      throw new Error(z__default.prettifyError(error2));
    }
    throw new Error("Failed to validate input");
  }
}).handler(updateWrestler_createServerFn_handler);
const addWrestlers_createServerFn_handler = createSsrRpc("b33281046d8b6459bc2ff3a56176424faaf804b4e9f99af6f03f80e6931c1037");
const addWrestlers = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  try {
    return baseWrestlersSchema.parse(data);
  } catch (error2) {
    console.error(error2);
    if (error2 instanceof z__default.ZodError) {
      throw new Error(z__default.prettifyError(error2));
    }
    throw new Error("failed validate input to add Wrestler");
  }
}).handler(addWrestlers_createServerFn_handler);
const deleteWrestler_createServerFn_handler = createSsrRpc("7631bcc1835dd182bcc641df8673e57e90711ef6b1c79b32e2922586189c8140");
const deleteWrestler = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteWrestler_createServerFn_handler);
const deleteAllWrestlers_createServerFn_handler = createSsrRpc("990b5b9e6cfec53c759887d3d3d6bde1c1606a5404b65b91370dcb6e4137fcfd");
createServerFn({
  method: "POST"
}).handler(deleteAllWrestlers_createServerFn_handler);
const getWrestlersWithVoteCounts_createServerFn_handler = createSsrRpc("13d05cc4ba7f29789cb7471a391425062cdea104ed30ebc2027b653b14e13da8");
const getWrestlersWithVoteCounts = createServerFn({
  method: "GET"
}).handler(getWrestlersWithVoteCounts_createServerFn_handler);
const $$splitComponentImporter$3 = () => import("./vote-BE95HPIy.mjs");
const Route$4 = createFileRoute("/vote")({
  loader: async () => {
    return await getAllWrestlers();
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const { get: getOAuthState, set: setOAuthState } = defineRequestState(() => null);
const generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
function constantTimeEqual(a, b) {
  if (typeof a === "string") a = new TextEncoder().encode(a);
  if (typeof b === "string") b = new TextEncoder().encode(b);
  const aBuffer = new Uint8Array(a);
  const bBuffer = new Uint8Array(b);
  let c = aBuffer.length ^ bBuffer.length;
  const length = Math.max(aBuffer.length, bBuffer.length);
  for (let i = 0; i < length; i++) c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
  return c === 0;
}
async function signJWT(payload, secret, expiresIn = 3600) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
  } catch {
    return null;
  }
}
const info = new Uint8Array([
  66,
  101,
  116,
  116,
  101,
  114,
  65,
  117,
  116,
  104,
  46,
  106,
  115,
  32,
  71,
  101,
  110,
  101,
  114,
  97,
  116,
  101,
  100,
  32,
  69,
  110,
  99,
  114,
  121,
  112,
  116,
  105,
  111,
  110,
  32,
  75,
  101,
  121
]);
const now = () => Date.now() / 1e3 | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
async function symmetricEncodeJWT(payload, secret, salt, expiresIn = 3600) {
  const encryptionSecret = hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
  const thumbprint = await calculateJwkThumbprint({
    kty: "oct",
    k: base64url.encode(encryptionSecret)
  }, "sha256");
  return await new EncryptJWT(payload).setProtectedHeader({
    alg,
    enc,
    kid: thumbprint
  }).setIssuedAt().setExpirationTime(now() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
async function symmetricDecodeJWT(token, secret, salt) {
  if (!token) return null;
  try {
    const { payload } = await jwtDecrypt(token, async ({ kid }) => {
      const encryptionSecret = hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
      if (kid === void 0) return encryptionSecret;
      if (kid === await calculateJwkThumbprint({
        kty: "oct",
        k: base64url.encode(encryptionSecret)
      }, "sha256")) return encryptionSecret;
      throw new Error("no matching decryption secret");
    }, {
      clockTolerance: 15,
      keyManagementAlgorithms: [alg],
      contentEncryptionAlgorithms: [enc, "A256GCM"]
    });
    return payload;
  } catch {
    return null;
  }
}
const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
async function generateKey(password, salt) {
  return await scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  });
}
const hashPassword = async (password) => {
  const salt = hex.encode(crypto.getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);
  return `${salt}:${hex.encode(key)}`;
};
const verifyPassword = async ({ hash, password }) => {
  const [salt, key] = hash.split(":");
  if (!salt || !key) throw new BetterAuthError("Invalid password hash");
  return constantTimeEqual(await generateKey(password, salt), hexToBytes$1(key));
};
const symmetricEncrypt = async ({ key, data }) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = utf8ToBytes(data);
  return bytesToHex(managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes)).encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({ key, data }) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = hexToBytes(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};
async function generateState(c, link, additionalData) {
  const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
  if (!callbackURL) throw new APIError("BAD_REQUEST", { message: "callbackURL is required" });
  const codeVerifier = generateRandomString(128);
  const state = generateRandomString(32);
  const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
  const stateData = {
    ...additionalData ? additionalData : {},
    callbackURL,
    codeVerifier,
    errorURL: c.body?.errorCallbackURL,
    newUserURL: c.body?.newUserCallbackURL,
    link,
    expiresAt: Date.now() + 600 * 1e3,
    requestSignUp: c.body?.requestSignUp,
    state
  };
  await setOAuthState(stateData);
  if (storeStateStrategy === "cookie") {
    const encryptedData = await symmetricEncrypt({
      key: c.context.secret,
      data: JSON.stringify(stateData)
    });
    const stateCookie$1 = c.context.createAuthCookie("oauth_state", { maxAge: 600 * 1e3 });
    c.setCookie(stateCookie$1.name, encryptedData, stateCookie$1.attributes);
    return {
      state,
      codeVerifier
    };
  }
  const stateCookie = c.context.createAuthCookie("state", { maxAge: 300 * 1e3 });
  await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  const verification2 = await c.context.internalAdapter.createVerificationValue({
    value: JSON.stringify(stateData),
    identifier: state,
    expiresAt
  });
  if (!verification2) {
    c.context.logger.error("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database");
    throw new APIError("INTERNAL_SERVER_ERROR", { message: "Unable to create verification" });
  }
  return {
    state: verification2.identifier,
    codeVerifier
  };
}
async function parseState(c) {
  const state = c.query.state || c.body.state;
  const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
  const stateDataSchema = z.looseObject({
    callbackURL: z.string(),
    codeVerifier: z.string(),
    errorURL: z.string().optional(),
    newUserURL: z.string().optional(),
    expiresAt: z.number(),
    link: z.object({
      email: z.string(),
      userId: z.coerce.string()
    }).optional(),
    requestSignUp: z.boolean().optional(),
    state: z.string().optional()
  });
  let parsedData;
  const skipStateCookieCheck = c.context.oauthConfig?.skipStateCookieCheck;
  if (storeStateStrategy === "cookie") {
    const stateCookie = c.context.createAuthCookie("oauth_state");
    const encryptedData = c.getCookie(stateCookie.name);
    if (!encryptedData) {
      c.context.logger.error("State Mismatch. OAuth state cookie not found", { state });
      const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    try {
      const decryptedData = await symmetricDecrypt({
        key: c.context.secret,
        data: encryptedData
      });
      parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
    } catch (error2) {
      c.context.logger.error("Failed to decrypt or parse OAuth state cookie", { error: error2 });
      const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    if (!c.context.oauthConfig?.skipStateCookieCheck && parsedData.state && parsedData.state !== state) {
      c.context.logger.error("State Mismatch. State parameter does not match", {
        expected: parsedData.state,
        received: state
      });
      const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=state_mismatch`);
    }
    c.setCookie(stateCookie.name, "", { maxAge: 0 });
  } else {
    const data = await c.context.internalAdapter.findVerificationValue(state);
    if (!data) {
      c.context.logger.error("State Mismatch. Verification not found", { state });
      const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    parsedData = stateDataSchema.parse(JSON.parse(data.value));
    const stateCookie = c.context.createAuthCookie("state");
    const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
    if (!skipStateCookieCheck && (!stateCookieValue || stateCookieValue !== state)) {
      const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=state_mismatch`);
    }
    c.setCookie(stateCookie.name, "", { maxAge: 0 });
    await c.context.internalAdapter.deleteVerificationValue(data.id);
  }
  if (!parsedData.errorURL) parsedData.errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
  if (parsedData.expiresAt < Date.now()) {
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=please_restart_the_process`);
  }
  if (parsedData) await setOAuthState(parsedData);
  return parsedData;
}
const HIDE_METADATA = { scope: "server" };
const LOCALHOST_IP = "127.0.0.1";
function getIp(req, options) {
  if (options.advanced?.ipAddress?.disableIpTracking) return null;
  if (isTest() || isDevelopment()) return LOCALHOST_IP;
  const headers = "headers" in req ? req.headers : req;
  const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || ["x-forwarded-for"];
  for (const key of ipHeaders) {
    const value = "get" in headers ? headers.get(key) : headers[key];
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) return ip;
    }
  }
  return null;
}
function isValidIP(ip) {
  if (z.ipv4().safeParse(ip).success) return true;
  if (z.ipv6().safeParse(ip).success) return true;
  return false;
}
const originCheckMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.request?.method === "GET" || ctx.request?.method === "OPTIONS" || ctx.request?.method === "HEAD" || !ctx.request) return;
  const headers = ctx.request?.headers;
  const { body, query } = ctx;
  const originHeader = headers?.get("origin") || headers?.get("referer") || "";
  const callbackURL = body?.callbackURL || query?.callbackURL;
  const redirectURL = body?.redirectTo;
  const errorCallbackURL = body?.errorCallbackURL;
  const newUserCallbackURL = body?.newUserCallbackURL;
  const useCookies = headers?.has("cookie");
  const validateURL = (url, label) => {
    if (!url) return;
    if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
      throw new APIError("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  if (useCookies && !ctx.context.skipCSRFCheck && !ctx.context.skipOriginCheck) {
    if (!originHeader || originHeader === "null") throw new APIError("FORBIDDEN", { message: "Missing or null Origin" });
    validateURL(originHeader, "origin");
  }
  callbackURL && validateURL(callbackURL, "callbackURL");
  redirectURL && validateURL(redirectURL, "redirectURL");
  errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
  newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
const originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
  if (!ctx.request) return;
  const callbackURL = getValue(ctx);
  const validateURL = (url, label) => {
    if (!url) return;
    if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
      throw new APIError("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
  for (const url of callbacks) validateURL(url, "callbackURL");
});
function escapeRegExpChar(char) {
  if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
  else return char;
}
function escapeRegExpString(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) result += escapeRegExpChar(str[i]);
  return result;
}
function transform(pattern, separator = true) {
  if (Array.isArray(pattern)) return `(?:${pattern.map((p) => `^${transform(p, separator)}$`).join("|")})`;
  let separatorSplitter = "";
  let separatorMatcher = "";
  let wildcard = ".";
  if (separator === true) {
    separatorSplitter = "/";
    separatorMatcher = "[/\\\\]";
    wildcard = "[^/\\\\]";
  } else if (separator) {
    separatorSplitter = separator;
    separatorMatcher = escapeRegExpString(separatorSplitter);
    if (separatorMatcher.length > 1) {
      separatorMatcher = `(?:${separatorMatcher})`;
      wildcard = `((?!${separatorMatcher}).)`;
    } else wildcard = `[^${separatorMatcher}]`;
  }
  let requiredSeparator = separator ? `${separatorMatcher}+?` : "";
  let optionalSeparator = separator ? `${separatorMatcher}*?` : "";
  let segments = separator ? pattern.split(separatorSplitter) : [pattern];
  let result = "";
  for (let s = 0; s < segments.length; s++) {
    let segment = segments[s];
    let nextSegment = segments[s + 1];
    let currentSeparator = "";
    if (!segment && s > 0) continue;
    if (separator) if (s === segments.length - 1) currentSeparator = optionalSeparator;
    else if (nextSegment !== "**") currentSeparator = requiredSeparator;
    else currentSeparator = "";
    if (separator && segment === "**") {
      if (currentSeparator) {
        result += s === 0 ? "" : currentSeparator;
        result += `(?:${wildcard}*?${currentSeparator})*?`;
      }
      continue;
    }
    for (let c = 0; c < segment.length; c++) {
      let char = segment[c];
      if (char === "\\") {
        if (c < segment.length - 1) {
          result += escapeRegExpChar(segment[c + 1]);
          c++;
        }
      } else if (char === "?") result += wildcard;
      else if (char === "*") result += `${wildcard}*?`;
      else result += escapeRegExpChar(char);
    }
    result += currentSeparator;
  }
  return result;
}
function isMatch(regexp, sample) {
  if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
  return regexp.test(sample);
}
function wildcardMatch(pattern, options) {
  if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
  if (typeof options === "string" || typeof options === "boolean") options = { separator: options };
  if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
  options = options || {};
  if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
  let regexpPattern = transform(pattern, options.separator);
  let regexp = new RegExp(`^${regexpPattern}$`, options.flags);
  let fn = isMatch.bind(null, regexp);
  fn.options = options;
  fn.pattern = pattern;
  fn.regexp = regexp;
  return fn;
}
function shouldRateLimit(max, window2, rateLimitData) {
  const now2 = Date.now();
  const windowInMs = window2 * 1e3;
  return now2 - rateLimitData.lastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
  return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
    status: 429,
    statusText: "Too Many Requests",
    headers: { "X-Retry-After": retryAfter.toString() }
  });
}
function getRetryAfter(lastRequest, window2) {
  const now2 = Date.now();
  const windowInMs = window2 * 1e3;
  return Math.ceil((lastRequest + windowInMs - now2) / 1e3);
}
function createDBStorage(ctx) {
  const model = "rateLimit";
  const db2 = ctx.adapter;
  return {
    get: async (key) => {
      const data = (await db2.findMany({
        model,
        where: [{
          field: "key",
          value: key
        }]
      }))[0];
      if (typeof data?.lastRequest === "bigint") data.lastRequest = Number(data.lastRequest);
      return data;
    },
    set: async (key, value, _update) => {
      try {
        if (_update) await db2.updateMany({
          model,
          where: [{
            field: "key",
            value: key
          }],
          update: {
            count: value.count,
            lastRequest: value.lastRequest
          }
        });
        else await db2.create({
          model,
          data: {
            key,
            count: value.count,
            lastRequest: value.lastRequest
          }
        });
      } catch (e) {
        ctx.logger.error("Error setting rate limit", e);
      }
    }
  };
}
const memory = /* @__PURE__ */ new Map();
function getRateLimitStorage(ctx, rateLimitSettings) {
  if (ctx.options.rateLimit?.customStorage) return ctx.options.rateLimit.customStorage;
  const storage = ctx.rateLimit.storage;
  if (storage === "secondary-storage") return {
    get: async (key) => {
      const data = await ctx.options.secondaryStorage?.get(key);
      return data ? safeJSONParse(data) : void 0;
    },
    set: async (key, value, _update) => {
      const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
      await ctx.options.secondaryStorage?.set?.(key, JSON.stringify(value), ttl);
    }
  };
  else if (storage === "memory") return {
    async get(key) {
      return memory.get(key);
    },
    async set(key, value, _update) {
      memory.set(key, value);
    }
  };
  return createDBStorage(ctx);
}
async function onRequestRateLimit(req, ctx) {
  if (!ctx.rateLimit.enabled) return;
  const path = new URL(req.url).pathname.replace(ctx.options.basePath || "/api/auth", "");
  let window2 = ctx.rateLimit.window;
  let max = ctx.rateLimit.max;
  const ip = getIp(req, ctx.options);
  if (!ip) return;
  const key = ip + path;
  const specialRule = getDefaultSpecialRules().find((rule) => rule.pathMatcher(path));
  if (specialRule) {
    window2 = specialRule.window;
    max = specialRule.max;
  }
  for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) {
    const matchedRule = plugin.rateLimit.find((rule) => rule.pathMatcher(path));
    if (matchedRule) {
      window2 = matchedRule.window;
      max = matchedRule.max;
      break;
    }
  }
  if (ctx.rateLimit.customRules) {
    const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
      if (p.includes("*")) return wildcardMatch(p)(path);
      return p === path;
    });
    if (_path) {
      const customRule = ctx.rateLimit.customRules[_path];
      const resolved = typeof customRule === "function" ? await customRule(req) : customRule;
      if (resolved) {
        window2 = resolved.window;
        max = resolved.max;
      }
      if (resolved === false) return;
    }
  }
  const storage = getRateLimitStorage(ctx, { window: window2 });
  const data = await storage.get(key);
  const now2 = Date.now();
  if (!data) await storage.set(key, {
    key,
    count: 1,
    lastRequest: now2
  });
  else {
    const timeSinceLastRequest = now2 - data.lastRequest;
    if (shouldRateLimit(max, window2, data)) return rateLimitResponse(getRetryAfter(data.lastRequest, window2));
    else if (timeSinceLastRequest > window2 * 1e3) await storage.set(key, {
      ...data,
      count: 1,
      lastRequest: now2
    }, true);
    else await storage.set(key, {
      ...data,
      count: data.count + 1,
      lastRequest: now2
    }, true);
  }
}
function getDefaultSpecialRules() {
  return [{
    pathMatcher(path) {
      return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
    },
    window: 10,
    max: 3
  }];
}
const getDate = (span, unit = "ms") => {
  return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
const cache = /* @__PURE__ */ new WeakMap();
function parseOutputData(data, schema2) {
  const fields = schema2.fields;
  const parsedData = {};
  for (const key in data) {
    const field = fields[key];
    if (!field) {
      parsedData[key] = data[key];
      continue;
    }
    if (field.returned === false) continue;
    parsedData[key] = data[key];
  }
  return parsedData;
}
function getAllFields(options, table) {
  if (!cache.has(options)) cache.set(options, /* @__PURE__ */ new Map());
  const tableCache = cache.get(options);
  if (tableCache.has(table)) return tableCache.get(table);
  let schema2 = {
    ...table === "user" ? options.user?.additionalFields : {},
    ...table === "session" ? options.session?.additionalFields : {}
  };
  for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[table]) schema2 = {
    ...schema2,
    ...plugin.schema[table].fields
  };
  cache.get(options).set(table, schema2);
  return schema2;
}
function parseUserOutput(options, user2) {
  return {
    ...parseOutputData(user2, { fields: getAllFields(options, "user") }),
    id: user2.id
  };
}
function parseAccountOutput(options, account2) {
  return parseOutputData(account2, { fields: getAllFields(options, "account") });
}
function parseSessionOutput(options, session2) {
  return parseOutputData(session2, { fields: getAllFields(options, "session") });
}
function parseInputData(data, schema2) {
  const action = schema2.action || "create";
  const fields = schema2.fields;
  const parsedData = Object.assign(/* @__PURE__ */ Object.create(null), null);
  for (const key in fields) {
    if (key in data) {
      if (fields[key].input === false) {
        if (fields[key].defaultValue !== void 0) {
          if (action !== "update") {
            parsedData[key] = fields[key].defaultValue;
            continue;
          }
        }
        if (data[key]) throw new APIError("BAD_REQUEST", { message: `${key} is not allowed to be set` });
        continue;
      }
      if (fields[key].validator?.input && data[key] !== void 0) {
        const result = fields[key].validator.input["~standard"].validate(data[key]);
        if (result instanceof Promise) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Async validation is not supported for additional fields" });
        if ("issues" in result && result.issues) throw new APIError("BAD_REQUEST", { message: result.issues[0]?.message || "Validation Error" });
        parsedData[key] = result.value;
        continue;
      }
      if (fields[key].transform?.input && data[key] !== void 0) {
        parsedData[key] = fields[key].transform?.input(data[key]);
        continue;
      }
      parsedData[key] = data[key];
      continue;
    }
    if (fields[key].defaultValue !== void 0 && action === "create") {
      if (typeof fields[key].defaultValue === "function") {
        parsedData[key] = fields[key].defaultValue();
        continue;
      }
      parsedData[key] = fields[key].defaultValue;
      continue;
    }
    if (fields[key].required && action === "create") throw new APIError("BAD_REQUEST", { message: `${key} is required` });
  }
  return parsedData;
}
function parseUserInput(options, user2 = {}, action) {
  return parseInputData(user2, {
    fields: getAllFields(options, "user"),
    action
  });
}
function parseAdditionalUserInput(options, user2) {
  const schema2 = getAllFields(options, "user");
  return parseInputData(user2 || {}, { fields: schema2 });
}
function parseAccountInput(options, account2) {
  return parseInputData(account2, { fields: getAllFields(options, "account") });
}
function parseSessionInput(options, session2) {
  return parseInputData(session2, { fields: getAllFields(options, "session") });
}
function mergeSchema(schema2, newSchema) {
  if (!newSchema) return schema2;
  for (const table in newSchema) {
    const newModelName = newSchema[table]?.modelName;
    if (newModelName) schema2[table].modelName = newModelName;
    for (const field in schema2[table].fields) {
      const newField = newSchema[table]?.fields?.[field];
      if (!newField) continue;
      schema2[table].fields[field].fieldName = newField;
    }
  }
  return schema2;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (all, symbols) => {
  let target = {};
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  }
  return target;
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
      key = keys[i];
      if (!__hasOwnProp.call(to, key) && key !== except) {
        __defProp(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable
        });
      }
    }
  }
  return to;
};
var __reExport = (target, mod, secondTarget, symbols) => {
  __copyProps(target, mod, "default");
};
async function getBaseAdapter(options, handleDirectDatabase) {
  let adapter;
  if (!options.database) {
    const tables = getAuthTables(options);
    const memoryDB = Object.keys(tables).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    const { memoryAdapter } = await import("./index-CwQsicLb.mjs");
    adapter = memoryAdapter(memoryDB)(options);
  } else if (typeof options.database === "function") adapter = options.database(options);
  else adapter = await handleDirectDatabase(options);
  if (!adapter.transaction) {
    logger.warn("Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.");
    adapter.transaction = async (cb) => {
      return cb(adapter);
    };
  }
  return adapter;
}
async function getAdapter(options) {
  return getBaseAdapter(options, async (opts) => {
    const { createKyselyAdapter: createKyselyAdapter2 } = await import("./index-D8I-qApy.mjs");
    const { kysely, databaseType, transaction } = await createKyselyAdapter2(opts);
    if (!kysely) throw new BetterAuthError("Failed to initialize database adapter");
    const { kyselyAdapter } = await import("./index-D8I-qApy.mjs");
    return kyselyAdapter(kysely, {
      type: databaseType || "sqlite",
      debugLogs: opts.database && "debugLogs" in opts.database ? opts.database.debugLogs : false,
      transaction
    })(opts);
  });
}
const createFieldAttribute = (type, config2) => {
  return {
    type,
    ...config2
  };
};
function convertToDB(fields, values) {
  let result = values.id ? { id: values.id } : {};
  for (const key in fields) {
    const field = fields[key];
    const value = values[key];
    if (value === void 0) continue;
    result[field.fieldName || key] = value;
  }
  return result;
}
function convertFromDB(fields, values) {
  if (!values) return null;
  let result = { id: values.id };
  for (const [key, value] of Object.entries(fields)) result[key] = values[value.fieldName || key];
  return result;
}
function getWithHooks(adapter, ctx) {
  const hooks = ctx.hooks;
  async function createWithHooks(data, model, customCreateFn) {
    const context = await getCurrentAuthContext().catch(() => null);
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.create?.before;
      if (toRun) {
        const result = await toRun(actualData, context);
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customCreated = customCreateFn ? await customCreateFn.fn(actualData) : null;
    const created = !customCreateFn || customCreateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).create({
      model,
      data: actualData,
      forceAllowId: true
    }) : customCreated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.create?.after;
      if (toRun) await toRun(created, context);
    }
    return created;
  }
  async function updateWithHooks(data, where, model, customUpdateFn) {
    const context = await getCurrentAuthContext().catch(() => null);
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).update({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.after;
      if (toRun) await toRun(updated, context);
    }
    return updated;
  }
  async function updateManyWithHooks(data, where, model, customUpdateFn) {
    const context = await getCurrentAuthContext().catch(() => null);
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).updateMany({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.after;
      if (toRun) await toRun(updated, context);
    }
    return updated;
  }
  async function deleteWithHooks(where, model, customDeleteFn) {
    const context = await getCurrentAuthContext().catch(() => null);
    let entityToDelete = null;
    try {
      entityToDelete = (await (await getCurrentAdapter(adapter)).findMany({
        model,
        where,
        limit: 1
      }))[0] || null;
    } catch {
    }
    if (entityToDelete) for (const hook of hooks || []) {
      const toRun = hook[model]?.delete?.before;
      if (toRun) {
        if (await toRun(entityToDelete, context) === false) return null;
      }
    }
    const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
    const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).delete({
      model,
      where
    }) : customDeleted;
    if (entityToDelete) for (const hook of hooks || []) {
      const toRun = hook[model]?.delete?.after;
      if (toRun) await toRun(entityToDelete, context);
    }
    return deleted;
  }
  async function deleteManyWithHooks(where, model, customDeleteFn) {
    const context = await getCurrentAuthContext().catch(() => null);
    let entitiesToDelete = [];
    try {
      entitiesToDelete = await (await getCurrentAdapter(adapter)).findMany({
        model,
        where
      });
    } catch {
    }
    for (const entity of entitiesToDelete) for (const hook of hooks || []) {
      const toRun = hook[model]?.delete?.before;
      if (toRun) {
        if (await toRun(entity, context) === false) return null;
      }
    }
    const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
    const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).deleteMany({
      model,
      where
    }) : customDeleted;
    for (const entity of entitiesToDelete) for (const hook of hooks || []) {
      const toRun = hook[model]?.delete?.after;
      if (toRun) await toRun(entity, context);
    }
    return deleted;
  }
  return {
    createWithHooks,
    updateWithHooks,
    updateManyWithHooks,
    deleteWithHooks,
    deleteManyWithHooks
  };
}
const createInternalAdapter = (adapter, ctx) => {
  const logger2 = ctx.logger;
  const options = ctx.options;
  const secondaryStorage = options.secondaryStorage;
  const sessionExpiration = options.session?.expiresIn || 3600 * 24 * 7;
  const { createWithHooks, updateWithHooks, updateManyWithHooks, deleteWithHooks, deleteManyWithHooks } = getWithHooks(adapter, ctx);
  async function refreshUserSessions(user2) {
    if (!secondaryStorage) return;
    const listRaw = await secondaryStorage.get(`active-sessions-${user2.id}`);
    if (!listRaw) return;
    const now2 = Date.now();
    const validSessions = (safeJSONParse(listRaw) || []).filter((s) => s.expiresAt > now2);
    await Promise.all(validSessions.map(async ({ token }) => {
      const cached = await secondaryStorage.get(token);
      if (!cached) return;
      const parsed = safeJSONParse(cached);
      if (!parsed) return;
      const sessionTTL = Math.max(Math.floor(new Date(parsed.session.expiresAt).getTime() - now2) / 1e3, 0);
      await secondaryStorage.set(token, JSON.stringify({
        session: parsed.session,
        user: user2
      }), Math.floor(sessionTTL));
    }));
  }
  return {
    createOAuthUser: async (user2, account2) => {
      return runWithTransaction(adapter, async () => {
        const createdUser = await createWithHooks({
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...user2
        }, "user", void 0);
        return {
          user: createdUser,
          account: await createWithHooks({
            ...account2,
            userId: createdUser.id,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }, "account", void 0)
        };
      });
    },
    createUser: async (user2) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...user2,
        email: user2.email?.toLowerCase()
      }, "user", void 0);
    },
    createAccount: async (account2) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...account2
      }, "account", void 0);
    },
    listSessions: async (userId) => {
      if (secondaryStorage) {
        const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
        if (!currentList) return [];
        const list = safeJSONParse(currentList) || [];
        const now2 = Date.now();
        const validSessions = list.filter((s) => s.expiresAt > now2);
        const sessions = [];
        for (const session2 of validSessions) {
          const sessionStringified = await secondaryStorage.get(session2.token);
          if (sessionStringified) {
            const s = safeJSONParse(sessionStringified);
            if (!s) return [];
            const parsedSession = parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt)
            });
            sessions.push(parsedSession);
          }
        }
        return sessions;
      }
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "session",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    listUsers: async (limit, offset, sortBy, where) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "user",
        limit,
        offset,
        sortBy,
        where
      });
    },
    countTotalUsers: async (where) => {
      const total = await (await getCurrentAdapter(adapter)).count({
        model: "user",
        where
      });
      if (typeof total === "string") return parseInt(total);
      return total;
    },
    deleteUser: async (userId) => {
      if (!secondaryStorage || options.session?.storeSessionInDatabase) await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "session", void 0);
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "account", void 0);
      await deleteWithHooks([{
        field: "id",
        value: userId
      }], "user", void 0);
    },
    createSession: async (userId, dontRememberMe, override, overrideAll) => {
      const ctx$1 = await getCurrentAuthContext().catch(() => null);
      const headers = ctx$1?.headers || ctx$1?.request?.headers;
      const { id: _, ...rest } = override || {};
      const defaultAdditionalFields = parseSessionInput(ctx$1?.context.options ?? options, {});
      const data = {
        ipAddress: ctx$1?.request || ctx$1?.headers ? getIp(ctx$1?.request || ctx$1?.headers, ctx$1?.context.options) || "" : "",
        userAgent: headers?.get("user-agent") || "",
        ...rest,
        expiresAt: dontRememberMe ? getDate(3600 * 24, "sec") : getDate(sessionExpiration, "sec"),
        userId,
        token: generateId(32),
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...defaultAdditionalFields,
        ...overrideAll ? rest : {}
      };
      return await createWithHooks(data, "session", secondaryStorage ? {
        fn: async (sessionData) => {
          const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
          let list = [];
          const now2 = Date.now();
          if (currentList) {
            list = safeJSONParse(currentList) || [];
            list = list.filter((session2) => session2.expiresAt > now2);
          }
          const sorted = list.sort((a, b) => a.expiresAt - b.expiresAt);
          let furthestSessionExp = sorted.at(-1)?.expiresAt;
          sorted.push({
            token: data.token,
            expiresAt: data.expiresAt.getTime()
          });
          if (!furthestSessionExp || furthestSessionExp < data.expiresAt.getTime()) furthestSessionExp = data.expiresAt.getTime();
          const furthestSessionTTL = Math.max(Math.floor((furthestSessionExp - now2) / 1e3), 0);
          if (furthestSessionTTL > 0) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), furthestSessionTTL);
          const user2 = await adapter.findOne({
            model: "user",
            where: [{
              field: "id",
              value: userId
            }]
          });
          const sessionTTL = Math.max(Math.floor((data.expiresAt.getTime() - now2) / 1e3), 0);
          if (sessionTTL > 0) await secondaryStorage.set(data.token, JSON.stringify({
            session: sessionData,
            user: user2
          }), sessionTTL);
          return sessionData;
        },
        executeMainFn: options.session?.storeSessionInDatabase
      } : void 0);
    },
    findSession: async (token) => {
      if (secondaryStorage) {
        const sessionStringified = await secondaryStorage.get(token);
        if (!sessionStringified && !options.session?.storeSessionInDatabase) return null;
        if (sessionStringified) {
          const s = safeJSONParse(sessionStringified);
          if (!s) return null;
          return {
            session: parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt),
              createdAt: new Date(s.session.createdAt),
              updatedAt: new Date(s.session.updatedAt)
            }),
            user: parseUserOutput(ctx.options, {
              ...s.user,
              createdAt: new Date(s.user.createdAt),
              updatedAt: new Date(s.user.updatedAt)
            })
          };
        }
      }
      const result = await (await getCurrentAdapter(adapter)).findOne({
        model: "session",
        where: [{
          value: token,
          field: "token"
        }],
        join: { user: true }
      });
      if (!result) return null;
      const { user: user2, ...session2 } = result;
      if (!user2) return null;
      return {
        session: parseSessionOutput(ctx.options, session2),
        user: parseUserOutput(ctx.options, user2)
      };
    },
    findSessions: async (sessionTokens) => {
      if (secondaryStorage) {
        const sessions$1 = [];
        for (const sessionToken of sessionTokens) {
          const sessionStringified = await secondaryStorage.get(sessionToken);
          if (sessionStringified) {
            const s = safeJSONParse(sessionStringified);
            if (!s) return [];
            const session2 = {
              session: {
                ...s.session,
                expiresAt: new Date(s.session.expiresAt)
              },
              user: {
                ...s.user,
                createdAt: new Date(s.user.createdAt),
                updatedAt: new Date(s.user.updatedAt)
              }
            };
            sessions$1.push(session2);
          }
        }
        return sessions$1;
      }
      const sessions = await (await getCurrentAdapter(adapter)).findMany({
        model: "session",
        where: [{
          field: "token",
          value: sessionTokens,
          operator: "in"
        }],
        join: { user: true }
      });
      if (!sessions.length) return [];
      if (sessions.some((session2) => !session2.user)) return [];
      return sessions.map((_session) => {
        const { user: user2, ...session2 } = _session;
        return {
          session: session2,
          user: user2
        };
      });
    },
    updateSession: async (sessionToken, session2) => {
      return await updateWithHooks(session2, [{
        field: "token",
        value: sessionToken
      }], "session", secondaryStorage ? {
        async fn(data) {
          const currentSession = await secondaryStorage.get(sessionToken);
          let updatedSession = null;
          if (currentSession) {
            const parsedSession = safeJSONParse(currentSession);
            if (!parsedSession) return null;
            updatedSession = {
              ...parsedSession.session,
              ...data
            };
            return updatedSession;
          } else return null;
        },
        executeMainFn: options.session?.storeSessionInDatabase
      } : void 0);
    },
    deleteSession: async (token) => {
      if (secondaryStorage) {
        const data = await secondaryStorage.get(token);
        if (data) {
          const { session: session2 } = safeJSONParse(data) ?? {};
          if (!session2) {
            logger2.error("Session not found in secondary storage");
            return;
          }
          const userId = session2.userId;
          const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
          if (currentList) {
            let list = safeJSONParse(currentList) || [];
            const now2 = Date.now();
            const filtered = list.filter((session$1) => session$1.expiresAt > now2 && session$1.token !== token);
            const furthestSessionExp = filtered.sort((a, b) => a.expiresAt - b.expiresAt).at(-1)?.expiresAt;
            if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(filtered), Math.floor((furthestSessionExp - now2) / 1e3));
            else await secondaryStorage.delete(`active-sessions-${userId}`);
          } else logger2.error("Active sessions list not found in secondary storage");
        }
        await secondaryStorage.delete(token);
        if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) return;
      }
      await (await getCurrentAdapter(adapter)).delete({
        model: "session",
        where: [{
          field: "token",
          value: token
        }]
      });
    },
    deleteAccounts: async (userId) => {
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "account", void 0);
    },
    deleteAccount: async (accountId) => {
      await deleteWithHooks([{
        field: "id",
        value: accountId
      }], "account", void 0);
    },
    deleteSessions: async (userIdOrSessionTokens) => {
      if (secondaryStorage) {
        if (typeof userIdOrSessionTokens === "string") {
          const activeSession = await secondaryStorage.get(`active-sessions-${userIdOrSessionTokens}`);
          const sessions = activeSession ? safeJSONParse(activeSession) : [];
          if (!sessions) return;
          for (const session2 of sessions) await secondaryStorage.delete(session2.token);
          await secondaryStorage.delete(`active-sessions-${userIdOrSessionTokens}`);
        } else for (const sessionToken of userIdOrSessionTokens) if (await secondaryStorage.get(sessionToken)) await secondaryStorage.delete(sessionToken);
        if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) return;
      }
      await deleteManyWithHooks([{
        field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
        value: userIdOrSessionTokens,
        operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
      }], "session", void 0);
    },
    findOAuthUser: async (email, accountId, providerId) => {
      const account2 = await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          value: accountId,
          field: "accountId"
        }],
        join: { user: true }
      }).then((accounts) => {
        return accounts.find((a) => a.providerId === providerId);
      });
      if (account2) if (account2.user) return {
        user: account2.user,
        accounts: [account2]
      };
      else {
        const user2 = await (await getCurrentAdapter(adapter)).findOne({
          model: "user",
          where: [{
            value: email.toLowerCase(),
            field: "email"
          }]
        });
        if (user2) return {
          user: user2,
          accounts: [account2]
        };
        return null;
      }
      else {
        const user2 = await (await getCurrentAdapter(adapter)).findOne({
          model: "user",
          where: [{
            value: email.toLowerCase(),
            field: "email"
          }]
        });
        if (user2) return {
          user: user2,
          accounts: await (await getCurrentAdapter(adapter)).findMany({
            model: "account",
            where: [{
              value: user2.id,
              field: "userId"
            }]
          }) || []
        };
        else return null;
      }
    },
    findUserByEmail: async (email, options$1) => {
      const result = await (await getCurrentAdapter(adapter)).findOne({
        model: "user",
        where: [{
          value: email.toLowerCase(),
          field: "email"
        }],
        join: { ...options$1?.includeAccounts ? { account: true } : {} }
      });
      if (!result) return null;
      const { account: accounts, ...user2 } = result;
      return {
        user: user2,
        accounts: accounts ?? []
      };
    },
    findUserById: async (userId) => {
      if (!userId) return null;
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "user",
        where: [{
          field: "id",
          value: userId
        }]
      });
    },
    linkAccount: async (account2) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...account2
      }, "account", void 0);
    },
    updateUser: async (userId, data) => {
      const user2 = await updateWithHooks(data, [{
        field: "id",
        value: userId
      }], "user", void 0);
      await refreshUserSessions(user2);
      await refreshUserSessions(user2);
      return user2;
    },
    updateUserByEmail: async (email, data) => {
      const user2 = await updateWithHooks(data, [{
        field: "email",
        value: email.toLowerCase()
      }], "user", void 0);
      await refreshUserSessions(user2);
      await refreshUserSessions(user2);
      return user2;
    },
    updatePassword: async (userId, password) => {
      await updateManyWithHooks({ password }, [{
        field: "userId",
        value: userId
      }, {
        field: "providerId",
        value: "credential"
      }], "account", void 0);
    },
    findAccounts: async (userId) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    findAccount: async (accountId) => {
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "account",
        where: [{
          field: "accountId",
          value: accountId
        }]
      });
    },
    findAccountByProviderId: async (accountId, providerId) => {
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "account",
        where: [{
          field: "accountId",
          value: accountId
        }, {
          field: "providerId",
          value: providerId
        }]
      });
    },
    findAccountByUserId: async (userId) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    updateAccount: async (id, data) => {
      return await updateWithHooks(data, [{
        field: "id",
        value: id
      }], "account", void 0);
    },
    createVerificationValue: async (data) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...data
      }, "verification", void 0);
    },
    findVerificationValue: async (identifier) => {
      const verification2 = await (await getCurrentAdapter(adapter)).findMany({
        model: "verification",
        where: [{
          field: "identifier",
          value: identifier
        }],
        sortBy: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 1
      });
      if (!options.verification?.disableCleanup) await (await getCurrentAdapter(adapter)).deleteMany({
        model: "verification",
        where: [{
          field: "expiresAt",
          value: /* @__PURE__ */ new Date(),
          operator: "lt"
        }]
      });
      return verification2[0];
    },
    deleteVerificationValue: async (id) => {
      await (await getCurrentAdapter(adapter)).delete({
        model: "verification",
        where: [{
          field: "id",
          value: id
        }]
      });
    },
    deleteVerificationByIdentifier: async (identifier) => {
      await (await getCurrentAdapter(adapter)).delete({
        model: "verification",
        where: [{
          field: "identifier",
          value: identifier
        }]
      });
    },
    updateVerificationValue: async (id, data) => {
      return await updateWithHooks(data, [{
        field: "id",
        value: id
      }], "verification", void 0);
    }
  };
};
function toZodSchema({ fields, isClientSide }) {
  const zodFields = Object.keys(fields).reduce((acc, key) => {
    const field = fields[key];
    if (!field) return acc;
    if (isClientSide && field.input === false) return acc;
    let schema2;
    if (field.type === "json") schema2 = z.json ? z.json() : z.any();
    else if (field.type === "string[]" || field.type === "number[]") schema2 = z.array(field.type === "string[]" ? z.string() : z.number());
    else if (Array.isArray(field.type)) schema2 = z.any();
    else schema2 = z[field.type]();
    if (field?.required === false) schema2 = schema2.optional();
    if (field?.returned === false) return acc;
    return {
      ...acc,
      [key]: schema2
    };
  }, {});
  return z.object(zodFields);
}
function getSchema(config2) {
  const tables = (0, db_exports.getAuthTables)(config2);
  let schema2 = {};
  for (const key in tables) {
    const table = tables[key];
    const fields = table.fields;
    let actualFields = {};
    Object.entries(fields).forEach(([key$1, field]) => {
      actualFields[field.fieldName || key$1] = field;
      if (field.references) {
        const refTable = tables[field.references.model];
        if (refTable) actualFields[field.fieldName || key$1].references = {
          ...field.references,
          model: refTable.modelName,
          field: field.references.field
        };
      }
    });
    if (schema2[table.modelName]) {
      schema2[table.modelName].fields = {
        ...schema2[table.modelName].fields,
        ...actualFields
      };
      continue;
    }
    schema2[table.modelName] = {
      fields: actualFields,
      order: table.order || Infinity
    };
  }
  return schema2;
}
function getKyselyDatabaseType(db2) {
  if (!db2) return null;
  if ("dialect" in db2) return getKyselyDatabaseType(db2.dialect);
  if ("createDriver" in db2) {
    if (db2 instanceof SqliteDialect) return "sqlite";
    if (db2 instanceof MysqlDialect) return "mysql";
    if (db2 instanceof PostgresDialect) return "postgres";
    if (db2 instanceof MssqlDialect) return "mssql";
  }
  if ("aggregate" in db2) return "sqlite";
  if ("getConnection" in db2) return "mysql";
  if ("connect" in db2) return "postgres";
  if ("fileControl" in db2) return "sqlite";
  if ("open" in db2 && "close" in db2 && "prepare" in db2) return "sqlite";
  return null;
}
const createKyselyAdapter = async (config2) => {
  const db2 = config2.database;
  if (!db2) return {
    kysely: null,
    databaseType: null,
    transaction: void 0
  };
  if ("db" in db2) return {
    kysely: db2.db,
    databaseType: db2.type,
    transaction: db2.transaction
  };
  if ("dialect" in db2) return {
    kysely: new Kysely({ dialect: db2.dialect }),
    databaseType: db2.type,
    transaction: db2.transaction
  };
  let dialect = void 0;
  const databaseType = getKyselyDatabaseType(db2);
  if ("createDriver" in db2) dialect = db2;
  if ("aggregate" in db2 && !("createSession" in db2)) dialect = new SqliteDialect({ database: db2 });
  if ("getConnection" in db2) dialect = new MysqlDialect(db2);
  if ("connect" in db2) dialect = new PostgresDialect({ pool: db2 });
  if ("fileControl" in db2) {
    const { BunSqliteDialect } = await import("./bun-sqlite-dialect-CZkoC8t5.mjs");
    dialect = new BunSqliteDialect({ database: db2 });
  }
  if ("createSession" in db2 && typeof window === "undefined") {
    let DatabaseSync = void 0;
    try {
      let nodeSqlite = "node:sqlite";
      ({ DatabaseSync } = await import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        nodeSqlite
      ));
    } catch (error2) {
      if (error2 !== null && typeof error2 === "object" && "code" in error2 && error2.code !== "ERR_UNKNOWN_BUILTIN_MODULE") throw error2;
    }
    if (DatabaseSync && db2 instanceof DatabaseSync) {
      const { NodeSqliteDialect } = await import("./node-sqlite-dialect-0sBQYD8M.mjs");
      dialect = new NodeSqliteDialect({ database: db2 });
    }
  }
  return {
    kysely: dialect ? new Kysely({ dialect }) : null,
    databaseType,
    transaction: void 0
  };
};
const map = {
  postgres: {
    string: [
      "character varying",
      "varchar",
      "text",
      "uuid"
    ],
    number: [
      "int4",
      "integer",
      "bigint",
      "smallint",
      "numeric",
      "real",
      "double precision"
    ],
    boolean: ["bool", "boolean"],
    date: [
      "timestamptz",
      "timestamp",
      "date"
    ],
    json: ["json", "jsonb"]
  },
  mysql: {
    string: [
      "varchar",
      "text",
      "uuid"
    ],
    number: [
      "integer",
      "int",
      "bigint",
      "smallint",
      "decimal",
      "float",
      "double"
    ],
    boolean: ["boolean", "tinyint"],
    date: [
      "timestamp",
      "datetime",
      "date"
    ],
    json: ["json"]
  },
  sqlite: {
    string: ["TEXT"],
    number: ["INTEGER", "REAL"],
    boolean: ["INTEGER", "BOOLEAN"],
    date: ["DATE", "INTEGER"],
    json: ["TEXT"]
  },
  mssql: {
    string: [
      "varchar",
      "nvarchar",
      "uniqueidentifier"
    ],
    number: [
      "int",
      "bigint",
      "smallint",
      "decimal",
      "float",
      "double"
    ],
    boolean: ["bit", "smallint"],
    date: [
      "datetime2",
      "date",
      "datetime"
    ],
    json: ["varchar", "nvarchar"]
  }
};
function matchType(columnDataType, fieldType, dbType) {
  function normalize(type) {
    return type.toLowerCase().split("(")[0].trim();
  }
  if (fieldType === "string[]" || fieldType === "number[]") return columnDataType.toLowerCase().includes("json");
  const types2 = map[dbType];
  return (Array.isArray(fieldType) ? types2["string"].map((t) => t.toLowerCase()) : types2[fieldType].map((t) => t.toLowerCase())).includes(normalize(columnDataType));
}
async function getPostgresSchema(db2) {
  try {
    const result = await sql$1`SHOW search_path`.execute(db2);
    if (result.rows[0]?.search_path) return result.rows[0].search_path.split(",").map((s) => s.trim()).map((s) => s.replace(/^["']|["']$/g, "")).filter((s) => !s.startsWith("$"))[0] || "public";
  } catch {
  }
  return "public";
}
async function getMigrations(config2) {
  const betterAuthSchema = getSchema(config2);
  const logger$1 = createLogger(config2.logger);
  let { kysely: db2, databaseType: dbType } = await createKyselyAdapter(config2);
  if (!dbType) {
    logger$1.warn("Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this.");
    dbType = "sqlite";
  }
  if (!db2) {
    logger$1.error("Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter.");
    process.exit(1);
  }
  let currentSchema = "public";
  if (dbType === "postgres") {
    currentSchema = await getPostgresSchema(db2);
    logger$1.debug(`PostgreSQL migration: Using schema '${currentSchema}' (from search_path)`);
    try {
      if (!(await sql$1`
				SELECT schema_name 
				FROM information_schema.schemata 
				WHERE schema_name = ${currentSchema}
			`.execute(db2)).rows[0]) logger$1.warn(`Schema '${currentSchema}' does not exist. Tables will be inspected from available schemas. Consider creating the schema first or checking your database configuration.`);
    } catch (error2) {
      logger$1.debug(`Could not verify schema existence: ${error2 instanceof Error ? error2.message : String(error2)}`);
    }
  }
  const allTableMetadata = await db2.introspection.getTables();
  let tableMetadata = allTableMetadata;
  if (dbType === "postgres") try {
    const tablesInSchema = await sql$1`
				SELECT table_name 
				FROM information_schema.tables 
				WHERE table_schema = ${currentSchema}
				AND table_type = 'BASE TABLE'
			`.execute(db2);
    const tableNamesInSchema = new Set(tablesInSchema.rows.map((row) => row.table_name));
    tableMetadata = allTableMetadata.filter((table) => table.schema === currentSchema && tableNamesInSchema.has(table.name));
    logger$1.debug(`Found ${tableMetadata.length} table(s) in schema '${currentSchema}': ${tableMetadata.map((t) => t.name).join(", ") || "(none)"}`);
  } catch (error2) {
    logger$1.warn(`Could not filter tables by schema. Using all discovered tables. Error: ${error2 instanceof Error ? error2.message : String(error2)}`);
  }
  const toBeCreated = [];
  const toBeAdded = [];
  for (const [key, value] of Object.entries(betterAuthSchema)) {
    const table = tableMetadata.find((t) => t.name === key);
    if (!table) {
      const tIndex = toBeCreated.findIndex((t) => t.table === key);
      const tableData = {
        table: key,
        fields: value.fields,
        order: value.order || Infinity
      };
      const insertIndex = toBeCreated.findIndex((t) => (t.order || Infinity) > tableData.order);
      if (insertIndex === -1) if (tIndex === -1) toBeCreated.push(tableData);
      else toBeCreated[tIndex].fields = {
        ...toBeCreated[tIndex].fields,
        ...value.fields
      };
      else toBeCreated.splice(insertIndex, 0, tableData);
      continue;
    }
    let toBeAddedFields = {};
    for (const [fieldName, field] of Object.entries(value.fields)) {
      const column = table.columns.find((c) => c.name === fieldName);
      if (!column) {
        toBeAddedFields[fieldName] = field;
        continue;
      }
      if (matchType(column.dataType, field.type, dbType)) continue;
      else logger$1.warn(`Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`);
    }
    if (Object.keys(toBeAddedFields).length > 0) toBeAdded.push({
      table: key,
      fields: toBeAddedFields,
      order: value.order || Infinity
    });
  }
  const migrations = [];
  const useUUIDs = config2.advanced?.database?.generateId === "uuid";
  const useNumberId = config2.advanced?.database?.useNumberId || config2.advanced?.database?.generateId === "serial";
  function getType(field, fieldName) {
    const type = field.type;
    const provider = dbType || "sqlite";
    const typeMap = {
      string: {
        sqlite: "text",
        postgres: "text",
        mysql: field.unique ? "varchar(255)" : field.references ? "varchar(36)" : field.sortable ? "varchar(255)" : field.index ? "varchar(255)" : "text",
        mssql: field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : "varchar(8000)"
      },
      boolean: {
        sqlite: "integer",
        postgres: "boolean",
        mysql: "boolean",
        mssql: "smallint"
      },
      number: {
        sqlite: field.bigint ? "bigint" : "integer",
        postgres: field.bigint ? "bigint" : "integer",
        mysql: field.bigint ? "bigint" : "integer",
        mssql: field.bigint ? "bigint" : "integer"
      },
      date: {
        sqlite: "date",
        postgres: "timestamptz",
        mysql: "timestamp(3)",
        mssql: sql$1`datetime2(3)`
      },
      json: {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      id: {
        postgres: useNumberId ? sql$1`integer GENERATED BY DEFAULT AS IDENTITY` : useUUIDs ? "uuid" : "text",
        mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        sqlite: useNumberId ? "integer" : "text"
      },
      foreignKeyId: {
        postgres: useNumberId ? "integer" : useUUIDs ? "uuid" : "text",
        mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        sqlite: useNumberId ? "integer" : "text"
      },
      "string[]": {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      "number[]": {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      }
    };
    if (fieldName === "id" || field.references?.field === "id") {
      if (fieldName === "id") return typeMap.id[provider];
      return typeMap.foreignKeyId[provider];
    }
    if (Array.isArray(type)) return "text";
    if (!(type in typeMap)) throw new Error(`Unsupported field type '${String(type)}' for field '${fieldName}'. Allowed types are: string, number, boolean, date, string[], number[]. If you need to store structured data, store it as a JSON string (type: "string") or split it into primitive fields. See https://better-auth.com/docs/advanced/schema#additional-fields`);
    return typeMap[type][provider];
  }
  const getModelName = initGetModelName({
    schema: getAuthTables(config2),
    usePlural: false
  });
  const getFieldName = initGetFieldName({
    schema: getAuthTables(config2),
    usePlural: false
  });
  function getReferencePath(model, field) {
    try {
      return `${getModelName(model)}.${getFieldName({
        model,
        field
      })}`;
    } catch {
      return `${model}.${field}`;
    }
  }
  if (toBeAdded.length) for (const table of toBeAdded) for (const [fieldName, field] of Object.entries(table.fields)) {
    const type = getType(field, fieldName);
    let builder = db2.schema.alterTable(table.table);
    if (field.index) {
      const index2 = db2.schema.alterTable(table.table).addIndex(`${table.table}_${fieldName}_idx`);
      migrations.push(index2);
    }
    let built = builder.addColumn(fieldName, type, (col) => {
      col = field.required !== false ? col.notNull() : col;
      if (field.references) col = col.references(getReferencePath(field.references.model, field.references.field)).onDelete(field.references.onDelete || "cascade");
      if (field.unique) col = col.unique();
      if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) if (dbType === "mysql") col = col.defaultTo(sql$1`CURRENT_TIMESTAMP(3)`);
      else col = col.defaultTo(sql$1`CURRENT_TIMESTAMP`);
      return col;
    });
    migrations.push(built);
  }
  let toBeIndexed = [];
  if (config2.advanced?.database?.useNumberId) logger$1.warn("`useNumberId` is deprecated. Please use `generateId` with `serial` instead.");
  if (toBeCreated.length) for (const table of toBeCreated) {
    const idType = getType({ type: useNumberId ? "number" : "string" }, "id");
    let dbT = db2.schema.createTable(table.table).addColumn("id", idType, (col) => {
      if (useNumberId) {
        if (dbType === "postgres") return col.primaryKey().notNull();
        else if (dbType === "sqlite") return col.primaryKey().notNull();
        else if (dbType === "mssql") return col.identity().primaryKey().notNull();
        return col.autoIncrement().primaryKey().notNull();
      }
      if (useUUIDs) {
        if (dbType === "postgres") return col.primaryKey().defaultTo(sql$1`pg_catalog.gen_random_uuid()`).notNull();
        return col.primaryKey().notNull();
      }
      return col.primaryKey().notNull();
    });
    for (const [fieldName, field] of Object.entries(table.fields)) {
      const type = getType(field, fieldName);
      dbT = dbT.addColumn(fieldName, type, (col) => {
        col = field.required !== false ? col.notNull() : col;
        if (field.references) col = col.references(getReferencePath(field.references.model, field.references.field)).onDelete(field.references.onDelete || "cascade");
        if (field.unique) col = col.unique();
        if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) if (dbType === "mysql") col = col.defaultTo(sql$1`CURRENT_TIMESTAMP(3)`);
        else col = col.defaultTo(sql$1`CURRENT_TIMESTAMP`);
        return col;
      });
      if (field.index) {
        let builder = db2.schema.createIndex(`${table.table}_${fieldName}_${field.unique ? "uidx" : "idx"}`).on(table.table).columns([fieldName]);
        toBeIndexed.push(field.unique ? builder.unique() : builder);
      }
    }
    migrations.push(dbT);
  }
  if (toBeIndexed.length) for (const index2 of toBeIndexed) migrations.push(index2);
  async function runMigrations() {
    for (const migration of migrations) await migration.execute();
  }
  async function compileMigrations() {
    return migrations.map((m) => m.compile().sql).join(";\n\n") + ";";
  }
  return {
    toBeCreated,
    toBeAdded,
    runMigrations,
    compileMigrations
  };
}
var db_exports = /* @__PURE__ */ __export({
  convertFromDB: () => convertFromDB,
  convertToDB: () => convertToDB,
  createFieldAttribute: () => createFieldAttribute,
  createInternalAdapter: () => createInternalAdapter,
  getAdapter: () => getAdapter,
  getBaseAdapter: () => getBaseAdapter,
  getMigrations: () => getMigrations,
  getSchema: () => getSchema,
  getWithHooks: () => getWithHooks,
  matchType: () => matchType,
  mergeSchema: () => mergeSchema,
  parseAccountInput: () => parseAccountInput,
  parseAccountOutput: () => parseAccountOutput,
  parseAdditionalUserInput: () => parseAdditionalUserInput,
  parseInputData: () => parseInputData,
  parseSessionInput: () => parseSessionInput,
  parseSessionOutput: () => parseSessionOutput,
  parseUserInput: () => parseUserInput,
  parseUserOutput: () => parseUserOutput,
  toZodSchema: () => toZodSchema
});
__reExport(db_exports, import___better_auth_core_db);
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 200;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function parseCookiesFromContext(ctx) {
  const cookieHeader = ctx.headers?.get("cookie");
  if (!cookieHeader) return {};
  const cookies = {};
  const pairs = cookieHeader.split("; ");
  for (const pair of pairs) {
    const [name, ...valueParts] = pair.split("=");
    if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
  }
  return cookies;
}
function getChunkIndex(cookieName) {
  const parts = cookieName.split(".");
  const lastPart = parts[parts.length - 1];
  const index2 = parseInt(lastPart || "0", 10);
  return isNaN(index2) ? 0 : index2;
}
function readExistingChunks(cookieName, ctx) {
  const chunks = {};
  const cookies = parseCookiesFromContext(ctx);
  for (const [name, value] of Object.entries(cookies)) if (name.startsWith(cookieName)) chunks[name] = value;
  return chunks;
}
function joinChunks(chunks) {
  return Object.keys(chunks).sort((a, b) => {
    return getChunkIndex(a) - getChunkIndex(b);
  }).map((key) => chunks[key]).join("");
}
function chunkCookie(storeName, cookie, chunks, logger2) {
  const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
  if (chunkCount === 1) {
    chunks[cookie.name] = cookie.value;
    return [cookie];
  }
  const cookies = [];
  for (let i = 0; i < chunkCount; i++) {
    const name = `${cookie.name}.${i}`;
    const start = i * CHUNK_SIZE;
    const value = cookie.value.substring(start, start + CHUNK_SIZE);
    cookies.push({
      ...cookie,
      name,
      value
    });
    chunks[name] = value;
  }
  logger2.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
    message: `${storeName} cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
    emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
    valueSize: cookie.value.length,
    chunkCount,
    chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
  });
  return cookies;
}
function getCleanCookies(chunks, cookieOptions) {
  const cleanedChunks = {};
  for (const name in chunks) cleanedChunks[name] = {
    name,
    value: "",
    options: {
      ...cookieOptions,
      maxAge: 0
    }
  };
  return cleanedChunks;
}
const storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
  const chunks = readExistingChunks(cookieName, ctx);
  const logger2 = ctx.context.logger;
  return {
    getValue() {
      return joinChunks(chunks);
    },
    hasChunks() {
      return Object.keys(chunks).length > 0;
    },
    chunk(value, options) {
      const cleanedChunks = getCleanCookies(chunks, cookieOptions);
      for (const name in chunks) delete chunks[name];
      const cookies = cleanedChunks;
      const chunked = chunkCookie(storeName, {
        name: cookieName,
        value,
        options: {
          ...cookieOptions,
          ...options
        }
      }, chunks, logger2);
      for (const chunk of chunked) cookies[chunk.name] = chunk;
      return Object.values(cookies);
    },
    clean() {
      const cleanedChunks = getCleanCookies(chunks, cookieOptions);
      for (const name in chunks) delete chunks[name];
      return Object.values(cleanedChunks);
    },
    setCookies(cookies) {
      for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.options);
    }
  };
};
const createSessionStore = storeFactory("Session");
const createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
  const value = ctx.getCookie(cookieName);
  if (value) return value;
  const chunks = [];
  const cookieHeader = ctx.headers?.get("cookie");
  if (!cookieHeader) return null;
  const cookies = {};
  const pairs = cookieHeader.split("; ");
  for (const pair of pairs) {
    const [name, ...valueParts] = pair.split("=");
    if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
  }
  for (const [name, val] of Object.entries(cookies)) if (name.startsWith(cookieName + ".")) {
    const indexStr = name.split(".").at(-1);
    const index2 = parseInt(indexStr || "0", 10);
    if (!isNaN(index2)) chunks.push({
      index: index2,
      value: val
    });
  }
  if (chunks.length > 0) {
    chunks.sort((a, b) => a.index - b.index);
    return chunks.map((c) => c.value).join("");
  }
  return null;
}
async function setAccountCookie(c, accountData) {
  const accountDataCookie = c.context.authCookies.accountData;
  const options = {
    maxAge: 300,
    ...accountDataCookie.options
  };
  const data = await symmetricEncodeJWT(accountData, c.context.secret, "better-auth-account", options.maxAge);
  if (data.length > ALLOWED_COOKIE_SIZE) {
    const accountStore = createAccountStore(accountDataCookie.name, options, c);
    const cookies = accountStore.chunk(data, options);
    accountStore.setCookies(cookies);
  } else {
    const accountStore = createAccountStore(accountDataCookie.name, options, c);
    if (accountStore.hasChunks()) {
      const cleanCookies = accountStore.clean();
      accountStore.setCookies(cleanCookies);
    }
    c.setCookie(accountDataCookie.name, data, options);
  }
}
async function getAccountCookie(c) {
  const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
  if (accountCookie) {
    const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secret, "better-auth-account"));
    if (accountData) return accountData;
  }
  return null;
}
const getSessionQuerySchema = z.optional(z.object({
  disableCookieCache: z.coerce.boolean().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
  disableRefresh: z.coerce.boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
const SEC = 1e3;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
  const match = REGEX.exec(value);
  if (!match || match[4] && match[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
  const n = parseFloat(match[2]);
  const unit = match[3].toLowerCase();
  let result;
  switch (unit) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      result = n * YEAR;
      break;
    case "months":
    case "month":
    case "mo":
      result = n * MONTH;
      break;
    case "weeks":
    case "week":
    case "w":
      result = n * WEEK;
      break;
    case "days":
    case "day":
    case "d":
      result = n * DAY;
      break;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      result = n * HOUR;
      break;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      result = n * MIN;
      break;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      result = n * SEC;
      break;
    default:
      throw new TypeError(`Unknown time unit: "${unit}"`);
  }
  if (match[1] === "-" || match[4] === "ago") return -result;
  return result;
}
function ms(value) {
  return parse(value);
}
function sec(value) {
  return Math.round(parse(value) / 1e3);
}
function parseSetCookieHeader(setCookie) {
  const cookies = /* @__PURE__ */ new Map();
  setCookie.split(", ").forEach((cookieString) => {
    const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
    const [name, ...valueParts] = (nameValue || "").split("=");
    const value = valueParts.join("=");
    if (!name || value === void 0) return;
    const attrObj = { value };
    attributes.forEach((attribute) => {
      const [attrName, ...attrValueParts] = attribute.split("=");
      const attrValue = attrValueParts.join("=");
      const normalizedAttrName = attrName.trim().toLowerCase();
      switch (normalizedAttrName) {
        case "max-age":
          attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
          break;
        case "expires":
          attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
          break;
        case "domain":
          attrObj.domain = attrValue ? attrValue.trim() : void 0;
          break;
        case "path":
          attrObj.path = attrValue ? attrValue.trim() : void 0;
          break;
        case "secure":
          attrObj.secure = true;
          break;
        case "httponly":
          attrObj.httponly = true;
          break;
        case "samesite":
          attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
          break;
        default:
          attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
          break;
      }
    });
    cookies.set(name, attrObj);
  });
  return cookies;
}
function createCookieGetter(options) {
  const secureCookiePrefix = (options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : options.baseURL !== void 0 ? options.baseURL.startsWith("https://") ? true : false : isProduction) ? "__Secure-" : "";
  const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
  const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (options.baseURL ? new URL(options.baseURL).hostname : void 0) : void 0;
  if (crossSubdomainEnabled && !domain) throw new BetterAuthError("baseURL is required when crossSubdomainCookies are enabled");
  function createCookie(cookieName, overrideAttributes = {}) {
    const prefix = options.advanced?.cookiePrefix || "better-auth";
    const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
    const attributes = options.advanced?.cookies?.[cookieName]?.attributes;
    return {
      name: `${secureCookiePrefix}${name}`,
      attributes: {
        secure: !!secureCookiePrefix,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        ...crossSubdomainEnabled ? { domain } : {},
        ...options.advanced?.defaultCookieAttributes,
        ...overrideAttributes,
        ...attributes
      }
    };
  }
  return createCookie;
}
function getCookies(options) {
  const createCookie = createCookieGetter(options);
  const sessionToken = createCookie("session_token", { maxAge: options.session?.expiresIn || sec("7d") });
  const sessionData = createCookie("session_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
  const accountData = createCookie("account_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
  const dontRememberToken = createCookie("dont_remember");
  return {
    sessionToken: {
      name: sessionToken.name,
      options: sessionToken.attributes
    },
    sessionData: {
      name: sessionData.name,
      options: sessionData.attributes
    },
    dontRememberToken: {
      name: dontRememberToken.name,
      options: dontRememberToken.attributes
    },
    accountData: {
      name: accountData.name,
      options: accountData.attributes
    }
  };
}
async function setCookieCache(ctx, session2, dontRememberMe) {
  if (ctx.context.options.session?.cookieCache?.enabled) {
    const filteredSession = Object.entries(session2.session).reduce((acc, [key, value]) => {
      const fieldConfig = ctx.context.options.session?.additionalFields?.[key];
      if (!fieldConfig || fieldConfig.returned !== false) acc[key] = value;
      return acc;
    }, {});
    const filteredUser = parseUserOutput(ctx.context.options, session2.user);
    const versionConfig = ctx.context.options.session?.cookieCache?.version;
    let version2 = "1";
    if (versionConfig) {
      if (typeof versionConfig === "string") version2 = versionConfig;
      else if (typeof versionConfig === "function") {
        const result = versionConfig(session2.session, session2.user);
        version2 = result instanceof Promise ? await result : result;
      }
    }
    const sessionData = {
      session: filteredSession,
      user: filteredUser,
      updatedAt: Date.now(),
      version: version2
    };
    const options = {
      ...ctx.context.authCookies.sessionData.options,
      maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.options.maxAge
    };
    const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
    const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
    let data;
    if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secret, "better-auth-session", options.maxAge || 300);
    else if (strategy === "jwt") data = await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
    else data = base64Url.encode(JSON.stringify({
      session: sessionData,
      expiresAt: expiresAtDate,
      signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
        ...sessionData,
        expiresAt: expiresAtDate
      }))
    }), { padding: false });
    if (data.length > 4093) {
      const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
      const cookies = sessionStore.chunk(data, options);
      sessionStore.setCookies(cookies);
    } else {
      const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
      if (sessionStore.hasChunks()) {
        const cleanCookies = sessionStore.clean();
        sessionStore.setCookies(cleanCookies);
      }
      ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
    }
  }
}
async function setSessionCookie(ctx, session2, dontRememberMe, overrides) {
  const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
  dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
  const options = ctx.context.authCookies.sessionToken.options;
  const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
  await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session2.session.token, ctx.context.secret, {
    ...options,
    maxAge,
    ...overrides
  });
  if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.options);
  await setCookieCache(ctx, session2, dontRememberMe);
  ctx.context.setNewSession(session2);
  if (ctx.context.options.secondaryStorage) await ctx.context.secondaryStorage?.set(session2.session.token, JSON.stringify({
    user: session2.user,
    session: session2.session
  }), Math.floor((new Date(session2.session.expiresAt).getTime() - Date.now()) / 1e3));
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
  ctx.setCookie(ctx.context.authCookies.sessionToken.name, "", {
    ...ctx.context.authCookies.sessionToken.options,
    maxAge: 0
  });
  ctx.setCookie(ctx.context.authCookies.sessionData.name, "", {
    ...ctx.context.authCookies.sessionData.options,
    maxAge: 0
  });
  if (ctx.context.options.account?.storeAccountCookie) {
    ctx.setCookie(ctx.context.authCookies.accountData.name, "", {
      ...ctx.context.authCookies.accountData.options,
      maxAge: 0
    });
    const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.options, ctx);
    const cleanCookies$1 = accountStore.clean();
    accountStore.setCookies(cleanCookies$1);
  }
  if (ctx.context.oauthConfig.storeStateStrategy === "cookie") {
    const stateCookie = ctx.context.createAuthCookie("oauth_state");
    ctx.setCookie(stateCookie.name, "", {
      ...stateCookie.attributes,
      maxAge: 0
    });
  }
  const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.options, ctx);
  const cleanCookies = sessionStore.clean();
  sessionStore.setCookies(cleanCookies);
  if (!skipDontRememberMe) ctx.setCookie(ctx.context.authCookies.dontRememberToken.name, "", {
    ...ctx.context.authCookies.dontRememberToken.options,
    maxAge: 0
  });
}
const getSession = () => createAuthEndpoint("/get-session", {
  method: "GET",
  operationId: "getSession",
  query: getSessionQuerySchema,
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "getSession",
    description: "Get the current session",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        nullable: true,
        properties: {
          session: { $ref: "#/components/schemas/Session" },
          user: { $ref: "#/components/schemas/User" }
        },
        required: ["session", "user"]
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
    if (!sessionCookieToken) return null;
    const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
    let sessionDataPayload = null;
    if (sessionDataCookie) {
      const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
      if (strategy === "jwe") {
        const payload = await symmetricDecodeJWT(sessionDataCookie, ctx.context.secret, "better-auth-session");
        if (payload && payload.session && payload.user) sessionDataPayload = {
          session: {
            session: payload.session,
            user: payload.user,
            updatedAt: payload.updatedAt,
            version: payload.version
          },
          expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
        };
        else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
          return ctx.json(null);
        }
      } else if (strategy === "jwt") {
        const payload = await verifyJWT(sessionDataCookie, ctx.context.secret);
        if (payload && payload.session && payload.user) sessionDataPayload = {
          session: {
            session: payload.session,
            user: payload.user,
            updatedAt: payload.updatedAt,
            version: payload.version
          },
          expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
        };
        else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
          return ctx.json(null);
        }
      } else {
        const parsed = safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie)));
        if (parsed) if (await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
          ...parsed.session,
          expiresAt: parsed.expiresAt
        }), parsed.signature)) sessionDataPayload = parsed;
        else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
          return ctx.json(null);
        }
      }
    }
    const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
    if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
      const session$1 = sessionDataPayload.session;
      const versionConfig = ctx.context.options.session?.cookieCache?.version;
      let expectedVersion = "1";
      if (versionConfig) {
        if (typeof versionConfig === "string") expectedVersion = versionConfig;
        else if (typeof versionConfig === "function") {
          const result = versionConfig(session$1.session, session$1.user);
          expectedVersion = result instanceof Promise ? await result : result;
        }
      }
      if ((session$1.version || "1") !== expectedVersion) {
        const dataCookie = ctx.context.authCookies.sessionData.name;
        ctx.setCookie(dataCookie, "", { maxAge: 0 });
      } else {
        const cachedSessionExpiresAt = new Date(session$1.session.expiresAt);
        if (sessionDataPayload.expiresAt < Date.now() || cachedSessionExpiresAt < /* @__PURE__ */ new Date()) {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
        } else {
          const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
          if (cookieRefreshCache === false) {
            ctx.context.session = session$1;
            return ctx.json({
              session: session$1.session,
              user: session$1.user
            });
          }
          if (sessionDataPayload.expiresAt - Date.now() < cookieRefreshCache.updateAge * 1e3) {
            const newExpiresAt = getDate(ctx.context.options.session?.cookieCache?.maxAge || 300, "sec");
            const refreshedSession = {
              session: {
                ...session$1.session,
                expiresAt: newExpiresAt
              },
              user: session$1.user,
              updatedAt: Date.now()
            };
            await setCookieCache(ctx, refreshedSession, false);
            const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
              ...refreshedSession.session,
              expiresAt: new Date(refreshedSession.session.expiresAt),
              createdAt: new Date(refreshedSession.session.createdAt),
              updatedAt: new Date(refreshedSession.session.updatedAt)
            });
            const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
              ...refreshedSession.user,
              createdAt: new Date(refreshedSession.user.createdAt),
              updatedAt: new Date(refreshedSession.user.updatedAt)
            });
            ctx.context.session = {
              session: parsedRefreshedSession,
              user: parsedRefreshedUser
            };
            return ctx.json({
              session: parsedRefreshedSession,
              user: parsedRefreshedUser
            });
          }
          const parsedSession = parseSessionOutput(ctx.context.options, {
            ...session$1.session,
            expiresAt: new Date(session$1.session.expiresAt),
            createdAt: new Date(session$1.session.createdAt),
            updatedAt: new Date(session$1.session.updatedAt)
          });
          const parsedUser = parseUserOutput(ctx.context.options, {
            ...session$1.user,
            createdAt: new Date(session$1.user.createdAt),
            updatedAt: new Date(session$1.user.updatedAt)
          });
          ctx.context.session = {
            session: parsedSession,
            user: parsedUser
          };
          return ctx.json({
            session: parsedSession,
            user: parsedUser
          });
        }
      }
    }
    const session2 = await ctx.context.internalAdapter.findSession(sessionCookieToken);
    ctx.context.session = session2;
    if (!session2 || session2.session.expiresAt < /* @__PURE__ */ new Date()) {
      deleteSessionCookie(ctx);
      if (session2)
        await ctx.context.internalAdapter.deleteSession(session2.session.token);
      return ctx.json(null);
    }
    if (dontRememberMe || ctx.query?.disableRefresh) {
      const parsedSession = parseSessionOutput(ctx.context.options, session2.session);
      const parsedUser = parseUserOutput(ctx.context.options, session2.user);
      return ctx.json({
        session: parsedSession,
        user: parsedUser
      });
    }
    const expiresIn = ctx.context.sessionConfig.expiresIn;
    const updateAge = ctx.context.sessionConfig.updateAge;
    if (session2.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now() && (!ctx.query?.disableRefresh || !ctx.context.options.session?.disableSessionRefresh)) {
      const updatedSession = await ctx.context.internalAdapter.updateSession(session2.session.token, {
        expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
        updatedAt: /* @__PURE__ */ new Date()
      });
      if (!updatedSession) {
        deleteSessionCookie(ctx);
        return ctx.json(null, { status: 401 });
      }
      const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
      await setSessionCookie(ctx, {
        session: updatedSession,
        user: session2.user
      }, false, { maxAge });
      const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
      const parsedUser = parseUserOutput(ctx.context.options, session2.user);
      return ctx.json({
        session: parsedUpdatedSession,
        user: parsedUser
      });
    }
    await setCookieCache(ctx, session2, !!dontRememberMe);
    return ctx.json(session2);
  } catch (error2) {
    ctx.context.logger.error("INTERNAL_SERVER_ERROR", error2);
    throw new APIError("INTERNAL_SERVER_ERROR", { message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION });
  }
});
const getSessionFromCtx = async (ctx, config2) => {
  if (ctx.context.session) return ctx.context.session;
  const session2 = await getSession()({
    ...ctx,
    asResponse: false,
    headers: ctx.headers,
    returnHeaders: false,
    returnStatus: false,
    query: {
      ...config2,
      ...ctx.query
    }
  }).catch((e) => {
    return null;
  });
  ctx.context.session = session2;
  return session2;
};
const sessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2?.session) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
const sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx, { disableCookieCache: true });
  if (!session2?.session) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
const requestOnlySessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2?.session && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
const freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2?.session) throw new APIError("UNAUTHORIZED");
  if (ctx.context.sessionConfig.freshAge === 0) return { session: session2 };
  const freshAge = ctx.context.sessionConfig.freshAge;
  const lastUpdated = new Date(session2.session.updatedAt || session2.session.createdAt).getTime();
  if (!(Date.now() - lastUpdated < freshAge * 1e3)) throw new APIError("FORBIDDEN", { message: "Session is not fresh" });
  return { session: session2 };
});
const listSessions = () => createAuthEndpoint("/list-sessions", {
  method: "GET",
  operationId: "listUserSessions",
  use: [sessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "listUserSessions",
    description: "List all active sessions for the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: { $ref: "#/components/schemas/Session" }
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    const activeSessions = (await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id)).filter((session2) => {
      return session2.expiresAt > /* @__PURE__ */ new Date();
    }).map((session2) => {
      return {
        ...session2,
        token: ""
      };
    });
    return ctx.json(activeSessions);
  } catch (e) {
    ctx.context.logger.error(e);
    throw ctx.error("INTERNAL_SERVER_ERROR");
  }
});
const revokeSession = createAuthEndpoint("/revoke-session", {
  method: "POST",
  body: z.object({ token: z.string().meta({ description: "The token to revoke" }) }),
  use: [sensitiveSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Revoke a single session",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: { token: {
        type: "string",
        description: "The token to revoke"
      } },
      required: ["token"]
    } } } },
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if the session was revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  const token = ctx.body.token;
  if ((await ctx.context.internalAdapter.findSession(token))?.session.userId === ctx.context.session.user.id) try {
    await ctx.context.internalAdapter.deleteSession(token);
  } catch (error2) {
    ctx.context.logger.error(error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "", error2);
    throw new APIError("INTERNAL_SERVER_ERROR");
  }
  return ctx.json({ status: true });
});
const revokeSessions = createAuthEndpoint("/revoke-sessions", {
  method: "POST",
  use: [sensitiveSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Revoke all sessions for the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if all sessions were revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    await ctx.context.internalAdapter.deleteSessions(ctx.context.session.user.id);
  } catch (error2) {
    ctx.context.logger.error(error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "", error2);
    throw new APIError("INTERNAL_SERVER_ERROR");
  }
  return ctx.json({ status: true });
});
const revokeOtherSessions = createAuthEndpoint("/revoke-other-sessions", {
  method: "POST",
  requireHeaders: true,
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    description: "Revoke all other sessions for the user except the current one",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if all other sessions were revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!session2.user) throw new APIError("UNAUTHORIZED");
  const otherSessions = (await ctx.context.internalAdapter.listSessions(session2.user.id)).filter((session$1) => {
    return session$1.expiresAt > /* @__PURE__ */ new Date();
  }).filter((session$1) => session$1.token !== ctx.context.session.session.token);
  await Promise.all(otherSessions.map((session$1) => ctx.context.internalAdapter.deleteSession(session$1.token)));
  return ctx.json({ status: true });
});
function decryptOAuthToken(token, ctx) {
  if (!token) return token;
  if (ctx.options.account?.encryptOAuthTokens) return symmetricDecrypt({
    key: ctx.secret,
    data: token
  });
  return token;
}
function setTokenUtil(token, ctx) {
  if (ctx.options.account?.encryptOAuthTokens && token) return symmetricEncrypt({
    key: ctx.secret,
    data: token
  });
  return token;
}
const listUserAccounts = createAuthEndpoint("/list-accounts", {
  method: "GET",
  use: [sessionMiddleware],
  metadata: { openapi: {
    operationId: "listUserAccounts",
    description: "List all accounts linked to the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            providerId: { type: "string" },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            accountId: { type: "string" },
            userId: { type: "string" },
            scopes: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: [
            "id",
            "providerId",
            "createdAt",
            "updatedAt",
            "accountId",
            "userId",
            "scopes"
          ]
        }
      } } }
    } }
  } }
}, async (c) => {
  const session2 = c.context.session;
  const accounts = await c.context.internalAdapter.findAccounts(session2.user.id);
  return c.json(accounts.map((a) => ({
    id: a.id,
    providerId: a.providerId,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
    accountId: a.accountId,
    userId: a.userId,
    scopes: a.scope?.split(",") || []
  })));
});
const linkSocialAccount = createAuthEndpoint("/link-social", {
  method: "POST",
  requireHeaders: true,
  body: z.object({
    callbackURL: z.string().meta({ description: "The URL to redirect to after the user has signed in" }).optional(),
    provider: SocialProviderListEnum,
    idToken: z.object({
      token: z.string(),
      nonce: z.string().optional(),
      accessToken: z.string().optional(),
      refreshToken: z.string().optional(),
      scopes: z.array(z.string()).optional()
    }).optional(),
    requestSignUp: z.boolean().optional(),
    scopes: z.array(z.string()).meta({ description: "Additional scopes to request from the provider" }).optional(),
    errorCallbackURL: z.string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional(),
    disableRedirect: z.boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
    additionalData: z.record(z.string(), z.any()).optional()
  }),
  use: [sessionMiddleware],
  metadata: { openapi: {
    description: "Link a social account to the user",
    operationId: "linkSocialAccount",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The authorization URL to redirect the user to"
          },
          redirect: {
            type: "boolean",
            description: "Indicates if the user should be redirected to the authorization URL"
          },
          status: { type: "boolean" }
        },
        required: ["redirect"]
      } } }
    } }
  } }
}, async (c) => {
  const session2 = c.context.session;
  const provider = c.context.socialProviders.find((p) => p.id === c.body.provider);
  if (!provider) {
    c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
    throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.PROVIDER_NOT_FOUND });
  }
  if (c.body.idToken) {
    if (!provider.verifyIdToken) {
      c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
      throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED });
    }
    const { token, nonce } = c.body.idToken;
    if (!await provider.verifyIdToken(token, nonce)) {
      c.context.logger.error("Invalid id token", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_TOKEN });
    }
    const linkingUserInfo = await provider.getUserInfo({
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken
    });
    if (!linkingUserInfo || !linkingUserInfo?.user) {
      c.context.logger.error("Failed to get user info", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO });
    }
    const linkingUserId = String(linkingUserInfo.user.id);
    if (!linkingUserInfo.user.email) {
      c.context.logger.error("User email not found", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND });
    }
    if ((await c.context.internalAdapter.findAccounts(session2.user.id)).find((a) => a.providerId === provider.id && a.accountId === linkingUserId)) return c.json({
      url: "",
      status: true,
      redirect: false
    });
    if (!c.context.options.account?.accountLinking?.trustedProviders?.includes(provider.id) && !linkingUserInfo.user.emailVerified || c.context.options.account?.accountLinking?.enabled === false) throw new APIError("UNAUTHORIZED", { message: "Account not linked - linking not allowed" });
    if (linkingUserInfo.user.email !== session2.user.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) throw new APIError("UNAUTHORIZED", { message: "Account not linked - different emails not allowed" });
    try {
      await c.context.internalAdapter.createAccount({
        userId: session2.user.id,
        providerId: provider.id,
        accountId: linkingUserId,
        accessToken: c.body.idToken.accessToken,
        idToken: token,
        refreshToken: c.body.idToken.refreshToken,
        scope: c.body.idToken.scopes?.join(",")
      });
    } catch {
      throw new APIError("EXPECTATION_FAILED", { message: "Account not linked - unable to create account" });
    }
    if (c.context.options.account?.accountLinking?.updateUserInfoOnLink === true) try {
      await c.context.internalAdapter.updateUser(session2.user.id, {
        name: linkingUserInfo.user?.name,
        image: linkingUserInfo.user?.image
      });
    } catch (e) {
      console.warn("Could not update user - " + e.toString());
    }
    return c.json({
      url: "",
      status: true,
      redirect: false
    });
  }
  const state = await generateState(c, {
    userId: session2.user.id,
    email: session2.user.email
  }, c.body.additionalData);
  const url = await provider.createAuthorizationURL({
    state: state.state,
    codeVerifier: state.codeVerifier,
    redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
    scopes: c.body.scopes
  });
  return c.json({
    url: url.toString(),
    redirect: !c.body.disableRedirect
  });
});
const unlinkAccount = createAuthEndpoint("/unlink-account", {
  method: "POST",
  body: z.object({
    providerId: z.string(),
    accountId: z.string().optional()
  }),
  use: [freshSessionMiddleware],
  metadata: { openapi: {
    description: "Unlink an account",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { providerId, accountId } = ctx.body;
  const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
  if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT });
  const accountExist = accounts.find((account2) => accountId ? account2.accountId === accountId && account2.providerId === providerId : account2.providerId === providerId);
  if (!accountExist) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.ACCOUNT_NOT_FOUND });
  await ctx.context.internalAdapter.deleteAccount(accountExist.id);
  return ctx.json({ status: true });
});
const getAccessToken = createAuthEndpoint("/get-access-token", {
  method: "POST",
  body: z.object({
    providerId: z.string().meta({ description: "The provider ID for the OAuth provider" }),
    accountId: z.string().meta({ description: "The account ID associated with the refresh token" }).optional(),
    userId: z.string().meta({ description: "The user ID associated with the account" }).optional()
  }),
  metadata: { openapi: {
    description: "Get a valid access token, doing a refresh if needed",
    responses: {
      200: {
        description: "A Valid access token",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            tokenType: { type: "string" },
            idToken: { type: "string" },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            accessTokenExpiresAt: {
              type: "string",
              format: "date-time"
            },
            refreshTokenExpiresAt: {
              type: "string",
              format: "date-time"
            }
          }
        } } }
      },
      400: { description: "Invalid refresh token or provider configuration" }
    }
  } }
}, async (ctx) => {
  const { providerId, accountId, userId } = ctx.body || {};
  const req = ctx.request;
  const session2 = await getSessionFromCtx(ctx);
  if (req && !session2) throw ctx.error("UNAUTHORIZED");
  let resolvedUserId = session2?.user?.id || userId;
  if (!resolvedUserId) throw ctx.error("UNAUTHORIZED");
  if (!ctx.context.socialProviders.find((p) => p.id === providerId)) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} is not supported.` });
  const accountData = await getAccountCookie(ctx);
  let account2 = void 0;
  if (accountData && providerId === accountData.providerId && (!accountId || accountData.id === accountId)) account2 = accountData;
  else account2 = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId);
  if (!account2) throw new APIError("BAD_REQUEST", { message: "Account not found" });
  const provider = ctx.context.socialProviders.find((p) => p.id === providerId);
  if (!provider) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} not found.` });
  try {
    let newTokens = null;
    const accessTokenExpired = account2.accessTokenExpiresAt && new Date(account2.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
    if (account2.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
      const refreshToken$1 = await decryptOAuthToken(account2.refreshToken, ctx.context);
      newTokens = await provider.refreshAccessToken(refreshToken$1);
      const updatedAccount = await ctx.context.internalAdapter.updateAccount(account2.id, {
        accessToken: await setTokenUtil(newTokens.accessToken, ctx.context),
        accessTokenExpiresAt: newTokens.accessTokenExpiresAt,
        refreshToken: await setTokenUtil(newTokens.refreshToken, ctx.context),
        refreshTokenExpiresAt: newTokens.refreshTokenExpiresAt
      });
      if (ctx.context.options.account?.storeAccountCookie && updatedAccount) await setAccountCookie(ctx, updatedAccount);
    }
    const tokens = {
      accessToken: newTokens?.accessToken ?? await decryptOAuthToken(account2.accessToken ?? "", ctx.context),
      accessTokenExpiresAt: newTokens?.accessTokenExpiresAt ?? account2.accessTokenExpiresAt ?? void 0,
      scopes: account2.scope?.split(",") ?? [],
      idToken: newTokens?.idToken ?? account2.idToken ?? void 0
    };
    return ctx.json(tokens);
  } catch (error2) {
    throw new APIError("BAD_REQUEST", {
      message: "Failed to get a valid access token",
      cause: error2
    });
  }
});
const refreshToken = createAuthEndpoint("/refresh-token", {
  method: "POST",
  body: z.object({
    providerId: z.string().meta({ description: "The provider ID for the OAuth provider" }),
    accountId: z.string().meta({ description: "The account ID associated with the refresh token" }).optional(),
    userId: z.string().meta({ description: "The user ID associated with the account" }).optional()
  }),
  metadata: { openapi: {
    description: "Refresh the access token using a refresh token",
    responses: {
      200: {
        description: "Access token refreshed successfully",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            tokenType: { type: "string" },
            idToken: { type: "string" },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            accessTokenExpiresAt: {
              type: "string",
              format: "date-time"
            },
            refreshTokenExpiresAt: {
              type: "string",
              format: "date-time"
            }
          }
        } } }
      },
      400: { description: "Invalid refresh token or provider configuration" }
    }
  } }
}, async (ctx) => {
  const { providerId, accountId, userId } = ctx.body;
  const req = ctx.request;
  const session2 = await getSessionFromCtx(ctx);
  if (req && !session2) throw ctx.error("UNAUTHORIZED");
  let resolvedUserId = session2?.user?.id || userId;
  if (!resolvedUserId) throw new APIError("BAD_REQUEST", { message: `Either userId or session is required` });
  const provider = ctx.context.socialProviders.find((p) => p.id === providerId);
  if (!provider) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} not found.` });
  if (!provider.refreshAccessToken) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} does not support token refreshing.` });
  let account2 = void 0;
  const accountData = await getAccountCookie(ctx);
  if (accountData && (!providerId || providerId === accountData?.providerId)) account2 = accountData;
  else account2 = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId);
  if (!account2) throw new APIError("BAD_REQUEST", { message: "Account not found" });
  let refreshToken$1 = void 0;
  if (accountData && providerId === accountData.providerId) refreshToken$1 = accountData.refreshToken ?? void 0;
  else refreshToken$1 = account2.refreshToken ?? void 0;
  if (!refreshToken$1) throw new APIError("BAD_REQUEST", { message: "Refresh token not found" });
  try {
    const decryptedRefreshToken = await decryptOAuthToken(refreshToken$1, ctx.context);
    const tokens = await provider.refreshAccessToken(decryptedRefreshToken);
    if (account2.id) {
      const updateData = {
        ...account2 || {},
        accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
        refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
        accessTokenExpiresAt: tokens.accessTokenExpiresAt,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
        scope: tokens.scopes?.join(",") || account2.scope,
        idToken: tokens.idToken || account2.idToken
      };
      await ctx.context.internalAdapter.updateAccount(account2.id, updateData);
    }
    if (accountData && providerId === accountData.providerId && ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
      ...accountData,
      accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
      refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      scope: tokens.scopes?.join(",") || accountData.scope,
      idToken: tokens.idToken || accountData.idToken
    });
    return ctx.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      scope: tokens.scopes?.join(",") || account2.scope,
      idToken: tokens.idToken || account2.idToken,
      providerId: account2.providerId,
      accountId: account2.accountId
    });
  } catch (error2) {
    throw new APIError("BAD_REQUEST", {
      message: "Failed to refresh access token",
      cause: error2
    });
  }
});
const accountInfoQuerySchema = z.optional(z.object({ accountId: z.string().meta({ description: "The provider given account id for which to get the account info" }).optional() }));
const accountInfo = createAuthEndpoint("/account-info", {
  method: "GET",
  use: [sessionMiddleware],
  metadata: { openapi: {
    description: "Get the account info provided by the provider",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              image: { type: "string" },
              emailVerified: { type: "boolean" }
            },
            required: ["id", "emailVerified"]
          },
          data: {
            type: "object",
            properties: {},
            additionalProperties: true
          }
        },
        required: ["user", "data"],
        additionalProperties: false
      } } }
    } }
  } },
  query: accountInfoQuerySchema
}, async (ctx) => {
  const providedAccountId = ctx.query?.accountId;
  let account2 = void 0;
  if (!providedAccountId) {
    if (ctx.context.options.account?.storeAccountCookie) {
      const accountData = await getAccountCookie(ctx);
      if (accountData) account2 = accountData;
    }
  } else {
    const accountData = await ctx.context.internalAdapter.findAccount(providedAccountId);
    if (accountData) account2 = accountData;
  }
  if (!account2 || account2.userId !== ctx.context.session.user.id) throw new APIError("BAD_REQUEST", { message: "Account not found" });
  const provider = ctx.context.socialProviders.find((p) => p.id === account2.providerId);
  if (!provider) throw new APIError("INTERNAL_SERVER_ERROR", { message: `Provider account provider is ${account2.providerId} but it is not configured` });
  const tokens = await getAccessToken({
    ...ctx,
    method: "POST",
    body: {
      accountId: account2.id,
      providerId: account2.providerId
    },
    returnHeaders: false,
    returnStatus: false
  });
  if (!tokens.accessToken) throw new APIError("BAD_REQUEST", { message: "Access token not found" });
  const info2 = await provider.getUserInfo({
    ...tokens,
    accessToken: tokens.accessToken
  });
  return ctx.json(info2);
});
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600, extraPayload) {
  return await signJWT({
    email: email.toLowerCase(),
    updateTo,
    ...extraPayload
  }, secret, expiresIn);
}
async function sendVerificationEmailFn(ctx, user2) {
  if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const token = await createEmailVerificationToken(ctx.context.secret, user2.email, void 0, ctx.context.options.emailVerification?.expiresIn);
  const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
  await ctx.context.options.emailVerification.sendVerificationEmail({
    user: user2,
    url,
    token
  }, ctx.request);
}
const sendVerificationEmail = createAuthEndpoint("/send-verification-email", {
  method: "POST",
  operationId: "sendVerificationEmail",
  body: z.object({
    email: z.email().meta({ description: "The email to send the verification email to" }),
    callbackURL: z.string().meta({ description: "The URL to use for email verification callback" }).optional()
  }),
  metadata: { openapi: {
    operationId: "sendVerificationEmail",
    description: "Send a verification email to the user",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The email to send the verification email to",
          example: "user@example.com"
        },
        callbackURL: {
          type: "string",
          description: "The URL to use for email verification callback",
          example: "https://example.com/callback",
          nullable: true
        }
      },
      required: ["email"]
    } } } },
    responses: {
      "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { status: {
            type: "boolean",
            description: "Indicates if the email was sent successfully",
            example: true
          } }
        } } }
      },
      "400": {
        description: "Bad Request",
        content: { "application/json": { schema: {
          type: "object",
          properties: { message: {
            type: "string",
            description: "Error message",
            example: "Verification email isn't enabled"
          } }
        } } }
      }
    }
  } }
}, async (ctx) => {
  if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const { email } = ctx.body;
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) {
    const user2 = await ctx.context.internalAdapter.findUserByEmail(email);
    if (!user2) {
      await createEmailVerificationToken(ctx.context.secret, email, void 0, ctx.context.options.emailVerification?.expiresIn);
      return ctx.json({ status: true });
    }
    await sendVerificationEmailFn(ctx, user2.user);
    return ctx.json({ status: true });
  }
  if (session2?.user.emailVerified) throw new APIError("BAD_REQUEST", { message: "You can only send a verification email to an unverified email" });
  if (session2?.user.email !== email) throw new APIError("BAD_REQUEST", { message: "You can only send a verification email to your own email" });
  await sendVerificationEmailFn(ctx, session2.user);
  return ctx.json({ status: true });
});
const verifyEmail = createAuthEndpoint("/verify-email", {
  method: "GET",
  operationId: "verifyEmail",
  query: z.object({
    token: z.string().meta({ description: "The token to verify the email" }),
    callbackURL: z.string().meta({ description: "The URL to redirect to after email verification" }).optional()
  }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    description: "Verify the email of the user",
    parameters: [{
      name: "token",
      in: "query",
      description: "The token to verify the email",
      required: true,
      schema: { type: "string" }
    }, {
      name: "callbackURL",
      in: "query",
      description: "The URL to redirect to after email verification",
      required: false,
      schema: { type: "string" }
    }],
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            $ref: "#/components/schemas/User"
          },
          status: {
            type: "boolean",
            description: "Indicates if the email was verified successfully"
          }
        },
        required: ["user", "status"]
      } } }
    } }
  } }
}, async (ctx) => {
  function redirectOnError(error2) {
    if (ctx.query.callbackURL) {
      if (ctx.query.callbackURL.includes("?")) throw ctx.redirect(`${ctx.query.callbackURL}&error=${error2}`);
      throw ctx.redirect(`${ctx.query.callbackURL}?error=${error2}`);
    }
    throw new APIError("UNAUTHORIZED", { message: error2 });
  }
  const { token } = ctx.query;
  let jwt;
  try {
    jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
  } catch (e) {
    if (e instanceof JWTExpired) return redirectOnError("token_expired");
    return redirectOnError("invalid_token");
  }
  const parsed = z.object({
    email: z.email(),
    updateTo: z.string().optional(),
    requestType: z.string().optional()
  }).parse(jwt.payload);
  const user2 = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
  if (!user2) return redirectOnError("user_not_found");
  if (parsed.updateTo) {
    let session2 = await getSessionFromCtx(ctx);
    if (session2 && session2.user.email !== parsed.email) return redirectOnError("unauthorized");
    if (parsed.requestType === "change-email-confirmation") {
      const newToken$1 = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
      const updateCallbackURL$1 = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${newToken$1}&callbackURL=${updateCallbackURL$1}`;
      await ctx.context.options.emailVerification?.sendVerificationEmail?.({
        user: {
          ...user2.user,
          email: parsed.updateTo
        },
        url,
        token: newToken$1
      }, ctx.request);
      if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
      return ctx.json({ status: true });
    }
    if (!session2) {
      const newSession = await ctx.context.internalAdapter.createSession(user2.user.id);
      if (!newSession) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to create session" });
      session2 = {
        session: newSession,
        user: user2.user
      };
    }
    if (parsed.requestType === "change-email-verification") {
      const updatedUser$2 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
        email: parsed.updateTo,
        emailVerified: true
      });
      await setSessionCookie(ctx, {
        session: session2.session,
        user: {
          ...session2.user,
          email: parsed.updateTo,
          emailVerified: true
        }
      });
      if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
      return ctx.json({
        status: true,
        user: updatedUser$2
      });
    }
    const updatedUser$1 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
      email: parsed.updateTo,
      emailVerified: false
    });
    const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
    const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
    await ctx.context.options.emailVerification?.sendVerificationEmail?.({
      user: updatedUser$1,
      url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
      token: newToken
    }, ctx.request);
    await setSessionCookie(ctx, {
      session: session2.session,
      user: {
        ...session2.user,
        email: parsed.updateTo,
        emailVerified: false
      }
    });
    if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
    return ctx.json({
      status: true,
      user: {
        id: updatedUser$1.id,
        email: updatedUser$1.email,
        name: updatedUser$1.name,
        image: updatedUser$1.image,
        emailVerified: updatedUser$1.emailVerified,
        createdAt: updatedUser$1.createdAt,
        updatedAt: updatedUser$1.updatedAt
      }
    });
  }
  if (user2.user.emailVerified) {
    if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
    return ctx.json({
      status: true,
      user: null
    });
  }
  if (ctx.context.options.emailVerification?.onEmailVerification) await ctx.context.options.emailVerification.onEmailVerification(user2.user, ctx.request);
  const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
  if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
  if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
    const currentSession = await getSessionFromCtx(ctx);
    if (!currentSession || currentSession.user.email !== parsed.email) {
      const session2 = await ctx.context.internalAdapter.createSession(user2.user.id);
      if (!session2) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to create session" });
      await setSessionCookie(ctx, {
        session: session2,
        user: {
          ...user2.user,
          emailVerified: true
        }
      });
    } else await setSessionCookie(ctx, {
      session: currentSession.session,
      user: {
        ...currentSession.user,
        emailVerified: true
      }
    });
  }
  if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
  return ctx.json({
    status: true,
    user: null
  });
});
async function handleOAuthUserInfo(c, opts) {
  const { userInfo, account: account2, callbackURL, disableSignUp, overrideUserInfo } = opts;
  const dbUser = await c.context.internalAdapter.findOAuthUser(userInfo.email.toLowerCase(), account2.accountId, account2.providerId).catch((e) => {
    logger.error("Better auth was unable to query your database.\nError: ", e);
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=internal_server_error`);
  });
  let user2 = dbUser?.user;
  let isRegister = !user2;
  if (dbUser) {
    const hasBeenLinked = dbUser.accounts.find((a) => a.providerId === account2.providerId && a.accountId === account2.accountId);
    if (!hasBeenLinked) {
      const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
      if (!(opts.isTrustedProvider || trustedProviders?.includes(account2.providerId)) && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
        if (isDevelopment()) logger.warn(`User already exist but account isn't linked to ${account2.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
        return {
          error: "account not linked",
          data: null
        };
      }
      try {
        await c.context.internalAdapter.linkAccount({
          providerId: account2.providerId,
          accountId: userInfo.id.toString(),
          userId: dbUser.user.id,
          accessToken: await setTokenUtil(account2.accessToken, c.context),
          refreshToken: await setTokenUtil(account2.refreshToken, c.context),
          idToken: account2.idToken,
          accessTokenExpiresAt: account2.accessTokenExpiresAt,
          refreshTokenExpiresAt: account2.refreshTokenExpiresAt,
          scope: account2.scope
        });
      } catch (e) {
        logger.error("Unable to link account", e);
        return {
          error: "unable to link account",
          data: null
        };
      }
      if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
    } else {
      if (c.context.options.account?.updateAccountOnSignIn !== false) {
        const updateData = Object.fromEntries(Object.entries({
          idToken: account2.idToken,
          accessToken: await setTokenUtil(account2.accessToken, c.context),
          refreshToken: await setTokenUtil(account2.refreshToken, c.context),
          accessTokenExpiresAt: account2.accessTokenExpiresAt,
          refreshTokenExpiresAt: account2.refreshTokenExpiresAt,
          scope: account2.scope
        }).filter(([_, value]) => value !== void 0));
        if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, updateData);
        if (Object.keys(updateData).length > 0) await c.context.internalAdapter.updateAccount(hasBeenLinked.id, updateData);
      }
      if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
    }
    if (overrideUserInfo) {
      const { id: _, ...restUserInfo } = userInfo;
      user2 = await c.context.internalAdapter.updateUser(dbUser.user.id, {
        ...restUserInfo,
        email: userInfo.email.toLowerCase(),
        emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
      });
    }
  } else {
    if (disableSignUp) return {
      error: "signup disabled",
      data: null,
      isRegister: false
    };
    try {
      const { id: _, ...restUserInfo } = userInfo;
      const accountData = {
        accessToken: await setTokenUtil(account2.accessToken, c.context),
        refreshToken: await setTokenUtil(account2.refreshToken, c.context),
        idToken: account2.idToken,
        accessTokenExpiresAt: account2.accessTokenExpiresAt,
        refreshTokenExpiresAt: account2.refreshTokenExpiresAt,
        scope: account2.scope,
        providerId: account2.providerId,
        accountId: userInfo.id.toString()
      };
      const { user: createdUser, account: createdAccount } = await c.context.internalAdapter.createOAuthUser({
        ...restUserInfo,
        email: userInfo.email.toLowerCase()
      }, accountData);
      user2 = createdUser;
      if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, createdAccount);
      if (!userInfo.emailVerified && user2 && c.context.options.emailVerification?.sendOnSignUp) {
        const token = await createEmailVerificationToken(c.context.secret, user2.email, void 0, c.context.options.emailVerification?.expiresIn);
        const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
        await c.context.options.emailVerification?.sendVerificationEmail?.({
          user: user2,
          url,
          token
        }, c.request);
      }
    } catch (e) {
      logger.error(e);
      if (e instanceof APIError) return {
        error: e.message,
        data: null,
        isRegister: false
      };
      return {
        error: "unable to create user",
        data: null,
        isRegister: false
      };
    }
  }
  if (!user2) return {
    error: "unable to create user",
    data: null,
    isRegister: false
  };
  const session2 = await c.context.internalAdapter.createSession(user2.id);
  if (!session2) return {
    error: "unable to create session",
    data: null,
    isRegister: false
  };
  return {
    data: {
      session: session2,
      user: user2
    },
    error: null,
    isRegister
  };
}
const schema$3 = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
  device_id: z.string().optional(),
  error_description: z.string().optional(),
  state: z.string().optional(),
  user: z.string().optional()
});
const callbackOAuth = createAuthEndpoint("/callback/:id", {
  method: ["GET", "POST"],
  operationId: "handleOAuthCallback",
  body: schema$3.optional(),
  query: schema$3.optional(),
  metadata: {
    ...HIDE_METADATA,
    allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"]
  }
}, async (c) => {
  let queryOrBody;
  const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
  if (c.method === "POST") {
    const postData = c.body ? schema$3.parse(c.body) : {};
    const queryData = c.query ? schema$3.parse(c.query) : {};
    const mergedData = schema$3.parse({
      ...postData,
      ...queryData
    });
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(mergedData)) if (value !== void 0 && value !== null) params.set(key, String(value));
    const redirectURL = `${c.context.baseURL}/callback/${c.params.id}?${params.toString()}`;
    throw c.redirect(redirectURL);
  }
  try {
    if (c.method === "GET") queryOrBody = schema$3.parse(c.query);
    else if (c.method === "POST") queryOrBody = schema$3.parse(c.body);
    else throw new Error("Unsupported method");
  } catch (e) {
    c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
    throw c.redirect(`${defaultErrorURL}?error=invalid_callback_request`);
  }
  const { code, error: error2, state, error_description, device_id } = queryOrBody;
  if (!state) {
    c.context.logger.error("State not found", error2);
    const url = `${defaultErrorURL}${defaultErrorURL.includes("?") ? "&" : "?"}state=state_not_found`;
    throw c.redirect(url);
  }
  const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp } = await parseState(c);
  function redirectOnError(error$1, description) {
    const baseURL = errorURL ?? defaultErrorURL;
    const params = new URLSearchParams({ error: error$1 });
    if (description) params.set("error_description", description);
    const url = `${baseURL}${baseURL.includes("?") ? "&" : "?"}${params.toString()}`;
    throw c.redirect(url);
  }
  if (error2) redirectOnError(error2, error_description);
  if (!code) {
    c.context.logger.error("Code not found");
    throw redirectOnError("no_code");
  }
  const provider = c.context.socialProviders.find((p) => p.id === c.params.id);
  if (!provider) {
    c.context.logger.error("Oauth provider with id", c.params.id, "not found");
    throw redirectOnError("oauth_provider_not_found");
  }
  let tokens;
  try {
    tokens = await provider.validateAuthorizationCode({
      code,
      codeVerifier,
      deviceId: device_id,
      redirectURI: `${c.context.baseURL}/callback/${provider.id}`
    });
  } catch (e) {
    c.context.logger.error("", e);
    throw redirectOnError("invalid_code");
  }
  const userInfo = await provider.getUserInfo({
    ...tokens,
    user: c.body?.user ? safeJSONParse(c.body.user) : void 0
  }).then((res) => res?.user);
  if (!userInfo) {
    c.context.logger.error("Unable to get user info");
    return redirectOnError("unable_to_get_user_info");
  }
  if (!callbackURL) {
    c.context.logger.error("No callback URL found");
    throw redirectOnError("no_callback_url");
  }
  if (link) {
    if (!c.context.options.account?.accountLinking?.trustedProviders?.includes(provider.id) && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
      c.context.logger.error("Unable to link account - untrusted provider");
      return redirectOnError("unable_to_link_account");
    }
    if (userInfo.email !== link.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) return redirectOnError("email_doesn't_match");
    const existingAccount = await c.context.internalAdapter.findAccount(String(userInfo.id));
    if (existingAccount) {
      if (existingAccount.userId.toString() !== link.userId.toString()) return redirectOnError("account_already_linked_to_different_user");
      const updateData = Object.fromEntries(Object.entries({
        accessToken: await setTokenUtil(tokens.accessToken, c.context),
        refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
        idToken: tokens.idToken,
        accessTokenExpiresAt: tokens.accessTokenExpiresAt,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
        scope: tokens.scopes?.join(",")
      }).filter(([_, value]) => value !== void 0));
      await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
    } else if (!await c.context.internalAdapter.createAccount({
      userId: link.userId,
      providerId: provider.id,
      accountId: String(userInfo.id),
      ...tokens,
      accessToken: await setTokenUtil(tokens.accessToken, c.context),
      refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
      scope: tokens.scopes?.join(",")
    })) return redirectOnError("unable_to_link_account");
    let toRedirectTo$1;
    try {
      toRedirectTo$1 = callbackURL.toString();
    } catch {
      toRedirectTo$1 = callbackURL;
    }
    throw c.redirect(toRedirectTo$1);
  }
  if (!userInfo.email) {
    c.context.logger.error("Provider did not return email. This could be due to misconfiguration in the provider settings.");
    return redirectOnError("email_not_found");
  }
  const accountData = {
    providerId: provider.id,
    accountId: String(userInfo.id),
    ...tokens,
    scope: tokens.scopes?.join(",")
  };
  const result = await handleOAuthUserInfo(c, {
    userInfo: {
      ...userInfo,
      id: String(userInfo.id),
      email: userInfo.email,
      name: userInfo.name || userInfo.email
    },
    account: accountData,
    callbackURL,
    disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
    overrideUserInfo: provider.options?.overrideUserInfoOnSignIn
  });
  if (result.error) {
    c.context.logger.error(result.error.split(" ").join("_"));
    return redirectOnError(result.error.split(" ").join("_"));
  }
  const { session: session2, user: user2 } = result.data;
  await setSessionCookie(c, {
    session: session2,
    user: user2
  });
  let toRedirectTo;
  try {
    toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
  } catch {
    toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
  }
  throw c.redirect(toRedirectTo);
});
function sanitize(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&(?!amp;|lt;|gt;|quot;|#39;|#x[0-9a-fA-F]+;|#[0-9]+;)/g, "&amp;");
}
const html = (options, code = "Unknown", description = null) => {
  const custom = options.onAPIError?.customizeDefaultErrorPage;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ${custom?.font?.defaultFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
        background: ${custom?.colors?.background || "var(--background)"};
        color: var(--foreground);
        margin: 0;
      }
      :root,
      :host {
        --spacing: 0.25rem;
        --container-md: 28rem;
        --text-sm: ${custom?.size?.textSm || "0.875rem"};
        --text-sm--line-height: calc(1.25 / 0.875);
        --text-2xl: ${custom?.size?.text2xl || "1.5rem"};
        --text-2xl--line-height: calc(2 / 1.5);
        --text-4xl: ${custom?.size?.text4xl || "2.25rem"};
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-6xl: ${custom?.size?.text6xl || "3rem"};
        --text-6xl--line-height: 1;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --default-transition-duration: 150ms;
        --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        --radius: ${custom?.size?.radiusSm || "0.625rem"};
        --default-mono-font-family: ${custom?.font?.monoFamily || "var(--font-geist-mono)"};
        --primary: ${custom?.colors?.primary || "black"};
        --primary-foreground: ${custom?.colors?.primaryForeground || "white"};
        --background: ${custom?.colors?.background || "white"};
        --foreground: ${custom?.colors?.foreground || "oklch(0.271 0 0)"};
        --border: ${custom?.colors?.border || "oklch(0.89 0 0)"};
        --destructive: ${custom?.colors?.destructive || "oklch(0.55 0.15 25.723)"};
        --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.545 0 0)"};
        --corner-border: ${custom?.colors?.cornerBorder || "#404040"};
      }

      button, .btn {
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        transition: all var(--default-transition-duration)
          var(--default-transition-timing-function);
      }
      button:hover, .btn:hover {
        opacity: 0.8;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        :host {
          --primary: ${custom?.colors?.primary || "white"};
          --primary-foreground: ${custom?.colors?.primaryForeground || "black"};
          --background: ${custom?.colors?.background || "oklch(0.15 0 0)"};
          --foreground: ${custom?.colors?.foreground || "oklch(0.98 0 0)"};
          --border: ${custom?.colors?.border || "oklch(0.27 0 0)"};
          --destructive: ${custom?.colors?.destructive || "oklch(0.65 0.15 25.723)"};
          --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.65 0 0)"};
          --corner-border: ${custom?.colors?.cornerBorder || "#a0a0a0"};
        }
      }
      @media (max-width: 640px) {
        :root, :host {
          --text-6xl: 2.5rem;
          --text-2xl: 1.25rem;
          --text-sm: 0.8125rem;
        }
      }
      @media (max-width: 480px) {
        :root, :host {
          --text-6xl: 2rem;
          --text-2xl: 1.125rem;
        }
      }
    </style>
  </head>
  <body style="width: 100vw; min-height: 100vh; overflow-x: hidden; overflow-y: auto;">
    <div
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 1rem;
        "
        >
${custom?.disableBackgroundGrid ? "" : `
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
        "
      ></div>
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${custom?.colors?.background || "var(--background)"};
          mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          pointer-events: none;
        "
      ></div>
`}

<div
  style="
    position: relative;
    z-index: 10;
    border: 2px solid var(--border);
    background: ${custom?.colors?.cardBackground || "var(--background)"};
    padding: 1.5rem;
    max-width: 42rem;
    width: 100%;
  "
>
    ${custom?.disableCornerDecorations ? "" : `
        <!-- Corner decorations -->
        <div
          style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>
  
        <div
          style="
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>`}

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <div
              style="
                display: inline-block;
                border: 2px solid ${custom?.disableTitleBorder ? "transparent" : custom?.colors?.titleBorder || "var(--destructive)"};
                padding: 0.375rem 1rem;
              "
            >
              <h1
                style="
                  font-size: var(--text-6xl);
                  font-weight: var(--font-weight-semibold);
                  color: ${custom?.colors?.titleColor || "var(--foreground)"};
                  letter-spacing: -0.02em;
                  margin: 0;
                "
              >
                ERROR
              </h1>
            </div>
            <div
              style="
                height: 2px;
                background-color: var(--border);
                width: calc(100% + 3rem);
                margin-left: -1.5rem;
                margin-top: 1.5rem;
              "
            ></div>
          </div>

          <h2
            style="
              font-size: var(--text-2xl);
              font-weight: var(--font-weight-semibold);
              color: var(--foreground);
              margin: 0 0 1rem;
            "
          >
            Something went wrong
          </h2>

          <div
            style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid var(--border);
                background-color: var(--muted);
                padding: 0.375rem 0.75rem;
                margin: 0 0 1rem;
                flex-wrap: wrap;
                justify-content: center;
            "
            >
            <span
                style="
                font-size: 0.75rem;
                color: var(--muted-foreground);
                font-weight: var(--font-weight-semibold);
                "
            >
                CODE:
            </span>
            <span
                style="
                font-size: var(--text-sm);
                font-family: var(--default-mono-font-family, monospace);
                color: var(--foreground);
                word-break: break-all;
                "
            >
                ${sanitize(code)}
            </span>
            </div>

          <p
            style="
              color: var(--muted-foreground);
              max-width: 28rem;
              margin: 0 auto;
              font-size: var(--text-sm);
              line-height: 1.5;
              text-wrap: pretty;
            "
          >
            ${!description ? `We encountered an unexpected error. Please try again or return to the home page. If you're a developer, you can find more information about the error <a href='https://better-auth.com/docs/errors/${encodeURIComponent(code)}' target='_blank' rel="noopener noreferrer" style='color: var(--foreground); text-decoration: underline;'>here</a>.` : description}
          </p>
        </div>

        <div
          style="
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          "
        >
          <a
            href="/"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: var(--primary);
                color: var(--primary-foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Go Home
            </div>
          </a>
          <a
            href="https://better-auth.com/docs/errors/${encodeURIComponent(code)}?askai=${encodeURIComponent(`What does the error code ${code} mean?`)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: transparent;
                color: var(--foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Ask AI
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
const error = createAuthEndpoint("/error", {
  method: "GET",
  metadata: {
    ...HIDE_METADATA,
    openapi: {
      description: "Displays an error page",
      responses: { "200": {
        description: "Success",
        content: { "text/html": { schema: {
          type: "string",
          description: "The HTML content of the error page"
        } } }
      } }
    }
  }
}, async (c) => {
  const url = new URL(c.request?.url || "");
  const unsanitizedCode = url.searchParams.get("error") || "UNKNOWN";
  const unsanitizedDescription = url.searchParams.get("error_description") || null;
  const safeCode = /^[\'A-Za-z0-9_-]+$/.test(unsanitizedCode) ? unsanitizedCode : "UNKNOWN";
  const safeDescription = unsanitizedDescription ? sanitize(unsanitizedDescription) : null;
  const queryParams = new URLSearchParams();
  queryParams.set("error", safeCode);
  if (unsanitizedDescription) queryParams.set("error_description", unsanitizedDescription);
  const options = c.context.options;
  const errorURL = options.onAPIError?.errorURL;
  if (errorURL) return new Response(null, {
    status: 302,
    headers: { Location: `${errorURL}${errorURL.includes("?") ? "&" : "?"}${queryParams.toString()}` }
  });
  if (isProduction && !options.onAPIError?.customizeDefaultErrorPage) return new Response(null, {
    status: 302,
    headers: { Location: `/?${queryParams.toString()}` }
  });
  return new Response(html(c.context.options, safeCode, safeDescription), { headers: { "Content-Type": "text/html" } });
});
const ok = createAuthEndpoint("/ok", {
  method: "GET",
  metadata: {
    ...HIDE_METADATA,
    openapi: {
      description: "Check if the API is working",
      responses: { "200": {
        description: "API is working",
        content: { "application/json": { schema: {
          type: "object",
          properties: { ok: {
            type: "boolean",
            description: "Indicates if the API is working"
          } },
          required: ["ok"]
        } } }
      } }
    }
  }
}, async (ctx) => {
  return ctx.json({ ok: true });
});
function redirectError(ctx, callbackURL, query) {
  const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
  const url = new URL(callbackURL, ctx.baseURL);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
const requestPasswordReset = createAuthEndpoint("/request-password-reset", {
  method: "POST",
  body: z.object({
    email: z.email().meta({ description: "The email address of the user to send a password reset email to" }),
    redirectTo: z.string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
  }),
  metadata: { openapi: {
    operationId: "requestPasswordReset",
    description: "Send a password reset email to the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
    ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
    throw new APIError("BAD_REQUEST", { message: "Reset password isn't enabled" });
  }
  const { email, redirectTo } = ctx.body;
  const user2 = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
  if (!user2) {
    generateId(24);
    await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
    ctx.context.logger.error("Reset Password: User not found", { email });
    return ctx.json({
      status: true,
      message: "If this email exists in our system, check your email for the reset link"
    });
  }
  const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600 * 1, "sec");
  const verificationToken = generateId(24);
  await ctx.context.internalAdapter.createVerificationValue({
    value: user2.user.id,
    identifier: `reset-password:${verificationToken}`,
    expiresAt
  });
  const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
  const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
  await ctx.context.options.emailAndPassword.sendResetPassword({
    user: user2.user,
    url,
    token: verificationToken
  }, ctx.request).catch((e) => {
    ctx.context.logger.error("Failed to send reset password email", e);
  });
  return ctx.json({
    status: true,
    message: "If this email exists in our system, check your email for the reset link"
  });
});
const requestPasswordResetCallback = createAuthEndpoint("/reset-password/:token", {
  method: "GET",
  operationId: "forgetPasswordCallback",
  query: z.object({ callbackURL: z.string().meta({ description: "The URL to redirect the user to reset their password" }) }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    operationId: "resetPasswordCallback",
    description: "Redirects the user to the callback URL with the token",
    parameters: [{
      name: "token",
      in: "path",
      required: true,
      description: "The token to reset the password",
      schema: { type: "string" }
    }, {
      name: "callbackURL",
      in: "query",
      required: true,
      description: "The URL to redirect the user to reset their password",
      schema: { type: "string" }
    }],
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { token: { type: "string" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { token } = ctx.params;
  const { callbackURL } = ctx.query;
  if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
  const verification2 = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
  if (!verification2 || verification2.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
  throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
const resetPassword = createAuthEndpoint("/reset-password", {
  method: "POST",
  operationId: "resetPassword",
  query: z.object({ token: z.string().optional() }).optional(),
  body: z.object({
    newPassword: z.string().meta({ description: "The new password to set" }),
    token: z.string().meta({ description: "The token to reset the password" }).optional()
  }),
  metadata: { openapi: {
    operationId: "resetPassword",
    description: "Reset the password for a user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const token = ctx.body.token || ctx.query?.token;
  if (!token) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  const { newPassword } = ctx.body;
  const minLength = ctx.context.password?.config.minPasswordLength;
  const maxLength = ctx.context.password?.config.maxPasswordLength;
  if (newPassword.length < minLength) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  if (newPassword.length > maxLength) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  const id = `reset-password:${token}`;
  const verification2 = await ctx.context.internalAdapter.findVerificationValue(id);
  if (!verification2 || verification2.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  const userId = verification2.value;
  const hashedPassword = await ctx.context.password.hash(newPassword);
  if (!(await ctx.context.internalAdapter.findAccounts(userId)).find((ac2) => ac2.providerId === "credential")) await ctx.context.internalAdapter.createAccount({
    userId,
    providerId: "credential",
    password: hashedPassword,
    accountId: userId
  });
  else await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
  await ctx.context.internalAdapter.deleteVerificationValue(verification2.id);
  if (ctx.context.options.emailAndPassword?.onPasswordReset) {
    const user2 = await ctx.context.internalAdapter.findUserById(userId);
    if (user2) await ctx.context.options.emailAndPassword.onPasswordReset({ user: user2 }, ctx.request);
  }
  if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteSessions(userId);
  return ctx.json({ status: true });
});
const socialSignInBodySchema = z.object({
  callbackURL: z.string().meta({ description: "Callback URL to redirect to after the user has signed in" }).optional(),
  newUserCallbackURL: z.string().optional(),
  errorCallbackURL: z.string().meta({ description: "Callback URL to redirect to if an error happens" }).optional(),
  provider: SocialProviderListEnum,
  disableRedirect: z.boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
  idToken: z.optional(z.object({
    token: z.string().meta({ description: "ID token from the provider" }),
    nonce: z.string().meta({ description: "Nonce used to generate the token" }).optional(),
    accessToken: z.string().meta({ description: "Access token from the provider" }).optional(),
    refreshToken: z.string().meta({ description: "Refresh token from the provider" }).optional(),
    expiresAt: z.number().meta({ description: "Expiry date of the token" }).optional()
  })),
  scopes: z.array(z.string()).meta({ description: "Array of scopes to request from the provider. This will override the default scopes passed." }).optional(),
  requestSignUp: z.boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider" }).optional(),
  loginHint: z.string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
  additionalData: z.record(z.string(), z.any()).optional().meta({ description: "Additional data to be passed through the OAuth flow" })
});
const signInSocial = () => createAuthEndpoint("/sign-in/social", {
  method: "POST",
  operationId: "socialSignIn",
  body: socialSignInBodySchema,
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      description: "Sign in with a social provider",
      operationId: "socialSignIn",
      responses: { "200": {
        description: "Success - Returns either session details or redirect URL",
        content: { "application/json": { schema: {
          type: "object",
          description: "Session response when idToken is provided",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            },
            url: { type: "string" },
            redirect: {
              type: "boolean",
              enum: [false]
            }
          },
          required: [
            "redirect",
            "token",
            "user"
          ]
        } } }
      } }
    }
  }
}, async (c) => {
  const provider = c.context.socialProviders.find((p) => p.id === c.body.provider);
  if (!provider) {
    c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
    throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.PROVIDER_NOT_FOUND });
  }
  if (c.body.idToken) {
    if (!provider.verifyIdToken) {
      c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
      throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED });
    }
    const { token, nonce } = c.body.idToken;
    if (!await provider.verifyIdToken(token, nonce)) {
      c.context.logger.error("Invalid id token", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_TOKEN });
    }
    const userInfo = await provider.getUserInfo({
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken
    });
    if (!userInfo || !userInfo?.user) {
      c.context.logger.error("Failed to get user info", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO });
    }
    if (!userInfo.user.email) {
      c.context.logger.error("User email not found", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND });
    }
    const data = await handleOAuthUserInfo(c, {
      userInfo: {
        ...userInfo.user,
        email: userInfo.user.email,
        id: String(userInfo.user.id),
        name: userInfo.user.name || "",
        image: userInfo.user.image,
        emailVerified: userInfo.user.emailVerified || false
      },
      account: {
        providerId: provider.id,
        accountId: String(userInfo.user.id),
        accessToken: c.body.idToken.accessToken
      },
      callbackURL: c.body.callbackURL,
      disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
    });
    if (data.error) throw new APIError("UNAUTHORIZED", { message: data.error });
    await setSessionCookie(c, data.data);
    return c.json({
      redirect: false,
      token: data.data.session.token,
      url: void 0,
      user: parseUserOutput(c.context.options, data.data.user)
    });
  }
  const { codeVerifier, state } = await generateState(c, void 0, c.body.additionalData);
  const url = await provider.createAuthorizationURL({
    state,
    codeVerifier,
    redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
    scopes: c.body.scopes,
    loginHint: c.body.loginHint
  });
  return c.json({
    url: url.toString(),
    redirect: !c.body.disableRedirect
  });
});
const signInEmail = () => createAuthEndpoint("/sign-in/email", {
  method: "POST",
  operationId: "signInEmail",
  body: z.object({
    email: z.string().meta({ description: "Email of the user" }),
    password: z.string().meta({ description: "Password of the user" }),
    callbackURL: z.string().meta({ description: "Callback URL to use as a redirect for email verification" }).optional(),
    rememberMe: z.boolean().meta({ description: "If this is false, the session will not be remembered. Default is `true`." }).default(true).optional()
  }),
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      operationId: "signInEmail",
      description: "Sign in with email and password",
      responses: { "200": {
        description: "Success - Returns either session details or redirect URL",
        content: { "application/json": { schema: {
          type: "object",
          description: "Session response when idToken is provided",
          properties: {
            redirect: {
              type: "boolean",
              enum: [false]
            },
            token: {
              type: "string",
              description: "Session token"
            },
            url: {
              type: "string",
              nullable: true
            },
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            }
          },
          required: [
            "redirect",
            "token",
            "user"
          ]
        } } }
      } }
    }
  }
}, async (ctx) => {
  if (!ctx.context.options?.emailAndPassword?.enabled) {
    ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
    throw new APIError("BAD_REQUEST", { message: "Email and password is not enabled" });
  }
  const { email, password } = ctx.body;
  if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
  const user2 = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
  if (!user2) {
    await ctx.context.password.hash(password);
    ctx.context.logger.error("User not found", { email });
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  const credentialAccount = user2.accounts.find((a) => a.providerId === "credential");
  if (!credentialAccount) {
    await ctx.context.password.hash(password);
    ctx.context.logger.error("Credential account not found", { email });
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  const currentPassword = credentialAccount?.password;
  if (!currentPassword) {
    await ctx.context.password.hash(password);
    ctx.context.logger.error("Password not found", { email });
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  if (!await ctx.context.password.verify({
    hash: currentPassword,
    password
  })) {
    ctx.context.logger.error("Invalid password");
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user2.user.emailVerified) {
    if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw new APIError("FORBIDDEN", { message: BASE_ERROR_CODES.EMAIL_NOT_VERIFIED });
    if (ctx.context.options?.emailVerification?.sendOnSignIn) {
      const token = await createEmailVerificationToken(ctx.context.secret, user2.user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
      const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
      await ctx.context.options.emailVerification.sendVerificationEmail({
        user: user2.user,
        url,
        token
      }, ctx.request);
    }
    throw new APIError("FORBIDDEN", { message: BASE_ERROR_CODES.EMAIL_NOT_VERIFIED });
  }
  const session2 = await ctx.context.internalAdapter.createSession(user2.user.id, ctx.body.rememberMe === false);
  if (!session2) {
    ctx.context.logger.error("Failed to create session");
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION });
  }
  await setSessionCookie(ctx, {
    session: session2,
    user: user2.user
  }, ctx.body.rememberMe === false);
  return ctx.json({
    redirect: !!ctx.body.callbackURL,
    token: session2.token,
    url: ctx.body.callbackURL,
    user: parseUserOutput(ctx.context.options, user2.user)
  });
});
const signOut = createAuthEndpoint("/sign-out", {
  method: "POST",
  operationId: "signOut",
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "signOut",
    description: "Sign out the current user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
  if (sessionCookieToken) try {
    await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
  } catch (e) {
    ctx.context.logger.error("Failed to delete session from database", e);
  }
  deleteSessionCookie(ctx);
  return ctx.json({ success: true });
});
const signUpEmailBodySchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().nonempty(),
  image: z.string().optional(),
  callbackURL: z.string().optional(),
  rememberMe: z.boolean().optional()
}).and(z.record(z.string(), z.any()));
const signUpEmail = () => createAuthEndpoint("/sign-up/email", {
  method: "POST",
  operationId: "signUpWithEmailAndPassword",
  body: signUpEmailBodySchema,
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      operationId: "signUpWithEmailAndPassword",
      description: "Sign up a user using email and password",
      requestBody: { content: { "application/json": { schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user"
          },
          email: {
            type: "string",
            description: "The email of the user"
          },
          password: {
            type: "string",
            description: "The password of the user"
          },
          image: {
            type: "string",
            description: "The profile image URL of the user"
          },
          callbackURL: {
            type: "string",
            description: "The URL to use for email verification callback"
          },
          rememberMe: {
            type: "boolean",
            description: "If this is false, the session will not be remembered. Default is `true`."
          }
        },
        required: [
          "name",
          "email",
          "password"
        ]
      } } } },
      responses: {
        "200": {
          description: "Successfully created user",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                nullable: true,
                description: "Authentication token for the session"
              },
              user: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "The unique identifier of the user"
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "The email address of the user"
                  },
                  name: {
                    type: "string",
                    description: "The name of the user"
                  },
                  image: {
                    type: "string",
                    format: "uri",
                    nullable: true,
                    description: "The profile image URL of the user"
                  },
                  emailVerified: {
                    type: "boolean",
                    description: "Whether the email has been verified"
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "When the user was created"
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "When the user was last updated"
                  }
                },
                required: [
                  "id",
                  "email",
                  "name",
                  "emailVerified",
                  "createdAt",
                  "updatedAt"
                ]
              }
            },
            required: ["user"]
          } } }
        },
        "422": {
          description: "Unprocessable Entity. User already exists or failed to create user.",
          content: { "application/json": { schema: {
            type: "object",
            properties: { message: { type: "string" } }
          } } }
        }
      }
    }
  }
}, async (ctx) => {
  return runWithTransaction(ctx.context.adapter, async () => {
    if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) throw new APIError("BAD_REQUEST", { message: "Email and password sign up is not enabled" });
    const body = ctx.body;
    const { name, email, password, image, callbackURL: _callbackURL, rememberMe, ...rest } = body;
    if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (password.length < minPasswordLength) {
      ctx.context.logger.error("Password is too short");
      throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (password.length > maxPasswordLength) {
      ctx.context.logger.error("Password is too long");
      throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
    }
    if ((await ctx.context.internalAdapter.findUserByEmail(email))?.user) {
      ctx.context.logger.info(`Sign-up attempt for existing email: ${email}`);
      throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL });
    }
    const hash = await ctx.context.password.hash(password);
    let createdUser;
    try {
      const data = parseUserInput(ctx.context.options, rest, "create");
      createdUser = await ctx.context.internalAdapter.createUser({
        email: email.toLowerCase(),
        name,
        image,
        ...data,
        emailVerified: false
      });
      if (!createdUser) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER });
    } catch (e) {
      if (isDevelopment()) ctx.context.logger.error("Failed to create user", e);
      if (e instanceof APIError) throw e;
      ctx.context.logger?.error("Failed to create user", e);
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER,
        details: e
      });
    }
    if (!createdUser) throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER });
    await ctx.context.internalAdapter.linkAccount({
      userId: createdUser.id,
      providerId: "credential",
      accountId: createdUser.id,
      password: hash
    });
    if (ctx.context.options.emailVerification?.sendOnSignUp || ctx.context.options.emailAndPassword.requireEmailVerification) {
      const token = await createEmailVerificationToken(ctx.context.secret, createdUser.email, void 0, ctx.context.options.emailVerification?.expiresIn);
      const callbackURL = body.callbackURL ? encodeURIComponent(body.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
      const args = ctx.request ? [{
        user: createdUser,
        url,
        token
      }, ctx.request] : [{
        user: createdUser,
        url,
        token
      }];
      await ctx.context.options.emailVerification?.sendVerificationEmail?.(...args);
    }
    if (ctx.context.options.emailAndPassword.autoSignIn === false || ctx.context.options.emailAndPassword.requireEmailVerification) return ctx.json({
      token: null,
      user: parseUserOutput(ctx.context.options, createdUser)
    });
    const session2 = await ctx.context.internalAdapter.createSession(createdUser.id, rememberMe === false);
    if (!session2) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION });
    await setSessionCookie(ctx, {
      session: session2,
      user: createdUser
    }, rememberMe === false);
    return ctx.json({
      token: session2.token,
      user: parseUserOutput(ctx.context.options, createdUser)
    });
  });
});
const updateUserBodySchema = z.record(z.string().meta({ description: "Field name must be a string" }), z.any());
const updateUser = () => createAuthEndpoint("/update-user", {
  method: "POST",
  operationId: "updateUser",
  body: updateUserBodySchema,
  use: [sessionMiddleware],
  metadata: {
    $Infer: { body: {} },
    openapi: {
      operationId: "updateUser",
      description: "Update the current user",
      requestBody: { content: { "application/json": { schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user"
          },
          image: {
            type: "string",
            description: "The image of the user",
            nullable: true
          }
        }
      } } } },
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: {
            type: "object",
            $ref: "#/components/schemas/User"
          } }
        } } }
      } }
    }
  }
}, async (ctx) => {
  const body = ctx.body;
  if (body.email) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED });
  const { name, image, ...rest } = body;
  const session2 = ctx.context.session;
  const additionalFields = parseUserInput(ctx.context.options, rest, "update");
  if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) throw new APIError("BAD_REQUEST", { message: "No fields to update" });
  const user2 = await ctx.context.internalAdapter.updateUser(session2.user.id, {
    name,
    image,
    ...additionalFields
  });
  await setSessionCookie(ctx, {
    session: session2.session,
    user: user2
  });
  return ctx.json({ status: true });
});
const changePassword = createAuthEndpoint("/change-password", {
  method: "POST",
  operationId: "changePassword",
  body: z.object({
    newPassword: z.string().meta({ description: "The new password to set" }),
    currentPassword: z.string().meta({ description: "The current password is required" }),
    revokeOtherSessions: z.boolean().meta({ description: "Must be a boolean value" }).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    operationId: "changePassword",
    description: "Change the password of the user",
    responses: { "200": {
      description: "Password successfully changed",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          token: {
            type: "string",
            nullable: true,
            description: "New session token if other sessions were revoked"
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier of the user"
              },
              email: {
                type: "string",
                format: "email",
                description: "The email address of the user"
              },
              name: {
                type: "string",
                description: "The name of the user"
              },
              image: {
                type: "string",
                format: "uri",
                nullable: true,
                description: "The profile image URL of the user"
              },
              emailVerified: {
                type: "boolean",
                description: "Whether the email has been verified"
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "When the user was created"
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "When the user was last updated"
              }
            },
            required: [
              "id",
              "email",
              "name",
              "emailVerified",
              "createdAt",
              "updatedAt"
            ]
          }
        },
        required: ["user"]
      } } }
    } }
  } }
}, async (ctx) => {
  const { newPassword, currentPassword, revokeOtherSessions: revokeOtherSessions2 } = ctx.body;
  const session2 = ctx.context.session;
  const minPasswordLength = ctx.context.password.config.minPasswordLength;
  if (newPassword.length < minPasswordLength) {
    ctx.context.logger.error("Password is too short");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  }
  const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
  if (newPassword.length > maxPasswordLength) {
    ctx.context.logger.error("Password is too long");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  }
  const account2 = (await ctx.context.internalAdapter.findAccounts(session2.user.id)).find((account$1) => account$1.providerId === "credential" && account$1.password);
  if (!account2 || !account2.password) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND });
  const passwordHash = await ctx.context.password.hash(newPassword);
  if (!await ctx.context.password.verify({
    hash: account2.password,
    password: currentPassword
  })) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_PASSWORD });
  await ctx.context.internalAdapter.updateAccount(account2.id, { password: passwordHash });
  let token = null;
  if (revokeOtherSessions2) {
    await ctx.context.internalAdapter.deleteSessions(session2.user.id);
    const newSession = await ctx.context.internalAdapter.createSession(session2.user.id);
    if (!newSession) throw new APIError("INTERNAL_SERVER_ERROR", { message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION });
    await setSessionCookie(ctx, {
      session: newSession,
      user: session2.user
    });
    token = newSession.token;
  }
  return ctx.json({
    token,
    user: {
      id: session2.user.id,
      email: session2.user.email,
      name: session2.user.name,
      image: session2.user.image,
      emailVerified: session2.user.emailVerified,
      createdAt: session2.user.createdAt,
      updatedAt: session2.user.updatedAt
    }
  });
});
const setPassword = createAuthEndpoint({
  method: "POST",
  body: z.object({ newPassword: z.string().meta({ description: "The new password to set is required" }) }),
  use: [sensitiveSessionMiddleware]
}, async (ctx) => {
  const { newPassword } = ctx.body;
  const session2 = ctx.context.session;
  const minPasswordLength = ctx.context.password.config.minPasswordLength;
  if (newPassword.length < minPasswordLength) {
    ctx.context.logger.error("Password is too short");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  }
  const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
  if (newPassword.length > maxPasswordLength) {
    ctx.context.logger.error("Password is too long");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  }
  const account2 = (await ctx.context.internalAdapter.findAccounts(session2.user.id)).find((account$1) => account$1.providerId === "credential" && account$1.password);
  const passwordHash = await ctx.context.password.hash(newPassword);
  if (!account2) {
    await ctx.context.internalAdapter.linkAccount({
      userId: session2.user.id,
      providerId: "credential",
      accountId: session2.user.id,
      password: passwordHash
    });
    return ctx.json({ status: true });
  }
  throw new APIError("BAD_REQUEST", { message: "user already has a password" });
});
const deleteUser = createAuthEndpoint("/delete-user", {
  method: "POST",
  use: [sensitiveSessionMiddleware],
  body: z.object({
    callbackURL: z.string().meta({ description: "The callback URL to redirect to after the user is deleted" }).optional(),
    password: z.string().meta({ description: "The password of the user is required to delete the user" }).optional(),
    token: z.string().meta({ description: "The token to delete the user is required" }).optional()
  }),
  metadata: { openapi: {
    operationId: "deleteUser",
    description: "Delete the user",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: {
        callbackURL: {
          type: "string",
          description: "The callback URL to redirect to after the user is deleted"
        },
        password: {
          type: "string",
          description: "The user's password. Required if session is not fresh"
        },
        token: {
          type: "string",
          description: "The deletion verification token"
        }
      }
    } } } },
    responses: { "200": {
      description: "User deletion processed successfully",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the operation was successful"
          },
          message: {
            type: "string",
            enum: ["User deleted", "Verification email sent"],
            description: "Status message of the deletion process"
          }
        },
        required: ["success", "message"]
      } } }
    } }
  } }
}, async (ctx) => {
  if (!ctx.context.options.user?.deleteUser?.enabled) {
    ctx.context.logger.error("Delete user is disabled. Enable it in the options");
    throw new APIError("NOT_FOUND");
  }
  const session2 = ctx.context.session;
  if (ctx.body.password) {
    const account2 = (await ctx.context.internalAdapter.findAccounts(session2.user.id)).find((account$1) => account$1.providerId === "credential" && account$1.password);
    if (!account2 || !account2.password) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND });
    if (!await ctx.context.password.verify({
      hash: account2.password,
      password: ctx.body.password
    })) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_PASSWORD });
  }
  if (ctx.body.token) {
    await deleteUserCallback({
      ...ctx,
      query: { token: ctx.body.token }
    });
    return ctx.json({
      success: true,
      message: "User deleted"
    });
  }
  if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
    const token = generateRandomString(32, "0-9", "a-z");
    await ctx.context.internalAdapter.createVerificationValue({
      value: session2.user.id,
      identifier: `delete-account-${token}`,
      expiresAt: new Date(Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 3600 * 24) * 1e3)
    });
    const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
    await ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
      user: session2.user,
      url,
      token
    }, ctx.request);
    return ctx.json({
      success: true,
      message: "Verification email sent"
    });
  }
  if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
    const currentAge = new Date(session2.session.createdAt).getTime();
    const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
    if (Date.now() - currentAge > freshAge * 1e3) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.SESSION_EXPIRED });
  }
  const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
  if (beforeDelete) await beforeDelete(session2.user, ctx.request);
  await ctx.context.internalAdapter.deleteUser(session2.user.id);
  await ctx.context.internalAdapter.deleteSessions(session2.user.id);
  deleteSessionCookie(ctx);
  const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
  if (afterDelete) await afterDelete(session2.user, ctx.request);
  return ctx.json({
    success: true,
    message: "User deleted"
  });
});
const deleteUserCallback = createAuthEndpoint("/delete-user/callback", {
  method: "GET",
  query: z.object({
    token: z.string().meta({ description: "The token to verify the deletion request" }),
    callbackURL: z.string().meta({ description: "The URL to redirect to after deletion" }).optional()
  }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    description: "Callback to complete user deletion with verification token",
    responses: { "200": {
      description: "User successfully deleted",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the deletion was successful"
          },
          message: {
            type: "string",
            enum: ["User deleted"],
            description: "Confirmation message"
          }
        },
        required: ["success", "message"]
      } } }
    } }
  } }
}, async (ctx) => {
  if (!ctx.context.options.user?.deleteUser?.enabled) {
    ctx.context.logger.error("Delete user is disabled. Enable it in the options");
    throw new APIError("NOT_FOUND");
  }
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO });
  const token = await ctx.context.internalAdapter.findVerificationValue(`delete-account-${ctx.query.token}`);
  if (!token || token.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  if (token.value !== session2.user.id) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
  if (beforeDelete) await beforeDelete(session2.user, ctx.request);
  await ctx.context.internalAdapter.deleteUser(session2.user.id);
  await ctx.context.internalAdapter.deleteSessions(session2.user.id);
  await ctx.context.internalAdapter.deleteAccounts(session2.user.id);
  await ctx.context.internalAdapter.deleteVerificationValue(token.id);
  deleteSessionCookie(ctx);
  const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
  if (afterDelete) await afterDelete(session2.user, ctx.request);
  if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL || "/");
  return ctx.json({
    success: true,
    message: "User deleted"
  });
});
const changeEmail = createAuthEndpoint("/change-email", {
  method: "POST",
  body: z.object({
    newEmail: z.email().meta({ description: "The new email address to set must be a valid email address" }),
    callbackURL: z.string().meta({ description: "The URL to redirect to after email verification" }).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    operationId: "changeEmail",
    responses: {
      "200": {
        description: "Email change request processed successfully",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            },
            status: {
              type: "boolean",
              description: "Indicates if the request was successful"
            },
            message: {
              type: "string",
              enum: ["Email updated", "Verification email sent"],
              description: "Status message of the email change process",
              nullable: true
            }
          },
          required: ["status"]
        } } }
      },
      "422": {
        description: "Unprocessable Entity. Email already exists",
        content: { "application/json": { schema: {
          type: "object",
          properties: { message: { type: "string" } }
        } } }
      }
    }
  } }
}, async (ctx) => {
  if (!ctx.context.options.user?.changeEmail?.enabled) {
    ctx.context.logger.error("Change email is disabled.");
    throw new APIError("BAD_REQUEST", { message: "Change email is disabled" });
  }
  const newEmail = ctx.body.newEmail.toLowerCase();
  if (newEmail === ctx.context.session.user.email) {
    ctx.context.logger.error("Email is the same");
    throw new APIError("BAD_REQUEST", { message: "Email is the same" });
  }
  if (await ctx.context.internalAdapter.findUserByEmail(newEmail)) {
    ctx.context.logger.error("Email already exists");
    throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL });
  }
  if (ctx.context.session.user.emailVerified !== true && ctx.context.options.user.changeEmail.updateEmailWithoutVerification) {
    await ctx.context.internalAdapter.updateUserByEmail(ctx.context.session.user.email, { email: newEmail });
    await setSessionCookie(ctx, {
      session: ctx.context.session.session,
      user: {
        ...ctx.context.session.user,
        email: newEmail
      }
    });
    if (ctx.context.options.emailVerification?.sendVerificationEmail) {
      const token$1 = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, ctx.context.options.emailVerification?.expiresIn);
      const url$1 = `${ctx.context.baseURL}/verify-email?token=${token$1}&callbackURL=${ctx.body.callbackURL || "/"}`;
      await ctx.context.options.emailVerification.sendVerificationEmail({
        user: {
          ...ctx.context.session.user,
          email: newEmail
        },
        url: url$1,
        token: token$1
      }, ctx.request);
    }
    return ctx.json({ status: true });
  }
  if (ctx.context.session.user.emailVerified && (ctx.context.options.user.changeEmail.sendChangeEmailConfirmation || ctx.context.options.user.changeEmail.sendChangeEmailVerification)) {
    const token$1 = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-confirmation" });
    const url$1 = `${ctx.context.baseURL}/verify-email?token=${token$1}&callbackURL=${ctx.body.callbackURL || "/"}`;
    const sendFn = ctx.context.options.user.changeEmail.sendChangeEmailConfirmation || ctx.context.options.user.changeEmail.sendChangeEmailVerification;
    if (sendFn) await sendFn({
      user: ctx.context.session.user,
      newEmail,
      url: url$1,
      token: token$1
    }, ctx.request);
    return ctx.json({ status: true });
  }
  if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
  await ctx.context.options.emailVerification.sendVerificationEmail({
    user: {
      ...ctx.context.session.user,
      email: newEmail
    },
    url,
    token
  }, ctx.request);
  return ctx.json({ status: true });
});
const defuReplaceArrays = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});
function toAuthEndpoints(endpoints, ctx) {
  const api = {};
  for (const [key, endpoint] of Object.entries(endpoints)) {
    api[key] = async (context) => {
      const run = async () => {
        const authContext = await ctx;
        let internalContext = {
          ...context,
          context: {
            ...authContext,
            returned: void 0,
            responseHeaders: void 0,
            session: null
          },
          path: endpoint.path,
          headers: context?.headers ? new Headers(context?.headers) : void 0
        };
        return runWithEndpointContext(internalContext, async () => {
          const { beforeHooks, afterHooks } = getHooks(authContext);
          const before = await runBeforeHooks(internalContext, beforeHooks);
          if ("context" in before && before.context && typeof before.context === "object") {
            const { headers, ...rest } = before.context;
            if (headers) headers.forEach((value, key$1) => {
              internalContext.headers.set(key$1, value);
            });
            internalContext = defuReplaceArrays(rest, internalContext);
          } else if (before) return context?.asResponse ? toResponse(before, { headers: context?.headers }) : context?.returnHeaders ? {
            headers: context?.headers,
            response: before
          } : before;
          internalContext.asResponse = false;
          internalContext.returnHeaders = true;
          internalContext.returnStatus = true;
          const result = await runWithEndpointContext(internalContext, () => endpoint(internalContext)).catch((e) => {
            if (e instanceof APIError)
              return {
                response: e,
                status: e.statusCode,
                headers: e.headers ? new Headers(e.headers) : null
              };
            throw e;
          });
          if (result && result instanceof Response) return result;
          internalContext.context.returned = result.response;
          internalContext.context.responseHeaders = result.headers;
          const after = await runAfterHooks(internalContext, afterHooks);
          if (after.response) result.response = after.response;
          if (result.response instanceof APIError && shouldPublishLog(authContext.logger.level, "debug")) result.response.stack = result.response.errorStack;
          if (result.response instanceof APIError && !context?.asResponse) throw result.response;
          return context?.asResponse ? toResponse(result.response, {
            headers: result.headers,
            status: result.status
          }) : context?.returnHeaders ? context?.returnStatus ? {
            headers: result.headers,
            response: result.response,
            status: result.status
          } : {
            headers: result.headers,
            response: result.response
          } : context?.returnStatus ? {
            response: result.response,
            status: result.status
          } : result.response;
        });
      };
      if (await hasRequestState()) return run();
      else return runWithRequestState(/* @__PURE__ */ new WeakMap(), run);
    };
    api[key].path = endpoint.path;
    api[key].options = endpoint.options;
  }
  return api;
}
async function runBeforeHooks(context, hooks) {
  let modifiedContext = {};
  for (const hook of hooks) if (hook.matcher(context)) {
    const result = await hook.handler({
      ...context,
      returnHeaders: false
    }).catch((e) => {
      if (e instanceof APIError && shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
      throw e;
    });
    if (result && typeof result === "object") {
      if ("context" in result && typeof result.context === "object") {
        const { headers, ...rest } = result.context;
        if (headers instanceof Headers) if (modifiedContext.headers) headers.forEach((value, key) => {
          modifiedContext.headers?.set(key, value);
        });
        else modifiedContext.headers = headers;
        modifiedContext = defuReplaceArrays(rest, modifiedContext);
        continue;
      }
      return result;
    }
  }
  return { context: modifiedContext };
}
async function runAfterHooks(context, hooks) {
  for (const hook of hooks) if (hook.matcher(context)) {
    const result = await hook.handler(context).catch((e) => {
      if (e instanceof APIError) {
        if (shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
        return {
          response: e,
          headers: e.headers ? new Headers(e.headers) : null
        };
      }
      throw e;
    });
    if (result.headers) result.headers.forEach((value, key) => {
      if (!context.context.responseHeaders) context.context.responseHeaders = new Headers({ [key]: value });
      else if (key.toLowerCase() === "set-cookie") context.context.responseHeaders.append(key, value);
      else context.context.responseHeaders.set(key, value);
    });
    if (result.response) context.context.returned = result.response;
  }
  return {
    response: context.context.returned,
    headers: context.context.responseHeaders
  };
}
function getHooks(authContext) {
  const plugins = authContext.options.plugins || [];
  const beforeHooks = [];
  const afterHooks = [];
  if (authContext.options.hooks?.before) beforeHooks.push({
    matcher: () => true,
    handler: authContext.options.hooks.before
  });
  if (authContext.options.hooks?.after) afterHooks.push({
    matcher: () => true,
    handler: authContext.options.hooks.after
  });
  const pluginBeforeHooks = plugins.map((plugin) => {
    if (plugin.hooks?.before) return plugin.hooks.before;
  }).filter((plugin) => plugin !== void 0).flat();
  const pluginAfterHooks = plugins.map((plugin) => {
    if (plugin.hooks?.after) return plugin.hooks.after;
  }).filter((plugin) => plugin !== void 0).flat();
  if (pluginBeforeHooks.length) beforeHooks.push(...pluginBeforeHooks);
  if (pluginAfterHooks.length) afterHooks.push(...pluginAfterHooks);
  return {
    beforeHooks,
    afterHooks
  };
}
function checkEndpointConflicts(options, logger$1) {
  const endpointRegistry = /* @__PURE__ */ new Map();
  options.plugins?.forEach((plugin) => {
    if (plugin.endpoints) {
      for (const [key, endpoint] of Object.entries(plugin.endpoints)) if (endpoint && "path" in endpoint && typeof endpoint.path === "string") {
        const path = endpoint.path;
        let methods = [];
        if (endpoint.options && "method" in endpoint.options) {
          if (Array.isArray(endpoint.options.method)) methods = endpoint.options.method;
          else if (typeof endpoint.options.method === "string") methods = [endpoint.options.method];
        }
        if (methods.length === 0) methods = ["*"];
        if (!endpointRegistry.has(path)) endpointRegistry.set(path, []);
        endpointRegistry.get(path).push({
          pluginId: plugin.id,
          endpointKey: key,
          methods
        });
      }
    }
  });
  const conflicts = [];
  for (const [path, entries] of endpointRegistry.entries()) if (entries.length > 1) {
    const methodMap = /* @__PURE__ */ new Map();
    let hasConflict = false;
    for (const entry of entries) for (const method of entry.methods) {
      if (!methodMap.has(method)) methodMap.set(method, []);
      methodMap.get(method).push(entry.pluginId);
      if (methodMap.get(method).length > 1) hasConflict = true;
      if (method === "*" && entries.length > 1) hasConflict = true;
      else if (method !== "*" && methodMap.has("*")) hasConflict = true;
    }
    if (hasConflict) {
      const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
      const conflictingMethods = [];
      for (const [method, plugins] of methodMap.entries()) if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) conflictingMethods.push(method);
      conflicts.push({
        path,
        plugins: uniquePlugins,
        conflictingMethods
      });
    }
  }
  if (conflicts.length > 0) {
    const conflictMessages = conflicts.map((conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
    logger$1.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
  }
}
function getEndpoints(ctx, options) {
  const pluginEndpoints = options.plugins?.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin.endpoints
    };
  }, {}) ?? {};
  const middlewares = options.plugins?.map((plugin) => plugin.middlewares?.map((m) => {
    const middleware = (async (context) => {
      const authContext = await ctx;
      return m.middleware({
        ...context,
        context: {
          ...authContext,
          ...context.context
        }
      });
    });
    middleware.options = m.middleware.options;
    return {
      path: m.path,
      middleware
    };
  })).filter((plugin) => plugin !== void 0).flat() || [];
  return {
    api: toAuthEndpoints({
      signInSocial: signInSocial(),
      callbackOAuth,
      getSession: getSession(),
      signOut,
      signUpEmail: signUpEmail(),
      signInEmail: signInEmail(),
      resetPassword,
      verifyEmail,
      sendVerificationEmail,
      changeEmail,
      changePassword,
      setPassword,
      updateUser: updateUser(),
      deleteUser,
      requestPasswordReset,
      requestPasswordResetCallback,
      listSessions: listSessions(),
      revokeSession,
      revokeSessions,
      revokeOtherSessions,
      linkSocialAccount,
      listUserAccounts,
      deleteUserCallback,
      unlinkAccount,
      refreshToken,
      getAccessToken,
      accountInfo,
      ...pluginEndpoints,
      ok,
      error
    }, ctx),
    middlewares
  };
}
const router$1 = (ctx, options) => {
  const { api, middlewares } = getEndpoints(ctx, options);
  const basePath = new URL(ctx.baseURL).pathname;
  return createRouter$1(api, {
    routerContext: ctx,
    openapi: { disabled: true },
    basePath,
    routerMiddleware: [{
      path: "/**",
      middleware: originCheckMiddleware
    }, ...middlewares],
    allowedMediaTypes: ["application/json"],
    async onRequest(req) {
      const disabledPaths = ctx.options.disabledPaths || [];
      const pathname = new URL(req.url).pathname;
      const normalizedPath = basePath === "/" ? pathname : pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
      if (disabledPaths.includes(normalizedPath)) return new Response("Not Found", { status: 404 });
      for (const plugin of ctx.options.plugins || []) if (plugin.onRequest) {
        const response = await plugin.onRequest(req, ctx);
        if (response && "response" in response) return response.response;
        if (response && "request" in response) {
          const rateLimitResponse2 = await onRequestRateLimit(response.request, ctx);
          if (rateLimitResponse2) return rateLimitResponse2;
          return response.request;
        }
      }
      return onRequestRateLimit(req, ctx);
    },
    async onResponse(res) {
      for (const plugin of ctx.options.plugins || []) if (plugin.onResponse) {
        const response = await plugin.onResponse(res, ctx);
        if (response) return response.response;
      }
      return res;
    },
    onError(e) {
      if (e instanceof APIError && e.status === "FOUND") return;
      if (options.onAPIError?.throw) throw e;
      if (options.onAPIError?.onError) {
        options.onAPIError.onError(e, ctx);
        return;
      }
      const optLogLevel = options.logger?.level;
      const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
      if (options.logger?.disabled !== true) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
          if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
            ctx.logger?.error(e.message);
            return;
          }
        }
        if (e instanceof APIError) {
          if (e.status === "INTERNAL_SERVER_ERROR") ctx.logger.error(e.status, e);
          log?.error(e.message);
        } else ctx.logger?.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
      }
    }
  });
};
function checkHasPath(url) {
  try {
    return (new URL(url).pathname.replace(/\/+$/, "") || "/") !== "/";
  } catch {
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
  }
}
function assertHasProtocol(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
  } catch (error2) {
    if (error2 instanceof BetterAuthError) throw error2;
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, String(error2));
  }
}
function withPath(url, path = "/api/auth") {
  assertHasProtocol(url);
  if (checkHasPath(url)) return url;
  const trimmedUrl = url.replace(/\/+$/, "");
  if (!path || path === "/") return trimmedUrl;
  path = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedUrl}${path}`;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
  if (url) return withPath(url, path);
  {
    const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
    if (fromEnv) return withPath(fromEnv, path);
  }
  const fromRequest = request?.headers.get("x-forwarded-host");
  const fromRequestProto = request?.headers.get("x-forwarded-proto");
  if (fromRequest && fromRequestProto && trustedProxyHeaders) return withPath(`${fromRequestProto}://${fromRequest}`, path);
  if (request) {
    const url$1 = getOrigin(request.url);
    if (!url$1) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
    return withPath(url$1, path);
  }
  if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path);
}
function getOrigin(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin === "null" ? null : parsedUrl.origin;
  } catch {
    return null;
  }
}
function getProtocol(url) {
  try {
    return new URL(url).protocol;
  } catch {
    return null;
  }
}
function getHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
const matchesOriginPattern = (url, pattern, settings) => {
  if (url.startsWith("/")) {
    if (settings?.allowRelativePaths) return url.startsWith("/") && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url);
    return false;
  }
  if (pattern.includes("*")) {
    if (pattern.includes("://")) return wildcardMatch(pattern)(getOrigin(url) || url);
    const host = getHost(url);
    if (!host) return false;
    return wildcardMatch(pattern)(host);
  }
  const protocol = getProtocol(url);
  return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
};
const DEFAULT_SECRET = "better-auth-secret-12345678901234567890";
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
async function validatePassword(ctx, data) {
  const credentialAccount = (await ctx.context.internalAdapter.findAccounts(data.userId))?.find((account2) => account2.providerId === "credential");
  const currentPassword = credentialAccount?.password;
  if (!credentialAccount || !currentPassword) return false;
  return await ctx.context.password.verify({
    hash: currentPassword,
    password: data.password
  });
}
async function checkPassword(userId, c) {
  const credentialAccount = (await c.context.internalAdapter.findAccounts(userId))?.find((account2) => account2.providerId === "credential");
  const currentPassword = credentialAccount?.password;
  if (!credentialAccount || !currentPassword || !c.body.password) throw new APIError("BAD_REQUEST", { message: "No password credential found" });
  if (!await c.context.password.verify({
    hash: currentPassword,
    password: c.body.password
  })) throw new APIError("BAD_REQUEST", { message: "Invalid password" });
  return true;
}
async function runPluginInit(ctx) {
  let options = ctx.options;
  const plugins = options.plugins || [];
  let context = ctx;
  const dbHooks = [];
  for (const plugin of plugins) if (plugin.init) {
    let initPromise = plugin.init(context);
    let result;
    if (isPromise(initPromise)) result = await initPromise;
    else result = initPromise;
    if (typeof result === "object") {
      if (result.options) {
        const { databaseHooks, ...restOpts } = result.options;
        if (databaseHooks) dbHooks.push(databaseHooks);
        options = defu(options, restOpts);
      }
      if (result.context) context = {
        ...context,
        ...result.context
      };
    }
  }
  dbHooks.push(options.databaseHooks);
  context.internalAdapter = createInternalAdapter(context.adapter, {
    options,
    logger: context.logger,
    hooks: dbHooks.filter((u) => u !== void 0),
    generateId: context.generateId
  });
  context.options = options;
  return { context };
}
function getInternalPlugins(options) {
  const plugins = [];
  if (options.advanced?.crossSubDomainCookies?.enabled) ;
  return plugins;
}
function getTrustedOrigins(options) {
  const baseURL = getBaseURL(options.baseURL, options.basePath);
  if (!baseURL) return [];
  const trustedOrigins = [new URL(baseURL).origin];
  if (options.trustedOrigins && Array.isArray(options.trustedOrigins)) trustedOrigins.push(...options.trustedOrigins);
  const envTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS;
  if (envTrustedOrigins) trustedOrigins.push(...envTrustedOrigins.split(","));
  if (trustedOrigins.filter((x) => !x).length) throw new BetterAuthError("A provided trusted origin is invalid, make sure your trusted origins list is properly defined.");
  return trustedOrigins;
}
function estimateEntropy(str) {
  const unique = new Set(str).size;
  if (unique === 0) return 0;
  return Math.log2(Math.pow(unique, str.length));
}
function validateSecret(secret, logger$1) {
  const isDefaultSecret = secret === DEFAULT_SECRET;
  if (isTest()) return;
  if (isDefaultSecret && isProduction) throw new BetterAuthError("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
  if (secret.length < 32) throw new BetterAuthError(`Invalid BETTER_AUTH_SECRET: must be at least 32 characters long for adequate security. Generate one with \`npx @better-auth/cli secret\` or \`openssl rand -base64 32\`.`);
  if (estimateEntropy(secret) < 120) logger$1.warn("[better-auth] Warning: your BETTER_AUTH_SECRET appears low-entropy. Use a randomly generated secret for production.");
}
async function createAuthContext(adapter, options, getDatabaseType) {
  if (!options.database) options = defu(options, {
    session: { cookieCache: {
      enabled: true,
      strategy: "jwe",
      refreshCache: true
    } },
    account: {
      storeStateStrategy: "cookie",
      storeAccountCookie: true
    }
  });
  const plugins = options.plugins || [];
  const internalPlugins = getInternalPlugins(options);
  const logger$1 = createLogger(options.logger);
  const baseURL = getBaseURL(options.baseURL, options.basePath);
  const secret = options.secret || env.BETTER_AUTH_SECRET || env.AUTH_SECRET || DEFAULT_SECRET;
  validateSecret(secret, logger$1);
  options = {
    ...options,
    secret,
    baseURL: baseURL ? new URL(baseURL).origin : "",
    basePath: options.basePath || "/api/auth",
    plugins: plugins.concat(internalPlugins)
  };
  checkEndpointConflicts(options, logger$1);
  const cookies = getCookies(options);
  const tables = getAuthTables(options);
  const providers = Object.entries(options.socialProviders || {}).map(([key, config2]) => {
    if (config2 == null) return null;
    if (config2.enabled === false) return null;
    if (!config2.clientId) logger$1.warn(`Social provider ${key} is missing clientId or clientSecret`);
    const provider = socialProviders[key](config2);
    provider.disableImplicitSignUp = config2.disableImplicitSignUp;
    return provider;
  }).filter((x) => x !== null);
  const generateIdFunc = ({ model, size }) => {
    if (typeof options.advanced?.generateId === "function") return options.advanced.generateId({
      model,
      size
    });
    if (typeof options?.advanced?.database?.generateId === "function") return options.advanced.database.generateId({
      model,
      size
    });
    return generateId(size);
  };
  const { publish } = await createTelemetry(options, {
    adapter: adapter.id,
    database: typeof options.database === "function" ? "adapter" : getDatabaseType(options.database)
  });
  let ctx = {
    appName: options.appName || "Better Auth",
    socialProviders: providers,
    options,
    oauthConfig: {
      storeStateStrategy: options.account?.storeStateStrategy || (options.database ? "database" : "cookie"),
      skipStateCookieCheck: !!options.account?.skipStateCookieCheck
    },
    tables,
    trustedOrigins: getTrustedOrigins(options),
    isTrustedOrigin(url, settings) {
      return ctx.trustedOrigins.some((origin) => matchesOriginPattern(url, origin, settings));
    },
    baseURL: baseURL || "",
    sessionConfig: {
      updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 1440 * 60,
      expiresIn: options.session?.expiresIn || 3600 * 24 * 7,
      freshAge: options.session?.freshAge === void 0 ? 3600 * 24 : options.session.freshAge,
      cookieRefreshCache: (() => {
        const refreshCache = options.session?.cookieCache?.refreshCache;
        const maxAge = options.session?.cookieCache?.maxAge || 300;
        if ((!!options.database || !!options.secondaryStorage) && refreshCache) {
          logger$1.warn("[better-auth] `session.cookieCache.refreshCache` is enabled while `database` or `secondaryStorage` is configured. `refreshCache` is meant for stateless (DB-less) setups. Disabling `refreshCache` — remove it from your config to silence this warning.");
          return false;
        }
        if (refreshCache === false || refreshCache === void 0) return false;
        if (refreshCache === true) return {
          enabled: true,
          updateAge: Math.floor(maxAge * 0.2)
        };
        return {
          enabled: true,
          updateAge: refreshCache.updateAge !== void 0 ? refreshCache.updateAge : Math.floor(maxAge * 0.2)
        };
      })()
    },
    secret,
    rateLimit: {
      ...options.rateLimit,
      enabled: options.rateLimit?.enabled ?? isProduction,
      window: options.rateLimit?.window || 10,
      max: options.rateLimit?.max || 100,
      storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
    },
    authCookies: cookies,
    logger: logger$1,
    generateId: generateIdFunc,
    session: null,
    secondaryStorage: options.secondaryStorage,
    password: {
      hash: options.emailAndPassword?.password?.hash || hashPassword,
      verify: options.emailAndPassword?.password?.verify || verifyPassword,
      config: {
        minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
        maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
      },
      checkPassword
    },
    setNewSession(session2) {
      this.newSession = session2;
    },
    newSession: null,
    adapter,
    internalAdapter: createInternalAdapter(adapter, {
      options,
      logger: logger$1,
      hooks: options.databaseHooks ? [options.databaseHooks] : []
    }),
    createAuthCookie: createCookieGetter(options),
    async runMigrations() {
      throw new BetterAuthError("runMigrations will be set by the specific init implementation");
    },
    publishTelemetry: publish,
    skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
    skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : isTest() ? true : false
  };
  const initOrPromise = runPluginInit(ctx);
  let context;
  if (isPromise(initOrPromise)) ({ context } = await initOrPromise);
  else ({ context } = initOrPromise);
  return context;
}
const init = async (options) => {
  const adapter = await getAdapter(options);
  const getDatabaseType = (database) => getKyselyDatabaseType(database) || "unknown";
  const ctx = await createAuthContext(adapter, options, getDatabaseType);
  ctx.runMigrations = async function() {
    if (!options.database || "updateMany" in options.database) throw new BetterAuthError("Database is not provided or it's an adapter. Migrations are only supported with a database instance.");
    const { runMigrations } = await getMigrations(options);
    await runMigrations();
  };
  return ctx;
};
const createBetterAuth = (options, initFn) => {
  const authContext = initFn(options);
  const { api } = getEndpoints(authContext, options);
  return {
    handler: async (request) => {
      const ctx = await authContext;
      const basePath = ctx.options.basePath || "/api/auth";
      if (!ctx.options.baseURL) {
        const baseURL = getBaseURL(void 0, basePath, request, void 0, ctx.options.advanced?.trustedProxyHeaders);
        if (baseURL) {
          ctx.baseURL = baseURL;
          ctx.options.baseURL = getOrigin(ctx.baseURL) || void 0;
        } else throw new BetterAuthError("Could not get base URL from request. Please provide a valid base URL.");
      }
      ctx.trustedOrigins = [...options.trustedOrigins ? Array.isArray(options.trustedOrigins) ? options.trustedOrigins : await options.trustedOrigins(request) : [], ctx.options.baseURL];
      const { handler } = router$1(ctx, options);
      return runWithAdapter(ctx.adapter, () => handler(request));
    },
    api,
    options,
    $context: authContext,
    $ERROR_CODES: {
      ...options.plugins?.reduce((acc, plugin) => {
        if (plugin.$ERROR_CODES) return {
          ...acc,
          ...plugin.$ERROR_CODES
        };
        return acc;
      }, {}),
      ...BASE_ERROR_CODES
    }
  };
};
const betterAuth = (options) => {
  return createBetterAuth(options, init);
};
const drizzleAdapter = (db2, config2) => {
  let lazyOptions = null;
  const createCustomAdapter = (db$1) => ({ getFieldName, options }) => {
    function getSchema2(model) {
      const schema2 = config2.schema || db$1._.fullSchema;
      if (!schema2) throw new BetterAuthError("Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.");
      const schemaModel = schema2[model];
      if (!schemaModel) throw new BetterAuthError(`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`);
      return schemaModel;
    }
    const withReturning = async (model, builder, data, where) => {
      if (config2.provider !== "mysql") return (await builder.returning())[0];
      await builder.execute();
      const schemaModel = getSchema2(model);
      const builderVal = builder.config?.values;
      if (where?.length) {
        const clause = convertWhereClause(where.map((w) => {
          if (data[w.field] !== void 0) return {
            ...w,
            value: data[w.field]
          };
          return w;
        }), model);
        return (await db$1.select().from(schemaModel).where(...clause))[0];
      } else if (builderVal && builderVal[0]?.id?.value) {
        let tId = builderVal[0]?.id?.value;
        if (!tId) tId = (await db$1.select({ id: sql`LAST_INSERT_ID()` }).from(schemaModel).orderBy(desc(schemaModel.id)).limit(1))[0].id;
        return (await db$1.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute())[0];
      } else if (data.id) return (await db$1.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute())[0];
      else {
        if (!("id" in schemaModel)) throw new BetterAuthError(`The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`);
        return (await db$1.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute())[0];
      }
    };
    function convertWhereClause(where, model) {
      const schemaModel = getSchema2(model);
      if (!where) return [];
      if (where.length === 1) {
        const w = where[0];
        if (!w) return [];
        const field = getFieldName({
          model,
          field: w.field
        });
        if (!schemaModel[field]) throw new BetterAuthError(`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return [inArray(schemaModel[field], w.value)];
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return [notInArray(schemaModel[field], w.value)];
        }
        if (w.operator === "contains") return [like(schemaModel[field], `%${w.value}%`)];
        if (w.operator === "starts_with") return [like(schemaModel[field], `${w.value}%`)];
        if (w.operator === "ends_with") return [like(schemaModel[field], `%${w.value}`)];
        if (w.operator === "lt") return [lt(schemaModel[field], w.value)];
        if (w.operator === "lte") return [lte(schemaModel[field], w.value)];
        if (w.operator === "ne") return [ne(schemaModel[field], w.value)];
        if (w.operator === "gt") return [gt(schemaModel[field], w.value)];
        if (w.operator === "gte") return [gte(schemaModel[field], w.value)];
        return [eq(schemaModel[field], w.value)];
      }
      const andGroup = where.filter((w) => w.connector === "AND" || !w.connector);
      const orGroup = where.filter((w) => w.connector === "OR");
      const andClause = and(...andGroup.map((w) => {
        const field = getFieldName({
          model,
          field: w.field
        });
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return inArray(schemaModel[field], w.value);
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return notInArray(schemaModel[field], w.value);
        }
        if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
        if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
        if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
        if (w.operator === "lt") return lt(schemaModel[field], w.value);
        if (w.operator === "lte") return lte(schemaModel[field], w.value);
        if (w.operator === "gt") return gt(schemaModel[field], w.value);
        if (w.operator === "gte") return gte(schemaModel[field], w.value);
        if (w.operator === "ne") return ne(schemaModel[field], w.value);
        return eq(schemaModel[field], w.value);
      }));
      const orClause = or(...orGroup.map((w) => {
        const field = getFieldName({
          model,
          field: w.field
        });
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return inArray(schemaModel[field], w.value);
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return notInArray(schemaModel[field], w.value);
        }
        if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
        if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
        if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
        if (w.operator === "lt") return lt(schemaModel[field], w.value);
        if (w.operator === "lte") return lte(schemaModel[field], w.value);
        if (w.operator === "gt") return gt(schemaModel[field], w.value);
        if (w.operator === "gte") return gte(schemaModel[field], w.value);
        if (w.operator === "ne") return ne(schemaModel[field], w.value);
        return eq(schemaModel[field], w.value);
      }));
      const clause = [];
      if (andGroup.length) clause.push(andClause);
      if (orGroup.length) clause.push(orClause);
      return clause;
    }
    function checkMissingFields(schema2, model, values) {
      if (!schema2) throw new BetterAuthError("Drizzle adapter failed to initialize. Drizzle Schema not found. Please provide a schema object in the adapter options object.");
      for (const key in values) if (!schema2[key]) throw new BetterAuthError(`The field "${key}" does not exist in the "${model}" Drizzle schema. Please update your drizzle schema or re-generate using "npx @better-auth/cli@latest generate".`);
    }
    return {
      async create({ model, data: values }) {
        const schemaModel = getSchema2(model);
        checkMissingFields(schemaModel, model, values);
        return await withReturning(model, db$1.insert(schemaModel).values(values), values);
      },
      async findOne({ model, where, join }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        if (options.experimental?.joins) if (!db$1.query || !db$1.query[model]) {
          logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx @better-auth/cli@latest generate".`);
          logger.info("Falling back to regular query");
        } else {
          let includes2;
          const pluralJoinResults = [];
          if (join) {
            includes2 = {};
            const joinEntries = Object.entries(join);
            for (const [model$1, joinAttr] of joinEntries) {
              const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
              const isUnique = joinAttr.relation === "one-to-one";
              const pluralSuffix = isUnique || config2.usePlural ? "" : "s";
              includes2[`${model$1}${pluralSuffix}`] = isUnique ? true : { limit };
              if (!isUnique) pluralJoinResults.push(`${model$1}${pluralSuffix}`);
            }
          }
          const res$1 = await db$1.query[model].findFirst({
            where: clause[0],
            with: includes2
          });
          if (res$1) for (const pluralJoinResult of pluralJoinResults) {
            let singularKey = !config2.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
            res$1[singularKey] = res$1[pluralJoinResult];
            if (pluralJoinResult !== singularKey) delete res$1[pluralJoinResult];
          }
          return res$1;
        }
        const res = await db$1.select().from(schemaModel).where(...clause);
        if (!res.length) return null;
        return res[0];
      },
      async findMany({ model, where, sortBy, limit, offset, join }) {
        const schemaModel = getSchema2(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const sortFn = sortBy?.direction === "desc" ? desc : asc;
        if (options.experimental?.joins) if (!db$1.query[model]) {
          logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx @better-auth/cli@latest generate".`);
          logger.info("Falling back to regular query");
        } else {
          let includes2;
          const pluralJoinResults = [];
          if (join) {
            includes2 = {};
            const joinEntries = Object.entries(join);
            for (const [model$1, joinAttr] of joinEntries) {
              const isUnique = joinAttr.relation === "one-to-one";
              const limit$1 = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
              let pluralSuffix = isUnique || config2.usePlural ? "" : "s";
              includes2[`${model$1}${pluralSuffix}`] = isUnique ? true : { limit: limit$1 };
              if (!isUnique) pluralJoinResults.push(`${model$1}${pluralSuffix}`);
            }
          }
          let orderBy = void 0;
          if (sortBy?.field) orderBy = [sortFn(schemaModel[getFieldName({
            model,
            field: sortBy?.field
          })])];
          let res = await db$1.query[model].findMany({
            where: clause[0],
            with: includes2,
            limit: limit ?? 100,
            offset: offset ?? 0,
            orderBy
          });
          if (res) for (const item of res) for (const pluralJoinResult of pluralJoinResults) {
            const singularKey = !config2.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
            if (singularKey === pluralJoinResult) continue;
            item[singularKey] = item[pluralJoinResult];
            delete item[pluralJoinResult];
          }
          return res;
        }
        let builder = db$1.select().from(schemaModel);
        const effectiveLimit = limit;
        const effectiveOffset = offset;
        if (typeof effectiveLimit !== "undefined") builder = builder.limit(effectiveLimit);
        if (typeof effectiveOffset !== "undefined") builder = builder.offset(effectiveOffset);
        if (sortBy?.field) builder = builder.orderBy(sortFn(schemaModel[getFieldName({
          model,
          field: sortBy?.field
        })]));
        return await builder.where(...clause);
      },
      async count({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = where ? convertWhereClause(where, model) : [];
        return (await db$1.select({ count: count() }).from(schemaModel).where(...clause))[0].count;
      },
      async update({ model, where, update: values }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        return await withReturning(model, db$1.update(schemaModel).set(values).where(...clause), values, where);
      },
      async updateMany({ model, where, update: values }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        return await db$1.update(schemaModel).set(values).where(...clause);
      },
      async delete({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        return await db$1.delete(schemaModel).where(...clause);
      },
      async deleteMany({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const res = await db$1.delete(schemaModel).where(...clause);
        let count$1 = 0;
        if (res && "rowCount" in res) count$1 = res.rowCount;
        else if (Array.isArray(res)) count$1 = res.length;
        else if (res && ("affectedRows" in res || "rowsAffected" in res || "changes" in res)) count$1 = res.affectedRows ?? res.rowsAffected ?? res.changes;
        if (typeof count$1 !== "number") logger.error("[Drizzle Adapter] The result of the deleteMany operation is not a number. This is likely a bug in the adapter. Please report this issue to the Better Auth team.", {
          res,
          model,
          where
        });
        return count$1;
      },
      options: config2
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "drizzle",
      adapterName: "Drizzle Adapter",
      usePlural: config2.usePlural ?? false,
      debugLogs: config2.debugLogs ?? false,
      supportsUUIDs: config2.provider === "pg" ? true : false,
      supportsJSON: config2.provider === "pg" ? true : false,
      supportsArrays: config2.provider === "pg" ? true : false,
      transaction: config2.transaction ?? false ? (cb) => db2.transaction((tx) => {
        return cb(createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions));
      }) : false
    },
    adapter: createCustomAdapter(db2)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};
function role(statements) {
  return {
    authorize(request, connector = "AND") {
      let success = false;
      for (const [requestedResource, requestedActions] of Object.entries(request)) {
        const allowedActions = statements[requestedResource];
        if (!allowedActions) return {
          success: false,
          error: `You are not allowed to access resource: ${requestedResource}`
        };
        if (Array.isArray(requestedActions)) success = requestedActions.every((requestedAction) => allowedActions.includes(requestedAction));
        else if (typeof requestedActions === "object") {
          const actions = requestedActions;
          if (actions.connector === "OR") success = actions.actions.some((requestedAction) => allowedActions.includes(requestedAction));
          else success = actions.actions.every((requestedAction) => allowedActions.includes(requestedAction));
        } else throw new BetterAuthError("Invalid access control request");
        if (success && connector === "OR") return { success };
        if (!success && connector === "AND") return {
          success: false,
          error: `unauthorized to access resource "${requestedResource}"`
        };
      }
      if (success) return { success };
      return {
        success: false,
        error: "Not authorized"
      };
    },
    statements
  };
}
function createAccessControl(s) {
  return {
    newRole(statements) {
      return role(statements);
    },
    statements: s
  };
}
const defaultStatements$1 = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update"
  ],
  session: [
    "list",
    "revoke",
    "delete"
  ]
};
const defaultAc$1 = createAccessControl(defaultStatements$1);
const adminAc$1 = defaultAc$1.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update"
  ],
  session: [
    "list",
    "revoke",
    "delete"
  ]
});
const userAc = defaultAc$1.newRole({
  user: [],
  session: []
});
const defaultRoles$2 = {
  admin: adminAc$1,
  user: userAc
};
const hasPermission$1 = (input) => {
  if (input.userId && input.options?.adminUserIds?.includes(input.userId)) return true;
  if (!input.permissions && !input.permission) return false;
  const roles = (input.role || input.options?.defaultRole || "user").split(",");
  const acRoles = input.options?.roles || defaultRoles$2;
  for (const role2 of roles) if (acRoles[role2]?.authorize(input.permission ?? input.permissions)?.success) return true;
  return false;
};
const adminClient = (options) => {
  const roles = {
    admin: adminAc$1,
    user: userAc,
    ...options?.roles
  };
  return {
    id: "admin-client",
    $InferServerPlugin: {},
    getActions: () => ({ admin: { checkRolePermission: (data) => {
      return hasPermission$1({
        role: data.role,
        options: {
          ac: options?.ac,
          roles
        },
        permissions: data.permissions ?? data.permission
      });
    } } }),
    pathMethods: {
      "/admin/list-users": "GET",
      "/admin/stop-impersonating": "POST"
    }
  };
};
const PROTO_POLLUTION_PATTERNS = {
  proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  protoShort: /"__proto__"\s*:/,
  constructorShort: /"constructor"\s*:/
};
const JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const SPECIAL_VALUES = {
  true: true,
  false: false,
  null: null,
  undefined: void 0,
  nan: NaN,
  infinity: Number.POSITIVE_INFINITY,
  "-infinity": Number.NEGATIVE_INFINITY
};
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
  const match = ISO_DATE_REGEX.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, ms2, offsetSign, offsetHour, offsetMinute] = match;
  let date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms2 ? parseInt(ms2.padEnd(3, "0"), 10) : 0));
  if (offsetSign) {
    const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
    date.setUTCMinutes(date.getUTCMinutes() + offset);
  }
  return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
  const { strict = false, warnings = false, reviver, parseDates = true } = options;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed.length > 0 && trimmed[0] === '"' && trimmed.endsWith('"') && !trimmed.slice(1, -1).includes('"')) return trimmed.slice(1, -1);
  const lowerValue = trimmed.toLowerCase();
  if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
  if (!JSON_SIGNATURE.test(trimmed)) {
    if (strict) throw new SyntaxError("[better-json] Invalid JSON");
    return value;
  }
  if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
    const matches = pattern.test(trimmed);
    if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
    return matches;
  }) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
  try {
    const secureReviver = (key, value$1) => {
      if (key === "__proto__" || key === "constructor" && value$1 && typeof value$1 === "object" && "prototype" in value$1) {
        if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
        return;
      }
      if (parseDates && typeof value$1 === "string") {
        const date = parseISODate(value$1);
        if (date) return date;
      }
      return reviver ? reviver(key, value$1) : value$1;
    };
    return JSON.parse(trimmed, secureReviver);
  } catch (error2) {
    if (strict) throw error2;
    return value;
  }
}
function parseJSON(value, options = { strict: true }) {
  return betterJSONParse(value, options);
}
const defaultStatements = {
  organization: ["update", "delete"],
  member: [
    "create",
    "update",
    "delete"
  ],
  invitation: ["create", "cancel"],
  team: [
    "create",
    "update",
    "delete"
  ],
  ac: [
    "create",
    "read",
    "update",
    "delete"
  ]
};
const defaultAc = createAccessControl(defaultStatements);
const adminAc = defaultAc.newRole({
  organization: ["update"],
  invitation: ["create", "cancel"],
  member: [
    "create",
    "update",
    "delete"
  ],
  team: [
    "create",
    "update",
    "delete"
  ],
  ac: [
    "create",
    "read",
    "update",
    "delete"
  ]
});
const ownerAc = defaultAc.newRole({
  organization: ["update", "delete"],
  member: [
    "create",
    "update",
    "delete"
  ],
  invitation: ["create", "cancel"],
  team: [
    "create",
    "update",
    "delete"
  ],
  ac: [
    "create",
    "read",
    "update",
    "delete"
  ]
});
const memberAc = defaultAc.newRole({
  organization: [],
  member: [],
  invitation: [],
  team: [],
  ac: ["read"]
});
const defaultRoles$1 = {
  admin: adminAc,
  owner: ownerAc,
  member: memberAc
};
const hasPermissionFn = (input, acRoles) => {
  if (!input.permissions && !input.permission) return false;
  const roles = input.role.split(",");
  const creatorRole = input.options.creatorRole || "owner";
  const isCreator = roles.includes(creatorRole);
  const allowCreatorsAllPermissions = input.allowCreatorAllPermissions || false;
  if (isCreator && allowCreatorsAllPermissions) return true;
  for (const role2 of roles) if (acRoles[role2]?.authorize(input.permissions ?? input.permission)?.success) return true;
  return false;
};
let cacheAllRoles = /* @__PURE__ */ new Map();
const getEndpointResponse = async (ctx) => {
  const returned = ctx.context.returned;
  if (!returned) return null;
  if (returned instanceof Response) {
    if (returned.status !== 200) return null;
    return await returned.clone().json();
  }
  if (returned instanceof APIError) return null;
  return returned;
};
const ADMIN_ERROR_CODES = defineErrorCodes({
  FAILED_TO_CREATE_USER: "Failed to create user",
  USER_ALREADY_EXISTS: "User already exists.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.",
  YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself",
  YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users",
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users",
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions",
  YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users",
  YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users",
  YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users",
  YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password",
  BANNED_USER: "You have been banned from this application",
  YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user",
  NO_DATA_TO_UPDATE: "No data to update",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users",
  YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself",
  YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value",
  YOU_CANNOT_IMPERSONATE_ADMINS: "You cannot impersonate admins",
  INVALID_ROLE_TYPE: "Invalid role type"
});
const adminMiddleware$1 = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
function parseRoles$1(roles) {
  return Array.isArray(roles) ? roles.join(",") : roles;
}
const setRoleBodySchema = z.object({
  userId: z.coerce.string().meta({ description: "The user id" }),
  role: z.union([z.string().meta({ description: "The role to set. `admin` or `user` by default" }), z.array(z.string().meta({ description: "The roles to set. `admin` or `user` by default" }))]).meta({ description: "The role to set, this can be a string or an array of strings. Eg: `admin` or `[admin, user]`" })
});
const setRole = (opts) => createAuthEndpoint("/admin/set-role", {
  method: "POST",
  body: setRoleBodySchema,
  requireHeaders: true,
  use: [adminMiddleware$1],
  metadata: {
    openapi: {
      operationId: "setUserRole",
      summary: "Set the role of a user",
      description: "Set the role of a user",
      responses: { 200: {
        description: "User role updated",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: { $ref: "#/components/schemas/User" } }
        } } }
      } }
    },
    $Infer: { body: {} }
  }
}, async (ctx) => {
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["set-role"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE });
  const roles = opts.roles;
  if (roles) {
    const inputRoles = Array.isArray(ctx.body.role) ? ctx.body.role : [ctx.body.role];
    for (const role2 of inputRoles) if (!roles[role2]) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE });
  }
  const updatedUser = await ctx.context.internalAdapter.updateUser(ctx.body.userId, { role: parseRoles$1(ctx.body.role) });
  return ctx.json({ user: updatedUser });
});
const getUserQuerySchema = z.object({ id: z.string().meta({ description: "The id of the User" }) });
const getUser = (opts) => createAuthEndpoint("/admin/get-user", {
  method: "GET",
  query: getUserQuerySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "getUser",
    summary: "Get an existing user",
    description: "Get an existing user",
    responses: { 200: {
      description: "User",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { id } = ctx.query;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["get"] }
  })) throw ctx.error("FORBIDDEN", {
    message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_GET_USER,
    code: "YOU_ARE_NOT_ALLOWED_TO_GET_USER"
  });
  const user2 = await ctx.context.internalAdapter.findUserById(id);
  if (!user2) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.USER_NOT_FOUND });
  return parseUserOutput(ctx.context.options, user2);
});
const createUserBodySchema = z.object({
  email: z.string().meta({ description: "The email of the user" }),
  password: z.string().meta({ description: "The password of the user" }),
  name: z.string().meta({ description: "The name of the user" }),
  role: z.union([z.string().meta({ description: "The role of the user" }), z.array(z.string().meta({ description: "The roles of user" }))]).optional().meta({ description: `A string or array of strings representing the roles to apply to the new user. Eg: "user"` }),
  data: z.record(z.string(), z.any()).optional().meta({ description: "Extra fields for the user. Including custom additional fields." })
});
const createUser = (opts) => createAuthEndpoint("/admin/create-user", {
  method: "POST",
  body: createUserBodySchema,
  metadata: {
    openapi: {
      operationId: "createUser",
      summary: "Create a new user",
      description: "Create a new user",
      responses: { 200: {
        description: "User created",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: { $ref: "#/components/schemas/User" } }
        } } }
      } }
    },
    $Infer: { body: {} }
  }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2 && (ctx.request || ctx.headers)) throw ctx.error("UNAUTHORIZED");
  if (session2) {
    if (!hasPermission$1({
      userId: session2.user.id,
      role: session2.user.role,
      options: opts,
      permissions: { user: ["create"] }
    })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS });
  }
  const email = ctx.body.email.toLowerCase();
  if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
  if (await ctx.context.internalAdapter.findUserByEmail(email)) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL });
  const user2 = await ctx.context.internalAdapter.createUser({
    email,
    name: ctx.body.name,
    role: (ctx.body.role && parseRoles$1(ctx.body.role)) ?? opts?.defaultRole ?? "user",
    ...ctx.body.data
  });
  if (!user2) throw new APIError("INTERNAL_SERVER_ERROR", { message: ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER });
  const hashedPassword = await ctx.context.password.hash(ctx.body.password);
  await ctx.context.internalAdapter.linkAccount({
    accountId: user2.id,
    providerId: "credential",
    password: hashedPassword,
    userId: user2.id
  });
  return ctx.json({ user: user2 });
});
const adminUpdateUserBodySchema = z.object({
  userId: z.coerce.string().meta({ description: "The user id" }),
  data: z.record(z.any(), z.any()).meta({ description: "The user data to update" })
});
const adminUpdateUser = (opts) => createAuthEndpoint("/admin/update-user", {
  method: "POST",
  body: adminUpdateUserBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "updateUser",
    summary: "Update a user",
    description: "Update a user's details",
    responses: { 200: {
      description: "User updated",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["update"] }
  })) throw ctx.error("FORBIDDEN", {
    message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS,
    code: "YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS"
  });
  if (Object.keys(ctx.body.data).length === 0) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.NO_DATA_TO_UPDATE });
  if (Object.prototype.hasOwnProperty.call(ctx.body.data, "role")) {
    if (!hasPermission$1({
      userId: ctx.context.session.user.id,
      role: ctx.context.session.user.role,
      options: opts,
      permissions: { user: ["set-role"] }
    })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE });
    const roleValue = ctx.body.data.role;
    const inputRoles = Array.isArray(roleValue) ? roleValue : [roleValue];
    for (const role2 of inputRoles) {
      if (typeof role2 !== "string") throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.INVALID_ROLE_TYPE });
      if (opts.roles && !opts.roles[role2]) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE });
    }
    ctx.body.data.role = parseRoles$1(inputRoles);
  }
  const updatedUser = await ctx.context.internalAdapter.updateUser(ctx.body.userId, ctx.body.data);
  return ctx.json(updatedUser);
});
const listUsersQuerySchema = z.object({
  searchValue: z.string().optional().meta({ description: 'The value to search for. Eg: "some name"' }),
  searchField: z.enum(["email", "name"]).meta({ description: 'The field to search in, defaults to email. Can be `email` or `name`. Eg: "name"' }).optional(),
  searchOperator: z.enum([
    "contains",
    "starts_with",
    "ends_with"
  ]).meta({ description: 'The operator to use for the search. Can be `contains`, `starts_with` or `ends_with`. Eg: "contains"' }).optional(),
  limit: z.string().meta({ description: "The number of users to return" }).or(z.number()).optional(),
  offset: z.string().meta({ description: "The offset to start from" }).or(z.number()).optional(),
  sortBy: z.string().meta({ description: "The field to sort by" }).optional(),
  sortDirection: z.enum(["asc", "desc"]).meta({ description: "The direction to sort by" }).optional(),
  filterField: z.string().meta({ description: "The field to filter by" }).optional(),
  filterValue: z.string().meta({ description: "The value to filter by" }).or(z.number()).or(z.boolean()).optional(),
  filterOperator: z.enum([
    "eq",
    "ne",
    "lt",
    "lte",
    "gt",
    "gte",
    "contains"
  ]).meta({ description: "The operator to use for the filter" }).optional()
});
const listUsers = (opts) => createAuthEndpoint("/admin/list-users", {
  method: "GET",
  use: [adminMiddleware$1],
  query: listUsersQuerySchema,
  metadata: { openapi: {
    operationId: "listUsers",
    summary: "List users",
    description: "List users",
    responses: { 200: {
      description: "List of users",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          },
          total: { type: "number" },
          limit: { type: "number" },
          offset: { type: "number" }
        },
        required: ["users", "total"]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["list"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS });
  const where = [];
  if (ctx.query?.searchValue) where.push({
    field: ctx.query.searchField || "email",
    operator: ctx.query.searchOperator || "contains",
    value: ctx.query.searchValue
  });
  if (ctx.query?.filterValue) where.push({
    field: ctx.query.filterField || "email",
    operator: ctx.query.filterOperator || "eq",
    value: ctx.query.filterValue
  });
  try {
    const users = await ctx.context.internalAdapter.listUsers(Number(ctx.query?.limit) || void 0, Number(ctx.query?.offset) || void 0, ctx.query?.sortBy ? {
      field: ctx.query.sortBy,
      direction: ctx.query.sortDirection || "asc"
    } : void 0, where.length ? where : void 0);
    const total = await ctx.context.internalAdapter.countTotalUsers(where.length ? where : void 0);
    return ctx.json({
      users,
      total,
      limit: Number(ctx.query?.limit) || void 0,
      offset: Number(ctx.query?.offset) || void 0
    });
  } catch {
    return ctx.json({
      users: [],
      total: 0
    });
  }
});
const listUserSessionsBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const listUserSessions = (opts) => createAuthEndpoint("/admin/list-user-sessions", {
  method: "POST",
  use: [adminMiddleware$1],
  body: listUserSessionsBodySchema,
  metadata: { openapi: {
    operationId: "listUserSessions",
    summary: "List user sessions",
    description: "List user sessions",
    responses: { 200: {
      description: "List of user sessions",
      content: { "application/json": { schema: {
        type: "object",
        properties: { sessions: {
          type: "array",
          items: { $ref: "#/components/schemas/Session" }
        } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { session: ["list"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS });
  return { sessions: await ctx.context.internalAdapter.listSessions(ctx.body.userId) };
});
const unbanUserBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const unbanUser = (opts) => createAuthEndpoint("/admin/unban-user", {
  method: "POST",
  body: unbanUserBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "unbanUser",
    summary: "Unban a user",
    description: "Unban a user",
    responses: { 200: {
      description: "User unbanned",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["ban"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS });
  const user2 = await ctx.context.internalAdapter.updateUser(ctx.body.userId, {
    banned: false,
    banExpires: null,
    banReason: null,
    updatedAt: /* @__PURE__ */ new Date()
  });
  return ctx.json({ user: user2 });
});
const banUserBodySchema = z.object({
  userId: z.coerce.string().meta({ description: "The user id" }),
  banReason: z.string().meta({ description: "The reason for the ban" }).optional(),
  banExpiresIn: z.number().meta({ description: "The number of seconds until the ban expires" }).optional()
});
const banUser = (opts) => createAuthEndpoint("/admin/ban-user", {
  method: "POST",
  body: banUserBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "banUser",
    summary: "Ban a user",
    description: "Ban a user",
    responses: { 200: {
      description: "User banned",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["ban"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS });
  if (!await ctx.context.internalAdapter.findUserById(ctx.body.userId)) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.USER_NOT_FOUND });
  if (ctx.body.userId === ctx.context.session.user.id) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_CANNOT_BAN_YOURSELF });
  const user2 = await ctx.context.internalAdapter.updateUser(ctx.body.userId, {
    banned: true,
    banReason: ctx.body.banReason || opts?.defaultBanReason || "No reason",
    banExpires: ctx.body.banExpiresIn ? getDate(ctx.body.banExpiresIn, "sec") : opts?.defaultBanExpiresIn ? getDate(opts.defaultBanExpiresIn, "sec") : void 0,
    updatedAt: /* @__PURE__ */ new Date()
  });
  await ctx.context.internalAdapter.deleteSessions(ctx.body.userId);
  return ctx.json({ user: user2 });
});
const impersonateUserBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const impersonateUser = (opts) => createAuthEndpoint("/admin/impersonate-user", {
  method: "POST",
  body: impersonateUserBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "impersonateUser",
    summary: "Impersonate a user",
    description: "Impersonate a user",
    responses: { 200: {
      description: "Impersonation session created",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          session: { $ref: "#/components/schemas/Session" },
          user: { $ref: "#/components/schemas/User" }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["impersonate"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS });
  const targetUser = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
  if (!targetUser) throw new APIError("NOT_FOUND", { message: "User not found" });
  const adminRoles = (Array.isArray(opts.adminRoles) ? opts.adminRoles : opts.adminRoles?.split(",") || []).map((role2) => role2.trim());
  const targetUserRole = (targetUser.role || opts.defaultRole || "user").split(",");
  if (opts.allowImpersonatingAdmins !== true && (targetUserRole.some((role2) => adminRoles.includes(role2)) || opts.adminUserIds?.includes(targetUser.id))) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_CANNOT_IMPERSONATE_ADMINS });
  const session2 = await ctx.context.internalAdapter.createSession(targetUser.id, true, {
    impersonatedBy: ctx.context.session.user.id,
    expiresAt: opts?.impersonationSessionDuration ? getDate(opts.impersonationSessionDuration, "sec") : getDate(3600, "sec")
  }, true);
  if (!session2) throw new APIError("INTERNAL_SERVER_ERROR", { message: ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER });
  const authCookies = ctx.context.authCookies;
  deleteSessionCookie(ctx);
  const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
  const adminCookieProp = ctx.context.createAuthCookie("admin_session");
  await ctx.setSignedCookie(adminCookieProp.name, `${ctx.context.session.session.token}:${dontRememberMeCookie || ""}`, ctx.context.secret, authCookies.sessionToken.options);
  await setSessionCookie(ctx, {
    session: session2,
    user: targetUser
  }, true);
  return ctx.json({
    session: session2,
    user: targetUser
  });
});
const stopImpersonating = () => createAuthEndpoint("/admin/stop-impersonating", {
  method: "POST",
  requireHeaders: true
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED");
  if (!session2.session.impersonatedBy) throw new APIError("BAD_REQUEST", { message: "You are not impersonating anyone" });
  const user2 = await ctx.context.internalAdapter.findUserById(session2.session.impersonatedBy);
  if (!user2) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to find user" });
  const adminCookieName = ctx.context.createAuthCookie("admin_session").name;
  const adminCookie = await ctx.getSignedCookie(adminCookieName, ctx.context.secret);
  if (!adminCookie) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to find admin session" });
  const [adminSessionToken, dontRememberMeCookie] = adminCookie?.split(":");
  const adminSession = await ctx.context.internalAdapter.findSession(adminSessionToken);
  if (!adminSession || adminSession.session.userId !== user2.id) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to find admin session" });
  await ctx.context.internalAdapter.deleteSession(session2.session.token);
  await setSessionCookie(ctx, adminSession, !!dontRememberMeCookie);
  await ctx.setSignedCookie(adminCookieName, "", ctx.context.secret, {
    ...ctx.context.authCookies.sessionToken.options,
    maxAge: 0
  });
  return ctx.json(adminSession);
});
const revokeUserSessionBodySchema = z.object({ sessionToken: z.string().meta({ description: "The session token" }) });
const revokeUserSession = (opts) => createAuthEndpoint("/admin/revoke-user-session", {
  method: "POST",
  body: revokeUserSessionBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "revokeUserSession",
    summary: "Revoke a user session",
    description: "Revoke a user session",
    responses: { 200: {
      description: "Session revoked",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { session: ["revoke"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS });
  await ctx.context.internalAdapter.deleteSession(ctx.body.sessionToken);
  return ctx.json({ success: true });
});
const revokeUserSessionsBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const revokeUserSessions = (opts) => createAuthEndpoint("/admin/revoke-user-sessions", {
  method: "POST",
  body: revokeUserSessionsBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "revokeUserSessions",
    summary: "Revoke all user sessions",
    description: "Revoke all user sessions",
    responses: { 200: {
      description: "Sessions revoked",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { session: ["revoke"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS });
  await ctx.context.internalAdapter.deleteSessions(ctx.body.userId);
  return ctx.json({ success: true });
});
const removeUserBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const removeUser = (opts) => createAuthEndpoint("/admin/remove-user", {
  method: "POST",
  body: removeUserBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "removeUser",
    summary: "Remove a user",
    description: "Delete a user and all their sessions and accounts. Cannot be undone.",
    responses: { 200: {
      description: "User removed",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["delete"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS });
  if (ctx.body.userId === ctx.context.session.user.id) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_CANNOT_REMOVE_YOURSELF });
  if (!await ctx.context.internalAdapter.findUserById(ctx.body.userId)) throw new APIError("NOT_FOUND", { message: "User not found" });
  await ctx.context.internalAdapter.deleteUser(ctx.body.userId);
  return ctx.json({ success: true });
});
const setUserPasswordBodySchema = z.object({
  newPassword: z.string().nonempty("newPassword cannot be empty").meta({ description: "The new password" }),
  userId: z.coerce.string().nonempty("userId cannot be empty").meta({ description: "The user id" })
});
const setUserPassword = (opts) => createAuthEndpoint("/admin/set-user-password", {
  method: "POST",
  body: setUserPasswordBodySchema,
  use: [adminMiddleware$1],
  metadata: { openapi: {
    operationId: "setUserPassword",
    summary: "Set a user's password",
    description: "Set a user's password",
    responses: { 200: {
      description: "Password set",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  if (!hasPermission$1({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["set-password"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD });
  const { newPassword, userId } = ctx.body;
  const minPasswordLength = ctx.context.password.config.minPasswordLength;
  if (newPassword.length < minPasswordLength) {
    ctx.context.logger.error("Password is too short");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  }
  const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
  if (newPassword.length > maxPasswordLength) {
    ctx.context.logger.error("Password is too long");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  }
  const hashedPassword = await ctx.context.password.hash(newPassword);
  await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
  return ctx.json({ status: true });
});
const userHasPermissionBodySchema = z.object({
  userId: z.coerce.string().optional().meta({ description: `The user id. Eg: "user-id"` }),
  role: z.string().optional().meta({ description: `The role to check permission for. Eg: "admin"` })
}).and(z.union([z.object({
  permission: z.record(z.string(), z.array(z.string())),
  permissions: z.undefined()
}), z.object({
  permission: z.undefined(),
  permissions: z.record(z.string(), z.array(z.string()))
})]));
const userHasPermission = (opts) => {
  return createAuthEndpoint("/admin/has-permission", {
    method: "POST",
    body: userHasPermissionBodySchema,
    metadata: {
      openapi: {
        description: "Check if the user has permission",
        requestBody: { content: { "application/json": { schema: {
          type: "object",
          properties: {
            permission: {
              type: "object",
              description: "The permission to check",
              deprecated: true
            },
            permissions: {
              type: "object",
              description: "The permission to check"
            }
          },
          required: ["permissions"]
        } } } },
        responses: { "200": {
          description: "Success",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              error: { type: "string" },
              success: { type: "boolean" }
            },
            required: ["success"]
          } } }
        } }
      },
      $Infer: { body: {} }
    }
  }, async (ctx) => {
    if (!ctx.body?.permission && !ctx.body?.permissions) throw new APIError("BAD_REQUEST", { message: "invalid permission check. no permission(s) were passed." });
    const session2 = await getSessionFromCtx(ctx);
    if (!session2 && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
    if (!session2 && !ctx.body.userId && !ctx.body.role) throw new APIError("BAD_REQUEST", { message: "user id or role is required" });
    const user2 = session2?.user || (ctx.body.role ? {
      id: ctx.body.userId || "",
      role: ctx.body.role
    } : null) || await ctx.context.internalAdapter.findUserById(ctx.body.userId);
    if (!user2) throw new APIError("BAD_REQUEST", { message: "user not found" });
    const result = hasPermission$1({
      userId: user2.id,
      role: user2.role,
      options: opts,
      permissions: ctx.body.permissions ?? ctx.body.permission
    });
    return ctx.json({
      error: null,
      success: result
    });
  });
};
const schema$2 = {
  user: { fields: {
    role: {
      type: "string",
      required: false,
      input: false
    },
    banned: {
      type: "boolean",
      defaultValue: false,
      required: false,
      input: false
    },
    banReason: {
      type: "string",
      required: false,
      input: false
    },
    banExpires: {
      type: "date",
      required: false,
      input: false
    }
  } },
  session: { fields: { impersonatedBy: {
    type: "string",
    required: false
  } } }
};
const admin = (options) => {
  const opts = {
    defaultRole: options?.defaultRole ?? "user",
    adminRoles: options?.adminRoles ?? ["admin"],
    bannedUserMessage: options?.bannedUserMessage ?? "You have been banned from this application. Please contact support if you believe this is an error.",
    ...options
  };
  if (options?.adminRoles) {
    const invalidRoles = (Array.isArray(options.adminRoles) ? options.adminRoles : [...options.adminRoles.split(",")]).filter((role2) => !Object.keys(options?.roles || defaultRoles$2).map((r) => r.toLowerCase()).includes(role2.toLowerCase()));
    if (invalidRoles.length > 0) throw new BetterAuthError(`Invalid admin roles: ${invalidRoles.join(", ")}. Admin roles must be defined in the 'roles' configuration.`);
  }
  return {
    id: "admin",
    init() {
      return { options: { databaseHooks: {
        user: { create: { async before(user2) {
          return { data: {
            role: options?.defaultRole ?? "user",
            ...user2
          } };
        } } },
        session: { create: { async before(session2, ctx) {
          if (!ctx) return;
          const user2 = await ctx.context.internalAdapter.findUserById(session2.userId);
          if (user2.banned) {
            if (user2.banExpires && new Date(user2.banExpires).getTime() < Date.now()) {
              await ctx.context.internalAdapter.updateUser(session2.userId, {
                banned: false,
                banReason: null,
                banExpires: null
              });
              return;
            }
            if (ctx && (ctx.path.startsWith("/callback") || ctx.path.startsWith("/oauth2/callback"))) {
              const redirectURI = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
              throw ctx.redirect(`${redirectURI}?error=banned&error_description=${opts.bannedUserMessage}`);
            }
            throw new APIError("FORBIDDEN", {
              message: opts.bannedUserMessage,
              code: "BANNED_USER"
            });
          }
        } } }
      } } };
    },
    hooks: { after: [{
      matcher(context) {
        return context.path === "/list-sessions";
      },
      handler: createAuthMiddleware(async (ctx) => {
        const response = await getEndpointResponse(ctx);
        if (!response) return;
        const newJson = response.filter((session2) => {
          return !session2.impersonatedBy;
        });
        return ctx.json(newJson);
      })
    }] },
    endpoints: {
      setRole: setRole(opts),
      getUser: getUser(opts),
      createUser: createUser(opts),
      adminUpdateUser: adminUpdateUser(opts),
      listUsers: listUsers(opts),
      listUserSessions: listUserSessions(opts),
      unbanUser: unbanUser(opts),
      banUser: banUser(opts),
      impersonateUser: impersonateUser(opts),
      stopImpersonating: stopImpersonating(),
      revokeUserSession: revokeUserSession(opts),
      revokeUserSessions: revokeUserSessions(opts),
      removeUser: removeUser(opts),
      setUserPassword: setUserPassword(opts),
      userHasPermission: userHasPermission(opts)
    },
    $ERROR_CODES: ADMIN_ERROR_CODES,
    schema: mergeSchema(schema$2, opts.schema),
    options
  };
};
defineErrorCodes({
  INVALID_EMAIL_FORMAT: "Email was not generated in a valid format",
  FAILED_TO_CREATE_USER: "Failed to create user",
  COULD_NOT_CREATE_SESSION: "Could not create session",
  ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously"
});
z.object({
  key: z.string().meta({ description: "The key to verify" }),
  permissions: z.record(z.string(), z.array(z.string())).meta({ description: "The permissions to verify." }).optional()
});
z.object({
  name: z.string().meta({ description: "Name of the Api Key" }).optional(),
  expiresIn: z.number().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable().default(null),
  userId: z.coerce.string().meta({ description: 'User Id of the user that the Api Key belongs to. server-only. Eg: "user-id"' }).optional(),
  prefix: z.string().meta({ description: "Prefix of the Api Key" }).regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid prefix format, must be alphanumeric and contain only underscores and hyphens." }).optional(),
  remaining: z.number().meta({ description: "Remaining number of requests. Server side only" }).min(0).optional().nullable().default(null),
  metadata: z.any().optional(),
  refillAmount: z.number().meta({ description: "Amount to refill the remaining count of the Api Key. server-only. Eg: 100" }).min(1).optional(),
  refillInterval: z.number().meta({ description: "Interval to refill the Api Key in milliseconds. server-only. Eg: 1000" }).optional(),
  rateLimitTimeWindow: z.number().meta({ description: "The duration in milliseconds where each request is counted. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 1000" }).optional(),
  rateLimitMax: z.number().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
  rateLimitEnabled: z.boolean().meta({ description: "Whether the key has rate limiting enabled. server-only. Eg: true" }).optional(),
  permissions: z.record(z.string(), z.array(z.string())).meta({ description: "Permissions of the Api Key." }).optional()
});
z.object({ keyId: z.string().meta({ description: "The id of the Api Key" }) });
z.object({ id: z.string().meta({ description: "The id of the Api Key" }) });
z.object({
  keyId: z.string().meta({ description: "The id of the Api Key" }),
  userId: z.coerce.string().meta({ description: 'The id of the user which the api key belongs to. server-only. Eg: "some-user-id"' }).optional(),
  name: z.string().meta({ description: "The name of the key" }).optional(),
  enabled: z.boolean().meta({ description: "Whether the Api Key is enabled or not" }).optional(),
  remaining: z.number().meta({ description: "The number of remaining requests" }).min(1).optional(),
  refillAmount: z.number().meta({ description: "The refill amount" }).optional(),
  refillInterval: z.number().meta({ description: "The refill interval" }).optional(),
  metadata: z.any().optional(),
  expiresIn: z.number().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable(),
  rateLimitEnabled: z.boolean().meta({ description: "Whether the key has rate limiting enabled." }).optional(),
  rateLimitTimeWindow: z.number().meta({ description: "The duration in milliseconds where each request is counted. server-only. Eg: 1000" }).optional(),
  rateLimitMax: z.number().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
  permissions: z.record(z.string(), z.array(z.string())).meta({ description: "Update the permissions on the API Key. server-only." }).optional().nullable()
});
defineErrorCodes({
  INVALID_METADATA_TYPE: "metadata must be an object or undefined",
  REFILL_AMOUNT_AND_INTERVAL_REQUIRED: "refillAmount is required when refillInterval is provided",
  REFILL_INTERVAL_AND_AMOUNT_REQUIRED: "refillInterval is required when refillAmount is provided",
  USER_BANNED: "User is banned",
  UNAUTHORIZED_SESSION: "Unauthorized or invalid session",
  KEY_NOT_FOUND: "API Key not found",
  KEY_DISABLED: "API Key is disabled",
  KEY_EXPIRED: "API Key has expired",
  USAGE_EXCEEDED: "API Key has reached its usage limit",
  KEY_NOT_RECOVERABLE: "API Key is not recoverable",
  EXPIRES_IN_IS_TOO_SMALL: "The expiresIn is smaller than the predefined minimum value.",
  EXPIRES_IN_IS_TOO_LARGE: "The expiresIn is larger than the predefined maximum value.",
  INVALID_REMAINING: "The remaining count is either too large or too small.",
  INVALID_PREFIX_LENGTH: "The prefix length is either too large or too small.",
  INVALID_NAME_LENGTH: "The name length is either too large or too small.",
  METADATA_DISABLED: "Metadata is disabled.",
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded.",
  NO_VALUES_TO_UPDATE: "No values to update.",
  KEY_DISABLED_EXPIRATION: "Custom key expiration values are disabled.",
  INVALID_API_KEY: "Invalid API key.",
  INVALID_USER_ID_FROM_API_KEY: "The user id from the API key is invalid.",
  INVALID_API_KEY_GETTER_RETURN_TYPE: "API Key getter returned an invalid key type. Expected string.",
  SERVER_ONLY_PROPERTY: "The property you're trying to set can only be set from the server auth instance only.",
  FAILED_TO_UPDATE_API_KEY: "Failed to update API key",
  NAME_REQUIRED: "API Key name is required."
});
defineErrorCodes({
  VERIFICATION_FAILED: "Captcha verification failed",
  MISSING_RESPONSE: "Missing CAPTCHA response",
  UNKNOWN_ERROR: "Something went wrong"
});
defineErrorCodes({
  MISSING_SECRET_KEY: "Missing secret key",
  SERVICE_UNAVAILABLE: "CAPTCHA service unavailable"
});
z.optional(z.object({
  disableCookieCache: z.boolean().meta({ description: "Disable cookie cache and fetch session from database" }).or(z.string().transform((v) => v === "true")).optional(),
  disableRefresh: z.boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
const DEVICE_AUTHORIZATION_ERROR_CODES = defineErrorCodes({
  INVALID_DEVICE_CODE: "Invalid device code",
  EXPIRED_DEVICE_CODE: "Device code has expired",
  EXPIRED_USER_CODE: "User code has expired",
  AUTHORIZATION_PENDING: "Authorization pending",
  ACCESS_DENIED: "Access denied",
  INVALID_USER_CODE: "Invalid user code",
  DEVICE_CODE_ALREADY_PROCESSED: "Device code already processed",
  POLLING_TOO_FREQUENTLY: "Polling too frequently",
  USER_NOT_FOUND: "User not found",
  FAILED_TO_CREATE_SESSION: "Failed to create session",
  INVALID_DEVICE_CODE_STATUS: "Invalid device code status",
  AUTHENTICATION_REQUIRED: "Authentication required"
});
z.object({
  client_id: z.string().meta({ description: "The client ID of the application" }),
  scope: z.string().meta({ description: "Space-separated list of scopes" }).optional()
});
z.object({
  error: z.enum(["invalid_request", "invalid_client"]).meta({ description: "Error code" }),
  error_description: z.string().meta({ description: "Detailed error description" })
});
z.object({
  grant_type: z.literal("urn:ietf:params:oauth:grant-type:device_code").meta({ description: "The grant type for device flow" }),
  device_code: z.string().meta({ description: "The device verification code" }),
  client_id: z.string().meta({ description: "The client ID of the application" })
});
z.object({
  error: z.enum([
    "authorization_pending",
    "slow_down",
    "expired_token",
    "access_denied",
    "invalid_request",
    "invalid_grant"
  ]).meta({ description: "Error code" }),
  error_description: z.string().meta({ description: "Detailed error description" })
});
createAuthEndpoint("/device", {
  method: "GET",
  query: z.object({ user_code: z.string().meta({ description: "The user code to verify" }) }),
  error: z.object({
    error: z.enum(["invalid_request"]).meta({ description: "Error code" }),
    error_description: z.string().meta({ description: "Detailed error description" })
  }),
  metadata: { openapi: {
    description: "Verify user code and get device authorization status",
    responses: { 200: {
      description: "Device authorization status",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user_code: {
            type: "string",
            description: "The user code to verify"
          },
          status: {
            type: "string",
            enum: [
              "pending",
              "approved",
              "denied"
            ],
            description: "Current status of the device authorization"
          }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  const { user_code } = ctx.query;
  const cleanUserCode = user_code.replace(/-/g, "");
  const deviceCodeRecord = await ctx.context.adapter.findOne({
    model: "deviceCode",
    where: [{
      field: "userCode",
      value: cleanUserCode
    }]
  });
  if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
  });
  if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
    error: "expired_token",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
  });
  return ctx.json({
    user_code,
    status: deviceCodeRecord.status
  });
});
createAuthEndpoint("/device/approve", {
  method: "POST",
  body: z.object({ userCode: z.string().meta({ description: "The user code to approve" }) }),
  error: z.object({
    error: z.enum([
      "invalid_request",
      "expired_token",
      "device_code_already_processed"
    ]).meta({ description: "Error code" }),
    error_description: z.string().meta({ description: "Detailed error description" })
  }),
  requireHeaders: true,
  metadata: { openapi: {
    description: "Approve device authorization",
    responses: { 200: {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED", {
    error: "unauthorized",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.AUTHENTICATION_REQUIRED
  });
  const { userCode } = ctx.body;
  const cleanUserCode = userCode.replace(/-/g, "");
  const deviceCodeRecord = await ctx.context.adapter.findOne({
    model: "deviceCode",
    where: [{
      field: "userCode",
      value: cleanUserCode
    }]
  });
  if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
  });
  if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
    error: "expired_token",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
  });
  if (deviceCodeRecord.status !== "pending") throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED
  });
  await ctx.context.adapter.update({
    model: "deviceCode",
    where: [{
      field: "id",
      value: deviceCodeRecord.id
    }],
    update: {
      status: "approved",
      userId: session2.user.id
    }
  });
  return ctx.json({ success: true });
});
createAuthEndpoint("/device/deny", {
  method: "POST",
  body: z.object({ userCode: z.string().meta({ description: "The user code to deny" }) }),
  error: z.object({
    error: z.enum(["invalid_request", "expired_token"]).meta({ description: "Error code" }),
    error_description: z.string().meta({ description: "Detailed error description" })
  }),
  metadata: { openapi: {
    description: "Deny device authorization",
    responses: { 200: {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { userCode } = ctx.body;
  const cleanUserCode = userCode.replace(/-/g, "");
  const deviceCodeRecord = await ctx.context.adapter.findOne({
    model: "deviceCode",
    where: [{
      field: "userCode",
      value: cleanUserCode
    }]
  });
  if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
  });
  if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
    error: "expired_token",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
  });
  if (deviceCodeRecord.status !== "pending") throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED
  });
  await ctx.context.adapter.update({
    model: "deviceCode",
    where: [{
      field: "id",
      value: deviceCodeRecord.id
    }],
    update: { status: "denied" }
  });
  return ctx.json({ success: true });
});
z.object({
  id: z.string(),
  deviceCode: z.string(),
  userCode: z.string(),
  userId: z.string().optional(),
  expiresAt: z.date(),
  status: z.string(),
  lastPolledAt: z.date().optional(),
  pollingInterval: z.number().optional(),
  clientId: z.string().optional(),
  scope: z.string().optional()
});
const timeStringSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  try {
    ms(val);
    return true;
  } catch {
    return false;
  }
}, { message: "Invalid time string format. Use formats like '30m', '5s', '1h', etc." });
z.object({
  expiresIn: timeStringSchema.default("30m").describe("Time in seconds until the device code expires. Use formats like '30m', '5s', '1h', etc."),
  interval: timeStringSchema.default("5s").describe("Time in seconds between polling attempts. Use formats like '30m', '5s', '1h', etc."),
  deviceCodeLength: z.number().int().positive().default(40).describe("Length of the device code to be generated. Default is 40 characters."),
  userCodeLength: z.number().int().positive().default(8).describe("Length of the user code to be generated. Default is 8 characters."),
  generateDeviceCode: z.custom((val) => typeof val === "function", { message: "generateDeviceCode must be a function that returns a string or a promise that resolves to a string." }).optional().describe("Function to generate a device code. If not provided, a default random string generator will be used."),
  generateUserCode: z.custom((val) => typeof val === "function", { message: "generateUserCode must be a function that returns a string or a promise that resolves to a string." }).optional().describe("Function to generate a user code. If not provided, a default random string generator will be used."),
  validateClient: z.custom((val) => typeof val === "function", { message: "validateClient must be a function that returns a boolean or a promise that resolves to a boolean." }).optional().describe("Function to validate the client ID. If not provided, no validation will be performed."),
  onDeviceAuthRequest: z.custom((val) => typeof val === "function", { message: "onDeviceAuthRequest must be a function that returns void or a promise that resolves to void." }).optional().describe("Function to handle device authorization requests. If not provided, no additional actions will be taken."),
  verificationUri: z.string().optional().describe("The URI where users verify their device code. Can be an absolute URL (https://example.com/device) or relative path (/custom-path). This will be returned as verification_uri in the device code response. If not provided, defaults to /device."),
  schema: z.custom(() => true)
});
const types = [
  "email-verification",
  "sign-in",
  "forget-password"
];
defineErrorCodes({
  OTP_EXPIRED: "OTP expired",
  INVALID_OTP: "Invalid OTP",
  TOO_MANY_ATTEMPTS: "Too many attempts"
});
z.object({
  email: z.string({}).meta({ description: "Email address to send the OTP" }),
  type: z.enum(types).meta({ description: "Type of the OTP" })
});
z.object({
  email: z.string({}).meta({ description: "Email address to send the OTP" }),
  type: z.enum(types).meta({
    required: true,
    description: "Type of the OTP"
  })
});
z.object({
  email: z.string({}).meta({ description: "Email address the OTP was sent to" }),
  type: z.enum(types).meta({
    required: true,
    description: "Type of the OTP"
  })
});
z.object({
  email: z.string().meta({ description: "Email address the OTP was sent to" }),
  type: z.enum(types).meta({
    required: true,
    description: "Type of the OTP"
  }),
  otp: z.string().meta({
    required: true,
    description: "OTP to verify"
  })
});
z.object({
  email: z.string({}).meta({ description: "Email address to verify" }),
  otp: z.string().meta({
    required: true,
    description: "OTP to verify"
  })
});
z.object({
  email: z.string({}).meta({ description: "Email address to sign in" }),
  otp: z.string().meta({
    required: true,
    description: "OTP sent to the email"
  })
});
z.object({ email: z.string().meta({ description: "Email address to send the OTP" }) });
z.object({
  email: z.string().meta({ description: "Email address to reset the password" }),
  otp: z.string().meta({ description: "OTP sent to the email" }),
  password: z.string().meta({ description: "New password" })
});
defineErrorCodes({
  INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration",
  TOKEN_URL_NOT_FOUND: "Invalid OAuth configuration. Token URL not found.",
  PROVIDER_CONFIG_NOT_FOUND: "No config found for provider",
  PROVIDER_ID_REQUIRED: "Provider ID is required",
  INVALID_OAUTH_CONFIG: "Invalid OAuth configuration.",
  SESSION_REQUIRED: "Session is required"
});
z.object({
  providerId: z.string().meta({ description: "The provider ID for the OAuth provider" }),
  callbackURL: z.string().meta({ description: "The URL to redirect to after sign in" }).optional(),
  errorCallbackURL: z.string().meta({ description: "The URL to redirect to if an error occurs" }).optional(),
  newUserCallbackURL: z.string().meta({ description: 'The URL to redirect to after login if the user is new. Eg: "/welcome"' }).optional(),
  disableRedirect: z.boolean().meta({ description: "Disable redirect" }).optional(),
  scopes: z.array(z.string()).meta({ description: "Scopes to be passed to the provider authorization request." }).optional(),
  requestSignUp: z.boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. Eg: false" }).optional(),
  additionalData: z.record(z.string(), z.any()).optional()
});
z.object({
  code: z.string().meta({ description: "The OAuth2 code" }).optional(),
  error: z.string().meta({ description: "The error message, if any" }).optional(),
  error_description: z.string().meta({ description: "The error description, if any" }).optional(),
  state: z.string().meta({ description: "The state parameter from the OAuth2 request" }).optional()
});
z.object({
  providerId: z.string(),
  callbackURL: z.string(),
  scopes: z.array(z.string()).meta({ description: "Additional scopes to request when linking the account" }).optional(),
  errorCallbackURL: z.string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional()
});
defineErrorCodes({ PASSWORD_COMPROMISED: "The password you entered has been compromised. Please choose a different password." });
z.object({
  payload: z.record(z.string(), z.any()),
  overrideOptions: z.record(z.string(), z.any()).optional()
});
z.object({
  token: z.string(),
  issuer: z.string().optional()
});
z.object({
  email: z.email().meta({ description: "Email address to send the magic link" }),
  name: z.string().meta({ description: 'User display name. Only used if the user is registering for the first time. Eg: "my-name"' }).optional(),
  callbackURL: z.string().meta({ description: "URL to redirect after magic link verification" }).optional(),
  newUserCallbackURL: z.string().meta({ description: "URL to redirect after new user signup. Only used if the user is registering for the first time." }).optional(),
  errorCallbackURL: z.string().meta({ description: "URL to redirect after error." }).optional()
});
z.object({
  token: z.string().meta({ description: "Verification token" }),
  callbackURL: z.string().meta({ description: 'URL to redirect after magic link verification, if not provided the user will be redirected to the root URL. Eg: "/dashboard"' }).optional(),
  errorCallbackURL: z.string().meta({ description: "URL to redirect after error." }).optional(),
  newUserCallbackURL: z.string().meta({ description: "URL to redirect after new user signup. Only used if the user is registering for the first time." }).optional()
});
z.object({
  clientId: z.string(),
  clientSecret: z.string().optional(),
  type: z.enum([
    "web",
    "native",
    "user-agent-based",
    "public"
  ]),
  name: z.string(),
  icon: z.string().optional(),
  metadata: z.string().optional(),
  disabled: z.boolean().optional().default(false),
  redirectUrls: z.string(),
  userId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
z.object({
  accept: z.boolean(),
  consent_code: z.string().optional().nullish()
});
z.record(z.any(), z.any());
z.object({
  redirect_uris: z.array(z.string()).meta({ description: 'A list of redirect URIs. Eg: ["https://client.example.com/callback"]' }),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post"
  ]).meta({ description: 'The authentication method for the token endpoint. Eg: "client_secret_basic"' }).default("client_secret_basic").optional(),
  grant_types: z.array(z.enum([
    "authorization_code",
    "implicit",
    "password",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:ietf:params:oauth:grant-type:saml2-bearer"
  ])).meta({ description: 'The grant types supported by the application. Eg: ["authorization_code"]' }).default(["authorization_code"]).optional(),
  response_types: z.array(z.enum(["code", "token"])).meta({ description: 'The response types supported by the application. Eg: ["code"]' }).default(["code"]).optional(),
  client_name: z.string().meta({ description: 'The name of the application. Eg: "My App"' }).optional(),
  client_uri: z.string().meta({ description: 'The URI of the application. Eg: "https://client.example.com"' }).optional(),
  logo_uri: z.string().meta({ description: 'The URI of the application logo. Eg: "https://client.example.com/logo.png"' }).optional(),
  scope: z.string().meta({ description: 'The scopes supported by the application. Separated by spaces. Eg: "profile email"' }).optional(),
  contacts: z.array(z.string()).meta({ description: 'The contact information for the application. Eg: ["admin@example.com"]' }).optional(),
  tos_uri: z.string().meta({ description: 'The URI of the application terms of service. Eg: "https://client.example.com/tos"' }).optional(),
  policy_uri: z.string().meta({ description: 'The URI of the application privacy policy. Eg: "https://client.example.com/policy"' }).optional(),
  jwks_uri: z.string().meta({ description: 'The URI of the application JWKS. Eg: "https://client.example.com/jwks"' }).optional(),
  jwks: z.record(z.any(), z.any()).meta({ description: 'The JWKS of the application. Eg: {"keys": [{"kty": "RSA", "alg": "RS256", "use": "sig", "n": "...", "e": "..."}]}' }).optional(),
  metadata: z.record(z.any(), z.any()).meta({ description: 'The metadata of the application. Eg: {"key": "value"}' }).optional(),
  software_id: z.string().meta({ description: 'The software ID of the application. Eg: "my-software"' }).optional(),
  software_version: z.string().meta({ description: 'The software version of the application. Eg: "1.0.0"' }).optional(),
  software_statement: z.string().meta({ description: "The software statement of the application." }).optional()
});
z.object({
  redirect_uris: z.array(z.string()),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post"
  ]).default("client_secret_basic").optional(),
  grant_types: z.array(z.enum([
    "authorization_code",
    "implicit",
    "password",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:ietf:params:oauth:grant-type:saml2-bearer"
  ])).default(["authorization_code"]).optional(),
  response_types: z.array(z.enum(["code", "token"])).default(["code"]).optional(),
  client_name: z.string().optional(),
  client_uri: z.string().optional(),
  logo_uri: z.string().optional(),
  scope: z.string().optional(),
  contacts: z.array(z.string()).optional(),
  tos_uri: z.string().optional(),
  policy_uri: z.string().optional(),
  jwks_uri: z.string().optional(),
  jwks: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.any(), z.any()).optional(),
  software_id: z.string().optional(),
  software_version: z.string().optional(),
  software_statement: z.string().optional()
});
z.record(z.any(), z.any());
defineErrorCodes({ INVALID_SESSION_TOKEN: "Invalid session token" });
z.object({ sessionToken: z.string().meta({ description: "The session token to set as active" }) });
z.object({ sessionToken: z.string().meta({ description: "The session token to revoke" }) });
z.object({
  callbackURL: z.string().meta({ description: "The URL to redirect to after the proxy" }),
  cookies: z.string().meta({ description: "The cookies to set after the proxy" })
});
function toBoolean(value) {
  return value === "true" || value === true;
}
const oneTapCallbackBodySchema = z.object({ idToken: z.string().meta({ description: "Google ID token, which the client obtains from the One Tap API" }) });
const oneTap = (options) => ({
  id: "one-tap",
  endpoints: { oneTapCallback: createAuthEndpoint("/one-tap/callback", {
    method: "POST",
    body: oneTapCallbackBodySchema,
    metadata: { openapi: {
      summary: "One tap callback",
      description: "Use this endpoint to authenticate with Google One Tap",
      responses: {
        200: {
          description: "Successful response",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              session: { $ref: "#/components/schemas/Session" },
              user: { $ref: "#/components/schemas/User" }
            }
          } } }
        },
        400: { description: "Invalid token" }
      }
    } }
  }, async (ctx) => {
    const { idToken } = ctx.body;
    let payload;
    try {
      const { payload: verifiedPayload } = await jwtVerify(idToken, createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs")), {
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: options?.clientId || ctx.context.options.socialProviders?.google?.clientId
      });
      payload = verifiedPayload;
    } catch {
      throw new APIError("BAD_REQUEST", { message: "invalid id token" });
    }
    const { email, email_verified, name, picture, sub } = payload;
    if (!email) return ctx.json({ error: "Email not available in token" });
    const user2 = await ctx.context.internalAdapter.findUserByEmail(email);
    if (!user2) {
      const newUser = await ctx.context.internalAdapter.createOAuthUser({
        email,
        emailVerified: typeof email_verified === "boolean" ? email_verified : toBoolean(email_verified),
        name,
        image: picture
      }, {
        providerId: "google",
        accountId: sub
      });
      if (!newUser) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Could not create user" });
      const session$1 = await ctx.context.internalAdapter.createSession(newUser.user.id);
      await setSessionCookie(ctx, {
        user: newUser.user,
        session: session$1
      });
      return ctx.json({
        token: session$1.token,
        user: {
          id: newUser.user.id,
          email: newUser.user.email,
          emailVerified: newUser.user.emailVerified,
          name: newUser.user.name,
          image: newUser.user.image,
          createdAt: newUser.user.createdAt,
          updatedAt: newUser.user.updatedAt
        }
      });
    }
    if (!await ctx.context.internalAdapter.findAccount(sub)) {
      const accountLinking = ctx.context.options.account?.accountLinking;
      if (accountLinking?.enabled && (accountLinking.trustedProviders?.includes("google") || email_verified)) await ctx.context.internalAdapter.linkAccount({
        userId: user2.user.id,
        providerId: "google",
        accountId: sub,
        scope: "openid,profile,email",
        idToken
      });
      else throw new APIError("UNAUTHORIZED", { message: "Google sub doesn't match" });
    }
    const session2 = await ctx.context.internalAdapter.createSession(user2.user.id);
    await setSessionCookie(ctx, {
      user: user2.user,
      session: session2
    });
    return ctx.json({
      token: session2.token,
      user: {
        id: user2.user.id,
        email: user2.user.email,
        emailVerified: user2.user.emailVerified,
        name: user2.user.name,
        image: user2.user.image,
        createdAt: user2.user.createdAt,
        updatedAt: user2.user.updatedAt
      }
    });
  }) }
});
z.object({ token: z.string().meta({ description: 'The token to verify. Eg: "some-token"' }) });
const getOrgAdapter = (context, options) => {
  const baseAdapter = context.adapter;
  return {
    findOrganizationBySlug: async (slug) => {
      return await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "organization",
        where: [{
          field: "slug",
          value: slug
        }]
      });
    },
    createOrganization: async (data) => {
      const organization2 = await (await getCurrentAdapter(baseAdapter)).create({
        model: "organization",
        data: {
          ...data.organization,
          metadata: data.organization.metadata ? JSON.stringify(data.organization.metadata) : void 0
        },
        forceAllowId: true
      });
      return {
        ...organization2,
        metadata: organization2.metadata && typeof organization2.metadata === "string" ? JSON.parse(organization2.metadata) : void 0
      };
    },
    findMemberByEmail: async (data) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      const user2 = await adapter.findOne({
        model: "user",
        where: [{
          field: "email",
          value: data.email.toLowerCase()
        }]
      });
      if (!user2) return null;
      const member2 = await adapter.findOne({
        model: "member",
        where: [{
          field: "organizationId",
          value: data.organizationId
        }, {
          field: "userId",
          value: user2.id
        }]
      });
      if (!member2) return null;
      return {
        ...member2,
        user: {
          id: user2.id,
          name: user2.name,
          email: user2.email,
          image: user2.image
        }
      };
    },
    listMembers: async (data) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      const members = await Promise.all([adapter.findMany({
        model: "member",
        where: [{
          field: "organizationId",
          value: data.organizationId
        }, ...data.filter?.field ? [{
          field: data.filter?.field,
          value: data.filter?.value
        }] : []],
        limit: data.limit || options?.membershipLimit || 100,
        offset: data.offset || 0,
        sortBy: data.sortBy ? {
          field: data.sortBy,
          direction: data.sortOrder || "asc"
        } : void 0
      }), adapter.count({
        model: "member",
        where: [{
          field: "organizationId",
          value: data.organizationId
        }, ...data.filter?.field ? [{
          field: data.filter?.field,
          value: data.filter?.value
        }] : []]
      })]);
      const users = await adapter.findMany({
        model: "user",
        where: [{
          field: "id",
          value: members[0].map((member2) => member2.userId),
          operator: "in"
        }]
      });
      return {
        members: members[0].map((member2) => {
          const user2 = users.find((user$1) => user$1.id === member2.userId);
          if (!user2) throw new BetterAuthError("Unexpected error: User not found for member");
          return {
            ...member2,
            user: {
              id: user2.id,
              name: user2.name,
              email: user2.email,
              image: user2.image
            }
          };
        }),
        total: members[1]
      };
    },
    findMemberByOrgId: async (data) => {
      const result = await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "member",
        where: [{
          field: "userId",
          value: data.userId
        }, {
          field: "organizationId",
          value: data.organizationId
        }],
        join: { user: true }
      });
      if (!result || !result.user) return null;
      const { user: user2, ...member2 } = result;
      return {
        ...member2,
        user: {
          id: user2.id,
          name: user2.name,
          email: user2.email,
          image: user2.image
        }
      };
    },
    findMemberById: async (memberId) => {
      const result = await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "member",
        where: [{
          field: "id",
          value: memberId
        }],
        join: { user: true }
      });
      if (!result) return null;
      const { user: user2, ...member2 } = result;
      return {
        ...member2,
        user: {
          id: user2.id,
          name: user2.name,
          email: user2.email,
          image: user2.image
        }
      };
    },
    createMember: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).create({
        model: "member",
        data: {
          ...data,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
    },
    updateMember: async (memberId, role2) => {
      return await (await getCurrentAdapter(baseAdapter)).update({
        model: "member",
        where: [{
          field: "id",
          value: memberId
        }],
        update: { role: role2 }
      });
    },
    deleteMember: async ({ memberId, organizationId, userId: _userId }) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      let userId;
      if (!_userId) {
        const member$1 = await adapter.findOne({
          model: "member",
          where: [{
            field: "id",
            value: memberId
          }]
        });
        if (!member$1) throw new BetterAuthError("Member not found");
        userId = member$1.userId;
      } else userId = _userId;
      const member2 = await adapter.delete({
        model: "member",
        where: [{
          field: "id",
          value: memberId
        }]
      });
      if (options?.teams?.enabled) {
        const teams = await adapter.findMany({
          model: "team",
          where: [{
            field: "organizationId",
            value: organizationId
          }]
        });
        await Promise.all(teams.map((team) => adapter.deleteMany({
          model: "teamMember",
          where: [{
            field: "teamId",
            value: team.id
          }, {
            field: "userId",
            value: userId
          }]
        })));
      }
      return member2;
    },
    updateOrganization: async (organizationId, data) => {
      const organization2 = await (await getCurrentAdapter(baseAdapter)).update({
        model: "organization",
        where: [{
          field: "id",
          value: organizationId
        }],
        update: {
          ...data,
          metadata: typeof data.metadata === "object" ? JSON.stringify(data.metadata) : data.metadata
        }
      });
      if (!organization2) return null;
      return {
        ...organization2,
        metadata: organization2.metadata ? parseJSON(organization2.metadata) : void 0
      };
    },
    deleteOrganization: async (organizationId) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      await adapter.deleteMany({
        model: "member",
        where: [{
          field: "organizationId",
          value: organizationId
        }]
      });
      await adapter.deleteMany({
        model: "invitation",
        where: [{
          field: "organizationId",
          value: organizationId
        }]
      });
      await adapter.delete({
        model: "organization",
        where: [{
          field: "id",
          value: organizationId
        }]
      });
      return organizationId;
    },
    setActiveOrganization: async (sessionToken, organizationId, ctx) => {
      return await context.internalAdapter.updateSession(sessionToken, { activeOrganizationId: organizationId });
    },
    findOrganizationById: async (organizationId) => {
      return await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "organization",
        where: [{
          field: "id",
          value: organizationId
        }]
      });
    },
    checkMembership: async ({ userId, organizationId }) => {
      return await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "member",
        where: [{
          field: "userId",
          value: userId
        }, {
          field: "organizationId",
          value: organizationId
        }]
      });
    },
    findFullOrganization: async ({ organizationId, isSlug, includeTeams, membersLimit }) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      const result = await adapter.findOne({
        model: "organization",
        where: [{
          field: isSlug ? "slug" : "id",
          value: organizationId
        }],
        join: {
          invitation: true,
          member: membersLimit ? { limit: membersLimit } : true,
          ...includeTeams ? { team: true } : {}
        }
      });
      if (!result) return null;
      const { invitation: invitations, member: members, team: teams, ...org } = result;
      const userIds = members.map((member2) => member2.userId);
      const users = userIds.length > 0 ? await adapter.findMany({
        model: "user",
        where: [{
          field: "id",
          value: userIds,
          operator: "in"
        }],
        limit: options?.membershipLimit || 100
      }) : [];
      const userMap = new Map(users.map((user2) => [user2.id, user2]));
      const membersWithUsers = members.map((member2) => {
        const user2 = userMap.get(member2.userId);
        if (!user2) throw new BetterAuthError("Unexpected error: User not found for member");
        return {
          ...member2,
          user: {
            id: user2.id,
            name: user2.name,
            email: user2.email,
            image: user2.image
          }
        };
      });
      return {
        ...org,
        invitations,
        members: membersWithUsers,
        teams
      };
    },
    listOrganizations: async (userId) => {
      const result = await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "member",
        where: [{
          field: "userId",
          value: userId
        }],
        join: { organization: true }
      });
      if (!result || result.length === 0) return [];
      return result.map((member2) => member2.organization);
    },
    createTeam: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).create({
        model: "team",
        data
      });
    },
    findTeamById: async ({ teamId, organizationId, includeTeamMembers }) => {
      const result = await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "team",
        where: [{
          field: "id",
          value: teamId
        }, ...organizationId ? [{
          field: "organizationId",
          value: organizationId
        }] : []],
        join: { ...includeTeamMembers ? { teamMember: true } : {} }
      });
      if (!result) return null;
      const { teamMember, ...team } = result;
      return {
        ...team,
        ...includeTeamMembers ? { members: teamMember } : {}
      };
    },
    updateTeam: async (teamId, data) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      if ("id" in data) data.id = void 0;
      return await adapter.update({
        model: "team",
        where: [{
          field: "id",
          value: teamId
        }],
        update: { ...data }
      });
    },
    deleteTeam: async (teamId) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      await adapter.deleteMany({
        model: "teamMember",
        where: [{
          field: "teamId",
          value: teamId
        }]
      });
      return await adapter.delete({
        model: "team",
        where: [{
          field: "id",
          value: teamId
        }]
      });
    },
    listTeams: async (organizationId) => {
      return await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "team",
        where: [{
          field: "organizationId",
          value: organizationId
        }]
      });
    },
    createTeamInvitation: async ({ email, role: role2, teamId, organizationId, inviterId, expiresIn = 1e3 * 60 * 60 * 48 }) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      const expiresAt = getDate(expiresIn);
      return await adapter.create({
        model: "invitation",
        data: {
          email,
          role: role2,
          organizationId,
          teamId,
          inviterId,
          status: "pending",
          expiresAt
        }
      });
    },
    setActiveTeam: async (sessionToken, teamId, ctx) => {
      return await context.internalAdapter.updateSession(sessionToken, { activeTeamId: teamId });
    },
    listTeamMembers: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "teamMember",
        where: [{
          field: "teamId",
          value: data.teamId
        }]
      });
    },
    countTeamMembers: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).count({
        model: "teamMember",
        where: [{
          field: "teamId",
          value: data.teamId
        }]
      });
    },
    countMembers: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).count({
        model: "member",
        where: [{
          field: "organizationId",
          value: data.organizationId
        }]
      });
    },
    listTeamsByUser: async (data) => {
      return (await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "teamMember",
        where: [{
          field: "userId",
          value: data.userId
        }],
        join: { team: true }
      })).map((result) => result.team);
    },
    findTeamMember: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "teamMember",
        where: [{
          field: "teamId",
          value: data.teamId
        }, {
          field: "userId",
          value: data.userId
        }]
      });
    },
    findOrCreateTeamMember: async (data) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      const member2 = await adapter.findOne({
        model: "teamMember",
        where: [{
          field: "teamId",
          value: data.teamId
        }, {
          field: "userId",
          value: data.userId
        }]
      });
      if (member2) return member2;
      return await adapter.create({
        model: "teamMember",
        data: {
          teamId: data.teamId,
          userId: data.userId,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
    },
    removeTeamMember: async (data) => {
      await (await getCurrentAdapter(baseAdapter)).deleteMany({
        model: "teamMember",
        where: [{
          field: "teamId",
          value: data.teamId
        }, {
          field: "userId",
          value: data.userId
        }]
      });
    },
    findInvitationsByTeamId: async (teamId) => {
      return await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "invitation",
        where: [{
          field: "teamId",
          value: teamId
        }]
      });
    },
    listUserInvitations: async (email) => {
      return (await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "invitation",
        where: [{
          field: "email",
          value: email.toLowerCase()
        }],
        join: { organization: true }
      })).map(({ organization: organization2, ...inv }) => ({
        ...inv,
        organizationName: organization2.name
      }));
    },
    createInvitation: async ({ invitation: invitation2, user: user2 }) => {
      const adapter = await getCurrentAdapter(baseAdapter);
      const expiresAt = getDate(options?.invitationExpiresIn || 3600 * 48, "sec");
      return await adapter.create({
        model: "invitation",
        data: {
          status: "pending",
          expiresAt,
          createdAt: /* @__PURE__ */ new Date(),
          inviterId: user2.id,
          ...invitation2,
          teamId: invitation2.teamIds.length > 0 ? invitation2.teamIds.join(",") : null
        }
      });
    },
    findInvitationById: async (id) => {
      return await (await getCurrentAdapter(baseAdapter)).findOne({
        model: "invitation",
        where: [{
          field: "id",
          value: id
        }]
      });
    },
    findPendingInvitation: async (data) => {
      return (await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "invitation",
        where: [
          {
            field: "email",
            value: data.email.toLowerCase()
          },
          {
            field: "organizationId",
            value: data.organizationId
          },
          {
            field: "status",
            value: "pending"
          }
        ]
      })).filter((invite) => new Date(invite.expiresAt) > /* @__PURE__ */ new Date());
    },
    findPendingInvitations: async (data) => {
      return (await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "invitation",
        where: [{
          field: "organizationId",
          value: data.organizationId
        }, {
          field: "status",
          value: "pending"
        }]
      })).filter((invite) => new Date(invite.expiresAt) > /* @__PURE__ */ new Date());
    },
    listInvitations: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).findMany({
        model: "invitation",
        where: [{
          field: "organizationId",
          value: data.organizationId
        }]
      });
    },
    updateInvitation: async (data) => {
      return await (await getCurrentAdapter(baseAdapter)).update({
        model: "invitation",
        where: [{
          field: "id",
          value: data.invitationId
        }],
        update: { status: data.status }
      });
    }
  };
};
const shimContext = (originalObject, newContext) => {
  const shimmedObj = {};
  for (const [key, value] of Object.entries(originalObject)) {
    shimmedObj[key] = (ctx) => {
      return value({
        ...ctx,
        context: {
          ...newContext,
          ...ctx.context
        }
      });
    };
    shimmedObj[key].path = value.path;
    shimmedObj[key].method = value.method;
    shimmedObj[key].options = value.options;
    shimmedObj[key].headers = value.headers;
  }
  return shimmedObj;
};
const orgMiddleware = createAuthMiddleware(async () => {
  return {};
});
const orgSessionMiddleware = createAuthMiddleware({ use: [sessionMiddleware] }, async (ctx) => {
  return { session: ctx.context.session };
});
const ORGANIZATION_ERROR_CODES = defineErrorCodes({
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations",
  ORGANIZATION_ALREADY_EXISTS: "Organization already exists",
  ORGANIZATION_SLUG_ALREADY_TAKEN: "Organization slug already taken",
  ORGANIZATION_NOT_FOUND: "Organization not found",
  USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization",
  NO_ACTIVE_ORGANIZATION: "No active organization",
  USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization",
  MEMBER_NOT_FOUND: "Member not found",
  ROLE_NOT_FOUND: "Role not found",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team",
  TEAM_ALREADY_EXISTS: "Team already exists",
  TEAM_NOT_FOUND: "Team not found",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization",
  USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization",
  INVITATION_NOT_FOUND: "Invitation not found",
  YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation",
  EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation",
  YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation",
  INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role",
  FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams",
  UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member",
  ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team",
  INVITATION_LIMIT_REACHED: "Invitation limit reached",
  TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached",
  USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team",
  YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team",
  YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member",
  YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member",
  YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner",
  YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization",
  MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information",
  YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role",
  YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role",
  YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role",
  YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role",
  TOO_MANY_ROLES: "This organization has too many roles",
  INVALID_RESOURCE: "The provided permission includes an invalid resource",
  ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken",
  CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role"
});
const hasPermission = async (input, ctx) => {
  let acRoles = { ...input.options.roles || defaultRoles$1 };
  if (ctx && input.organizationId && input.options.dynamicAccessControl?.enabled && input.options.ac && !input.useMemoryCache) {
    const roles = await ctx.context.adapter.findMany({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: input.organizationId
      }]
    });
    for (const { role: role2, permission: permissionsString } of roles) {
      if (role2 in acRoles) continue;
      const result = z.record(z.string(), z.array(z.string())).safeParse(JSON.parse(permissionsString));
      if (!result.success) {
        ctx.context.logger.error("[hasPermission] Invalid permissions for role " + role2, { permissions: JSON.parse(permissionsString) });
        throw new APIError("INTERNAL_SERVER_ERROR", { message: "Invalid permissions for role " + role2 });
      }
      acRoles[role2] = input.options.ac.newRole(result.data);
    }
  }
  if (input.useMemoryCache) acRoles = cacheAllRoles.get(input.organizationId) || acRoles;
  cacheAllRoles.set(input.organizationId, acRoles);
  return hasPermissionFn(input, acRoles);
};
const normalizeRoleName = (role2) => role2.toLowerCase();
const DEFAULT_MAXIMUM_ROLES_PER_ORGANIZATION = Number.POSITIVE_INFINITY;
const getAdditionalFields = (options, shouldBePartial = false) => {
  let additionalFields = {};
  if (shouldBePartial) for (const key in additionalFields) additionalFields[key].required = false;
  return {
    additionalFieldsSchema: toZodSchema({
      fields: additionalFields,
      isClientSide: true
    }),
    $AdditionalFields: {},
    $ReturnAdditionalFields: {}
  };
};
const baseCreateOrgRoleSchema = z.object({
  organizationId: z.string().optional().meta({ description: "The id of the organization to create the role in. If not provided, the user's active organization will be used." }),
  role: z.string().meta({ description: "The name of the role to create" }),
  permission: z.record(z.string(), z.array(z.string())).meta({ description: "The permission to assign to the role" })
});
const createOrgRole = (options) => {
  const { additionalFieldsSchema } = getAdditionalFields(options, false);
  return createAuthEndpoint("/organization/create-role", {
    method: "POST",
    body: baseCreateOrgRoleSchema.safeExtend({ additionalFields: z.object({ ...additionalFieldsSchema.shape }).optional() }),
    metadata: { $Infer: { body: {} } },
    requireHeaders: true,
    use: [orgSessionMiddleware]
  }, async (ctx) => {
    const { session: session2, user: user2 } = ctx.context.session;
    let roleName = ctx.body.role;
    const permission = ctx.body.permission;
    const additionalFields = ctx.body.additionalFields;
    const ac2 = options.ac;
    if (!ac2) {
      ctx.context.logger.error(`[Dynamic Access Control] The organization plugin is missing a pre-defined ac instance.`, `
Please refer to the documentation here: https://better-auth.com/docs/plugins/organization#dynamic-access-control`);
      throw new APIError("NOT_IMPLEMENTED", { message: ORGANIZATION_ERROR_CODES.MISSING_AC_INSTANCE });
    }
    const organizationId = ctx.body.organizationId ?? session2.activeOrganizationId;
    if (!organizationId) {
      ctx.context.logger.error(`[Dynamic Access Control] The session is missing an active organization id to create a role. Either set an active org id, or pass an organizationId in the request body.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE });
    }
    roleName = normalizeRoleName(roleName);
    await checkIfRoleNameIsTakenByPreDefinedRole({
      role: roleName,
      organizationId,
      options,
      ctx
    });
    const member2 = await ctx.context.adapter.findOne({
      model: "member",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, {
        field: "userId",
        value: user2.id,
        operator: "eq",
        connector: "AND"
      }]
    });
    if (!member2) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not a member of the organization to create a role.`, {
        userId: user2.id,
        organizationId
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
    }
    if (!await hasPermission({
      options,
      organizationId,
      permissions: { ac: ["create"] },
      role: member2.role
    }, ctx)) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not permitted to create a role. If this is unexpected, please make sure the role associated to that member has the "ac" resource with the "create" permission.`, {
        userId: user2.id,
        organizationId,
        role: member2.role
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE });
    }
    const maximumRolesPerOrganization = typeof options.dynamicAccessControl?.maximumRolesPerOrganization === "function" ? await options.dynamicAccessControl.maximumRolesPerOrganization(organizationId) : options.dynamicAccessControl?.maximumRolesPerOrganization ?? DEFAULT_MAXIMUM_ROLES_PER_ORGANIZATION;
    const rolesInDB = await ctx.context.adapter.count({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }]
    });
    if (rolesInDB >= maximumRolesPerOrganization) {
      ctx.context.logger.error(`[Dynamic Access Control] Failed to create a new role, the organization has too many roles. Maximum allowed roles is ${maximumRolesPerOrganization}.`, {
        organizationId,
        maximumRolesPerOrganization,
        rolesInDB
      });
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TOO_MANY_ROLES });
    }
    await checkForInvalidResources({
      ac: ac2,
      ctx,
      permission
    });
    await checkIfMemberHasPermission({
      ctx,
      member: member2,
      options,
      organizationId,
      permissionRequired: permission,
      user: user2,
      action: "create"
    });
    await checkIfRoleNameIsTakenByRoleInDB({
      ctx,
      organizationId,
      role: roleName
    });
    const newRole = ac2.newRole(permission);
    const data = {
      ...await ctx.context.adapter.create({
        model: "organizationRole",
        data: {
          createdAt: /* @__PURE__ */ new Date(),
          organizationId,
          permission: JSON.stringify(permission),
          role: roleName,
          ...additionalFields
        }
      }),
      permission
    };
    return ctx.json({
      success: true,
      roleData: data,
      statements: newRole.statements
    });
  });
};
const deleteOrgRoleBodySchema = z.object({ organizationId: z.string().optional().meta({ description: "The id of the organization to create the role in. If not provided, the user's active organization will be used." }) }).and(z.union([z.object({ roleName: z.string().nonempty().meta({ description: "The name of the role to delete" }) }), z.object({ roleId: z.string().nonempty().meta({ description: "The id of the role to delete" }) })]));
const deleteOrgRole = (options) => {
  return createAuthEndpoint("/organization/delete-role", {
    method: "POST",
    body: deleteOrgRoleBodySchema,
    requireHeaders: true,
    use: [orgSessionMiddleware],
    metadata: { $Infer: { body: {} } }
  }, async (ctx) => {
    const { session: session2, user: user2 } = ctx.context.session;
    const organizationId = ctx.body.organizationId ?? session2.activeOrganizationId;
    if (!organizationId) {
      ctx.context.logger.error(`[Dynamic Access Control] The session is missing an active organization id to delete a role. Either set an active org id, or pass an organizationId in the request body.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
    }
    const member2 = await ctx.context.adapter.findOne({
      model: "member",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, {
        field: "userId",
        value: user2.id,
        operator: "eq",
        connector: "AND"
      }]
    });
    if (!member2) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not a member of the organization to delete a role.`, {
        userId: user2.id,
        organizationId
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
    }
    if (!await hasPermission({
      options,
      organizationId,
      permissions: { ac: ["delete"] },
      role: member2.role
    }, ctx)) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not permitted to delete a role. If this is unexpected, please make sure the role associated to that member has the "ac" resource with the "delete" permission.`, {
        userId: user2.id,
        organizationId,
        role: member2.role
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE });
    }
    if (ctx.body.roleName) {
      const roleName = ctx.body.roleName;
      const defaultRoles2 = options.roles ? Object.keys(options.roles) : [
        "owner",
        "admin",
        "member"
      ];
      if (defaultRoles2.includes(roleName)) {
        ctx.context.logger.error(`[Dynamic Access Control] Cannot delete a pre-defined role.`, {
          roleName,
          organizationId,
          defaultRoles: defaultRoles2
        });
        throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.CANNOT_DELETE_A_PRE_DEFINED_ROLE });
      }
    }
    let condition;
    if (ctx.body.roleName) condition = {
      field: "role",
      value: ctx.body.roleName,
      operator: "eq",
      connector: "AND"
    };
    else if (ctx.body.roleId) condition = {
      field: "id",
      value: ctx.body.roleId,
      operator: "eq",
      connector: "AND"
    };
    else {
      ctx.context.logger.error(`[Dynamic Access Control] The role name/id is not provided in the request body.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND });
    }
    const existingRoleInDB = await ctx.context.adapter.findOne({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, condition]
    });
    if (!existingRoleInDB) {
      ctx.context.logger.error(`[Dynamic Access Control] The role name/id does not exist in the database.`, {
        ..."roleName" in ctx.body ? { roleName: ctx.body.roleName } : { roleId: ctx.body.roleId },
        organizationId
      });
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND });
    }
    existingRoleInDB.permission = JSON.parse(existingRoleInDB.permission);
    await ctx.context.adapter.delete({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, condition]
    });
    return ctx.json({ success: true });
  });
};
const listOrgRolesQuerySchema = z.object({ organizationId: z.string().optional().meta({ description: "The id of the organization to list roles for. If not provided, the user's active organization will be used." }) }).optional();
const listOrgRoles = (options) => {
  getAdditionalFields(options, false);
  return createAuthEndpoint("/organization/list-roles", {
    method: "GET",
    requireHeaders: true,
    use: [orgSessionMiddleware],
    query: listOrgRolesQuerySchema
  }, async (ctx) => {
    const { session: session2, user: user2 } = ctx.context.session;
    const organizationId = ctx.query?.organizationId ?? session2.activeOrganizationId;
    if (!organizationId) {
      ctx.context.logger.error(`[Dynamic Access Control] The session is missing an active organization id to list roles. Either set an active org id, or pass an organizationId in the request query.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
    }
    const member2 = await ctx.context.adapter.findOne({
      model: "member",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, {
        field: "userId",
        value: user2.id,
        operator: "eq",
        connector: "AND"
      }]
    });
    if (!member2) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not a member of the organization to list roles.`, {
        userId: user2.id,
        organizationId
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
    }
    if (!await hasPermission({
      options,
      organizationId,
      permissions: { ac: ["read"] },
      role: member2.role
    }, ctx)) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not permitted to list roles.`, {
        userId: user2.id,
        organizationId,
        role: member2.role
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE });
    }
    let roles = await ctx.context.adapter.findMany({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }]
    });
    roles = roles.map((x) => ({
      ...x,
      permission: JSON.parse(x.permission)
    }));
    return ctx.json(roles);
  });
};
const getOrgRoleQuerySchema = z.object({ organizationId: z.string().optional().meta({ description: "The id of the organization to read a role for. If not provided, the user's active organization will be used." }) }).and(z.union([z.object({ roleName: z.string().nonempty().meta({ description: "The name of the role to read" }) }), z.object({ roleId: z.string().nonempty().meta({ description: "The id of the role to read" }) })])).optional();
const getOrgRole = (options) => {
  getAdditionalFields(options, false);
  return createAuthEndpoint("/organization/get-role", {
    method: "GET",
    requireHeaders: true,
    use: [orgSessionMiddleware],
    query: getOrgRoleQuerySchema,
    metadata: { $Infer: { query: {} } }
  }, async (ctx) => {
    const { session: session2, user: user2 } = ctx.context.session;
    const organizationId = ctx.query?.organizationId ?? session2.activeOrganizationId;
    if (!organizationId) {
      ctx.context.logger.error(`[Dynamic Access Control] The session is missing an active organization id to read a role. Either set an active org id, or pass an organizationId in the request query.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
    }
    const member2 = await ctx.context.adapter.findOne({
      model: "member",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, {
        field: "userId",
        value: user2.id,
        operator: "eq",
        connector: "AND"
      }]
    });
    if (!member2) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not a member of the organization to read a role.`, {
        userId: user2.id,
        organizationId
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
    }
    if (!await hasPermission({
      options,
      organizationId,
      permissions: { ac: ["read"] },
      role: member2.role
    }, ctx)) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not permitted to read a role.`, {
        userId: user2.id,
        organizationId,
        role: member2.role
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE });
    }
    let condition;
    if (ctx.query.roleName) condition = {
      field: "role",
      value: ctx.query.roleName,
      operator: "eq",
      connector: "AND"
    };
    else if (ctx.query.roleId) condition = {
      field: "id",
      value: ctx.query.roleId,
      operator: "eq",
      connector: "AND"
    };
    else {
      ctx.context.logger.error(`[Dynamic Access Control] The role name/id is not provided in the request query.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND });
    }
    let role2 = await ctx.context.adapter.findOne({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, condition]
    });
    if (!role2) {
      ctx.context.logger.error(`[Dynamic Access Control] The role name/id does not exist in the database.`, {
        ..."roleName" in ctx.query ? { roleName: ctx.query.roleName } : { roleId: ctx.query.roleId },
        organizationId
      });
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND });
    }
    role2.permission = JSON.parse(role2.permission);
    return ctx.json(role2);
  });
};
const roleNameOrIdSchema = z.union([z.object({ roleName: z.string().nonempty().meta({ description: "The name of the role to update" }) }), z.object({ roleId: z.string().nonempty().meta({ description: "The id of the role to update" }) })]);
const updateOrgRole = (options) => {
  const { additionalFieldsSchema } = getAdditionalFields(options, true);
  return createAuthEndpoint("/organization/update-role", {
    method: "POST",
    body: z.object({
      organizationId: z.string().optional().meta({ description: "The id of the organization to update the role in. If not provided, the user's active organization will be used." }),
      data: z.object({
        permission: z.record(z.string(), z.array(z.string())).optional().meta({ description: "The permission to update the role with" }),
        roleName: z.string().optional().meta({ description: "The name of the role to update" }),
        ...additionalFieldsSchema.shape
      })
    }).and(roleNameOrIdSchema),
    metadata: { $Infer: { body: {} } },
    requireHeaders: true,
    use: [orgSessionMiddleware]
  }, async (ctx) => {
    const { session: session2, user: user2 } = ctx.context.session;
    const ac2 = options.ac;
    if (!ac2) {
      ctx.context.logger.error(`[Dynamic Access Control] The organization plugin is missing a pre-defined ac instance.`, `
Please refer to the documentation here: https://better-auth.com/docs/plugins/organization#dynamic-access-control`);
      throw new APIError("NOT_IMPLEMENTED", { message: ORGANIZATION_ERROR_CODES.MISSING_AC_INSTANCE });
    }
    const organizationId = ctx.body.organizationId ?? session2.activeOrganizationId;
    if (!organizationId) {
      ctx.context.logger.error(`[Dynamic Access Control] The session is missing an active organization id to update a role. Either set an active org id, or pass an organizationId in the request body.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
    }
    const member2 = await ctx.context.adapter.findOne({
      model: "member",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, {
        field: "userId",
        value: user2.id,
        operator: "eq",
        connector: "AND"
      }]
    });
    if (!member2) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not a member of the organization to update a role.`, {
        userId: user2.id,
        organizationId
      });
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
    }
    if (!await hasPermission({
      options,
      organizationId,
      role: member2.role,
      permissions: { ac: ["update"] }
    }, ctx)) {
      ctx.context.logger.error(`[Dynamic Access Control] The user is not permitted to update a role.`);
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE });
    }
    let condition;
    if (ctx.body.roleName) condition = {
      field: "role",
      value: ctx.body.roleName,
      operator: "eq",
      connector: "AND"
    };
    else if (ctx.body.roleId) condition = {
      field: "id",
      value: ctx.body.roleId,
      operator: "eq",
      connector: "AND"
    };
    else {
      ctx.context.logger.error(`[Dynamic Access Control] The role name/id is not provided in the request body.`);
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND });
    }
    let role2 = await ctx.context.adapter.findOne({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, condition]
    });
    if (!role2) {
      ctx.context.logger.error(`[Dynamic Access Control] The role name/id does not exist in the database.`, {
        ..."roleName" in ctx.body ? { roleName: ctx.body.roleName } : { roleId: ctx.body.roleId },
        organizationId
      });
      throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND });
    }
    role2.permission = role2.permission ? JSON.parse(role2.permission) : void 0;
    const { permission: _, roleName: __, ...additionalFields } = ctx.body.data;
    let updateData = { ...additionalFields };
    if (ctx.body.data.permission) {
      let newPermission = ctx.body.data.permission;
      await checkForInvalidResources({
        ac: ac2,
        ctx,
        permission: newPermission
      });
      await checkIfMemberHasPermission({
        ctx,
        member: member2,
        options,
        organizationId,
        permissionRequired: newPermission,
        user: user2,
        action: "update"
      });
      updateData.permission = newPermission;
    }
    if (ctx.body.data.roleName) {
      let newRoleName = ctx.body.data.roleName;
      newRoleName = normalizeRoleName(newRoleName);
      await checkIfRoleNameIsTakenByPreDefinedRole({
        role: newRoleName,
        organizationId,
        options,
        ctx
      });
      await checkIfRoleNameIsTakenByRoleInDB({
        role: newRoleName,
        organizationId,
        ctx
      });
      updateData.role = newRoleName;
    }
    const update = {
      ...updateData,
      ...updateData.permission ? { permission: JSON.stringify(updateData.permission) } : {}
    };
    await ctx.context.adapter.update({
      model: "organizationRole",
      where: [{
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      }, condition],
      update
    });
    return ctx.json({
      success: true,
      roleData: {
        ...role2,
        ...update,
        permission: updateData.permission || role2.permission || null
      }
    });
  });
};
async function checkForInvalidResources({ ac: ac2, ctx, permission }) {
  const validResources = Object.keys(ac2.statements);
  const providedResources = Object.keys(permission);
  if (providedResources.some((r) => !validResources.includes(r))) {
    ctx.context.logger.error(`[Dynamic Access Control] The provided permission includes an invalid resource.`, {
      providedResources,
      validResources
    });
    throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.INVALID_RESOURCE });
  }
}
async function checkIfMemberHasPermission({ ctx, permissionRequired: permission, options, organizationId, member: member2, user: user2, action }) {
  const hasNecessaryPermissions = [];
  const permissionEntries = Object.entries(permission);
  for await (const [resource, permissions] of permissionEntries) for await (const perm of permissions) hasNecessaryPermissions.push({
    resource: { [resource]: [perm] },
    hasPermission: await hasPermission({
      options,
      organizationId,
      permissions: { [resource]: [perm] },
      useMemoryCache: true,
      role: member2.role
    }, ctx)
  });
  const missingPermissions = hasNecessaryPermissions.filter((x) => x.hasPermission === false).map((x) => {
    const key = Object.keys(x.resource)[0];
    return `${key}:${x.resource[key][0]}`;
  });
  if (missingPermissions.length > 0) {
    ctx.context.logger.error(`[Dynamic Access Control] The user is missing permissions necessary to ${action} a role with those set of permissions.
`, {
      userId: user2.id,
      organizationId,
      role: member2.role,
      missingPermissions
    });
    let errorMessage;
    if (action === "create") errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE;
    else if (action === "update") errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE;
    else if (action === "delete") errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE;
    else if (action === "read") errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE;
    else if (action === "list") errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE;
    else errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE;
    throw new APIError("FORBIDDEN", {
      message: errorMessage,
      missingPermissions
    });
  }
}
async function checkIfRoleNameIsTakenByPreDefinedRole({ options, organizationId, role: role2, ctx }) {
  const defaultRoles2 = options.roles ? Object.keys(options.roles) : [
    "owner",
    "admin",
    "member"
  ];
  if (defaultRoles2.includes(role2)) {
    ctx.context.logger.error(`[Dynamic Access Control] The role name "${role2}" is already taken by a pre-defined role.`, {
      role: role2,
      organizationId,
      defaultRoles: defaultRoles2
    });
    throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NAME_IS_ALREADY_TAKEN });
  }
}
async function checkIfRoleNameIsTakenByRoleInDB({ organizationId, role: role2, ctx }) {
  if (await ctx.context.adapter.findOne({
    model: "organizationRole",
    where: [{
      field: "organizationId",
      value: organizationId,
      operator: "eq",
      connector: "AND"
    }, {
      field: "role",
      value: role2,
      operator: "eq",
      connector: "AND"
    }]
  })) {
    ctx.context.logger.error(`[Dynamic Access Control] The role name "${role2}" is already taken by a role in the database.`, {
      role: role2,
      organizationId
    });
    throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ROLE_NAME_IS_ALREADY_TAKEN });
  }
}
const baseInvitationSchema = z.object({
  email: z.string().meta({ description: "The email address of the user to invite" }),
  role: z.union([z.string().meta({ description: "The role to assign to the user" }), z.array(z.string().meta({ description: "The roles to assign to the user" }))]).meta({ description: 'The role(s) to assign to the user. It can be `admin`, `member`, owner. Eg: "member"' }),
  organizationId: z.string().meta({ description: "The organization ID to invite the user to" }).optional(),
  resend: z.boolean().meta({ description: "Resend the invitation email, if the user is already invited. Eg: true" }).optional(),
  teamId: z.union([z.string().meta({ description: "The team ID to invite the user to" }).optional(), z.array(z.string()).meta({ description: "The team IDs to invite the user to" }).optional()])
});
const createInvitation = (option) => {
  const additionalFieldsSchema = toZodSchema({
    fields: {},
    isClientSide: true
  });
  return createAuthEndpoint("/organization/invite-member", {
    method: "POST",
    requireHeaders: true,
    use: [orgMiddleware, orgSessionMiddleware],
    body: z.object({
      ...baseInvitationSchema.shape,
      ...additionalFieldsSchema.shape
    }),
    metadata: {
      $Infer: { body: {} },
      openapi: {
        operationId: "createOrganizationInvitation",
        description: "Create an invitation to an organization",
        responses: { "200": {
          description: "Success",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
              organizationId: { type: "string" },
              inviterId: { type: "string" },
              status: { type: "string" },
              expiresAt: { type: "string" },
              createdAt: { type: "string" }
            },
            required: [
              "id",
              "email",
              "role",
              "organizationId",
              "inviterId",
              "status",
              "expiresAt",
              "createdAt"
            ]
          } } }
        } }
      }
    }
  }, async (ctx) => {
    const session2 = ctx.context.session;
    const organizationId = ctx.body.organizationId || session2.session.activeOrganizationId;
    if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    const email = ctx.body.email.toLowerCase();
    if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
    const adapter = getOrgAdapter(ctx.context, option);
    const member2 = await adapter.findMemberByOrgId({
      userId: session2.user.id,
      organizationId
    });
    if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
    if (!await hasPermission({
      role: member2.role,
      options: ctx.context.orgOptions,
      permissions: { invitation: ["create"] },
      organizationId
    }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION });
    const creatorRole = ctx.context.orgOptions.creatorRole || "owner";
    const roles = parseRoles(ctx.body.role);
    if (member2.role !== creatorRole && roles.split(",").includes(creatorRole)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE });
    if (await adapter.findMemberByEmail({
      email,
      organizationId
    })) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION });
    const alreadyInvited = await adapter.findPendingInvitation({
      email,
      organizationId
    });
    if (alreadyInvited.length && !ctx.body.resend) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION });
    const organization2 = await adapter.findOrganizationById(organizationId);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    if (alreadyInvited.length && ctx.body.resend) {
      const existingInvitation = alreadyInvited[0];
      const newExpiresAt = getDate(ctx.context.orgOptions.invitationExpiresIn || 3600 * 48, "sec");
      await ctx.context.adapter.update({
        model: "invitation",
        where: [{
          field: "id",
          value: existingInvitation.id
        }],
        update: { expiresAt: newExpiresAt }
      });
      const updatedInvitation = {
        ...existingInvitation,
        expiresAt: newExpiresAt
      };
      await ctx.context.orgOptions.sendInvitationEmail?.({
        id: updatedInvitation.id,
        role: updatedInvitation.role,
        email: updatedInvitation.email.toLowerCase(),
        organization: organization2,
        inviter: {
          ...member2,
          user: session2.user
        },
        invitation: updatedInvitation
      }, ctx.request);
      return ctx.json(updatedInvitation);
    }
    if (alreadyInvited.length && ctx.context.orgOptions.cancelPendingInvitationsOnReInvite) await adapter.updateInvitation({
      invitationId: alreadyInvited[0].id,
      status: "canceled"
    });
    const invitationLimit = typeof ctx.context.orgOptions.invitationLimit === "function" ? await ctx.context.orgOptions.invitationLimit({
      user: session2.user,
      organization: organization2,
      member: member2
    }, ctx.context) : ctx.context.orgOptions.invitationLimit ?? 100;
    if ((await adapter.findPendingInvitations({ organizationId })).length >= invitationLimit) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.INVITATION_LIMIT_REACHED });
    if (ctx.context.orgOptions.teams && ctx.context.orgOptions.teams.enabled && typeof ctx.context.orgOptions.teams.maximumMembersPerTeam !== "undefined" && "teamId" in ctx.body && ctx.body.teamId) {
      const teamIds$1 = typeof ctx.body.teamId === "string" ? [ctx.body.teamId] : ctx.body.teamId;
      for (const teamId of teamIds$1) {
        const team = await adapter.findTeamById({
          teamId,
          organizationId,
          includeTeamMembers: true
        });
        if (!team) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
        const maximumMembersPerTeam = typeof ctx.context.orgOptions.teams.maximumMembersPerTeam === "function" ? await ctx.context.orgOptions.teams.maximumMembersPerTeam({
          teamId,
          session: session2,
          organizationId
        }) : ctx.context.orgOptions.teams.maximumMembersPerTeam;
        if (team.members.length >= maximumMembersPerTeam) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.TEAM_MEMBER_LIMIT_REACHED });
      }
    }
    const teamIds = "teamId" in ctx.body ? typeof ctx.body.teamId === "string" ? [ctx.body.teamId] : ctx.body.teamId ?? [] : [];
    const { email: _, role: __, organizationId: ___, resend: ____, ...additionalFields } = ctx.body;
    let invitationData = {
      role: roles,
      email,
      organizationId,
      teamIds,
      ...additionalFields ? additionalFields : {}
    };
    const invitation2 = await adapter.createInvitation({
      invitation: invitationData,
      user: session2.user
    });
    await ctx.context.orgOptions.sendInvitationEmail?.({
      id: invitation2.id,
      role: invitation2.role,
      email: invitation2.email.toLowerCase(),
      organization: organization2,
      inviter: {
        ...member2,
        user: session2.user
      },
      invitation: invitation2
    }, ctx.request);
    return ctx.json(invitation2);
  });
};
const acceptInvitationBodySchema = z.object({ invitationId: z.string().meta({ description: "The ID of the invitation to accept" }) });
const acceptInvitation = (options) => createAuthEndpoint("/organization/accept-invitation", {
  method: "POST",
  body: acceptInvitationBodySchema,
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware],
  metadata: { openapi: {
    description: "Accept an invitation to an organization",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          invitation: { type: "object" },
          member: { type: "object" }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, options);
  const invitation2 = await adapter.findInvitationById(ctx.body.invitationId);
  if (!invitation2 || invitation2.expiresAt < /* @__PURE__ */ new Date() || invitation2.status !== "pending") throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.INVITATION_NOT_FOUND });
  if (invitation2.email.toLowerCase() !== session2.user.email.toLowerCase()) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION });
  if (ctx.context.orgOptions.requireEmailVerificationOnInvitation && !session2.user.emailVerified) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION });
  const membershipLimit = ctx.context.orgOptions?.membershipLimit || 100;
  if (await adapter.countMembers({ organizationId: invitation2.organizationId }) >= membershipLimit) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_MEMBERSHIP_LIMIT_REACHED });
  const organization2 = await adapter.findOrganizationById(invitation2.organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const acceptedI = await adapter.updateInvitation({
    invitationId: ctx.body.invitationId,
    status: "accepted"
  });
  if (!acceptedI) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.FAILED_TO_RETRIEVE_INVITATION });
  if (ctx.context.orgOptions.teams && ctx.context.orgOptions.teams.enabled && "teamId" in acceptedI && acceptedI.teamId) {
    const teamIds = acceptedI.teamId.split(",");
    const onlyOne = teamIds.length === 1;
    for (const teamId of teamIds) {
      await adapter.findOrCreateTeamMember({
        teamId,
        userId: session2.user.id
      });
      if (typeof ctx.context.orgOptions.teams.maximumMembersPerTeam !== "undefined") {
        if (await adapter.countTeamMembers({ teamId }) >= (typeof ctx.context.orgOptions.teams.maximumMembersPerTeam === "function" ? await ctx.context.orgOptions.teams.maximumMembersPerTeam({
          teamId,
          session: session2,
          organizationId: invitation2.organizationId
        }) : ctx.context.orgOptions.teams.maximumMembersPerTeam)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.TEAM_MEMBER_LIMIT_REACHED });
      }
    }
    if (onlyOne) {
      const teamId = teamIds[0];
      await setSessionCookie(ctx, {
        session: await adapter.setActiveTeam(session2.session.token, teamId, ctx),
        user: session2.user
      });
    }
  }
  const member2 = await adapter.createMember({
    organizationId: invitation2.organizationId,
    userId: session2.user.id,
    role: invitation2.role,
    createdAt: /* @__PURE__ */ new Date()
  });
  await adapter.setActiveOrganization(session2.session.token, invitation2.organizationId, ctx);
  if (!acceptedI) return ctx.json(null, {
    status: 400,
    body: { message: ORGANIZATION_ERROR_CODES.INVITATION_NOT_FOUND }
  });
  return ctx.json({
    invitation: acceptedI,
    member: member2
  });
});
const rejectInvitationBodySchema = z.object({ invitationId: z.string().meta({ description: "The ID of the invitation to reject" }) });
const rejectInvitation = (options) => createAuthEndpoint("/organization/reject-invitation", {
  method: "POST",
  body: rejectInvitationBodySchema,
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware],
  metadata: { openapi: {
    description: "Reject an invitation to an organization",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          invitation: { type: "object" },
          member: {
            type: "object",
            nullable: true
          }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
  const invitation2 = await adapter.findInvitationById(ctx.body.invitationId);
  if (!invitation2 || invitation2.expiresAt < /* @__PURE__ */ new Date() || invitation2.status !== "pending") throw new APIError("BAD_REQUEST", { message: "Invitation not found!" });
  if (invitation2.email.toLowerCase() !== session2.user.email.toLowerCase()) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION });
  if (ctx.context.orgOptions.requireEmailVerificationOnInvitation && !session2.user.emailVerified) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION });
  const organization2 = await adapter.findOrganizationById(invitation2.organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const rejectedI = await adapter.updateInvitation({
    invitationId: ctx.body.invitationId,
    status: "rejected"
  });
  return ctx.json({
    invitation: rejectedI,
    member: null
  });
});
const cancelInvitationBodySchema = z.object({ invitationId: z.string().meta({ description: "The ID of the invitation to cancel" }) });
const cancelInvitation = (options) => createAuthEndpoint("/organization/cancel-invitation", {
  method: "POST",
  body: cancelInvitationBodySchema,
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware],
  openapi: {
    operationId: "cancelOrganizationInvitation",
    description: "Cancel an invitation to an organization",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { invitation: { type: "object" } }
      } } }
    } }
  }
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, options);
  const invitation2 = await adapter.findInvitationById(ctx.body.invitationId);
  if (!invitation2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.INVITATION_NOT_FOUND });
  const member2 = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId: invitation2.organizationId
  });
  if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  if (!await hasPermission({
    role: member2.role,
    options: ctx.context.orgOptions,
    permissions: { invitation: ["cancel"] },
    organizationId: invitation2.organizationId
  }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION });
  const organization2 = await adapter.findOrganizationById(invitation2.organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const canceledI = await adapter.updateInvitation({
    invitationId: ctx.body.invitationId,
    status: "canceled"
  });
  return ctx.json(canceledI);
});
const getInvitationQuerySchema = z.object({ id: z.string().meta({ description: "The ID of the invitation to get" }) });
const getInvitation = (options) => createAuthEndpoint("/organization/get-invitation", {
  method: "GET",
  use: [orgMiddleware],
  requireHeaders: true,
  query: getInvitationQuerySchema,
  metadata: { openapi: {
    description: "Get an invitation by ID",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
          organizationId: { type: "string" },
          inviterId: { type: "string" },
          status: { type: "string" },
          expiresAt: { type: "string" },
          organizationName: { type: "string" },
          organizationSlug: { type: "string" },
          inviterEmail: { type: "string" }
        },
        required: [
          "id",
          "email",
          "role",
          "organizationId",
          "inviterId",
          "status",
          "expiresAt",
          "organizationName",
          "organizationSlug",
          "inviterEmail"
        ]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED", { message: "Not authenticated" });
  const adapter = getOrgAdapter(ctx.context, options);
  const invitation2 = await adapter.findInvitationById(ctx.query.id);
  if (!invitation2 || invitation2.status !== "pending" || invitation2.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", { message: "Invitation not found!" });
  if (invitation2.email.toLowerCase() !== session2.user.email.toLowerCase()) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION });
  const organization2 = await adapter.findOrganizationById(invitation2.organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const member2 = await adapter.findMemberByOrgId({
    userId: invitation2.inviterId,
    organizationId: invitation2.organizationId
  });
  if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION });
  return ctx.json({
    ...invitation2,
    organizationName: organization2.name,
    organizationSlug: organization2.slug,
    inviterEmail: member2.user.email
  });
});
const listInvitationQuerySchema = z.object({ organizationId: z.string().meta({ description: "The ID of the organization to list invitations for" }).optional() }).optional();
const listInvitations = (options) => createAuthEndpoint("/organization/list-invitations", {
  method: "GET",
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware],
  query: listInvitationQuerySchema
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED", { message: "Not authenticated" });
  const orgId = ctx.query?.organizationId || session2.session.activeOrganizationId;
  if (!orgId) throw new APIError("BAD_REQUEST", { message: "Organization ID is required" });
  const adapter = getOrgAdapter(ctx.context, options);
  if (!await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId: orgId
  })) throw new APIError("FORBIDDEN", { message: "You are not a member of this organization" });
  const invitations = await adapter.listInvitations({ organizationId: orgId });
  return ctx.json(invitations);
});
const listUserInvitations = (options) => createAuthEndpoint("/organization/list-user-invitations", {
  method: "GET",
  use: [orgMiddleware],
  query: z.object({ email: z.string().meta({ description: "The email of the user to list invitations for. This only works for server side API calls." }).optional() }).optional(),
  metadata: { openapi: {
    description: "List all invitations a user has received",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
            organizationId: { type: "string" },
            organizationName: { type: "string" },
            inviterId: {
              type: "string",
              description: "The ID of the user who created the invitation"
            },
            teamId: {
              type: "string",
              description: "The ID of the team associated with the invitation",
              nullable: true
            },
            status: { type: "string" },
            expiresAt: { type: "string" },
            createdAt: { type: "string" }
          },
          required: [
            "id",
            "email",
            "role",
            "organizationId",
            "organizationName",
            "inviterId",
            "status",
            "expiresAt",
            "createdAt"
          ]
        }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (ctx.request && ctx.query?.email) throw new APIError("BAD_REQUEST", { message: "User email cannot be passed for client side API calls." });
  const userEmail = session2?.user.email || ctx.query?.email;
  if (!userEmail) throw new APIError("BAD_REQUEST", { message: "Missing session headers, or email query parameter." });
  const invitations = await getOrgAdapter(ctx.context, options).listUserInvitations(userEmail);
  return ctx.json(invitations);
});
const baseMemberSchema = z.object({
  userId: z.coerce.string().meta({ description: 'The user Id which represents the user to be added as a member. If `null` is provided, then it\'s expected to provide session headers. Eg: "user-id"' }),
  role: z.union([z.string(), z.array(z.string())]).meta({ description: 'The role(s) to assign to the new member. Eg: ["admin", "sale"]' }),
  organizationId: z.string().meta({ description: `An optional organization ID to pass. If not provided, will default to the user's active organization. Eg: "org-id"` }).optional(),
  teamId: z.string().meta({ description: 'An optional team ID to add the member to. Eg: "team-id"' }).optional()
});
const addMember = (option) => {
  const additionalFieldsSchema = toZodSchema({
    fields: {},
    isClientSide: true
  });
  return createAuthEndpoint({
    method: "POST",
    body: z.object({
      ...baseMemberSchema.shape,
      ...additionalFieldsSchema.shape
    }),
    use: [orgMiddleware],
    metadata: {
      $Infer: { body: {} },
      openapi: {
        operationId: "addOrganizationMember",
        description: "Add a member to an organization"
      }
    }
  }, async (ctx) => {
    const session2 = ctx.body.userId ? await getSessionFromCtx(ctx).catch((e) => null) : null;
    const orgId = ctx.body.organizationId || session2?.session.activeOrganizationId;
    if (!orgId) return ctx.json(null, {
      status: 400,
      body: { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION }
    });
    const teamId = "teamId" in ctx.body ? ctx.body.teamId : void 0;
    if (teamId && !ctx.context.orgOptions.teams?.enabled) {
      ctx.context.logger.error("Teams are not enabled");
      throw new APIError("BAD_REQUEST", { message: "Teams are not enabled" });
    }
    const adapter = getOrgAdapter(ctx.context, option);
    const user2 = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
    if (!user2) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.USER_NOT_FOUND });
    if (await adapter.findMemberByEmail({
      email: user2.email,
      organizationId: orgId
    })) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION });
    if (teamId) {
      const team = await adapter.findTeamById({
        teamId,
        organizationId: orgId
      });
      if (!team || team.organizationId !== orgId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
    }
    const membershipLimit = ctx.context.orgOptions?.membershipLimit || 100;
    if (await adapter.countMembers({ organizationId: orgId }) >= membershipLimit) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_MEMBERSHIP_LIMIT_REACHED });
    const { role: _, userId: __, organizationId: ___, ...additionalFields } = ctx.body;
    const organization2 = await adapter.findOrganizationById(orgId);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    let memberData = {
      organizationId: orgId,
      userId: user2.id,
      role: parseRoles(ctx.body.role),
      createdAt: /* @__PURE__ */ new Date(),
      ...additionalFields ? additionalFields : {}
    };
    const createdMember = await adapter.createMember(memberData);
    if (teamId) await adapter.findOrCreateTeamMember({
      userId: user2.id,
      teamId
    });
    return ctx.json(createdMember);
  });
};
const removeMemberBodySchema = z.object({
  memberIdOrEmail: z.string().meta({ description: "The ID or email of the member to remove" }),
  organizationId: z.string().meta({ description: 'The ID of the organization to remove the member from. If not provided, the active organization will be used. Eg: "org-id"' }).optional()
});
const removeMember = (options) => createAuthEndpoint("/organization/remove-member", {
  method: "POST",
  body: removeMemberBodySchema,
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware],
  metadata: { openapi: {
    description: "Remove a member from an organization",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { member: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            organizationId: { type: "string" },
            role: { type: "string" }
          },
          required: [
            "id",
            "userId",
            "organizationId",
            "role"
          ]
        } },
        required: ["member"]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  const organizationId = ctx.body.organizationId || session2.session.activeOrganizationId;
  if (!organizationId) return ctx.json(null, {
    status: 400,
    body: { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION }
  });
  const adapter = getOrgAdapter(ctx.context, options);
  const member2 = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId
  });
  if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  let toBeRemovedMember = null;
  if (ctx.body.memberIdOrEmail.includes("@")) toBeRemovedMember = await adapter.findMemberByEmail({
    email: ctx.body.memberIdOrEmail,
    organizationId
  });
  else {
    const result = await adapter.findMemberById(ctx.body.memberIdOrEmail);
    if (!result) toBeRemovedMember = null;
    else {
      const { user: _user, ...member$1 } = result;
      toBeRemovedMember = member$1;
    }
  }
  if (!toBeRemovedMember) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  const roles = toBeRemovedMember.role.split(",");
  const creatorRole = ctx.context.orgOptions?.creatorRole || "owner";
  if (roles.includes(creatorRole)) {
    if (member2.role !== creatorRole) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER });
    const { members } = await adapter.listMembers({ organizationId });
    if (members.filter((member$1) => {
      return member$1.role.split(",").includes(creatorRole);
    }).length <= 1) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER });
  }
  if (!await hasPermission({
    role: member2.role,
    options: ctx.context.orgOptions,
    permissions: { member: ["delete"] },
    organizationId
  }, ctx)) throw new APIError("UNAUTHORIZED", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER });
  if (toBeRemovedMember?.organizationId !== organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  const organization2 = await adapter.findOrganizationById(organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const userBeingRemoved = await ctx.context.internalAdapter.findUserById(toBeRemovedMember.userId);
  if (!userBeingRemoved) throw new APIError("BAD_REQUEST", { message: "User not found" });
  await adapter.deleteMember({
    memberId: toBeRemovedMember.id,
    organizationId,
    userId: toBeRemovedMember.userId
  });
  if (session2.user.id === toBeRemovedMember.userId && session2.session.activeOrganizationId === toBeRemovedMember.organizationId) await adapter.setActiveOrganization(session2.session.token, null, ctx);
  return ctx.json({ member: toBeRemovedMember });
});
const updateMemberRoleBodySchema = z.object({
  role: z.union([z.string(), z.array(z.string())]).meta({ description: 'The new role to be applied. This can be a string or array of strings representing the roles. Eg: ["admin", "sale"]' }),
  memberId: z.string().meta({ description: 'The member id to apply the role update to. Eg: "member-id"' }),
  organizationId: z.string().meta({ description: 'An optional organization ID which the member is a part of to apply the role update. If not provided, you must provide session headers to get the active organization. Eg: "organization-id"' }).optional()
});
const updateMemberRole = (option) => createAuthEndpoint("/organization/update-member-role", {
  method: "POST",
  body: updateMemberRoleBodySchema,
  use: [orgMiddleware, orgSessionMiddleware],
  requireHeaders: true,
  metadata: {
    $Infer: { body: {} },
    openapi: {
      operationId: "updateOrganizationMemberRole",
      description: "Update the role of a member in an organization",
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { member: {
            type: "object",
            properties: {
              id: { type: "string" },
              userId: { type: "string" },
              organizationId: { type: "string" },
              role: { type: "string" }
            },
            required: [
              "id",
              "userId",
              "organizationId",
              "role"
            ]
          } },
          required: ["member"]
        } } }
      } }
    }
  }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!ctx.body.role) throw new APIError("BAD_REQUEST");
  const organizationId = ctx.body.organizationId || session2.session.activeOrganizationId;
  if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
  const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
  const roleToSet = Array.isArray(ctx.body.role) ? ctx.body.role : ctx.body.role ? [ctx.body.role] : [];
  const member2 = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId
  });
  if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  const toBeUpdatedMember = member2.id !== ctx.body.memberId ? await adapter.findMemberById(ctx.body.memberId) : member2;
  if (!toBeUpdatedMember) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  if (!(toBeUpdatedMember.organizationId === organizationId)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER });
  const creatorRole = ctx.context.orgOptions?.creatorRole || "owner";
  const updatingMemberRoles = member2.role.split(",");
  const isUpdatingCreator = toBeUpdatedMember.role.split(",").includes(creatorRole);
  const updaterIsCreator = updatingMemberRoles.includes(creatorRole);
  const isSettingCreatorRole = roleToSet.includes(creatorRole);
  const memberIsUpdatingThemselves = member2.id === toBeUpdatedMember.id;
  if (isUpdatingCreator && !updaterIsCreator || isSettingCreatorRole && !updaterIsCreator) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER });
  if (updaterIsCreator && memberIsUpdatingThemselves) {
    if ((await ctx.context.adapter.findMany({
      model: "member",
      where: [{
        field: "organizationId",
        value: organizationId
      }]
    })).filter((member$1) => {
      return member$1.role.split(",").includes(creatorRole);
    }).length <= 1 && !isSettingCreatorRole) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER });
  }
  if (!await hasPermission({
    role: member2.role,
    options: ctx.context.orgOptions,
    permissions: { member: ["update"] },
    allowCreatorAllPermissions: true,
    organizationId
  }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER });
  const organization2 = await adapter.findOrganizationById(organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const userBeingUpdated = await ctx.context.internalAdapter.findUserById(toBeUpdatedMember.userId);
  if (!userBeingUpdated) throw new APIError("BAD_REQUEST", { message: "User not found" });
  toBeUpdatedMember.role;
  const newRole = parseRoles(ctx.body.role);
  const updatedMember = await adapter.updateMember(ctx.body.memberId, newRole);
  if (!updatedMember) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  return ctx.json(updatedMember);
});
const getActiveMember = (options) => createAuthEndpoint("/organization/get-active-member", {
  method: "GET",
  use: [orgMiddleware, orgSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Get the member details of the active organization",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          organizationId: { type: "string" },
          role: { type: "string" }
        },
        required: [
          "id",
          "userId",
          "organizationId",
          "role"
        ]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  const organizationId = session2.session.activeOrganizationId;
  if (!organizationId) return ctx.json(null, {
    status: 400,
    body: { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION }
  });
  const member2 = await getOrgAdapter(ctx.context, options).findMemberByOrgId({
    userId: session2.user.id,
    organizationId
  });
  if (!member2) return ctx.json(null, {
    status: 400,
    body: { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND }
  });
  return ctx.json(member2);
});
const leaveOrganizationBodySchema = z.object({ organizationId: z.string().meta({ description: 'The organization Id for the member to leave. Eg: "organization-id"' }) });
const leaveOrganization = (options) => createAuthEndpoint("/organization/leave", {
  method: "POST",
  body: leaveOrganizationBodySchema,
  requireHeaders: true,
  use: [sessionMiddleware, orgMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, options);
  const member2 = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId: ctx.body.organizationId
  });
  if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND });
  const creatorRole = ctx.context.orgOptions?.creatorRole || "owner";
  if (member2.role.split(",").includes(creatorRole)) {
    if ((await ctx.context.adapter.findMany({
      model: "member",
      where: [{
        field: "organizationId",
        value: ctx.body.organizationId
      }]
    })).filter((member$1) => member$1.role.split(",").includes(creatorRole)).length <= 1) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER });
  }
  await adapter.deleteMember({
    memberId: member2.id,
    organizationId: ctx.body.organizationId,
    userId: session2.user.id
  });
  if (session2.session.activeOrganizationId === ctx.body.organizationId) await adapter.setActiveOrganization(session2.session.token, null, ctx);
  return ctx.json(member2);
});
const listMembers = (options) => createAuthEndpoint("/organization/list-members", {
  method: "GET",
  query: z.object({
    limit: z.string().meta({ description: "The number of users to return" }).or(z.number()).optional(),
    offset: z.string().meta({ description: "The offset to start from" }).or(z.number()).optional(),
    sortBy: z.string().meta({ description: "The field to sort by" }).optional(),
    sortDirection: z.enum(["asc", "desc"]).meta({ description: "The direction to sort by" }).optional(),
    filterField: z.string().meta({ description: "The field to filter by" }).optional(),
    filterValue: z.string().meta({ description: "The value to filter by" }).or(z.number()).or(z.boolean()).optional(),
    filterOperator: z.enum([
      "eq",
      "ne",
      "lt",
      "lte",
      "gt",
      "gte",
      "contains"
    ]).meta({ description: "The operator to use for the filter" }).optional(),
    organizationId: z.string().meta({ description: `The organization ID to list members for. If not provided, will default to the user's active organization. Eg: "organization-id"` }).optional(),
    organizationSlug: z.string().meta({ description: `The organization slug to list members for. If not provided, will default to the user's active organization. Eg: "organization-slug"` }).optional()
  }).optional(),
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  let organizationId = ctx.query?.organizationId || session2.session.activeOrganizationId;
  const adapter = getOrgAdapter(ctx.context, options);
  if (ctx.query?.organizationSlug) {
    const organization2 = await adapter.findOrganizationBySlug(ctx.query?.organizationSlug);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    organizationId = organization2.id;
  }
  if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
  if (!await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId
  })) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
  const { members, total } = await adapter.listMembers({
    organizationId,
    limit: ctx.query?.limit ? Number(ctx.query.limit) : void 0,
    offset: ctx.query?.offset ? Number(ctx.query.offset) : void 0,
    sortBy: ctx.query?.sortBy,
    sortOrder: ctx.query?.sortDirection,
    filter: ctx.query?.filterField ? {
      field: ctx.query?.filterField,
      operator: ctx.query.filterOperator,
      value: ctx.query.filterValue
    } : void 0
  });
  return ctx.json({
    members,
    total
  });
});
const getActiveMemberRoleQuerySchema = z.object({
  userId: z.string().meta({ description: "The user ID to get the role for. If not provided, will default to the current user's" }).optional(),
  organizationId: z.string().meta({ description: `The organization ID to list members for. If not provided, will default to the user's active organization. Eg: "organization-id"` }).optional(),
  organizationSlug: z.string().meta({ description: `The organization slug to list members for. If not provided, will default to the user's active organization. Eg: "organization-slug"` }).optional()
}).optional();
const getActiveMemberRole = (options) => createAuthEndpoint("/organization/get-active-member-role", {
  method: "GET",
  query: getActiveMemberRoleQuerySchema,
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  let organizationId = ctx.query?.organizationId || session2.session.activeOrganizationId;
  const adapter = getOrgAdapter(ctx.context, options);
  if (ctx.query?.organizationSlug) {
    const organization2 = await adapter.findOrganizationBySlug(ctx.query?.organizationSlug);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    organizationId = organization2.id;
  }
  if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
  const isMember = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId
  });
  if (!isMember) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
  if (!ctx.query?.userId) return ctx.json({ role: isMember.role });
  const userIdToGetRole = ctx.query?.userId;
  const member2 = await adapter.findMemberByOrgId({
    userId: userIdToGetRole,
    organizationId
  });
  if (!member2) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION });
  return ctx.json({ role: member2?.role });
});
const baseOrganizationSchema = z.object({
  name: z.string().min(1).meta({ description: "The name of the organization" }),
  slug: z.string().min(1).meta({ description: "The slug of the organization" }),
  userId: z.coerce.string().meta({ description: 'The user id of the organization creator. If not provided, the current user will be used. Should only be used by admins or when called by the server. server-only. Eg: "user-id"' }).optional(),
  logo: z.string().meta({ description: "The logo of the organization" }).optional(),
  metadata: z.record(z.string(), z.any()).meta({ description: "The metadata of the organization" }).optional(),
  keepCurrentActiveOrganization: z.boolean().meta({ description: "Whether to keep the current active organization active after creating a new one. Eg: true" }).optional()
});
const createOrganization = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: {},
    isClientSide: true
  });
  return createAuthEndpoint("/organization/create", {
    method: "POST",
    body: z.object({
      ...baseOrganizationSchema.shape,
      ...additionalFieldsSchema.shape
    }),
    use: [orgMiddleware],
    metadata: {
      $Infer: { body: {} },
      openapi: {
        description: "Create an organization",
        responses: { "200": {
          description: "Success",
          content: { "application/json": { schema: {
            type: "object",
            description: "The organization that was created",
            $ref: "#/components/schemas/Organization"
          } } }
        } }
      }
    }
  }, async (ctx) => {
    const session2 = await getSessionFromCtx(ctx);
    if (!session2 && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
    let user2 = session2?.user || null;
    if (!user2) {
      if (!ctx.body.userId) throw new APIError("UNAUTHORIZED");
      user2 = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
    }
    if (!user2) return ctx.json(null, { status: 401 });
    const options$1 = ctx.context.orgOptions;
    if (!(typeof options$1?.allowUserToCreateOrganization === "function" ? await options$1.allowUserToCreateOrganization(user2) : options$1?.allowUserToCreateOrganization === void 0 ? true : options$1.allowUserToCreateOrganization)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION });
    const adapter = getOrgAdapter(ctx.context, options$1);
    const userOrganizations = await adapter.listOrganizations(user2.id);
    if (typeof options$1.organizationLimit === "number" ? userOrganizations.length >= options$1.organizationLimit : typeof options$1.organizationLimit === "function" ? await options$1.organizationLimit(user2) : false) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS });
    if (await adapter.findOrganizationBySlug(ctx.body.slug)) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_ALREADY_EXISTS });
    let { keepCurrentActiveOrganization: _, userId: __, ...orgData } = ctx.body;
    if (options$1.organizationCreation?.beforeCreate) {
      const response = await options$1.organizationCreation.beforeCreate({
        organization: {
          ...orgData,
          createdAt: /* @__PURE__ */ new Date()
        },
        user: user2
      }, ctx.request);
      if (response && typeof response === "object" && "data" in response) orgData = {
        ...ctx.body,
        ...response.data
      };
    }
    if (options$1?.organizationHooks?.beforeCreateOrganization) {
      const response = await options$1?.organizationHooks.beforeCreateOrganization({
        organization: orgData,
        user: user2
      });
      if (response && typeof response === "object" && "data" in response) orgData = {
        ...ctx.body,
        ...response.data
      };
    }
    const organization2 = await adapter.createOrganization({ organization: {
      ...orgData,
      createdAt: /* @__PURE__ */ new Date()
    } });
    let member2;
    let teamMember = null;
    let data = {
      userId: user2.id,
      organizationId: organization2.id,
      role: ctx.context.orgOptions.creatorRole || "owner"
    };
    if (options$1?.organizationHooks?.beforeAddMember) {
      const response = await options$1?.organizationHooks.beforeAddMember({
        member: {
          userId: user2.id,
          organizationId: organization2.id,
          role: ctx.context.orgOptions.creatorRole || "owner"
        },
        user: user2,
        organization: organization2
      });
      if (response && typeof response === "object" && "data" in response) data = {
        ...data,
        ...response.data
      };
    }
    member2 = await adapter.createMember(data);
    if (options$1?.organizationHooks?.afterAddMember) await options$1?.organizationHooks.afterAddMember({
      member: member2,
      user: user2,
      organization: organization2
    });
    if (options$1?.teams?.enabled && options$1.teams.defaultTeam?.enabled !== false) {
      let teamData = {
        organizationId: organization2.id,
        name: `${organization2.name}`,
        createdAt: /* @__PURE__ */ new Date()
      };
      if (options$1?.organizationHooks?.beforeCreateTeam) {
        const response = await options$1?.organizationHooks.beforeCreateTeam({
          team: {
            organizationId: organization2.id,
            name: `${organization2.name}`
          },
          user: user2,
          organization: organization2
        });
        if (response && typeof response === "object" && "data" in response) teamData = {
          ...teamData,
          ...response.data
        };
      }
      const defaultTeam = await options$1.teams.defaultTeam?.customCreateDefaultTeam?.(organization2, ctx) || await adapter.createTeam(teamData);
      teamMember = await adapter.findOrCreateTeamMember({
        teamId: defaultTeam.id,
        userId: user2.id
      });
      if (options$1?.organizationHooks?.afterCreateTeam) await options$1?.organizationHooks.afterCreateTeam({
        team: defaultTeam,
        user: user2,
        organization: organization2
      });
    }
    if (options$1.organizationCreation?.afterCreate) await options$1.organizationCreation.afterCreate({
      organization: organization2,
      user: user2,
      member: member2
    }, ctx.request);
    if (options$1?.organizationHooks?.afterCreateOrganization) await options$1?.organizationHooks.afterCreateOrganization({
      organization: organization2,
      user: user2,
      member: member2
    });
    if (ctx.context.session && !ctx.body.keepCurrentActiveOrganization) await adapter.setActiveOrganization(ctx.context.session.session.token, organization2.id, ctx);
    if (teamMember && ctx.context.session && !ctx.body.keepCurrentActiveOrganization) await adapter.setActiveTeam(ctx.context.session.session.token, teamMember.teamId, ctx);
    return ctx.json({
      ...organization2,
      metadata: organization2.metadata && typeof organization2.metadata === "string" ? JSON.parse(organization2.metadata) : organization2.metadata,
      members: [member2]
    });
  });
};
const checkOrganizationSlugBodySchema = z.object({ slug: z.string().meta({ description: 'The organization slug to check. Eg: "my-org"' }) });
const checkOrganizationSlug = (options) => createAuthEndpoint("/organization/check-slug", {
  method: "POST",
  body: checkOrganizationSlugBodySchema,
  use: [requestOnlySessionMiddleware, orgMiddleware]
}, async (ctx) => {
  if (!await getOrgAdapter(ctx.context, options).findOrganizationBySlug(ctx.body.slug)) return ctx.json({ status: true });
  throw new APIError("BAD_REQUEST", { message: "slug is taken" });
});
const baseUpdateOrganizationSchema = z.object({
  name: z.string().min(1).meta({ description: "The name of the organization" }).optional(),
  slug: z.string().min(1).meta({ description: "The slug of the organization" }).optional(),
  logo: z.string().meta({ description: "The logo of the organization" }).optional(),
  metadata: z.record(z.string(), z.any()).meta({ description: "The metadata of the organization" }).optional()
});
const updateOrganization = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: {},
    isClientSide: true
  });
  return createAuthEndpoint("/organization/update", {
    method: "POST",
    body: z.object({
      data: z.object({
        ...additionalFieldsSchema.shape,
        ...baseUpdateOrganizationSchema.shape
      }).partial(),
      organizationId: z.string().meta({ description: 'The organization ID. Eg: "org-id"' }).optional()
    }),
    requireHeaders: true,
    use: [orgMiddleware],
    metadata: {
      $Infer: { body: {} },
      openapi: {
        description: "Update an organization",
        responses: { "200": {
          description: "Success",
          content: { "application/json": { schema: {
            type: "object",
            description: "The updated organization",
            $ref: "#/components/schemas/Organization"
          } } }
        } }
      }
    }
  }, async (ctx) => {
    const session2 = await ctx.context.getSession(ctx);
    if (!session2) throw new APIError("UNAUTHORIZED", { message: "User not found" });
    const organizationId = ctx.body.organizationId || session2.session.activeOrganizationId;
    if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    const adapter = getOrgAdapter(ctx.context, options);
    const member2 = await adapter.findMemberByOrgId({
      userId: session2.user.id,
      organizationId
    });
    if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
    if (!await hasPermission({
      permissions: { organization: ["update"] },
      role: member2.role,
      options: ctx.context.orgOptions,
      organizationId
    }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION });
    if (typeof ctx.body.data.slug === "string") {
      const existingOrganization = await adapter.findOrganizationBySlug(ctx.body.data.slug);
      if (existingOrganization && existingOrganization.id !== organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_SLUG_ALREADY_TAKEN });
    }
    const updatedOrg = await adapter.updateOrganization(organizationId, ctx.body.data);
    return ctx.json(updatedOrg);
  });
};
const deleteOrganizationBodySchema = z.object({ organizationId: z.string().meta({ description: "The organization id to delete" }) });
const deleteOrganization = (options) => {
  return createAuthEndpoint("/organization/delete", {
    method: "POST",
    body: deleteOrganizationBodySchema,
    requireHeaders: true,
    use: [orgMiddleware],
    metadata: { openapi: {
      description: "Delete an organization",
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "string",
          description: "The organization id that was deleted"
        } } }
      } }
    } }
  }, async (ctx) => {
    if (ctx.context.orgOptions.organizationDeletion?.disabled || ctx.context.orgOptions.disableOrganizationDeletion) {
      if (ctx.context.orgOptions.organizationDeletion?.disabled) ctx.context.logger.info("`organizationDeletion.disabled` is deprecated. Use `disableOrganizationDeletion` instead");
      throw new APIError("NOT_FOUND", { message: "Organization deletion is disabled" });
    }
    const session2 = await ctx.context.getSession(ctx);
    if (!session2) throw new APIError("UNAUTHORIZED", { status: 401 });
    const organizationId = ctx.body.organizationId;
    if (!organizationId) return ctx.json(null, {
      status: 400,
      body: { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND }
    });
    const adapter = getOrgAdapter(ctx.context, options);
    const member2 = await adapter.findMemberByOrgId({
      userId: session2.user.id,
      organizationId
    });
    if (!member2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
    if (!await hasPermission({
      role: member2.role,
      permissions: { organization: ["delete"] },
      organizationId,
      options: ctx.context.orgOptions
    }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION });
    if (organizationId === session2.session.activeOrganizationId)
      await adapter.setActiveOrganization(session2.session.token, null, ctx);
    const org = await adapter.findOrganizationById(organizationId);
    if (!org) throw new APIError("BAD_REQUEST");
    await adapter.deleteOrganization(organizationId);
    return ctx.json(org);
  });
};
const getFullOrganizationQuerySchema = z.optional(z.object({
  organizationId: z.string().meta({ description: "The organization id to get" }).optional(),
  organizationSlug: z.string().meta({ description: "The organization slug to get" }).optional(),
  membersLimit: z.number().or(z.string().transform((val) => parseInt(val))).meta({ description: "The limit of members to get. By default, it uses the membershipLimit option which defaults to 100." }).optional()
}));
const getFullOrganization = (options) => createAuthEndpoint("/organization/get-full-organization", {
  method: "GET",
  query: getFullOrganizationQuerySchema,
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware],
  metadata: { openapi: {
    operationId: "getOrganization",
    description: "Get the full organization",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        description: "The organization",
        $ref: "#/components/schemas/Organization"
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  const organizationId = ctx.query?.organizationSlug || ctx.query?.organizationId || session2.session.activeOrganizationId;
  if (!organizationId) return ctx.json(null, { status: 200 });
  const adapter = getOrgAdapter(ctx.context, options);
  const organization2 = await adapter.findFullOrganization({
    organizationId,
    isSlug: !!ctx.query?.organizationSlug,
    includeTeams: ctx.context.orgOptions.teams?.enabled,
    membersLimit: ctx.query?.membersLimit
  });
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  if (!await adapter.checkMembership({
    userId: session2.user.id,
    organizationId: organization2.id
  })) {
    await adapter.setActiveOrganization(session2.session.token, null, ctx);
    throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
  }
  return ctx.json(organization2);
});
const setActiveOrganizationBodySchema = z.object({
  organizationId: z.string().meta({ description: 'The organization id to set as active. It can be null to unset the active organization. Eg: "org-id"' }).nullable().optional(),
  organizationSlug: z.string().meta({ description: 'The organization slug to set as active. It can be null to unset the active organization if organizationId is not provided. Eg: "org-slug"' }).optional()
});
const setActiveOrganization = (options) => {
  return createAuthEndpoint("/organization/set-active", {
    method: "POST",
    body: setActiveOrganizationBodySchema,
    use: [orgSessionMiddleware, orgMiddleware],
    requireHeaders: true,
    metadata: { openapi: {
      operationId: "setActiveOrganization",
      description: "Set the active organization",
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          description: "The organization",
          $ref: "#/components/schemas/Organization"
        } } }
      } }
    } }
  }, async (ctx) => {
    const adapter = getOrgAdapter(ctx.context, options);
    const session2 = ctx.context.session;
    let organizationId = ctx.body.organizationId;
    let organizationSlug = ctx.body.organizationSlug;
    if (organizationId === null) {
      if (!session2.session.activeOrganizationId) return ctx.json(null);
      await setSessionCookie(ctx, {
        session: await adapter.setActiveOrganization(session2.session.token, null, ctx),
        user: session2.user
      });
      return ctx.json(null);
    }
    if (!organizationId && !organizationSlug) {
      const sessionOrgId = session2.session.activeOrganizationId;
      if (!sessionOrgId) return ctx.json(null);
      organizationId = sessionOrgId;
    }
    if (organizationSlug && !organizationId) {
      const organization$12 = await adapter.findOrganizationBySlug(organizationSlug);
      if (!organization$12) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
      organizationId = organization$12.id;
    }
    if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    if (!await adapter.checkMembership({
      userId: session2.user.id,
      organizationId
    })) {
      await adapter.setActiveOrganization(session2.session.token, null, ctx);
      throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
    }
    let organization2 = await adapter.findOrganizationById(organizationId);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    await setSessionCookie(ctx, {
      session: await adapter.setActiveOrganization(session2.session.token, organization2.id, ctx),
      user: session2.user
    });
    return ctx.json(organization2);
  });
};
const listOrganizations = (options) => createAuthEndpoint("/organization/list", {
  method: "GET",
  use: [orgMiddleware, orgSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "List all organizations",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: { $ref: "#/components/schemas/Organization" }
      } } }
    } }
  } }
}, async (ctx) => {
  const organizations = await getOrgAdapter(ctx.context, options).listOrganizations(ctx.context.session.user.id);
  return ctx.json(organizations);
});
const roleSchema = z.string();
const invitationStatus = z.enum([
  "pending",
  "accepted",
  "rejected",
  "canceled"
]).default("pending");
z.object({
  id: z.string().default(generateId),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullish().optional(),
  metadata: z.record(z.string(), z.unknown()).or(z.string().transform((v) => JSON.parse(v))).optional(),
  createdAt: z.date()
});
z.object({
  id: z.string().default(generateId),
  organizationId: z.string(),
  userId: z.coerce.string(),
  role: roleSchema,
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
z.object({
  id: z.string().default(generateId),
  organizationId: z.string(),
  email: z.string(),
  role: roleSchema,
  status: invitationStatus,
  teamId: z.string().nullish(),
  inviterId: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
const teamSchema = z.object({
  id: z.string().default(generateId),
  name: z.string().min(1),
  organizationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional()
});
z.object({
  id: z.string().default(generateId),
  teamId: z.string(),
  userId: z.string(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
z.object({
  id: z.string().default(generateId),
  organizationId: z.string(),
  role: z.string(),
  permission: z.record(z.string(), z.array(z.string())),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: z.date().optional()
});
const defaultRoles = [
  "admin",
  "member",
  "owner"
];
z.union([z.enum(defaultRoles), z.array(z.enum(defaultRoles))]);
const teamBaseSchema = z.object({
  name: z.string().meta({ description: 'The name of the team. Eg: "my-team"' }),
  organizationId: z.string().meta({ description: 'The organization ID which the team will be created in. Defaults to the active organization. Eg: "organization-id"' }).optional()
});
const createTeam = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: {},
    isClientSide: true
  });
  return createAuthEndpoint("/organization/create-team", {
    method: "POST",
    body: z.object({
      ...teamBaseSchema.shape,
      ...additionalFieldsSchema.shape
    }),
    use: [orgMiddleware],
    metadata: {
      $Infer: { body: {} },
      openapi: {
        description: "Create a new team within an organization",
        responses: { "200": {
          description: "Team created successfully",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier of the created team"
              },
              name: {
                type: "string",
                description: "Name of the team"
              },
              organizationId: {
                type: "string",
                description: "ID of the organization the team belongs to"
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the team was created"
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the team was last updated"
              }
            },
            required: [
              "id",
              "name",
              "organizationId",
              "createdAt",
              "updatedAt"
            ]
          } } }
        } }
      }
    }
  }, async (ctx) => {
    const session2 = await getSessionFromCtx(ctx);
    const organizationId = ctx.body.organizationId || session2?.session.activeOrganizationId;
    if (!session2 && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
    if (!organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
    const adapter = getOrgAdapter(ctx.context, options);
    if (session2) {
      const member2 = await adapter.findMemberByOrgId({
        userId: session2.user.id,
        organizationId
      });
      if (!member2) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION });
      if (!await hasPermission({
        role: member2.role,
        options: ctx.context.orgOptions,
        permissions: { team: ["create"] },
        organizationId
      }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION });
    }
    const existingTeams = await adapter.listTeams(organizationId);
    const maximum = typeof ctx.context.orgOptions.teams?.maximumTeams === "function" ? await ctx.context.orgOptions.teams?.maximumTeams({
      organizationId,
      session: session2
    }, ctx) : ctx.context.orgOptions.teams?.maximumTeams;
    if (maximum ? existingTeams.length >= maximum : false) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS });
    const { name, organizationId: _, ...additionalFields } = ctx.body;
    const organization2 = await adapter.findOrganizationById(organizationId);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    let teamData = {
      name,
      organizationId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      ...additionalFields
    };
    const createdTeam = await adapter.createTeam(teamData);
    return ctx.json(createdTeam);
  });
};
const removeTeamBodySchema = z.object({
  teamId: z.string().meta({ description: `The team ID of the team to remove. Eg: "team-id"` }),
  organizationId: z.string().meta({ description: `The organization ID which the team falls under. If not provided, it will default to the user's active organization. Eg: "organization-id"` }).optional()
});
const removeTeam = (options) => createAuthEndpoint("/organization/remove-team", {
  method: "POST",
  body: removeTeamBodySchema,
  use: [orgMiddleware],
  metadata: { openapi: {
    description: "Remove a team from an organization",
    responses: { "200": {
      description: "Team removed successfully",
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: {
          type: "string",
          description: "Confirmation message indicating successful removal",
          enum: ["Team removed successfully."]
        } },
        required: ["message"]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  const organizationId = ctx.body.organizationId || session2?.session.activeOrganizationId;
  if (!organizationId) return ctx.json(null, {
    status: 400,
    body: { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION }
  });
  if (!session2 && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
  const adapter = getOrgAdapter(ctx.context, options);
  if (session2) {
    const member2 = await adapter.findMemberByOrgId({
      userId: session2.user.id,
      organizationId
    });
    if (!member2 || session2.session?.activeTeamId === ctx.body.teamId) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM });
    if (!await hasPermission({
      role: member2.role,
      options: ctx.context.orgOptions,
      permissions: { team: ["delete"] },
      organizationId
    }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION });
  }
  const team = await adapter.findTeamById({
    teamId: ctx.body.teamId,
    organizationId
  });
  if (!team || team.organizationId !== organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
  if (!ctx.context.orgOptions.teams?.allowRemovingAllTeams) {
    if ((await adapter.listTeams(organizationId)).length <= 1) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.UNABLE_TO_REMOVE_LAST_TEAM });
  }
  const organization2 = await adapter.findOrganizationById(organizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  await adapter.deleteTeam(team.id);
  return ctx.json({ message: "Team removed successfully." });
});
const updateTeam = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: {},
    isClientSide: true
  });
  return createAuthEndpoint("/organization/update-team", {
    method: "POST",
    body: z.object({
      teamId: z.string().meta({ description: `The ID of the team to be updated. Eg: "team-id"` }),
      data: z.object({
        ...teamSchema.shape,
        ...additionalFieldsSchema.shape
      }).partial()
    }),
    requireHeaders: true,
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      $Infer: { body: {} },
      openapi: {
        description: "Update an existing team in an organization",
        responses: { "200": {
          description: "Team updated successfully",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier of the updated team"
              },
              name: {
                type: "string",
                description: "Updated name of the team"
              },
              organizationId: {
                type: "string",
                description: "ID of the organization the team belongs to"
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the team was created"
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the team was last updated"
              }
            },
            required: [
              "id",
              "name",
              "organizationId",
              "createdAt",
              "updatedAt"
            ]
          } } }
        } }
      }
    }
  }, async (ctx) => {
    const session2 = ctx.context.session;
    const organizationId = ctx.body.data.organizationId || session2.session.activeOrganizationId;
    if (!organizationId) return ctx.json(null, {
      status: 400,
      body: { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION }
    });
    const adapter = getOrgAdapter(ctx.context, options);
    const member2 = await adapter.findMemberByOrgId({
      userId: session2.user.id,
      organizationId
    });
    if (!member2) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM });
    if (!await hasPermission({
      role: member2.role,
      options: ctx.context.orgOptions,
      permissions: { team: ["update"] },
      organizationId
    }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM });
    const team = await adapter.findTeamById({
      teamId: ctx.body.teamId,
      organizationId
    });
    if (!team || team.organizationId !== organizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
    const { name, organizationId: __, ...additionalFields } = ctx.body.data;
    const organization2 = await adapter.findOrganizationById(organizationId);
    if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
    const updates = {
      name,
      ...additionalFields
    };
    const updatedTeam = await adapter.updateTeam(team.id, updates);
    return ctx.json(updatedTeam);
  });
};
const listOrganizationTeamsQuerySchema = z.optional(z.object({ organizationId: z.string().meta({ description: `The organization ID which the teams are under to list. Defaults to the users active organization. Eg: "organization-id"` }).optional() }));
const listOrganizationTeams = (options) => createAuthEndpoint("/organization/list-teams", {
  method: "GET",
  query: listOrganizationTeamsQuerySchema,
  metadata: { openapi: {
    description: "List all teams in an organization",
    responses: { "200": {
      description: "Teams retrieved successfully",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier of the team"
            },
            name: {
              type: "string",
              description: "Name of the team"
            },
            organizationId: {
              type: "string",
              description: "ID of the organization the team belongs to"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the team was created"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the team was last updated"
            }
          },
          required: [
            "id",
            "name",
            "organizationId",
            "createdAt",
            "updatedAt"
          ]
        },
        description: "Array of team objects within the organization"
      } } }
    } }
  } },
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  const organizationId = ctx.query?.organizationId || session2?.session.activeOrganizationId;
  if (!organizationId) throw ctx.error("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
  const adapter = getOrgAdapter(ctx.context, options);
  if (!await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId: organizationId || ""
  })) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION });
  const teams = await adapter.listTeams(organizationId);
  return ctx.json(teams);
});
const setActiveTeamBodySchema = z.object({ teamId: z.string().meta({ description: "The team id to set as active. It can be null to unset the active team" }).nullable().optional() });
const setActiveTeam = (options) => createAuthEndpoint("/organization/set-active-team", {
  method: "POST",
  body: setActiveTeamBodySchema,
  requireHeaders: true,
  use: [orgSessionMiddleware, orgMiddleware],
  metadata: { openapi: {
    description: "Set the active team",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        description: "The team",
        $ref: "#/components/schemas/Team"
      } } }
    } }
  } }
}, async (ctx) => {
  const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
  const session2 = ctx.context.session;
  if (ctx.body.teamId === null) {
    if (!session2.session.activeTeamId) return ctx.json(null);
    await setSessionCookie(ctx, {
      session: await adapter.setActiveTeam(session2.session.token, null, ctx),
      user: session2.user
    });
    return ctx.json(null);
  }
  let teamId;
  if (!ctx.body.teamId) {
    const sessionTeamId = session2.session.activeTeamId;
    if (!sessionTeamId) return ctx.json(null);
    else teamId = sessionTeamId;
  } else teamId = ctx.body.teamId;
  const team = await adapter.findTeamById({ teamId });
  if (!team) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
  if (!await adapter.findTeamMember({
    teamId,
    userId: session2.user.id
  })) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_TEAM });
  await setSessionCookie(ctx, {
    session: await adapter.setActiveTeam(session2.session.token, team.id, ctx),
    user: session2.user
  });
  return ctx.json(team);
});
const listUserTeams = (options) => createAuthEndpoint("/organization/list-user-teams", {
  method: "GET",
  metadata: { openapi: {
    description: "List all teams that the current user is a part of.",
    responses: { "200": {
      description: "Teams retrieved successfully",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          description: "The team",
          $ref: "#/components/schemas/Team"
        },
        description: "Array of team objects within the organization"
      } } }
    } }
  } },
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  const teams = await getOrgAdapter(ctx.context, ctx.context.orgOptions).listTeamsByUser({ userId: session2.user.id });
  return ctx.json(teams);
});
const listTeamMembersQuerySchema = z.optional(z.object({ teamId: z.string().optional().meta({ description: "The team whose members we should return. If this is not provided the members of the current active team get returned." }) }));
const listTeamMembers = (options) => createAuthEndpoint("/organization/list-team-members", {
  method: "GET",
  query: listTeamMembersQuerySchema,
  metadata: { openapi: {
    description: "List the members of the given team.",
    responses: { "200": {
      description: "Teams retrieved successfully",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          description: "The team member",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier of the team member"
            },
            userId: {
              type: "string",
              description: "The user ID of the team member"
            },
            teamId: {
              type: "string",
              description: "The team ID of the team the team member is in"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the team member was created"
            }
          },
          required: [
            "id",
            "userId",
            "teamId",
            "createdAt"
          ]
        },
        description: "Array of team member objects within the team"
      } } }
    } }
  } },
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
  let teamId = ctx.query?.teamId || session2?.session.activeTeamId;
  if (!teamId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM });
  if (!await adapter.findTeamMember({
    userId: session2.user.id,
    teamId
  })) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_TEAM });
  const members = await adapter.listTeamMembers({ teamId });
  return ctx.json(members);
});
const addTeamMemberBodySchema = z.object({
  teamId: z.string().meta({ description: "The team the user should be a member of." }),
  userId: z.coerce.string().meta({ description: "The user Id which represents the user to be added as a member." })
});
const addTeamMember = (options) => createAuthEndpoint("/organization/add-team-member", {
  method: "POST",
  body: addTeamMemberBodySchema,
  metadata: { openapi: {
    description: "The newly created member",
    responses: { "200": {
      description: "Team member created successfully",
      content: { "application/json": { schema: {
        type: "object",
        description: "The team member",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier of the team member"
          },
          userId: {
            type: "string",
            description: "The user ID of the team member"
          },
          teamId: {
            type: "string",
            description: "The team ID of the team the team member is in"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Timestamp when the team member was created"
          }
        },
        required: [
          "id",
          "userId",
          "teamId",
          "createdAt"
        ]
      } } }
    } }
  } },
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
  if (!session2.session.activeOrganizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
  const currentMember = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId: session2.session.activeOrganizationId
  });
  if (!currentMember) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
  if (!await hasPermission({
    role: currentMember.role,
    options: ctx.context.orgOptions,
    permissions: { member: ["update"] },
    organizationId: session2.session.activeOrganizationId
  }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER });
  if (!await adapter.findMemberByOrgId({
    userId: ctx.body.userId,
    organizationId: session2.session.activeOrganizationId
  })) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
  const team = await adapter.findTeamById({
    teamId: ctx.body.teamId,
    organizationId: session2.session.activeOrganizationId
  });
  if (!team) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
  const organization2 = await adapter.findOrganizationById(session2.session.activeOrganizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const userBeingAdded = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
  if (!userBeingAdded) throw new APIError("BAD_REQUEST", { message: "User not found" });
  const teamMember = await adapter.findOrCreateTeamMember({
    teamId: ctx.body.teamId,
    userId: ctx.body.userId
  });
  return ctx.json(teamMember);
});
const removeTeamMemberBodySchema = z.object({
  teamId: z.string().meta({ description: "The team the user should be removed from." }),
  userId: z.coerce.string().meta({ description: "The user which should be removed from the team." })
});
const removeTeamMember = (options) => createAuthEndpoint("/organization/remove-team-member", {
  method: "POST",
  body: removeTeamMemberBodySchema,
  metadata: { openapi: {
    description: "Remove a member from a team",
    responses: { "200": {
      description: "Team member removed successfully",
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: {
          type: "string",
          description: "Confirmation message indicating successful removal",
          enum: ["Team member removed successfully."]
        } },
        required: ["message"]
      } } }
    } }
  } },
  requireHeaders: true,
  use: [orgMiddleware, orgSessionMiddleware]
}, async (ctx) => {
  const session2 = ctx.context.session;
  const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
  if (!session2.session.activeOrganizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
  const currentMember = await adapter.findMemberByOrgId({
    userId: session2.user.id,
    organizationId: session2.session.activeOrganizationId
  });
  if (!currentMember) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
  if (!await hasPermission({
    role: currentMember.role,
    options: ctx.context.orgOptions,
    permissions: { member: ["delete"] },
    organizationId: session2.session.activeOrganizationId
  }, ctx)) throw new APIError("FORBIDDEN", { message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER });
  if (!await adapter.findMemberByOrgId({
    userId: ctx.body.userId,
    organizationId: session2.session.activeOrganizationId
  })) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
  const team = await adapter.findTeamById({
    teamId: ctx.body.teamId,
    organizationId: session2.session.activeOrganizationId
  });
  if (!team) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND });
  const organization2 = await adapter.findOrganizationById(session2.session.activeOrganizationId);
  if (!organization2) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND });
  const userBeingRemoved = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
  if (!userBeingRemoved) throw new APIError("BAD_REQUEST", { message: "User not found" });
  const teamMember = await adapter.findTeamMember({
    teamId: ctx.body.teamId,
    userId: ctx.body.userId
  });
  if (!teamMember) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_TEAM });
  await adapter.removeTeamMember({
    teamId: ctx.body.teamId,
    userId: ctx.body.userId
  });
  return ctx.json({ message: "Team member removed successfully." });
});
function parseRoles(roles) {
  return Array.isArray(roles) ? roles.join(",") : roles;
}
const createHasPermissionBodySchema = z.object({ organizationId: z.string().optional() }).and(z.union([z.object({
  permission: z.record(z.string(), z.array(z.string())),
  permissions: z.undefined()
}), z.object({
  permission: z.undefined(),
  permissions: z.record(z.string(), z.array(z.string()))
})]));
const createHasPermission = (options) => {
  return createAuthEndpoint("/organization/has-permission", {
    method: "POST",
    requireHeaders: true,
    body: createHasPermissionBodySchema,
    use: [orgSessionMiddleware],
    metadata: {
      $Infer: { body: {} },
      openapi: {
        description: "Check if the user has permission",
        requestBody: { content: { "application/json": { schema: {
          type: "object",
          properties: {
            permission: {
              type: "object",
              description: "The permission to check",
              deprecated: true
            },
            permissions: {
              type: "object",
              description: "The permission to check"
            }
          },
          required: ["permissions"]
        } } } },
        responses: { "200": {
          description: "Success",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              error: { type: "string" },
              success: { type: "boolean" }
            },
            required: ["success"]
          } } }
        } }
      }
    }
  }, async (ctx) => {
    const activeOrganizationId = ctx.body.organizationId || ctx.context.session.session.activeOrganizationId;
    if (!activeOrganizationId) throw new APIError("BAD_REQUEST", { message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION });
    const member2 = await getOrgAdapter(ctx.context, options).findMemberByOrgId({
      userId: ctx.context.session.user.id,
      organizationId: activeOrganizationId
    });
    if (!member2) throw new APIError("UNAUTHORIZED", { message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION });
    const result = await hasPermission({
      role: member2.role,
      options: {},
      permissions: ctx.body.permissions ?? ctx.body.permission,
      organizationId: activeOrganizationId
    }, ctx);
    return ctx.json({
      error: null,
      success: result
    });
  });
};
function organization$1(options) {
  let endpoints = {
    createOrganization: createOrganization(),
    updateOrganization: updateOrganization(options),
    deleteOrganization: deleteOrganization(options),
    setActiveOrganization: setActiveOrganization(options),
    getFullOrganization: getFullOrganization(options),
    listOrganizations: listOrganizations(options),
    createInvitation: createInvitation(options),
    cancelInvitation: cancelInvitation(options),
    acceptInvitation: acceptInvitation(options),
    getInvitation: getInvitation(options),
    rejectInvitation: rejectInvitation(),
    listInvitations: listInvitations(options),
    getActiveMember: getActiveMember(options),
    checkOrganizationSlug: checkOrganizationSlug(options),
    addMember: addMember(options),
    removeMember: removeMember(options),
    updateMemberRole: updateMemberRole(),
    leaveOrganization: leaveOrganization(options),
    listUserInvitations: listUserInvitations(options),
    listMembers: listMembers(options),
    getActiveMemberRole: getActiveMemberRole(options)
  };
  ({
    createTeam: createTeam(options),
    listOrganizationTeams: listOrganizationTeams(options),
    removeTeam: removeTeam(options),
    updateTeam: updateTeam(options),
    setActiveTeam: setActiveTeam(),
    listUserTeams: listUserTeams(),
    listTeamMembers: listTeamMembers(),
    addTeamMember: addTeamMember(),
    removeTeamMember: removeTeamMember()
  });
  ({
    createOrgRole: createOrgRole(options),
    deleteOrgRole: deleteOrgRole(options),
    listOrgRoles: listOrgRoles(options),
    getOrgRole: getOrgRole(options),
    updateOrgRole: updateOrgRole(options)
  });
  const roles = {
    ...defaultRoles$1,
    ...options?.roles
  };
  const teamSchema2 = {};
  const organizationRoleSchema = {};
  const schema2 = {
    organization: {
      modelName: options?.schema?.organization?.modelName,
      fields: {
        name: {
          type: "string",
          required: true,
          sortable: true,
          fieldName: options?.schema?.organization?.fields?.name
        },
        slug: {
          type: "string",
          required: true,
          unique: true,
          sortable: true,
          fieldName: options?.schema?.organization?.fields?.slug,
          index: true
        },
        logo: {
          type: "string",
          required: false,
          fieldName: options?.schema?.organization?.fields?.logo
        },
        createdAt: {
          type: "date",
          required: true,
          fieldName: options?.schema?.organization?.fields?.createdAt
        },
        metadata: {
          type: "string",
          required: false,
          fieldName: options?.schema?.organization?.fields?.metadata
        },
        ...{}
      }
    },
    ...organizationRoleSchema,
    ...teamSchema2,
    member: {
      modelName: options?.schema?.member?.modelName,
      fields: {
        organizationId: {
          type: "string",
          required: true,
          references: {
            model: "organization",
            field: "id"
          },
          fieldName: options?.schema?.member?.fields?.organizationId,
          index: true
        },
        userId: {
          type: "string",
          required: true,
          fieldName: options?.schema?.member?.fields?.userId,
          references: {
            model: "user",
            field: "id"
          },
          index: true
        },
        role: {
          type: "string",
          required: true,
          sortable: true,
          defaultValue: "member",
          fieldName: options?.schema?.member?.fields?.role
        },
        createdAt: {
          type: "date",
          required: true,
          fieldName: options?.schema?.member?.fields?.createdAt
        },
        ...{}
      }
    },
    invitation: {
      modelName: options?.schema?.invitation?.modelName,
      fields: {
        organizationId: {
          type: "string",
          required: true,
          references: {
            model: "organization",
            field: "id"
          },
          fieldName: options?.schema?.invitation?.fields?.organizationId,
          index: true
        },
        email: {
          type: "string",
          required: true,
          sortable: true,
          fieldName: options?.schema?.invitation?.fields?.email,
          index: true
        },
        role: {
          type: "string",
          required: false,
          sortable: true,
          fieldName: options?.schema?.invitation?.fields?.role
        },
        ...{},
        status: {
          type: "string",
          required: true,
          sortable: true,
          defaultValue: "pending",
          fieldName: options?.schema?.invitation?.fields?.status
        },
        expiresAt: {
          type: "date",
          required: true,
          fieldName: options?.schema?.invitation?.fields?.expiresAt
        },
        createdAt: {
          type: "date",
          required: true,
          fieldName: options?.schema?.invitation?.fields?.createdAt,
          defaultValue: () => /* @__PURE__ */ new Date()
        },
        inviterId: {
          type: "string",
          references: {
            model: "user",
            field: "id"
          },
          fieldName: options?.schema?.invitation?.fields?.inviterId,
          required: true
        },
        ...{}
      }
    }
  };
  return {
    id: "organization",
    endpoints: {
      ...shimContext(endpoints, {
        orgOptions: {},
        roles,
        getSession: async (context) => {
          return await getSessionFromCtx(context);
        }
      }),
      hasPermission: createHasPermission(options)
    },
    schema: {
      ...schema2,
      session: { fields: {
        activeOrganizationId: {
          type: "string",
          required: false,
          fieldName: options?.schema?.session?.fields?.activeOrganizationId
        },
        ...{}
      } }
    },
    $Infer: {
      Organization: {},
      Invitation: {},
      Member: {},
      Team: {},
      TeamMember: {},
      ActiveOrganization: {}
    },
    $ERROR_CODES: ORGANIZATION_ERROR_CODES,
    options
  };
}
defineErrorCodes({
  INVALID_PHONE_NUMBER: "Invalid phone number",
  PHONE_NUMBER_EXIST: "Phone number already exists",
  PHONE_NUMBER_NOT_EXIST: "phone number isn't registered",
  INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password",
  UNEXPECTED_ERROR: "Unexpected error",
  OTP_NOT_FOUND: "OTP not found",
  OTP_EXPIRED: "OTP expired",
  INVALID_OTP: "Invalid OTP",
  PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified",
  PHONE_NUMBER_CANNOT_BE_UPDATED: "Phone number cannot be updated",
  SEND_OTP_NOT_IMPLEMENTED: "sendOTP not implemented",
  TOO_MANY_ATTEMPTS: "Too many attempts"
});
z.object({
  phoneNumber: z.string().meta({ description: 'Phone number to sign in. Eg: "+1234567890"' }),
  password: z.string().meta({ description: "Password to use for sign in." }),
  rememberMe: z.boolean().meta({ description: "Remember the session. Eg: true" }).optional()
});
z.object({ phoneNumber: z.string().meta({ description: 'Phone number to send OTP. Eg: "+1234567890"' }) });
z.object({
  phoneNumber: z.string().meta({ description: 'Phone number to verify. Eg: "+1234567890"' }),
  code: z.string().meta({ description: 'OTP code. Eg: "123456"' }),
  disableSession: z.boolean().meta({ description: "Disable session creation after verification. Eg: false" }).optional(),
  updatePhoneNumber: z.boolean().meta({ description: "Check if there is a session and update the phone number. Eg: true" }).optional()
});
z.object({ phoneNumber: z.string() });
z.object({
  otp: z.string().meta({ description: 'The one time password to reset the password. Eg: "123456"' }),
  phoneNumber: z.string().meta({ description: 'The phone number to the account which intends to reset the password for. Eg: "+1234567890"' }),
  newPassword: z.string().meta({ description: `The new password. Eg: "new-and-secure-password"` })
});
z.object({
  walletAddress: z.string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
  chainId: z.number().int().positive().max(2147483647).optional().default(1)
});
const TWO_FACTOR_ERROR_CODES = defineErrorCodes({
  OTP_NOT_ENABLED: "OTP not enabled",
  OTP_HAS_EXPIRED: "OTP has expired",
  TOTP_NOT_ENABLED: "TOTP not enabled",
  TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled",
  BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled",
  INVALID_BACKUP_CODE: "Invalid backup code",
  INVALID_CODE: "Invalid code",
  TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.",
  INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie"
});
const TWO_FACTOR_COOKIE_NAME = "two_factor";
const TRUST_DEVICE_COOKIE_NAME = "trust_device";
const TRUST_DEVICE_COOKIE_MAX_AGE = 720 * 60 * 60;
async function verifyTwoFactor(ctx) {
  const invalid = (errorKey) => {
    throw new APIError("UNAUTHORIZED", { message: TWO_FACTOR_ERROR_CODES[errorKey] });
  };
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) {
    const cookieName = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME);
    const twoFactorCookie = await ctx.getSignedCookie(cookieName.name, ctx.context.secret);
    if (!twoFactorCookie) throw new APIError("UNAUTHORIZED", { message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE });
    const verificationToken = await ctx.context.internalAdapter.findVerificationValue(twoFactorCookie);
    if (!verificationToken) throw new APIError("UNAUTHORIZED", { message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE });
    const user2 = await ctx.context.internalAdapter.findUserById(verificationToken.value);
    if (!user2) throw new APIError("UNAUTHORIZED", { message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE });
    const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
    return {
      valid: async (ctx$1) => {
        const session$1 = await ctx$1.context.internalAdapter.createSession(verificationToken.value, !!dontRememberMe);
        if (!session$1) throw new APIError("INTERNAL_SERVER_ERROR", { message: "failed to create session" });
        await ctx$1.context.internalAdapter.deleteVerificationValue(verificationToken.id);
        await setSessionCookie(ctx$1, {
          session: session$1,
          user: user2
        });
        ctx$1.setCookie(cookieName.name, "", { maxAge: 0 });
        if (ctx$1.body.trustDevice) {
          const trustDeviceCookie = ctx$1.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: TRUST_DEVICE_COOKIE_MAX_AGE });
          const token = await createHMAC("SHA-256", "base64urlnopad").sign(ctx$1.context.secret, `${user2.id}!${session$1.token}`);
          await ctx$1.setSignedCookie(trustDeviceCookie.name, `${token}!${session$1.token}`, ctx$1.context.secret, trustDeviceCookie.attributes);
          ctx$1.setCookie(ctx$1.context.authCookies.dontRememberToken.name, "", { maxAge: 0 });
        }
        return ctx$1.json({
          token: session$1.token,
          user: {
            id: user2.id,
            email: user2.email,
            emailVerified: user2.emailVerified,
            name: user2.name,
            image: user2.image,
            createdAt: user2.createdAt,
            updatedAt: user2.updatedAt
          }
        });
      },
      invalid,
      session: {
        session: null,
        user: user2
      },
      key: twoFactorCookie
    };
  }
  return {
    valid: async (ctx$1) => {
      return ctx$1.json({
        token: session2.session.token,
        user: {
          id: session2.user.id,
          email: session2.user.email,
          emailVerified: session2.user.emailVerified,
          name: session2.user.name,
          image: session2.user.image,
          createdAt: session2.user.createdAt,
          updatedAt: session2.user.updatedAt
        }
      });
    },
    invalid,
    session: session2,
    key: `${session2.user.id}!${session2.session.id}`
  };
}
function generateBackupCodesFn(options) {
  return Array.from({ length: options?.amount ?? 10 }).fill(null).map(() => generateRandomString(options?.length ?? 10, "a-z", "0-9", "A-Z")).map((code) => `${code.slice(0, 5)}-${code.slice(5)}`);
}
async function generateBackupCodes(secret, options) {
  const backupCodes = options?.customBackupCodesGenerate ? options.customBackupCodesGenerate() : generateBackupCodesFn(options);
  if (options?.storeBackupCodes === "encrypted") return {
    backupCodes,
    encryptedBackupCodes: await symmetricEncrypt({
      data: JSON.stringify(backupCodes),
      key: secret
    })
  };
  if (typeof options?.storeBackupCodes === "object" && "encrypt" in options?.storeBackupCodes) return {
    backupCodes,
    encryptedBackupCodes: await options?.storeBackupCodes.encrypt(JSON.stringify(backupCodes))
  };
  return {
    backupCodes,
    encryptedBackupCodes: JSON.stringify(backupCodes)
  };
}
async function verifyBackupCode(data, key, options) {
  const codes = await getBackupCodes(data.backupCodes, key, options);
  if (!codes) return {
    status: false,
    updated: null
  };
  return {
    status: codes.includes(data.code),
    updated: codes.filter((code) => code !== data.code)
  };
}
async function getBackupCodes(backupCodes, key, options) {
  if (options?.storeBackupCodes === "encrypted") return safeJSONParse(await symmetricDecrypt({
    key,
    data: backupCodes
  }));
  if (typeof options?.storeBackupCodes === "object" && "decrypt" in options?.storeBackupCodes) return safeJSONParse(await options?.storeBackupCodes.decrypt(backupCodes));
  return safeJSONParse(backupCodes);
}
const verifyBackupCodeBodySchema = z.object({
  code: z.string().meta({ description: `A backup code to verify. Eg: "123456"` }),
  disableSession: z.boolean().meta({ description: "If true, the session cookie will not be set." }).optional(),
  trustDevice: z.boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
const viewBackupCodesBodySchema = z.object({ userId: z.coerce.string().meta({ description: `The user ID to view all backup codes. Eg: "user-id"` }) });
const generateBackupCodesBodySchema = z.object({ password: z.string().meta({ description: "The users password." }) });
const backupCode2fa = (opts) => {
  const twoFactorTable = "twoFactor";
  return {
    id: "backup_code",
    endpoints: {
      verifyBackupCode: createAuthEndpoint("/two-factor/verify-backup-code", {
        method: "POST",
        body: verifyBackupCodeBodySchema,
        metadata: { openapi: {
          description: "Verify a backup code for two-factor authentication",
          responses: { "200": {
            description: "Backup code verified successfully",
            content: { "application/json": { schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier of the user"
                    },
                    email: {
                      type: "string",
                      format: "email",
                      nullable: true,
                      description: "User's email address"
                    },
                    emailVerified: {
                      type: "boolean",
                      nullable: true,
                      description: "Whether the email is verified"
                    },
                    name: {
                      type: "string",
                      nullable: true,
                      description: "User's name"
                    },
                    image: {
                      type: "string",
                      format: "uri",
                      nullable: true,
                      description: "User's profile image URL"
                    },
                    twoFactorEnabled: {
                      type: "boolean",
                      description: "Whether two-factor authentication is enabled for the user"
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the user was created"
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the user was last updated"
                    }
                  },
                  required: [
                    "id",
                    "twoFactorEnabled",
                    "createdAt",
                    "updatedAt"
                  ],
                  description: "The authenticated user object with two-factor details"
                },
                session: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "Session token"
                    },
                    userId: {
                      type: "string",
                      description: "ID of the user associated with the session"
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the session was created"
                    },
                    expiresAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the session expires"
                    }
                  },
                  required: [
                    "token",
                    "userId",
                    "createdAt",
                    "expiresAt"
                  ],
                  description: "The current session object, included unless disableSession is true"
                }
              },
              required: ["user", "session"]
            } } }
          } }
        } }
      }, async (ctx) => {
        const { session: session2, valid } = await verifyTwoFactor(ctx);
        const user2 = session2.user;
        const twoFactor2 = await ctx.context.adapter.findOne({
          model: twoFactorTable,
          where: [{
            field: "userId",
            value: user2.id
          }]
        });
        if (!twoFactor2) throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED });
        const validate = await verifyBackupCode({
          backupCodes: twoFactor2.backupCodes,
          code: ctx.body.code
        }, ctx.context.secret, opts);
        if (!validate.status) throw new APIError("UNAUTHORIZED", { message: TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE });
        const updatedBackupCodes = await symmetricEncrypt({
          key: ctx.context.secret,
          data: JSON.stringify(validate.updated)
        });
        if (!await ctx.context.adapter.updateMany({
          model: twoFactorTable,
          update: { backupCodes: updatedBackupCodes },
          where: [{
            field: "userId",
            value: user2.id
          }, {
            field: "backupCodes",
            value: twoFactor2.backupCodes
          }]
        })) throw new APIError("CONFLICT", { message: "Failed to verify backup code. Please try again." });
        if (!ctx.body.disableSession) return valid(ctx);
        return ctx.json({
          token: session2.session?.token,
          user: {
            id: session2.user?.id,
            email: session2.user.email,
            emailVerified: session2.user.emailVerified,
            name: session2.user.name,
            image: session2.user.image,
            createdAt: session2.user.createdAt,
            updatedAt: session2.user.updatedAt
          }
        });
      }),
      generateBackupCodes: createAuthEndpoint("/two-factor/generate-backup-codes", {
        method: "POST",
        body: generateBackupCodesBodySchema,
        use: [sessionMiddleware],
        metadata: { openapi: {
          description: "Generate new backup codes for two-factor authentication",
          responses: { "200": {
            description: "Backup codes generated successfully",
            content: { "application/json": { schema: {
              type: "object",
              properties: {
                status: {
                  type: "boolean",
                  description: "Indicates if the backup codes were generated successfully",
                  enum: [true]
                },
                backupCodes: {
                  type: "array",
                  items: { type: "string" },
                  description: "Array of generated backup codes in plain text"
                }
              },
              required: ["status", "backupCodes"]
            } } }
          } }
        } }
      }, async (ctx) => {
        const user2 = ctx.context.session.user;
        if (!user2.twoFactorEnabled) throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED });
        await ctx.context.password.checkPassword(user2.id, ctx);
        const backupCodes = await generateBackupCodes(ctx.context.secret, opts);
        await ctx.context.adapter.updateMany({
          model: twoFactorTable,
          update: { backupCodes: backupCodes.encryptedBackupCodes },
          where: [{
            field: "userId",
            value: ctx.context.session.user.id
          }]
        });
        return ctx.json({
          status: true,
          backupCodes: backupCodes.backupCodes
        });
      }),
      viewBackupCodes: createAuthEndpoint({
        method: "POST",
        body: viewBackupCodesBodySchema
      }, async (ctx) => {
        const twoFactor2 = await ctx.context.adapter.findOne({
          model: twoFactorTable,
          where: [{
            field: "userId",
            value: ctx.body.userId
          }]
        });
        if (!twoFactor2) throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED });
        const decryptedBackupCodes = await getBackupCodes(twoFactor2.backupCodes, ctx.context.secret, opts);
        if (!decryptedBackupCodes) throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE });
        return ctx.json({
          status: true,
          backupCodes: decryptedBackupCodes
        });
      })
    }
  };
};
const defaultKeyHasher = async (token) => {
  const hash = await createHash("SHA-256").digest(new TextEncoder().encode(token));
  return base64Url.encode(new Uint8Array(hash), { padding: false });
};
const verifyOTPBodySchema = z.object({
  code: z.string().meta({ description: 'The otp code to verify. Eg: "012345"' }),
  trustDevice: z.boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" })
});
const send2FaOTPBodySchema = z.object({ trustDevice: z.boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }) }).optional();
const otp2fa = (options) => {
  const opts = {
    storeOTP: "plain",
    ...options
  };
  async function decryptOTP(ctx, otp) {
    if (opts.storeOTP === "hashed") return await defaultKeyHasher(otp);
    if (opts.storeOTP === "encrypted") return await symmetricDecrypt({
      key: ctx.context.secret,
      data: otp
    });
    if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) return await opts.storeOTP.decrypt(otp);
    if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) return await opts.storeOTP.hash(otp);
    return otp;
  }
  return {
    id: "otp",
    endpoints: {
      sendTwoFactorOTP: createAuthEndpoint("/two-factor/send-otp", {
        method: "POST",
        body: send2FaOTPBodySchema,
        metadata: { openapi: {
          summary: "Send two factor OTP",
          description: "Send two factor OTP to the user",
          responses: { 200: {
            description: "Successful response",
            content: { "application/json": { schema: {
              type: "object",
              properties: { status: { type: "boolean" } }
            } } }
          } }
        } }
      }, async (ctx) => {
        {
          ctx.context.logger.error("send otp isn't configured. Please configure the send otp function on otp options.");
          throw new APIError("BAD_REQUEST", { message: "otp isn't configured" });
        }
      }),
      verifyTwoFactorOTP: createAuthEndpoint("/two-factor/verify-otp", {
        method: "POST",
        body: verifyOTPBodySchema,
        metadata: { openapi: {
          summary: "Verify two factor OTP",
          description: "Verify two factor OTP",
          responses: { "200": {
            description: "Two-factor OTP verified successfully",
            content: { "application/json": { schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  description: "Session token for the authenticated session"
                },
                user: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier of the user"
                    },
                    email: {
                      type: "string",
                      format: "email",
                      nullable: true,
                      description: "User's email address"
                    },
                    emailVerified: {
                      type: "boolean",
                      nullable: true,
                      description: "Whether the email is verified"
                    },
                    name: {
                      type: "string",
                      nullable: true,
                      description: "User's name"
                    },
                    image: {
                      type: "string",
                      format: "uri",
                      nullable: true,
                      description: "User's profile image URL"
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the user was created"
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the user was last updated"
                    }
                  },
                  required: [
                    "id",
                    "createdAt",
                    "updatedAt"
                  ],
                  description: "The authenticated user object"
                }
              },
              required: ["token", "user"]
            } } }
          } }
        } }
      }, async (ctx) => {
        const { session: session2, key, valid, invalid } = await verifyTwoFactor(ctx);
        const toCheckOtp = await ctx.context.internalAdapter.findVerificationValue(`2fa-otp-${key}`);
        const [otp, counter] = toCheckOtp?.value?.split(":") ?? [];
        const decryptedOtp = await decryptOTP(ctx, otp);
        if (!toCheckOtp || toCheckOtp.expiresAt < /* @__PURE__ */ new Date()) {
          if (toCheckOtp) await ctx.context.internalAdapter.deleteVerificationValue(toCheckOtp.id);
          throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.OTP_HAS_EXPIRED });
        }
        const allowedAttempts = 5;
        if (parseInt(counter) >= allowedAttempts) {
          await ctx.context.internalAdapter.deleteVerificationValue(toCheckOtp.id);
          throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE });
        }
        if (constantTimeEqual(new TextEncoder().encode(decryptedOtp), new TextEncoder().encode(ctx.body.code))) {
          if (!session2.user.twoFactorEnabled) {
            if (!session2.session) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION });
            const updatedUser = await ctx.context.internalAdapter.updateUser(session2.user.id, { twoFactorEnabled: true });
            const newSession = await ctx.context.internalAdapter.createSession(session2.user.id, false, session2.session);
            await ctx.context.internalAdapter.deleteSession(session2.session.token);
            await setSessionCookie(ctx, {
              session: newSession,
              user: updatedUser
            });
            return ctx.json({
              token: newSession.token,
              user: {
                id: updatedUser.id,
                email: updatedUser.email,
                emailVerified: updatedUser.emailVerified,
                name: updatedUser.name,
                image: updatedUser.image,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
              }
            });
          }
          return valid(ctx);
        } else {
          await ctx.context.internalAdapter.updateVerificationValue(toCheckOtp.id, { value: `${otp}:${(parseInt(counter, 10) || 0) + 1}` });
          return invalid("INVALID_CODE");
        }
      })
    }
  };
};
const schema$1 = {
  user: { fields: { twoFactorEnabled: {
    type: "boolean",
    required: false,
    defaultValue: false,
    input: false
  } } },
  twoFactor: { fields: {
    secret: {
      type: "string",
      required: true,
      returned: false,
      index: true
    },
    backupCodes: {
      type: "string",
      required: true,
      returned: false
    },
    userId: {
      type: "string",
      required: true,
      returned: false,
      references: {
        model: "user",
        field: "id"
      },
      index: true
    }
  } }
};
const generateTOTPBodySchema = z.object({ secret: z.string().meta({ description: "The secret to generate the TOTP code" }) });
const getTOTPURIBodySchema = z.object({ password: z.string().meta({ description: "User password" }) });
const verifyTOTPBodySchema = z.object({
  code: z.string().meta({ description: 'The otp code to verify. Eg: "012345"' }),
  trustDevice: z.boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
const totp2fa = (options) => {
  const opts = {
    ...options,
    digits: 6,
    period: 30
  };
  const twoFactorTable = "twoFactor";
  return {
    id: "totp",
    endpoints: {
      generateTOTP: createAuthEndpoint({
        method: "POST",
        body: generateTOTPBodySchema,
        metadata: { openapi: {
          summary: "Generate TOTP code",
          description: "Use this endpoint to generate a TOTP code",
          responses: { 200: {
            description: "Successful response",
            content: { "application/json": { schema: {
              type: "object",
              properties: { code: { type: "string" } }
            } } }
          } }
        } }
      }, async (ctx) => {
        return { code: await createOTP(ctx.body.secret, {
          period: opts.period,
          digits: opts.digits
        }).totp() };
      }),
      getTOTPURI: createAuthEndpoint("/two-factor/get-totp-uri", {
        method: "POST",
        use: [sessionMiddleware],
        body: getTOTPURIBodySchema,
        metadata: { openapi: {
          summary: "Get TOTP URI",
          description: "Use this endpoint to get the TOTP URI",
          responses: { 200: {
            description: "Successful response",
            content: { "application/json": { schema: {
              type: "object",
              properties: { totpURI: { type: "string" } }
            } } }
          } }
        } }
      }, async (ctx) => {
        const user2 = ctx.context.session.user;
        const twoFactor2 = await ctx.context.adapter.findOne({
          model: twoFactorTable,
          where: [{
            field: "userId",
            value: user2.id
          }]
        });
        if (!twoFactor2) throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED });
        const secret = await symmetricDecrypt({
          key: ctx.context.secret,
          data: twoFactor2.secret
        });
        await ctx.context.password.checkPassword(user2.id, ctx);
        return { totpURI: createOTP(secret, {
          digits: opts.digits,
          period: opts.period
        }).url(ctx.context.appName, user2.email) };
      }),
      verifyTOTP: createAuthEndpoint("/two-factor/verify-totp", {
        method: "POST",
        body: verifyTOTPBodySchema,
        metadata: { openapi: {
          summary: "Verify two factor TOTP",
          description: "Verify two factor TOTP",
          responses: { 200: {
            description: "Successful response",
            content: { "application/json": { schema: {
              type: "object",
              properties: { status: { type: "boolean" } }
            } } }
          } }
        } }
      }, async (ctx) => {
        const { session: session2, valid, invalid } = await verifyTwoFactor(ctx);
        const user2 = session2.user;
        const twoFactor2 = await ctx.context.adapter.findOne({
          model: twoFactorTable,
          where: [{
            field: "userId",
            value: user2.id
          }]
        });
        if (!twoFactor2) throw new APIError("BAD_REQUEST", { message: TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED });
        if (!await createOTP(await symmetricDecrypt({
          key: ctx.context.secret,
          data: twoFactor2.secret
        }), {
          period: opts.period,
          digits: opts.digits
        }).verify(ctx.body.code)) return invalid("INVALID_CODE");
        if (!user2.twoFactorEnabled) {
          if (!session2.session) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION });
          const updatedUser = await ctx.context.internalAdapter.updateUser(user2.id, { twoFactorEnabled: true });
          const newSession = await ctx.context.internalAdapter.createSession(user2.id, false, session2.session).catch((e) => {
            throw e;
          });
          await ctx.context.internalAdapter.deleteSession(session2.session.token);
          await setSessionCookie(ctx, {
            session: newSession,
            user: updatedUser
          });
        }
        return valid(ctx);
      })
    }
  };
};
const enableTwoFactorBodySchema = z.object({
  password: z.string().meta({ description: "User password" }),
  issuer: z.string().meta({ description: "Custom issuer for the TOTP URI" }).optional()
});
const disableTwoFactorBodySchema = z.object({ password: z.string().meta({ description: "User password" }) });
const twoFactor$1 = (options) => {
  const opts = { twoFactorTable: "twoFactor" };
  const backupCodeOptions = {
    storeBackupCodes: "encrypted",
    ...options?.backupCodeOptions
  };
  const totp = totp2fa(options?.totpOptions);
  const backupCode = backupCode2fa(backupCodeOptions);
  const otp = otp2fa(options?.otpOptions);
  return {
    id: "two-factor",
    endpoints: {
      ...totp.endpoints,
      ...otp.endpoints,
      ...backupCode.endpoints,
      enableTwoFactor: createAuthEndpoint("/two-factor/enable", {
        method: "POST",
        body: enableTwoFactorBodySchema,
        use: [sessionMiddleware],
        metadata: { openapi: {
          summary: "Enable two factor authentication",
          description: "Use this endpoint to enable two factor authentication. This will generate a TOTP URI and backup codes. Once the user verifies the TOTP URI, the two factor authentication will be enabled.",
          responses: { 200: {
            description: "Successful response",
            content: { "application/json": { schema: {
              type: "object",
              properties: {
                totpURI: {
                  type: "string",
                  description: "TOTP URI"
                },
                backupCodes: {
                  type: "array",
                  items: { type: "string" },
                  description: "Backup codes"
                }
              }
            } } }
          } }
        } }
      }, async (ctx) => {
        const user2 = ctx.context.session.user;
        const { password, issuer } = ctx.body;
        if (!await validatePassword(ctx, {
          password,
          userId: user2.id
        })) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_PASSWORD });
        const secret = generateRandomString(32);
        const encryptedSecret = await symmetricEncrypt({
          key: ctx.context.secret,
          data: secret
        });
        const backupCodes = await generateBackupCodes(ctx.context.secret, backupCodeOptions);
        await ctx.context.adapter.deleteMany({
          model: opts.twoFactorTable,
          where: [{
            field: "userId",
            value: user2.id
          }]
        });
        await ctx.context.adapter.create({
          model: opts.twoFactorTable,
          data: {
            secret: encryptedSecret,
            backupCodes: backupCodes.encryptedBackupCodes,
            userId: user2.id
          }
        });
        const totpURI = createOTP(secret, {
          digits: 6,
          period: options?.totpOptions?.period
        }).url(issuer || options?.issuer || ctx.context.appName, user2.email);
        return ctx.json({
          totpURI,
          backupCodes: backupCodes.backupCodes
        });
      }),
      disableTwoFactor: createAuthEndpoint("/two-factor/disable", {
        method: "POST",
        body: disableTwoFactorBodySchema,
        use: [sessionMiddleware],
        metadata: { openapi: {
          summary: "Disable two factor authentication",
          description: "Use this endpoint to disable two factor authentication.",
          responses: { 200: {
            description: "Successful response",
            content: { "application/json": { schema: {
              type: "object",
              properties: { status: { type: "boolean" } }
            } } }
          } }
        } }
      }, async (ctx) => {
        const user2 = ctx.context.session.user;
        const { password } = ctx.body;
        if (!await validatePassword(ctx, {
          password,
          userId: user2.id
        })) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_PASSWORD });
        const updatedUser = await ctx.context.internalAdapter.updateUser(user2.id, { twoFactorEnabled: false });
        await ctx.context.adapter.delete({
          model: opts.twoFactorTable,
          where: [{
            field: "userId",
            value: updatedUser.id
          }]
        });
        await setSessionCookie(ctx, {
          session: await ctx.context.internalAdapter.createSession(updatedUser.id, false, ctx.context.session.session),
          user: updatedUser
        });
        await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
        return ctx.json({ status: true });
      })
    },
    options,
    hooks: { after: [{
      matcher(context) {
        return context.path === "/sign-in/email" || context.path === "/sign-in/username" || context.path === "/sign-in/phone-number";
      },
      handler: createAuthMiddleware(async (ctx) => {
        const data = ctx.context.newSession;
        if (!data) return;
        if (!data?.user.twoFactorEnabled) return;
        const trustDeviceCookieAttrs = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: TRUST_DEVICE_COOKIE_MAX_AGE });
        const trustDeviceCookie = await ctx.getSignedCookie(trustDeviceCookieAttrs.name, ctx.context.secret);
        if (trustDeviceCookie) {
          const [token, sessionToken] = trustDeviceCookie.split("!");
          if (token === await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${sessionToken}`)) {
            const newTrustDeviceCookie = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: TRUST_DEVICE_COOKIE_MAX_AGE });
            const newToken = await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${data.session.token}`);
            await ctx.setSignedCookie(newTrustDeviceCookie.name, `${newToken}!${data.session.token}`, ctx.context.secret, trustDeviceCookieAttrs.attributes);
            return;
          }
        }
        deleteSessionCookie(ctx, true);
        await ctx.context.internalAdapter.deleteSession(data.session.token);
        const maxAge = 3 * 60;
        const twoFactorCookie = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME, { maxAge });
        const identifier = `2fa-${generateRandomString(20)}`;
        await ctx.context.internalAdapter.createVerificationValue({
          value: data.user.id,
          identifier,
          expiresAt: new Date(Date.now() + maxAge * 1e3)
        });
        await ctx.setSignedCookie(twoFactorCookie.name, identifier, ctx.context.secret, twoFactorCookie.attributes);
        return ctx.json({ twoFactorRedirect: true });
      })
    }] },
    schema: mergeSchema(schema$1, options?.schema),
    rateLimit: [{
      pathMatcher(path) {
        return path.startsWith("/two-factor/");
      },
      window: 10,
      max: 3
    }],
    $ERROR_CODES: TWO_FACTOR_ERROR_CODES
  };
};
defineErrorCodes({
  INVALID_USERNAME_OR_PASSWORD: "Invalid username or password",
  EMAIL_NOT_VERIFIED: "Email not verified",
  UNEXPECTED_ERROR: "Unexpected error",
  USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.",
  USERNAME_TOO_SHORT: "Username is too short",
  USERNAME_TOO_LONG: "Username is too long",
  INVALID_USERNAME: "Username is invalid",
  INVALID_DISPLAY_USERNAME: "Display username is invalid"
});
z.object({
  username: z.string().meta({ description: "The username of the user" }),
  password: z.string().meta({ description: "The password of the user" }),
  rememberMe: z.boolean().meta({ description: "Remember the user session" }).optional(),
  callbackURL: z.string().meta({ description: "The URL to redirect to after email verification" }).optional()
});
z.object({ username: z.string().meta({ description: "The username to check" }) });
const tanstackStartCookies = () => {
  return {
    id: "tanstack-start-cookies",
    hooks: { after: [{
      matcher(ctx) {
        return true;
      },
      handler: createAuthMiddleware(async (ctx) => {
        const returned = ctx.context.responseHeaders;
        if ("_flag" in ctx && ctx._flag === "router") return;
        if (returned instanceof Headers) {
          const setCookies = returned?.get("set-cookie");
          if (!setCookies) return;
          const parsed = parseSetCookieHeader(setCookies);
          const { setCookie } = await import("./server-FFq0J1Wz.mjs").then(function(n) {
            return n.s;
          });
          parsed.forEach((value, key) => {
            if (!key) return;
            const opts = {
              sameSite: value.samesite,
              secure: value.secure,
              maxAge: value["max-age"],
              httpOnly: value.httponly,
              domain: value.domain,
              path: value.path
            };
            try {
              setCookie(key, decodeURIComponent(value.value), opts);
            } catch {
            }
          });
          return;
        }
      })
    }] }
  };
};
const manage = {
  manage: ["create", "share", "update", "delete"]
};
const ac = createAccessControl(manage);
const manager = ac.newRole({
  manage: ["create", "share", "update", "delete"]
});
const db = drizzle({
  connection: {
    url: process.env.TURSO_BETTER_AUTH_CONNECTION_URL,
    authToken: process.env.TURSO_BETTER_AUTH_TOKEN
  }
});
const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
  twoFactorEnabled: integer("two_factor_enabled", { mode: "boolean" }).default(
    false
  ),
  role: text("role"),
  banned: integer("banned", { mode: "boolean" }).default(false),
  banReason: text("ban_reason"),
  banExpires: integer("ban_expires", { mode: "timestamp_ms" })
});
const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  activeOrganizationId: text("active_organization_id"),
  impersonatedBy: text("impersonated_by")
});
const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp_ms"
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp_ms"
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
const twoFactor = sqliteTable("two_factor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
});
const organization = sqliteTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  metadata: text("metadata")
});
const member = sqliteTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  role: text("role").default("member").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull()
});
const invitation = sqliteTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").default("pending").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  inviterId: text("inviter_id").notNull().references(() => user.id, { onDelete: "cascade" })
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  account,
  invitation,
  member,
  organization,
  session,
  twoFactor,
  user,
  verification
}, Symbol.toStringTag, { value: "Module" }));
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    // or "mysql", "sqlite",
    schema: {
      ...schema
    }
  }),
  appName: "Wrestler of the Day",
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      // accessType: "offline",
      // propt: "select_account consent"
    }
  },
  plugins: [
    twoFactor$1(),
    oneTap(),
    tanstackStartCookies(),
    organization$1(),
    admin({
      adminUserIds: [],
      plugins: [
        adminClient({
          ac,
          roles: {
            manager
          }
        })
      ]
    })
  ]
});
createMiddleware().server(
  async ({ next, request }) => {
    const headers = getRequestHeaders();
    const session2 = await auth.api.getSession({ headers });
    console.log("hit Middleware", { session: !!session2 });
    if (!session2) {
      throw redirect({ to: "/login" });
    }
    return await next();
  }
);
const adminMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const headers = getRequestHeaders();
    const session2 = await auth.api.getSession({ headers });
    if (!session2) {
      throw redirect({ to: "/login" });
    }
    const user2 = session2.user;
    if (user2.role && user2.role.includes("admin")) {
      return await next();
    }
    throw redirect({ to: "/vote" });
  }
);
const $$splitComponentImporter$2 = () => import("./manage-Bzz2fSb6.mjs");
const Route$3 = createFileRoute("/manage")({
  loader: async () => {
    const result = await getWrestlersWithVoteCounts();
    return {
      wrestlers: result.data,
      totalVotes: result.totalVotes
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  server: {
    middleware: [adminMiddleware]
  }
});
const $$splitComponentImporter$1 = () => import("./login-Cw1QuW-7.mjs");
const Route$2 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-B0PUMhhw.mjs");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return await auth.handler(request);
      },
      POST: async ({ request }) => {
        return await auth.handler(request);
      }
    }
  }
});
const VoteRoute = Route$4.update({
  id: "/vote",
  path: "/vote",
  getParentRoute: () => Route$5
});
const ManageRoute = Route$3.update({
  id: "/manage",
  path: "/manage",
  getParentRoute: () => Route$5
});
const LoginRoute = Route$2.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const ApiAuthSplatRoute = Route.update({
  id: "/api/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  LoginRoute,
  ManageRoute,
  VoteRoute,
  ApiAuthSplatRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  createReactComponent as a,
  addWrestlers as b,
  createKyselyAdapter as c,
  Route$3 as d,
  updateWrestler as e,
  deleteWrestler as f,
  getKyselyDatabaseType as g,
  getBaseURL as h,
  hasPermissionFn as i,
  defaultRoles$1 as j,
  adminAc as k,
  adminClient as l,
  memberAc as m,
  ownerAc as o,
  parseJSON as p,
  router as r,
  submitVote as s,
  useFingerprint as u
};
