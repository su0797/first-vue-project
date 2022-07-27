<template>
  <Spinner v-if="spiner" />
  <div class="container">
    <TopBar />
    <slot />
    <Footer />
  </div>
</template>
<script>
import Spinner from '/@components/Spinner.vue';
import TopBar from '/@components/TopBar.vue';
import Footer from '/@components/Footer.vue';

import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TopBar,
    Footer,
    Spinner,
  },
  setup() {
    const store = useStore();
    const spiner = computed(() => store.getters['spiner']);
    return { spiner };
  },
};
</script>
