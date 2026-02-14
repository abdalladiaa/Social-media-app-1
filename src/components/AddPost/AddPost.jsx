import React, { useContext } from "react";
import { FaImage } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { Avatar } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headersObjData } from "../../Helper/headersOdj";
import { useGenericMutation } from "../../CustomHooks/useGenericMutaion";


export default function AddPost() {
  const { userData } = useContext(AuthContext);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  async function addPost(values) {
    console.log(values);
    const formData = new FormData();
    formData.append("body", values.body);
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    try {
      const response = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        headersObjData,
      );
      console.log(response, "from AddPost");
      reset();
    } catch (err) {
      console.log(err, "From AddPost");
    }
  }

  const { mutate, isPending } = useGenericMutation(
    addPost,
    ["allPosts", "userPosts"],
    "Post Added Successfully",
    "Post Doesn't Posted",
  );

  return (
    <section className="bg-white rounded-3xl shadow-xl p-5 max-w-3xl mx-auto my-5">
      <form onSubmit={handleSubmit(mutate)}>
        {/* Header */}
        <header className="flex items-center gap-3 mb-4">
          <Avatar alt={userData?.name} img={userData?.photo} rounded />
          <h3 className="text-sm font-semibold text-gray-800">
            Create new post
          </h3>
        </header>

        {/* Textarea */}
        <textarea
          id="add-post-body"
          {...register("body")}
          placeholder="What's on your mind?"
          className="w-full resize-none border-0 outline-none focus:outline-none focus:ring-0 placeholder-gray-400"
          rows={4}
        />

        {/* actions */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
          <input
            id="postImage"
            {...register("image")}
            type="file"
            className="hidden"
          />

          <label
            htmlFor="postImage"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaImage />
            Add Photo
          </label>

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </section>
  );
}
