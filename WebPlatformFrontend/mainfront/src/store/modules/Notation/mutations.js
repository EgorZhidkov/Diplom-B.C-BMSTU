export const mutations = {
    setNotation: (state, payload) => { state.notation = payload },
    setLastCreateNotation: (state, payload) => { state.lastCreateNotation = payload },
    setCategories: (state, payload) => { state.categories = payload }
}
export default mutations;