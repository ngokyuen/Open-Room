<template>
  <div id="container">
    <div id="header"></div>
    <div id="content">
      <Dock />
      <ThreeD :store="$store" />
    </div>
    <div id="footer"></div>
  </div>
</template>

<script>
import Dock from "./components/Dock.vue";
import ThreeD from "./components/ThreeD.vue";

export default {
  setup() {},
  mounted() {},
  methods: {},
  components: { Dock, ThreeD },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#container {
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
}

#content {
  flex: 1;
  overflow: hidden;
}
</style>
