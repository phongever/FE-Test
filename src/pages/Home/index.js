import React, { useEffect, useState, useReducer, useMemo } from "react";
import { getPosts } from "../../utils/api";
import { Spinner, Search, Sort, Pagination, Post } from "../../components";
import { initialState, reducer } from "./reducer";
import { ACTION_LIST, PAGE_SIZE } from "../../utils/constants";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div className="my-3">
      {posts.map((post) => (
        <Link key={post.id} to={`/${post.id}`} className="text-decoration-none">
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getPosts();

    dispatch({ type: ACTION_LIST.SET_LIST, data });
    setLoading(false);
  };

  const postList = useMemo(() => {
    const firstPageIndex = (state.page - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return state.posts.slice(firstPageIndex, lastPageIndex);
  }, [state.page, state.search, state.sort]);

  const handlePageChange = (page) => {
    dispatch({ type: ACTION_LIST.CHANGE_PAGE, data: page });
  };

  const handleSearch = (text) => {
    dispatch({ type: ACTION_LIST.SEARCH, data: text });
  };

  const handleSort = (order) => {
    dispatch({ type: ACTION_LIST.SORT, data: order });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row row-gap-2 px-1">
            <div className="col-12 col-md-6">
              <Search onSearch={handleSearch} />
            </div>
            <div className="col-12 offset-md-3 col-md-3 mt-2 mt-md-0">
              <Sort onSort={handleSort} />
            </div>
          </div>
          {postList.length === 0 ? (
            <p>Not Found</p>
          ) : (
            <PostList posts={postList} />
          )}
          <Pagination
            currentPage={state.page}
            totalCount={state.posts.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default Home;
