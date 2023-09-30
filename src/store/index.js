import Vue from "vue";
import Vuex from "vuex";
// import AppService from "../services/AppService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isThemeDark: localStorage.getItem("isThemeDark") || false,
  },
  getters: {},
  mutations: {
    setThemeDark(state, payload) {
      state.isThemeDark = payload;
    },
  },
  actions: {
    setThemeDark: ({ commit }, payload) => {
      commit("setThemeDark", payload);
      localStorage.setItem("isThemeDark", payload);
    },
  },
  modules: {},
});
