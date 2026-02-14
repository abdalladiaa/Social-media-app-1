import React from "react";
import usePosts from "../../CustomHooks/usePosts";
import { useParams } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import LoadingCard from "../LoadingCard/LoadingCard";

export default function PostDetails() {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, isFetching, isFetched, isError } = usePosts(
    ["details", id],
    true,
    `posts/${id}`,
  );
  console.log(data, "from details");

  return <>
  {isLoading && <LoadingCard/>}
  {isFetched && <PostCard post = {data.post} />}
  </>;
}
