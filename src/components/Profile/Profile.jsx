import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { headersObjData } from "../../Helper/headersOdj";
import { AuthContext } from "../../Context/AuthContext";
import usePosts from "../../CustomHooks/usePosts";
import PostCard from "../PostCard/PostCard";
import LoadingCard from "../LoadingCard/LoadingCard";
import AddPost from "../AddPost/AddPost";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const { data, isLoading, isFetching, isFetched, isError } = usePosts(
    ["userPosts"],
    Boolean(userData?._id),
    `users/${userData?._id}/posts?limit=10`,
  );

  return (
    <>
      <AddPost />
      {(isLoading || Boolean(userData?._id) == false) && <LoadingCard />}
      {isFetched &&
        data.posts.map((post) => <PostCard key={post._id} post={post} />)}
    </>
  );
}
