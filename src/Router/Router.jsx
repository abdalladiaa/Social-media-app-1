import React from "react";
import PostsGuard from "../Guards/PostsGuard";
import Layout from "../components/Layout/Layout";
import AuthGuard from "../Guards/AuthGuard";
import Registration from "../components/Registration/Registration";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import Posts from "../components/posts/posts";
import PostDetails from "../components/PostDetails/PostDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PostsGuard>
            <Posts />
          </PostsGuard>
        ),
      },
      {
        path: "registration",
        element: (
          <AuthGuard>
            <Registration />
          </AuthGuard>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "profile",
        element: (
          <PostsGuard>
            <Profile />
          </PostsGuard>
        ),
      },
      {
        path: "details/:id",
        element: (
          <PostsGuard>
            <PostDetails />
          </PostsGuard>
        ),
      },
    ],
  },
]);
