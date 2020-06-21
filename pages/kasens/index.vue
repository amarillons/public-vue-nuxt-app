<template>
  <div>
    <v-row>
      <v-toolbar elevation="0">
        <v-toolbar-title>和歌の名人たち</v-toolbar-title>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-card-title>使った技術</v-card-title>
      <v-card-text>
        <li>Vue + Nuxt.js (フロントエンド)</li>
        <li>PHP + PDO (バックエンド)</li>
        <li>Xserver + MySQL (バックエンド)</li>
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>36歌仙とは</v-card-title>
      <v-card-text>藤原公任（ふじわらのきんとう）による秀歌撰「三十六人撰」に選ばれた、３６人の和歌の名人です。万葉集の時代から平安時代にかけて活躍した歌人たちです。</v-card-text>
    </v-row>
    <v-data-table :headers="headers" :items="kasens" :items-per-page="10" @click:row="rowClick">
      <template v-slot:item.image_url="{ item }">
        <div class="p-2">
          <v-img :src="item.image_url" width="100px" height="10%"></v-img>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "simple",
  data() {
    return {
      headers: [
        {
          text: "名前",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "年齢",
          align: "start",
          sortable: true,
          value: "age"
        },
        { text: "画像", value: "image_url", sortable: false },
        { text: "生年", value: "birth_year", sortable: true },
        { text: "没年", value: "death_year", sortable: true },
        { text: "解説", value: "description", sortable: true }
      ],
      selected: [],
      kasens: []
    };
  },
  mounted() {
    axios.get("https://xxxxx.xxxxx.xxx.com/my_api.php").then(response => {
      this.kasens = response.data;
      console.log(`response: ${JSON.stringify(response)}`);
    });
  },
  methods: {
    rowClick(item, row) {
      row.select(true);
      this.$router.push(
        "/kasens/" + item.id + `?name=${item.name}&image_url=${item.image_url}`
      );
    }
  }
};
</script>

<style>
</style>
