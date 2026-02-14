import React, { useContext } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaInfoCircle, FaRegCommentDots } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { headersObjData } from "../../Helper/headersOdj";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGenericMutation } from "../../CustomHooks/useGenericMutaion";


export default function PostCard({ post }) {
  const { userData } = useContext(AuthContext);
  const { body, createdAt, id: postId, image: postPhoto } = post;
  const { name: userName, photo: UserPhoto, _id: userId } = post.user;
  const formatedPostDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  async function deletePost() {
    console.log("deleted");
    try {
      const response = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        headersObjData,
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err, "DeletePost func");
    }
  }

  const {mutate , isPending} = useGenericMutation(deletePost , ["allPosts" , "userPosts"] , "Deleted Successfully" , "Post Doesn't Deleted")

  return (
    <>
      <article className="bg-white rounded-3xl shadow-xl p-5 max-w-3xl mx-auto my-5">
        {/* Header */}
        <header className="flex items-start gap-3">
          <img
            src={UserPhoto}
            alt={userName}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {userName}
                </h3>
                <div className="text-xs text-gray-500 mt-0.5">
                  {formatedPostDate}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {userId === userData._id && (
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
                    onClick={mutate}
                  >
                    <MdDelete />
                    {isPending ? "Deleting...." : "Delete"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mt-4  text-sm leading-relaxed whitespace-pre-wrap font-medium text-[15px]">
          {post.body}
        </div>

        {/* Image (عرض بصري فقط) */}
        {postPhoto && (
          <div className="mt-4 rounded-xl overflow-hidden bg-gray-50">
            <img
              src={postPhoto}
              alt={body}
              className="w-full object-contain max-h-105"
            />
          </div>
        )}

        {/* actions (visual only) */}
        <div className="mt-3 border-t pt-3 flex items-center justify-between gap-2 ">
          <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 text-gray-700 cursor-pointer">
            <AiOutlineLike />
            <span className="text-sm font-medium">أعجبني</span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 text-gray-700 cursor-pointer">
            <FaRegCommentDots />
            <span className="text-sm font-medium">تعليق</span>
          </div>
          <Link
            to={`/details/${postId}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            <FaInfoCircle />
            <span className="text-sm font-medium">تفاصيل</span>
          </Link>
        </div>
      </article>
    </>
  );
}
