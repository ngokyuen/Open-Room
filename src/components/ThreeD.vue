<template>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
import * as THREE from "three";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
  setup() {
    const scene = null;
    const renderer = null;
    return { scene, renderer };
  },

  computed: {
    ...mapState({ layers: (state) => state.threeD.layers }),
    ...mapState({ camera: (state) => state.threeD.camera }),
  },

  mounted() {
    const content = document.getElementById("content");
    // const width = content.innerWidth;
    // const height = content.innerHeight;
    const width = content.clientWidth;
    const height = content.clientHeight;

    this.scene = new THREE.Scene();
    this.setCamera(new THREE.PerspectiveCamera(75, width / height, 1, 10000));
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    const dom = this.renderer.domElement;
    dom.id = "canvas";
    document.getElementById("content").appendChild(dom);

    this.renderSphere();

    // this.$store.commit("setSphere", this._sphere, { module: "threeD" });

    this.animate();
    
    this.addEmptyLayer();
  },

  methods: {
    ...mapMutations(["setCamera", "setSphere", "addLayer", "addEmptyLayer"]),

    renderSphere() {
      const geometry = new THREE.SphereGeometry(5, 100, 100);
      // const geometry = new THREE.BoxGeometry(10, 10, 10);
      //add image

      // const texture = new THREE.TextureLoader().load(
      //   "images/tu09tpc-a-large-bed-in-a-room.jpeg"
      // );
      //inner surface mapping ***important for camera inside the primitive
      geometry.scale(-1, 1, 1);

      const material = new THREE.MeshBasicMaterial({
        // map: texture,
        color: 0xffffff,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(0, 0, 0);

      this.setSphere(sphere);

      this.scene.add(sphere);
      this.moveListeners(sphere);

      return sphere;
    },

    animate() {
      // sphere.rotation.x += 0.01;
      // sphere.rotation.y += 0.01;
      //update animation peroid
      requestAnimationFrame(() => {
        this.animate();
      });
      this.renderer.render(this.scene, this.camera);
    },

    moveListeners(obj) {
      const moveSentiveConstant = 0.003;

      let movement = false;
      const canvas = document.getElementById("canvas");

      canvas.addEventListener(
        "mousedown",
        (event) => {
          movement = true;
          document.body.style.cursor = "move";
          //   document.body.style.cursor = "move";
          // console.log("mousedown:", event);
        },
        false
      );

      canvas.addEventListener(
        "mousemove",
        (event) => {
          if (movement) {
            document.body.style.cursor = "move";
            obj.rotation.x -= event.movementY * moveSentiveConstant;
            obj.rotation.y -= event.movementX * moveSentiveConstant;
            // console.log("mousemove:", event);
          }
        },
        false
      );

      canvas.addEventListener(
        "mouseup",
        (event) => {
          movement = false;
          document.body.style.cursor = "auto";
          // console.log("mouseup:", event);
        },
        false
      );
    },
  },
  components: {},
});
</script>
