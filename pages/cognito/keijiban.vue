<template>
  <div>
    <v-row>
      <v-toolbar elevation="0">
        <v-toolbar-title>AWS AppSync 掲示板</v-toolbar-title>
      </v-toolbar>
    </v-row>
    <!-- これまでの投稿を表示 -->
    <v-row>
      <v-card-title>これまでの投稿（最大20件を表示）</v-card-title>
      <!-- 投稿一覧 -->
      <v-toolbar elevation="0">
        <!-- <v-label>最近 {{ lastPostId - firstPostId + 1 }} 件(id: {{ firstPostId }} - {{ lastPostId }})の投稿を表示しています。</v-label> -->
        <v-spacer></v-spacer>
        <v-btn pl="5" @click="loadPreviousPosts">以前の投稿を読み込む</v-btn>
        <v-spacer></v-spacer>
        <v-btn>一覧に戻る</v-btn>
      </v-toolbar>
      <br />
      <ul id>
        <ul v-for="item in fetchedPosts" :key="item.id">
          <v-card class="pl-5 pr-5">
            <!-- https://vuetifyjs.com/en/styles/spacing/ -->
            <v-card-title></v-card-title>
            <vue-mathjax :formula="item.text"></vue-mathjax>
            <v-toolbar elevation="0">
              <v-card-text>id: {{ item.id }}</v-card-text>
              <v-card-text>投稿者：{{ item.created_at }}</v-card-text>
              <v-spacer></v-spacer>
              <v-btn>お礼を送る</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="editPost(item.id, item.text)">編集</v-btn>
            </v-toolbar>
          </v-card>
          <br />
        </ul>
      </ul>
      <!-- 投稿一覧　おわり -->
    </v-row>
    <!-- 新しい投稿 -->
    <v-row>
      <v-textarea outlined v-model="newPost"></v-textarea>
    </v-row>
    <v-row>
      <v-btn color="primary" @click="onClickSubmit">投稿</v-btn>
    </v-row>
    <v-row>
      <v-card-title>掲示板の表示について</v-card-title>
      <v-card-text>
        AWS AppSync を使っています。数式の表示には、vue-mathjax を使っています。
        このページ内での header の設定、nuxt への vue-mathjax component の登録、vue-mathjax の formula プロパティを使った描画を行います。
        nuxt.config.js には特に何も設定する必要はありません。
      </v-card-text>
    </v-row>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { postNewMessage, getMyMessageList } from "../../appsync/messages";
export default {
  layout: "simple",
  components: {
    "vue-mathjax": VueMathjax
  },
  data() {
    return {
      isLoading: false,
      editDialog: false,
      editedText: "",
      newPost: "this is new post.",
      fetchedPosts: [],
      headers: [
        { text: "id", value: "id" },
        { text: "メッセージ", value: "text" }
      ]
    };
  },
  methods: {
    editPost(id, text) {
      this.editDialog = true;
      this.editedText = text;
      console.log(`id is ${id} text is ${text}`);
      this.editingPostId = id;
      // id 番目のダイアログを削除する。
    },
    loadPreviousPosts() {
      alert(`実装する予定。`);
    },
    async onClickSubmit() {
      this.dialog = false;

      this.createNewMessage();
      //   console.log(`result is ${JSON.stringify(result.data)}`);
    },
    async createNewMessage() {
      const result = await API.graphql(
        graphqlOperation(postNewMessage, {
          text: this.newPost
        })
      ).catch(error => {
        console.log(error);
      });
      console.log(`result is ${JSON.stringify(result)}`);

      this.fetchedPosts.push(result.data.exampleMutation);
      this.newPost = "";
    },
    compare(post1, post2) {
      const post1date = post1.created_at;
      const post2date = post2.created_at;

      let comparison = 0;
      if (post1date > post2date) {
        comparison = 1;
      } else if (post1date < post2date) {
        comparison = -1;
      }
      return comparison;
    }
  },
  async mounted() {
    const result = await API.graphql(graphqlOperation(getMyMessageList));
    console.log(`new message is ${JSON.stringify(result)}`);
    const list = result.data.getMyMessageList;
    list.sort(this.compare);
    this.fetchedPosts = list;
  },
  head: {
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML"
      }
    ]
  }
};
</script>

<style>
</style>