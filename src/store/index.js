import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask(state, task) {
      const idx = state.tasks.findIndex((t) => t.id === task.id);
      debugger;
      state.tasks[idx] = { ...state.tasks[idx], ...task };
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task);
    },
    updateTask({ commit }, task) {
      commit('updateTask', task);
    },
  },
  getters: {
    tasks: ({ tasks }) => tasks,
    taskById: (s) => (id) => s.tasks.find((t) => t.id === id),
  },
});
