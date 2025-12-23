import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn, B as Button } from "./button-GGUcpVGc.mjs";
import { u as useSession, a as signOut } from "./auth-client-Di1Pgm1o.mjs";
import { Avatar as Avatar$1 } from "@base-ui/react/avatar";
import { Popover as Popover$1 } from "@base-ui/react/popover";
import { a as createReactComponent } from "./router-ChUkarf1.mjs";
const __iconNode = [["path", { "d": "M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2", "key": "svg-0" }], ["path", { "d": "M9 12h12l-3 -3", "key": "svg-1" }], ["path", { "d": "M18 15l3 -3", "key": "svg-2" }]];
const IconLogout = createReactComponent("outline", "logout", "Logout", __iconNode);
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Root,
    {
      "data-slot": "avatar",
      "data-size": size,
      className: cn(
        "size-8 rounded-full after:rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6 after:border-border group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:mix-blend-darken dark:after:mix-blend-lighten",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Image,
    {
      "data-slot": "avatar-image",
      className: cn(
        "rounded-full aspect-square size-full object-cover",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted text-muted-foreground rounded-full flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs",
        className
      ),
      ...props
    }
  );
}
function Popover({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsx(
        Popover$1.Popup,
        {
          "data-slot": "popover-content",
          className: cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 duration-100 z-50 w-72 origin-(--transform-origin) outline-hidden",
            className
          ),
          ...props
        }
      )
    }
  ) });
}
function User() {
  const { data: session } = useSession();
  const userName = session?.user.name ?? "";
  const userImage = session?.user.image ?? "";
  const userInitial = userName.charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(session ? "cursor-pointer outline-none" : "hidden"),
        children: /* @__PURE__ */ jsxs(Avatar, { children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: userImage, alt: userName }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: userInitial })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { align: "end", className: "w-auto", children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "secondary",
        onClick: () => signOut(),
        className: "w-full",
        children: [
          /* @__PURE__ */ jsx(IconLogout, {}),
          "Log out"
        ]
      }
    ) })
  ] });
}
export {
  User as U
};
