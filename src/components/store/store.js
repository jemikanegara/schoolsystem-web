import Vue from 'vue'
import Vuex from 'vuex'
import staff from './modules/staff'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isMobile: window.innerWidth < 981 ? true : false,
        hideMenu: false
    },
    getters: {
        isMobile: state => {
            return state.isMobile
        },
        hideMenu: state => {
            return state.hideMenu
        }
    },
    mutations: {
        updateIsMobile: (state, payload) => {
            state.isMobile = payload
        },
        toggleMenu: (state) => {
            state.hideMenu = !state.hideMenu
        }
    },
    actions: {
        updateIsMobile: ({ commit }, payload) => {
            commit('updateIsMobile', payload)
        },
        toggleMenu: ({ commit }) => {
            commit('toggleMenu')
        },

    },
    modules: {
        staff: {
            namespaced: true,
            ...staff
        }
    }
})