import { jsxs, jsx } from "react/jsx-runtime";
import { useReactTable, getFilteredRowModel, getPaginationRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState } from "react";
import { d as Route$3, a as createReactComponent, e as updateWrestler, f as deleteWrestler, b as addWrestlers } from "./router-ChUkarf1.mjs";
import { B as Button, c as cn } from "./button-GGUcpVGc.mjs";
import { Menu } from "@base-ui/react/menu";
import { I as InputGroup, e as InputGroupInput, f as InputGroupAddon, g as IconSearch, D as Dialog, b as DialogContent, i as DialogHeader, c as DialogTitle, j as DialogDescription, k as Input, l as DialogFooter, m as DialogTrigger } from "./input-group-D9znI_e6.mjs";
import { AlertDialog as AlertDialog$1 } from "@base-ui/react/alert-dialog";
import { toast } from "sonner";
import Papa from "papaparse";
import { U as User } from "./user-management-BWdgOkBv.mjs";
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
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/dialog";
import "@base-ui/react/input";
import "./auth-client-Di1Pgm1o.mjs";
import "nanostores";
import "@better-fetch/fetch";
import "@base-ui/react/avatar";
import "@base-ui/react/popover";
const __iconNode$5 = [["path", { "d": "M15 6l-6 6l6 6", "key": "svg-0" }]];
const IconChevronLeft = createReactComponent("outline", "chevron-left", "ChevronLeft", __iconNode$5);
const __iconNode$4 = [["path", { "d": "M9 6l6 6l-6 6", "key": "svg-0" }]];
const IconChevronRight = createReactComponent("outline", "chevron-right", "ChevronRight", __iconNode$4);
const __iconNode$3 = [["path", { "d": "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }]];
const IconDotsVertical = createReactComponent("outline", "dots-vertical", "DotsVertical", __iconNode$3);
const __iconNode$2 = [["path", { "d": "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }]];
const IconDots = createReactComponent("outline", "dots", "Dots", __iconNode$2);
const __iconNode$1 = [["path", { "d": "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "key": "svg-0" }], ["path", { "d": "M16 19h6", "key": "svg-1" }], ["path", { "d": "M19 16v6", "key": "svg-2" }], ["path", { "d": "M6 21v-2a4 4 0 0 1 4 -4h4", "key": "svg-3" }]];
const IconUserPlus = createReactComponent("outline", "user-plus", "UserPlus", __iconNode$1);
const __iconNode = [["path", { "d": "M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "key": "svg-0" }], ["path", { "d": "M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901", "key": "svg-1" }], ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75", "key": "svg-2" }], ["path", { "d": "M16 19h6", "key": "svg-3" }], ["path", { "d": "M19 16v6", "key": "svg-4" }]];
const IconUsersPlus = createReactComponent("outline", "users-plus", "UsersPlus", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ jsx(
    "table",
    {
      "data-slot": "table",
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) });
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  );
}
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ jsx(Menu.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Menu.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(
    Menu.Positioner,
    {
      className: "isolate z-50 outline-none",
      align,
      alignOffset,
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx(
        Menu.Popup,
        {
          "data-slot": "dropdown-menu-content",
          className: cn("data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden", className),
          ...props
        }
      )
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Menu.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Backdrop,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialog$1.Popup,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-sm font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Close,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      render: /* @__PURE__ */ jsx(Button, { variant, size }),
      ...props
    }
  );
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn(
        "mx-auto flex w-full justify-center",
        className
      ),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("gap-0.5 flex items-center", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: isActive ? "outline" : "ghost",
      size,
      className: cn(className),
      nativeButton: false,
      render: /* @__PURE__ */ jsx(
        "a",
        {
          "aria-current": isActive ? "page" : void 0,
          "data-slot": "pagination-link",
          "data-active": isActive,
          ...props
        }
      )
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("pl-1.5!", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(IconChevronLeft, { "data-icon": "inline-start" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("pr-1.5!", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ jsx(IconChevronRight, { "data-icon": "inline-end" })
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn(
        "size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          IconDots,
          {}
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
const handleFileChange = (event) => {
  toast.loading("Validating Wrestlers list", { id: "wrestlers" });
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Error: Please select a valid .csv file.", {
        id: "wrestlers"
      });
      event.target.value = "";
      return;
    }
    Papa.parse(file, {
      header: true,
      // Treat the first row as headers
      skipEmptyLines: true,
      // Skip empty rows
      dynamicTyping: false,
      // Keep as strings for validation
      complete: async (results) => {
        if (results.data.length > 0) {
          const wrestlersData = results.data.map((row) => ({
            id: "",
            // Will be transformed by zod schema
            name: row.name,
            school: row.school
          }));
          toast.success("Wrestlers Validated", { id: "wrestlers" });
          const res = await addWrestlers({ data: wrestlersData });
          if (res.success) {
            toast.success("Wrestlers Added Successfully");
          } else {
            toast.error(res.message);
          }
        } else {
          toast.warning("No Valid Wrestlers Found", { id: "wrestlers" });
        }
      },
      error: (err) => {
        toast.error(`PapaParse Error: ${err}`, { id: "wrestlers" });
      }
    });
  } else {
    toast.warning("No file selected.", { id: "wrestlers" });
  }
};
const WrestlersUpload = () => /* @__PURE__ */ jsxs(Dialog, { children: [
  /* @__PURE__ */ jsx(DialogTrigger, { children: /* @__PURE__ */ jsxs(Button, { variant: "secondary", children: [
    /* @__PURE__ */ jsx(IconUsersPlus, {}),
    " Upload Wrestlers"
  ] }) }),
  /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Upload Wrestlers" }),
      " ",
      /* @__PURE__ */ jsx(DialogDescription, { children: "Upload CSV Files to mass insert wrestlers" })
    ] }),
    /* @__PURE__ */ jsx(Input, { type: "file", onChange: handleFileChange })
  ] })
] });
const AddSingleWrestler = () => {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !school.trim()) {
      toast.error("Please fill in both name and school");
      return;
    }
    toast.loading("Adding wrestler", { id: "add-wrestler" });
    const wrestlerData = [
      {
        id: "",
        name: name.trim(),
        school: school.trim()
      }
    ];
    const res = await addWrestlers({ data: wrestlerData });
    if (res.success) {
      toast.success("Wrestler added successfully", { id: "add-wrestler" });
      setName("");
      setSchool("");
      setIsOpen(false);
    } else {
      toast.error(res.message, { id: "add-wrestler" });
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { children: /* @__PURE__ */ jsxs(Button, { children: [
      /* @__PURE__ */ jsx(IconUserPlus, {}),
      " Add Wrestler"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Add Wrestler" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Add a single wrestler to the database" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-sm font-medium", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Enter wrestler name",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "school", className: "text-sm font-medium", children: "School" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "school",
              type: "text",
              value: school,
              onChange: (e) => setSchool(e.target.value),
              placeholder: "Enter school name",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Add Wrestler" })
      ] })
    ] })
  ] });
};
function RouteComponent() {
  const {
    wrestlers,
    totalVotes
  } = Route$3.useLoaderData();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingWrestler, setEditingWrestler] = useState(null);
  const [deletingWrestler, setDeletingWrestler] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    school: ""
  });
  const handleEdit = (wrestler) => {
    setEditingWrestler(wrestler);
    setEditForm({
      name: wrestler.name,
      school: wrestler.school
    });
  };
  const handleDelete = (wrestler) => {
    setDeletingWrestler(wrestler);
  };
  const confirmDelete = async () => {
    if (!deletingWrestler) return;
    try {
      const result = await deleteWrestler({
        data: deletingWrestler.id
      });
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete wrestler");
    } finally {
      setDeletingWrestler(null);
    }
  };
  const submitEdit = async () => {
    if (!editingWrestler) return;
    const updates = {};
    if (editForm.name !== editingWrestler.name) updates.name = editForm.name;
    if (editForm.school !== editingWrestler.school) updates.school = editForm.school;
    if (Object.keys(updates).length === 0) {
      toast.info("No changes to save");
      setEditingWrestler(null);
      return;
    }
    try {
      const result = await updateWrestler({
        data: {
          id: editingWrestler.id,
          newValues: updates
        }
      });
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update wrestler");
    } finally {
      setEditingWrestler(null);
    }
  };
  const columns = [{
    accessorKey: "name",
    header: "Name"
  }, {
    accessorKey: "school",
    header: "School"
  }, {
    accessorKey: "voteCount",
    header: "Votes"
  }, {
    id: "actions",
    header: () => null,
    cell: ({
      row
    }) => {
      const wrestler = row.original;
      return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { render: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon-sm" }), children: /* @__PURE__ */ jsx(IconDotsVertical, { className: "size-4" }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => handleEdit(wrestler), children: "Edit" }),
          /* @__PURE__ */ jsx(DropdownMenuItem, { variant: "destructive", onClick: () => handleDelete(wrestler), children: "Delete" })
        ] })
      ] }) });
    }
  }];
  const table = useReactTable({
    data: wrestlers,
    columns,
    state: {
      pagination,
      globalFilter
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      const name = row.original.name.toLowerCase();
      const school = row.original.school.toLowerCase();
      return name.includes(search) || school.includes(search);
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between gap-2 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Manage Wrestlers" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "View and manage all wrestlers and their votes" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
          "Total votes: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: totalVotes })
        ] })
      ] }),
      /* @__PURE__ */ jsx(User, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between gap-2 py-4", children: [
      /* @__PURE__ */ jsxs(InputGroup, { className: "max-w-2xl self-center", children: [
        /* @__PURE__ */ jsx(InputGroupInput, { value: globalFilter, onChange: (e) => setGlobalFilter(e.target.value), className: "pl-8", placeholder: "Search Name or School" }),
        /* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(IconSearch, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 justify-between", children: [
        /* @__PURE__ */ jsx(AddSingleWrestler, {}),
        /* @__PURE__ */ jsx(WrestlersUpload, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-lg border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No wrestlers found." }) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
    ] }) }),
    table.getPageCount() > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "Showing",
        " ",
        table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
        " ",
        "to",
        " ",
        Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length),
        " ",
        "of ",
        table.getFilteredRowModel().rows.length,
        " results"
      ] }),
      /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationPrevious, { onClick: () => table.previousPage(), className: !table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer" }) }),
        generatePaginationLinks(table.getState().pagination.pageIndex, table.getPageCount()).map((page, idx) => page === "..." ? /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }, `ellipsis-${idx}`) : /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationLink, { onClick: () => table.setPageIndex(page), isActive: table.getState().pagination.pageIndex === page, className: "cursor-pointer", children: page + 1 }) }, page)),
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationNext, { onClick: () => table.nextPage(), className: !table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!editingWrestler, onOpenChange: (open) => !open && setEditingWrestler(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Edit Wrestler" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update the wrestler's name or school" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-sm font-medium", children: "Name" }),
          /* @__PURE__ */ jsx(Input, { id: "name", value: editForm.name, onChange: (e) => setEditForm((prev) => ({
            ...prev,
            name: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "school", className: "text-sm font-medium", children: "School" }),
          /* @__PURE__ */ jsx(Input, { id: "school", value: editForm.school, onChange: (e) => setEditForm((prev) => ({
            ...prev,
            school: e.target.value
          })) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditingWrestler(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { onClick: submitEdit, children: "Save Changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!deletingWrestler, onOpenChange: (open) => !open && setDeletingWrestler(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you sure?" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          "This will permanently delete ",
          deletingWrestler?.name,
          " from",
          " ",
          deletingWrestler?.school,
          ". This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { onClick: () => setDeletingWrestler(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: confirmDelete, children: "Delete" })
      ] })
    ] }) })
  ] });
}
function generatePaginationLinks(currentPage, totalPages) {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 0; i < 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages - 1);
    } else if (currentPage >= totalPages - 4) {
      pages.push(0);
      pages.push("...");
      for (let i = totalPages - 5; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages - 1);
    }
  }
  return pages;
}
export {
  RouteComponent as component
};
