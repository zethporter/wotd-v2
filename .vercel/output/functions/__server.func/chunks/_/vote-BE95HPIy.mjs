import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "sonner";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { R as Route$4, u as useFingerprint, a as createReactComponent, s as submitVote } from "./router-ChUkarf1.mjs";
import { B as Button, c as cn } from "./button-GGUcpVGc.mjs";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import { D as Dialog, a as DialogPortal, b as DialogContent, c as DialogTitle, d as DialogClose, I as InputGroup, e as InputGroupInput, f as InputGroupAddon, g as IconSearch, h as IconX } from "./input-group-D9znI_e6.mjs";
import "@tanstack/react-router";
import "next-themes";
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
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/dialog";
import "@base-ui/react/input";
const __iconNode$3 = [["path", { "d": "M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9", "key": "svg-0" }], ["path", { "d": "M17 12a5 5 0 1 0 -5 5", "key": "svg-1" }]];
const IconLoader3 = createReactComponent("outline", "loader-3", "Loader3", __iconNode$3);
const __iconNode$2 = [["path", { "d": "M3 5a1 1 0 0 1 1 -1a1 1 0 0 1 1.993 -.117l.007 .117a1 1 0 0 1 .117 1.993l-.117 .007a1 1 0 1 1 -2 0a1 1 0 0 1 -1 -1m7.53 -1.243a1 1 0 1 1 1.94 .486l-.5 2a1 1 0 1 1 -1.94 -.486zm6.47 1.243a1 1 0 0 1 1 -1a1 1 0 0 1 1.993 -.117l.007 .117a1 1 0 0 1 .117 1.993l-.117 .007a1 1 0 0 1 -2 0a1 1 0 0 1 -1 -1m-8.81 4.293l6.517 6.518a1 1 0 0 1 -.29 1.617l-9.573 4.387a2 2 0 0 1 -2.661 -2.652l4.39 -9.58a1 1 0 0 1 1.616 -.29m7.517 -1a1 1 0 0 1 0 1.414l-1 1a1 1 0 0 1 -1.414 -1.414l1 -1a1 1 0 0 1 1.414 0m4.05 3.237a1 1 0 0 1 .486 1.94l-2 .5a1 1 0 0 1 -.486 -1.94zm-2.756 7.47a1 1 0 0 1 1 -1a1 1 0 0 1 1.993 -.117l.007 .117a1 1 0 0 1 .117 1.993l-.117 .007a1 1 0 0 1 -2 0a1 1 0 0 1 -1 -1", "key": "svg-0" }]];
const IconConfettiFilled = createReactComponent("filled", "confetti-filled", "ConfettiFilled", __iconNode$2);
const __iconNode$1 = [["path", { "d": "M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1", "key": "svg-0" }]];
const IconExclamationCircleFilled = createReactComponent("filled", "exclamation-circle-filled", "ExclamationCircleFilled", __iconNode$1);
const __iconNode = [["path", { "d": "M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z", "key": "svg-0" }]];
const IconHeartFilled = createReactComponent("filled", "heart-filled", "HeartFilled", __iconNode);
const itemVariants = cva(
  "[a]:hover:bg-muted rounded-lg border text-sm w-full group/item focus-visible:border-ring focus-visible:ring-ring/50 flex items-center flex-wrap outline-none transition-colors duration-100 focus-visible:ring-[3px] [a]:transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "bg-muted/50 border-transparent"
      },
      size: {
        default: "gap-2.5 px-3 py-2.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 [[data-slot=dropdown-menu-content]_&]:p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps(
      {
        className: cn(itemVariants({ variant, size, className }))
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size
    }
  });
}
cva(
  "gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ItemContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "item-content",
      className: cn(
        "gap-1 group-data-[size=xs]/item:gap-0 flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none",
        className
      ),
      ...props
    }
  );
}
function ItemTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "item-title",
      className: cn(
        "gap-2 text-sm leading-snug font-medium underline-offset-4 line-clamp-1 flex w-fit items-center",
        className
      ),
      ...props
    }
  );
}
function ItemDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "item-description",
      className: cn(
        "text-muted-foreground text-left text-sm leading-normal group-data-[size=xs]/item:text-xs [&>a:hover]:text-primary line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function ItemActions({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "item-actions",
      className: cn("gap-2 flex items-center", className),
      ...props
    }
  );
}
const VoteCard = ({
  wrestler,
  setVotee
}) => {
  return /* @__PURE__ */ jsxs(Item, { variant: "outline", children: [
    /* @__PURE__ */ jsxs(ItemContent, { children: [
      /* @__PURE__ */ jsx(ItemTitle, { children: wrestler.name }),
      /* @__PURE__ */ jsx(ItemDescription, { children: wrestler.school })
    ] }),
    /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "icon-lg",
        onClick: () => setVotee(wrestler),
        children: /* @__PURE__ */ jsx(IconHeartFilled, { className: "fill-primary" })
      }
    ) })
  ] });
};
function VoteSearch({
  value,
  search
}) {
  return /* @__PURE__ */ jsxs(InputGroup, { className: "max-w-2xl self-center", children: [
    /* @__PURE__ */ jsx(
      InputGroupInput,
      {
        value,
        onChange: (e) => search(e.target.value),
        placeholder: "Search..."
      }
    ),
    /* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(IconSearch, {}) }),
    /* @__PURE__ */ jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx(
      Button,
      {
        disabled: value === "",
        onClick: () => search(""),
        size: "icon-xs",
        variant: "ghost",
        children: /* @__PURE__ */ jsx(IconX, {})
      }
    ) })
  ] });
}
const badgeVariants = cva(
  "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ className, variant }))
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant
    }
  });
}
const voteStatusAtom = atomWithStorage("voteStatus", "selecting");
function RouteComponent() {
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(RouteContent, {}) });
}
function RouteContent() {
  const {
    data
  } = Route$4.useLoaderData();
  const {
    fingerprint
  } = useFingerprint();
  const [voteStatus, setVoteStatus] = useAtom(voteStatusAtom);
  const [votee, setVotee] = useState(null);
  const [search, setSearch] = useState("");
  const handleVote = async () => {
    if (votee && fingerprint) {
      setVoteStatus("voting");
      const res = await submitVote({
        data: {
          wrestlerId: votee.id,
          fingerprint
        }
      });
      if (res.success) {
        setVoteStatus("submitted");
      } else {
        setVoteStatus("error");
        toast.error(res.message);
      }
    }
  };
  switch (voteStatus) {
    case "selecting":
      return /* @__PURE__ */ jsxs(motion.div, { initial: {
        x: 300,
        opacity: 0
      }, animate: {
        x: 0,
        opacity: 1
      }, exit: {
        x: -300,
        opacity: 0
      }, className: "flex flex-col p-4 gap-4 overflow-hidden", children: [
        /* @__PURE__ */ jsx(VoteSearch, { value: search, search: setSearch }),
        /* @__PURE__ */ jsx("div", { className: "grow overflow-auto py-10", children: /* @__PURE__ */ jsx("div", { className: "flex w-full max-w-md flex-col gap-4 mx-auto", children: data.filter((wrestler) => wrestler.name.toLowerCase().includes(search.toLowerCase()) || wrestler.school.toLowerCase().includes(search.toLowerCase())).map((wrestler) => /* @__PURE__ */ jsx(VoteCard, { wrestler, setVotee }, wrestler.id)) }) }),
        /* @__PURE__ */ jsx(Dialog, { open: !!votee, onOpenChange: () => setVotee(null), children: /* @__PURE__ */ jsx(DialogPortal, { children: /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl font-semibold", children: "Confirm Vote For" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "w-full text-lg font-bold", children: votee ? votee.name : "" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: votee ? votee.school : "" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-start flex-row-reverse gap-4 pt-6", children: [
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => handleVote(), children: "Confirm" }),
              /* @__PURE__ */ jsx(DialogClose, { children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", children: "Cancel" }) })
            ] })
          ] })
        ] }) }) })
      ] });
    case "voting":
      return /* @__PURE__ */ jsx(motion.div, { initial: {
        x: 300,
        opacity: 0
      }, animate: {
        x: 0,
        opacity: 1
      }, exit: {
        x: -300,
        opacity: 0
      }, className: "w-full h-screen flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5 justify-center items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "animate-spin duration-200", children: /* @__PURE__ */ jsx(IconLoader3, {}) }),
        /* @__PURE__ */ jsx("span", { children: "Submitting Vote" })
      ] }) });
    case "submitted":
      return /* @__PURE__ */ jsx(motion.div, { initial: {
        x: 300,
        opacity: 0
      }, animate: {
        x: 0,
        opacity: 1
      }, exit: {
        x: -300,
        opacity: 0
      }, className: "w-full h-screen flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5 justify-center items-center", children: [
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(IconConfettiFilled, {}) }),
        /* @__PURE__ */ jsx("span", { children: "Thanks For Voting!" })
      ] }) });
    case "error":
      return /* @__PURE__ */ jsxs(motion.div, { initial: {
        x: 300,
        opacity: 0
      }, animate: {
        x: 0,
        opacity: 1
      }, exit: {
        x: -300,
        opacity: 0
      }, className: "w-full h-screen flex flex-col justify-center gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5 justify-center", children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(IconExclamationCircleFilled, {}) }),
          /* @__PURE__ */ jsx("span", { children: "Something Went wrong please try again" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setVoteStatus("selecting"), children: "Select Wrestler" }) })
      ] });
  }
}
export {
  RouteComponent as component
};
