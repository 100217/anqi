import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const USERINFO = "anqi-userinfo"

export default new Vuex.Store({
    state: {
        PROJECR: {},
        USER: {},
    },
    getters: {
        project(state) {
            return state.PROJECR
        },
        user(state) {
            let userinfo = JSON.parse(sessionStorage.getItem(USERINFO))
            if(state.USER && JSON.stringify(state.USER) !== "{}") {
                return state.USER
            } else if(userinfo && JSON.stringify(userinfo) !== '{}') {
                return userinfo
            } else {
                return {}
            }
        }
    },
    mutations: {
        setProject(state, project) {
            state.PROJECR = project
        },
        setUser(state, user) {
            state.USER = user
            sessionStorage.setItem(USERINFO, JSON.stringify(user))
        }
    },
    actions: {
        setProject({commit}, project) {
            return commit('setProject', project)
        },
        setUser({commit}, user) {
            return commit('setUser', user)
        }
    },
})