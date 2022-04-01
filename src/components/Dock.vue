<template>
  <div class="container">
    <div class="container_item">
      <template v-if="layerPanelVisible">
        <Toolbar>
          <template #start> Layers </template>
          <template #end>
            <Button @click="_addLayer">
              <span class="material-icons p-button-primary"> add </span>
            </Button>
            <Button
              icon="pi"
              class="p-button-rounded p-button-text p-button-secondary"
              @click="layerPanelVisible = false"
            >
              <span class="material-icons"> close </span>
            </Button>
          </template>
        </Toolbar>

        <DataView
          :value="layers"
          layout="grid"
          paginatorPosition="bottom"
          :paginator="true"
          rows="5"
        >
          <template #grid="slotProps">
            <div class="layerPanel">
              <Button
                :class="`p-button-text ${
                  currentLayer == slotProps.data ? 'disabled' : null
                }`"
                @click="
                  setCurrentLayer(slotProps.data);
                  _renderCurrentLayer();
                "
              >
                <Button
                  icon="pi"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click.stop="removeLayer(slotProps.data)"
                >
                  <span class="material-icons"> delete </span>
                </Button>

                <!-- <div>{{ slotProps.data.index }}</div> -->

                <Image class="layerPanel" :src="slotProps.data.image" />
              </Button>
            </div>
          </template>
        </DataView>
      </template>
      <template v-else>
        <Button @click="layerPanelVisible = true">
          <span class="material-icons"> photo_library </span> &nbsp; Layers
        </Button>
      </template>
    </div>

    <div class="container_item">
      <Button @click="_changeBackgroundImage()">
        <span class="material-icons"> image </span> &nbsp; Change Image
      </Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapMutations, mapState } from "vuex";
import * as THREE from "three";

// import { PrimeIcons } from "primevue/api";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import DataView from "primevue/dataview";
import Image from "primevue/image";

export default defineComponent({
  components: { Button, Toolbar, DataView, Image },

  setup() {
    // const dockItems = [{ label: "Images", icon: PrimeIcons.IMAGES }];

    return {
      layerPanelVisible: ref(false),
      // dockItems,
    };
  },

  computed: {
    ...mapState({ sphere: (state) => state.threeD.sphere }),
    ...mapState({ layers: (state) => state.threeD.layers }),
    ...mapState({ camera: (state) => state.threeD.camera }),
    ...mapState({ currentLayer: (state) => state.threeD.currentLayer }),
  },

  // watch: {
  // },

  methods: {
    ...mapMutations([
      "addLayer",
      "addEmptyLayer",
      "setCurrentLayer",
      "removeLayer",
    ]),

    _renderCurrentLayer(obj) {
      if (obj && obj.image) {
        this.currentLayer.image = obj.image;
      }

      //change camera inside the sphere and show image
      if (this.currentLayer.image) {
        this.sphere.material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(this.currentLayer.image),
        });

        this.camera.position.set(0, 0, 0.01);
      } else {
        //show white sphere only if it is not contain image
        this.sphere.material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
      }
    },

    _addLayer() {
      this.addEmptyLayer();

      this._renderCurrentLayer();
    },

    _changeBackgroundImage() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          // console.log(this.sphere, data);

          this._renderCurrentLayer({ image: data });
        };

        reader.readAsDataURL(fileInput.files[0]);
      };

      fileInput.click();
    },
  },
});
</script>

<style scoped>
.container {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
}

.container_item {
  margin-right: 5px;
  align-self: flex-end;
}
/* ul {
  position: absolute;
  bottom: 0;
}

ul li {
  list-style-type: none;
  display: inline;
  padding-right: 8px;
} */
</style>

<style>
.layerPanel {
  /* max-width: 500px; */
  /* display: block; */
}

.layerPanel > button {
  width: 100%;
}

.layerPanel > button > span {
  flex: 1;
}

.layerPanel > button.disabled {
  background-color: grey;
  color: #fff;
}

.layerPanel > img {
  width: 150px !important;
  flex: 1;
}
</style>
