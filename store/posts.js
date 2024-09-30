import { defineStore } from "pinia";

export const usePostStore = defineStore("posts", {
  state: () => {
    return {
      posts: [],
      key: "",
    };
  },
  actions: {
    setPosts(payload) {
      this.posts = payload;
    },
    setKey(payload) {
      this.key = payload;
    },
    emptyPosts() {
      this.posts = [];
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getKey(state) {
      return state.key;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
