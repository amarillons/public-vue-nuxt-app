<template>
  <div>{{ id }}
      これは、{{ name }}
  </div>
</template>

<script>
export default {
  layout: "simple",
  data() {
    return {
      id: "",
      name: '',
      imageUrl: ''
    };
  },
  mounted() {},
  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.query.name;
    this.imageUrl = this.$route.query.image_url;
  }
};
</script>

<style>
</style>