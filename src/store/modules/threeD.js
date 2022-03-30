const state = () => ({
    sphere: null,

    layers: [
        // { texture: null, visible: true or false}
    ]
})

const mutations = {
    setSphere(state, sphere) {
        state.sphere = sphere
    },

    addLayer(state, layer) {
        state.layers.push(layer)
    }
}

export default {
    state,
    // getters,
    // actions,
    mutations,
    // modules: {

    // }
};
