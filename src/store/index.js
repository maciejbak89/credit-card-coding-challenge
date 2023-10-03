import Vue from "vue";
import Vuex from "vuex";
import AppService from "../services/AppService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isThemeDark: localStorage.getItem("isThemeDark") || false,
    formData: {},
    isSubmitCreditCardDataLoading: false,
    isSubmitCreditCardDataSuccess: false,
    isSubmitCreditCardDataError: false,
    submissionResponse: {},
  },
  getters: {
    getFormData: (state) => state.formData,
    getSubmissionResponse: (state) => state.submissionResponse,
    isSubmitCreditCardDataLoading: (state) =>
      state.isSubmitCreditCardDataLoading,
    isSubmitCreditCardDataSuccess: (state) =>
      state.isSubmitCreditCardDataSuccess,
    isSubmitCreditCardDataError: (state) => state.isSubmitCreditCardDataError,
  },
  mutations: {
    setThemeDark(state, payload) {
      state.isThemeDark = payload;
    },
    setFormData(state, payload) {
      state.form = payload;
    },
    setSubmitCreditCardDataLoading(state, payload) {
      state.isSubmitCreditCardDataLoading = payload;
    },
    setSubmitCreditCardDataSuccess(state, payload) {
      state.isSubmitCreditCardDataSuccess = payload;
    },
    setSubmitCreditCardDataError(state, payload) {
      state.isSubmitCreditCardDataError = payload;
    },
    setSubmissionResponse(state, payload) {
      state.submissionResponse = payload;
    },
  },
  actions: {
    setThemeDark: ({ commit }, payload) => {
      commit("setThemeDark", payload);
      localStorage.setItem("isThemeDark", payload);
    },

    updateForm: ({ commit }, payload) => {
      commit("setFormData", payload);
    },

    submitCreditCardData: ({ commit }, payload) => {
      commit("setSubmitCreditCardDataLoading", true);
      commit("setSubmitCreditCardDataSuccess", false);
      commit("setSubmitCreditCardDataError", false);
      AppService.submitCreditCardData(payload)
        .then((response) => {
          console.log("submitCreditCardData response: ", response);
          commit("setSubmissionResponse", response.data);
          commit("setSubmitCreditCardDataLoading", false);
          commit("setSubmitCreditCardDataSuccess", true);
        })
        .catch((error) => {
          console.log("submitCreditCardData error: ", error);
          commit("setSubmitCreditCardDataLoading", false);
          commit("setSubmitCreditCardDataError", true);
        });
    },
  },
});
