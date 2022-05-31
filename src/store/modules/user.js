const state = {
  token: "",
};

const mutations = {
  SET_USER: (state, name) => {
    state.token = name;
  },
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  login({ commit }, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 50);
      reject();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
