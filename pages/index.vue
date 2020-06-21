<template>
  <div>
    <v-list>
      <v-subheader>ページ一覧</v-subheader>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  layout: "simple",
  methods: {
    readItem(index) {
      return JSON.stringify(this.items[index]);
    },
    showAlert(item) {
      alert(`${item}`);
    }
  },
  data: () => ({
    item: 1,
    items: [
      { text: "Metamask の使い方", icon: "mdi-account", to: "metamask" },
      {
        text: "ERC20 トークンを送受信する",
        icon: "mdi-account",
        to: "erc20"
      },
      {
        text: "AWS AppSync を使った TeX 掲示板",
        icon: "mdi-flag",
        to: "cognito"
      },
      { text: "ピザの歴史", icon: "mdi-clock", to: "pizzahistory" },
      { text: "三十六歌仙の紹介", icon: "mdi-flag", to: "kasens" }
    ]
  })
};
</script>

<style>
</style>