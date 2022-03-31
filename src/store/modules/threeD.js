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

    addEmptyLayer(state) {
        const newLayer = { index: state.layers.length }
        state.currentLayer = newLayer
        state.layers.push(newLayer)
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
