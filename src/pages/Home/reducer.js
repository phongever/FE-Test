import { SORT_ORDER, ACTION_LIST } from "../../utils/constants";
import Fuse from "fuse.js";

export const initialState = {
  initPosts: [],
  posts: [],
  search: "",
  sort: SORT_ORDER.NEWEST,
  page: 0,
};

const sortNewest = (a, b) => b.createdAt - a.createdAt;

const sortOldest = (a, b) => a.createdAt - b.createdAt;

export const reducer = (state, { type, data }) => {
  switch (type) {
    case ACTION_LIST.SET_LIST:
      const formatedData = data.map(({ createdAt, ...rest }) => ({
        ...rest,
        createdAt: new Date(createdAt).getTime(),
      }));
      formatedData.sort(sortNewest);

      return {
        ...state,
        page: 1,
        initPosts: formatedData,
        posts: formatedData,
      };
    case ACTION_LIST.CHANGE_PAGE:
      return { ...state, page: data };
    case ACTION_LIST.SEARCH:
      if (data === initialState.search) {
        return { ...state, search: data, posts: state.initPosts, page: 1 };
      }

      const fuse = new Fuse(state.initPosts, {
        keys: ["title", "content"],
        shouldSort: false,
      });
      const result = fuse.search(data).map(({ item }) => item);

      return { ...state, search: data, posts: result, page: 1 };
    case ACTION_LIST.SORT:
      const { initPosts, posts } = state;

      if (data === SORT_ORDER.NEWEST) {
        initPosts.sort(sortNewest);
        posts.sort(sortNewest);
      }

      if (data === SORT_ORDER.OLDEST) {
        initPosts.sort(sortOldest);
        posts.sort(sortOldest);
      }

      return {
        ...state,
        initPosts,
        posts,
        sort: data,
        page: 1,
      };
    default:
      return state;
  }
};
