import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { headersObjData } from "../../Helper/headersOdj";
import usePosts from "../../CustomHooks/usePosts";
import PostCard from "../PostCard/PostCard";
import LoadingCard from "../LoadingCard/LoadingCard";
import AddPost from "../AddPost/AddPost";

export default function Posts() {
  const { data, isLoading, isFetching, isFetched, isError } = usePosts(
    ["allPosts"],
    true,
    "posts?limit=50&sort=-createdAt",
  );
  return (
    <>
    <AddPost/>
      {isLoading && <LoadingCard/>}
      {isFetched && data.posts.map((post) => <PostCard key={post._id}  post = {post}/>)}
    </>
  );
}
