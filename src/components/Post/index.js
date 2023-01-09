import React from "react";
import { formatDate } from "../../utils/helpers";
import defaultImage from "../../images/default-image.jpg";
import "./style.css";

const Post = ({ post }) => {
  return (
    <div className="post media row py-3">
      <div className="col-12 col-md-4">
        <img
          src={post.image === "" ? defaultImage : post.image}
          className="w-100"
          alt={post.title}
        />
      </div>
      <div className="media-body col-12 col-md-8">
        <h1 className="text-dark">{post.title}</h1>
        <p className="text-dark">{formatDate(new Date(post.createdAt))}</p>
        <p className="text-dark overflow-hidden pre-wrap">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
