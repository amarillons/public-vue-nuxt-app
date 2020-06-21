<template>
  <div>
    <v-row>
      <v-toolbar elevation="0">
        <v-toolbar-title>AWS cognito ログイン</v-toolbar-title>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-layout column justify-center align-center>
        <v-flex xs5 sm4 md3>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field label="ユーザー名" v-model="userName" :rules="requiredRules"></v-text-field>
            <v-text-field label="パスワード" v-model="password" :rules="requiredRules" type="password"></v-text-field>
            <v-btn width="200" color="primary" @click="login" :disabled="!valid">ログイン</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-row>
    <v-row>
      <v-card-title>AWS cognito とは</v-card-title>
      <v-card-text>
        cognito とは、AWS が提供しているユーザー認証のサービスです。user pool （ユーザー登録・認証）と、
        identity pool （Google, Facebook, Amazon などのソーシャルIDを使ったユーザー認証）を実装することができます。
      </v-card-text>
      <v-card-text>
        user pool では、address, birthdate, email, phone, 姓名... など、ユーザーの属性を細かく設定することができ、
        パスワードポリシー・多要素認証なども実装できます。
      </v-card-text>
    </v-row>

    <v-row>
      <v-card-title>このログインページについて</v-card-title>
      <v-card-text>
        このページでは、AWS cognito のログイン機能を、AWS Amplify を経由して使っています。
        AWS Amplify とは、web/ios/android に対応したサーバーレスアプリケーションを開発するためのサービスです。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>参考リンク</v-card-title>
      <v-card-text>
        AWS cognito のページ
        <a href="https://aws.amazon.com/cognito/">https://aws.amazon.com/cognito/</a>
      </v-card-text>
      <v-card-text>
        AWS Amplify のページ
        <a href="https://aws.amazon.com/amplify/">https://aws.amazon.com/amplify/</a>
      </v-card-text>
    </v-row>
  </div>
</template>

<script>
import { Auth, API, graphqlOperation } from "aws-amplify";
export default {
  layout: "simple",
  data() {
    return {
      userName: "",
      password: "",
      valid: true,
      lazy: false,
      requiredRules: [v => !!v || "必須です。"]
    };
  },
  methods: {
    async login() {
      // TODO remove in the future
      // this.$router.push("/cognito/keijiban");
      // return;

      try {
        const user = await Auth.signIn(this.userName, this.password);
        //   console.log(`user is ${JSON.stringify(user)}`)
        console.log(`username is ${user.userName}`);
        console.log(`user info is ${JSON.stringify(user.attributes.sub)}`);
        this.$store.dispatch("auth/setIsSignedIn", true);
        this.$router.push("/cognito/keijiban");
      } catch (e) {
        console.log(`error ${JSON.stringify(e)}`);
      }
    }
  },
  async mounted() {}
};
</script>

<style>
</style>