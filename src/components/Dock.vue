<template>
  <ul>
    <li><Button label="Layers" icon="pi pi-images"></Button></li>
    <li>
      <Button
        label="Image"
        icon="pi pi-image"
        @click="changeBackgroundImage()"
      ></Button>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import * as THREE from "three";

// import { PrimeIcons } from "primevue/api";
import Button from "primevue/button";

export default defineComponent({
  components: { Button },

  setup() {
    // const dockItems = [{ label: "Images", icon: PrimeIcons.IMAGES }];

    return {
      // dockItems,
    };
  },

  computed: {
    ...mapState({ sphere: (state) => state.threeD.sphere }),
    ...mapState({ layers: (state) => state.threeD.layers }),
  },

  methods: {
    changeBackgroundImage() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          // console.log(this.sphere, data);

          this.sphere.material.map = new THREE.TextureLoader().load(data);

          this.layers.forEach((l) => {
            if (l.visible) {
              l.texture = this.sphere.material.map;
            }
          });
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
