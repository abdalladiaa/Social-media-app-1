import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { headersObjData } from "../Helper/headersOdj";

export default function usePosts(queryKey, isEnabled, endPoint) {
  const { data, isLoading, isFetching, isFetched, isError } = useQuery({
    queryFn: getPosts,
    queryKey: [...queryKey],
    enabled: isEnabled,
  });

  async function getPosts() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/${endPoint}`,
        headersObjData,
      );
      console.log(data);
      
      return data;
    } catch (err) {
      console.log(err, "From get posts hook");
    }
  }
  return { data, isLoading, isFetching, isFetched, isError }
}
