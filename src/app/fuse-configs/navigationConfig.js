import { authRoles } from "app/auth";
import i18next from "i18next";
import DocumentationNavigation from "../main/documentation/DocumentationNavigation";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "dashboards",
        title: "Dashboards",
        translate: "DASHBOARDS",
        type: "collapse",
        icon: "dashboard",
        children: [
          {
            id: "analytics-dashboard",
            title: "Analytics",
            type: "item",
            url: "/apps/dashboards/analytics",
          },
          {
            id: "project-dashboard",
            title: "Project",
            type: "item",
            url: "/apps/dashboards/project",
          },
        ],
      },

      {
        id: "contacts",
        title: "Contacts",
        translate: "CONTACTS",
        type: "item",
        icon: "account_box",
        url: "/apps/contacts/all",
      },
    ],
  },
  {
    id: "pages",
    title: "Pages",
    type: "group",
    icon: "pages",
    children: [
      {
        id: "authentication",
        title: "Authentication",
        type: "collapse",
        icon: "lock",
        badge: {
          title: 10,
          bg: "#525E8A",
          fg: "#FFFFFF",
        },
        children: [
          {
            id: "authentication-login",
            title: "Login",
            type: "item",
            url: "/pages/auth/login",
          },
          {
            id: "login-v2",
            title: "Login v2",
            type: "item",
            url: "/pages/auth/login-2",
          },
          {
            id: "login-v3",
            title: "Login v3",
            type: "item",
            url: "/pages/auth/login-3",
          },
          {
            id: "authentication-register",
            title: "Register",
            type: "item",
            url: "/pages/auth/register",
          },
          {
            id: "authentication-register-v2",
            title: "Register v2",
            type: "item",
            url: "/pages/auth/register-2",
          },
          {
            id: "authentication-register-v3",
            title: "Register v3",
            type: "item",
            url: "/pages/auth/register-3",
          },
          {
            id: "authentication-forgot-password",
            title: "Forgot Password",
            type: "item",
            url: "/pages/auth/forgot-password",
          },
          {
            id: "authentication-forgot-password-v2",
            title: "Forgot Password v2",
            type: "item",
            url: "/pages/auth/forgot-password-2",
          },
          {
            id: "authentication-reset-password",
            title: "Reset Password",
            type: "item",
            url: "/pages/auth/reset-password",
          },
          {
            id: "authentication-reset-password-v2",
            title: "Reset Password v2",
            type: "item",
            url: "/pages/auth/reset-password-2",
          },
          {
            id: "authentication-lock-screen",
            title: "Lock Screen",
            type: "item",
            url: "/pages/auth/lock",
          },
          {
            id: "authentication-mail-confirmation",
            title: "Mail Confirmation",
            type: "item",
            url: "/pages/auth/mail-confirm",
          },
        ],
      },
    ],
  },

  DocumentationNavigation,
  {
    type: "divider",
    id: "divider-1",
  },
  {
    id: "auth",
    title: "Auth",
    type: "group",
    icon: "verified_user",
    children: [
      {
        id: "login",
        title: "Login",
        type: "item",
        url: "/login",
        auth: authRoles.onlyGuest,
        icon: "lock",
      },
      {
        id: "register",
        title: "Register",
        type: "item",
        url: "/register",
        auth: authRoles.onlyGuest,
        icon: "person_add",
      },
      {
        id: "logout",
        title: "Logout",
        type: "item",
        auth: authRoles.user,
        url: "/logout",
        icon: "exit_to_app",
      },
      {
        id: "auth-admin-example",
        title: "Admin: Auth protected page",
        type: "item",
        url: "/auth/admin-role-example",
        icon: "security",
      },
      {
        id: "only-admin-navigation-item",
        title: "Nav item only for Admin",
        type: "item",
        auth: authRoles.admin,
        url: "/auth/admin-role-example",
        icon: "verified_user",
      },
      {
        id: "auth-staff-example",
        title: "Staff: Auth protected page",
        type: "item",
        url: "/auth/staff-role-example",
        icon: "security",
      },
      {
        id: "only-staff-navigation-item",
        title: "Nav item only for Staff",
        type: "item",
        auth: authRoles.staff,
        url: "/auth/staff-role-example",
        icon: "verified_user",
      },
      {
        id: "auth-guest-example",
        title: "Guest: Auth protected page",
        type: "item",
        url: "/auth/guest-role-example",
        icon: "security",
      },
      {
        id: "only-guest-navigation-item",
        title: "Nav item only for Guest",
        type: "item",
        auth: authRoles.onlyGuest,
        url: "/auth/guest-role-example",
        icon: "verified_user",
      },
    ],
  },
  {
    type: "divider",
    id: "divider-2",
  },
  // {
  //   id: "test-group-level-1",
  //   title: "Test Group Level 1",
  //   type: "group",
  //   icon: "clear_all",
  //   children: [
  //     {
  //       id: "test-item",
  //       title: "Test Item",
  //       type: "item",
  //       icon: "list",
  //       url: "#",
  //     },
  //     {
  //       id: "test-link",
  //       title: "Test Link",
  //       type: "link",
  //       icon: "link",
  //       url: "http://fusetheme.com",
  //       target: "_blank",
  //     },
  //     {
  //       id: "test-collapse-level-1",
  //       title: "Test Collapse Level 1",
  //       type: "collapse",
  //       icon: "dashboard",
  //       children: [
  //         {
  //           id: "test-item-level-1",
  //           title: "Test Item Level 1",
  //           type: "item",
  //           url: "#",
  //         },
  //         {
  //           id: "test-link-level-1",
  //           title: "Test Link Level 1",
  //           type: "link",
  //           url: "http://fusetheme.com",
  //           target: "_blank",
  //         },
  //         {
  //           id: "test-collapse-2",
  //           title: "Test Collapse Level 2",
  //           type: "collapse",
  //           children: [
  //             {
  //               id: "test-item-level-2",
  //               title: "Test Item Level 2",
  //               type: "item",
  //               url: "#",
  //             },
  //             {
  //               id: "test-link-level-2",
  //               title: "Test Link Level 2",
  //               type: "link",
  //               url: "http://fusetheme.com",
  //               target: "_blank",
  //             },
  //             {
  //               id: "test-collapse-level-3",
  //               title: "Test Collapse Level 3",
  //               type: "collapse",
  //               children: [
  //                 {
  //                   id: "test-item-level-3",
  //                   title: "Test Item Level 3",
  //                   type: "item",
  //                   url: "#",
  //                 },
  //                 {
  //                   id: "test-link-level-3",
  //                   title: "Test Link Level 3",
  //                   type: "link",
  //                   url: "http://fusetheme.com",
  //                   target: "_blank",
  //                 },
  //                 {
  //                   id: "test-collapse-level-4",
  //                   title: "Test Collapse Level 4",
  //                   type: "collapse",
  //                   children: [
  //                     {
  //                       id: "test-item-level-4",
  //                       title: "Test Item Level 4",
  //                       type: "item",
  //                       url: "#",
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           id: "test-group-level-2",
  //           title: "Test Group Level 2",
  //           type: "group",
  //           icon: "apps",
  //           children: [
  //             {
  //               id: "test-collapse-level-2-2",
  //               title: "Test Collapse Level 2",
  //               type: "collapse",
  //               children: [
  //                 {
  //                   id: "test-item-level-2-2",
  //                   title: "Test Item Level 2",
  //                   type: "item",
  //                   url: "#",
  //                 },
  //                 {
  //                   id: "test-link-level-2-2",
  //                   title: "Test Link Level 2",
  //                   type: "link",
  //                   url: "http://fusetheme.com",
  //                   target: "_blank",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default navigationConfig;
