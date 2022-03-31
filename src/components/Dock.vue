<template>
  <ul>
    <li>
      <SplitButton label="Layers" icon="pi pi-plus" @click="_addLayer()"></SplitButton>
    </li>

    <li>
      <Button
        label="Change Image"
        icon="pi pi-image"
        @click="_changeBackgroundImage()"
      ></Button>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import * as THREE from "three";

// import { PrimeIcons } from "primevue/api";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";

export default defineComponent({
  components: { Button, SplitButton },

  setup() {
    // const dockItems = [{ label: "Images", icon: PrimeIcons.IMAGES }];

    return {
      // dockItems,
    };
  },

  computed: {
    ...mapState({ sphere: (state) => state.threeD.sphere }),
    ...mapState({ layers: (state) => state.threeD.layers }),
    ...mapState({ camera: (state) => state.threeD.camera }),
    ...mapState({ currentLayer: (state) => state.threeD.currentLayer }),
  },

  methods: {
    ...mapMutations(["addLayer", "addEmptyLayer"]),

    _addLayer() {
      const material = new THREE.MeshBasicMaterial({
        // map: texture,
        color: 0xffffff,
      });

      this.sphere.material = material;

      this.addEmptyLayer()

      this.camera.position.set(0, 0, 10);
      this.camera.lookAt(0, 0, 0);
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

          this.sphere.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(data),
          });

          this.currentLayer.image = data;

          this.camera.position.set(0, 0, 0.01);
        };

        reader.readAsDataURL(fileInput.files[0]);
      };

      fileInput.click();
    },
  },
});
</script>

<style scoped>
ul {
  position: absolute;
  bottom: 0;
}

ul li {
  list-style-type: none;
  display: inline;
  margin-right: 8px;
}
</style>
