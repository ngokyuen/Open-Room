const state = () => ({
    camera: null,

    sphere: null,

    currentLayer: null,

    layers: [
        // { index: 0, image: null}
    ]
})

const mutations = {
    setCamera(state, camera) {
        state.camera = camera
    },

    setSphere(state, sphere) {
        state.sphere = sphere
    },

    addLayer(state, layer) {
        state.layers.push(layer)
    },

    removeLayer(state, layer) {
        for (let i = 0; i < state.layers.length; i++) {
            const tmpLayer = state.layers[i]
            if (tmpLayer == layer) {
                state.layers.splice(i, 1)
                break
            }
        }
    },

    addEmptyLayer(state) {
        const newLayer = { index: state.layers.length }
        state.currentLayer = newLayer
        state.layers.push(newLayer)
    },

    setCurrentLayer(state, layer) {
        state.currentLayer = layer
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
