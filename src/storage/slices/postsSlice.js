import { api } from "../../utils/api";
import { isError, isLoading } from "../utilsStore";
import { openNotification } from "../../components/Notification/Notification";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
  loading: false,
  post: {}
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async function (id, { fulfillWithValue, getState, rejectWithValue }) {
    try {
      const state = getState();
      const data = await api.getPostList();
      return fulfillWithValue({ posts: data, userId: state.user.data?._id });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAddNewPost = createAsyncThunk(
  "posts/fetchAddNewPost",
  async function (data, arg) {
    try {
      const addNewPost = await api.addNewPost(data);
      const state = arg.getState();
      return arg.fulfillWithValue({ addNewPost, allPosts: state.posts.posts });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const fetchUpdatedPost = createAsyncThunk(
  "posts/fetchUpdatedPost",
  async function (data, arg) {
    try {
      const updatedPost = await api.updatedPost(data._id, data);
      const state = arg.getState();
      return arg.fulfillWithValue({ updatedPost });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async function (postId, arg) {
    try {
      const deletePost = await api.deletePost(postId);
      const state = arg.getState();
      return arg.fulfillWithValue({ deletePost, allPosts: state.posts.posts });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const fetchChangePostLike = createAsyncThunk(
  "posts/fetchChangePostLike",
  async function (data, arg) {
    try {
      const updatedPostLike = await api.changePostLike(
        data.post._id,
        data.wasLiked
      );
      return arg.fulfillWithValue({ updatedPostLike, wasLiked: data.wasLiked });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async function (id, arg) {
    try {
      const getPostById = await api.getPostById(id);
      return arg.fulfillWithValue(getPostById);
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const fetchAddPostComment = createAsyncThunk(
  "posts/fetchAddPostComment",
  async function (data, arg) {
    try {
      const addPostComment = await api.addPostComment(data._id, data.data);
      return arg.fulfillWithValue({ addPostComment });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const fetchDeletePostComment = createAsyncThunk(
  "posts/fetchDeletePostComment",
  async function (data, arg) {
    try {
      const deletePostComment = await api.deletePostComment(data.PostId, data.CommentId);
      return arg.fulfillWithValue({ deletePostComment });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Получение списка постов
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = (action.payload.posts) ?? [];
      state.loading = false;
    });

    // Добавление нового поста
    builder.addCase(fetchAddNewPost.fulfilled, (state, action) => {
      state.posts = (action.payload.allPosts) ?? [];
      state.posts.unshift(action.payload.addNewPost);
      state.loading = false;
    });

    // Обновление/изменение собственного поста
    builder.addCase(fetchUpdatedPost.fulfilled, (state, action) => {
      state.post = action.payload.updatedPost;
      state.loading = false;
    });

    // Удаление собственного поста
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.posts = action.payload.allPosts.filter(e => e._id !== action.payload.deletePost._id);
      state.loading = false;
    });

    // Изменение лайка на посте
    builder.addCase(fetchChangePostLike.fulfilled, (state, action) => {
      const updatedPostLike = action.payload.updatedPostLike;
      const wasLiked = action.payload.wasLiked;
      // Обновление состояния поста
      state.posts = state.posts.map((e) =>
        e._id === updatedPostLike?._id ? updatedPostLike : e
      );
      if (wasLiked) { 
        state.post = updatedPostLike;
      } else {
        state.post = updatedPostLike;
      }
    });

    // Получение поста по id
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.post = (action.payload) ?? {};
      state.loading = false;
    });

    // Добавление комментария
    builder.addCase(fetchAddPostComment.fulfilled, (state, action) => {
      state.post = action.payload.addPostComment;
      openNotification("success", "Успешно", "Ваш комментарий отправлен");
      state.loading = false;
    });
    
    // Удаление комментария
    builder.addCase(fetchDeletePostComment.fulfilled, (state, action) => {
      state.post = action.payload.deletePostComment;
      state.loading = false;
    });

    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      openNotification("error", "Error", action.payload.message);
    });

    builder.addMatcher(isLoading, (state) => {
     //state.loading = true;
    });
  },
});

export default posts.reducer;