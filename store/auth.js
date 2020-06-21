export const state = () => ({
    isSignedIn: false
})

export const mutations = {
    setIsSignedIn(state, isSignedIn) {
        state.isSignedIn = isSignedIn
    }
}

export const actions = {
    setIsSignedIn({ commit }, isSignedIn) {
        commit("setIsSignedIn", isSignedIn)
    }
}