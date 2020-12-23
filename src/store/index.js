import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        PROJECR: {},
    },
    getters: {
        project(state) {
            return state.PROJECR
            
        }
    },
    mutations: {
        setProject(state, project) {
            state.PROJECR = project
        }
    },
    actions: {
        setProject({commit}, project) {
            return commit('setProject', project)
        }
    },
})