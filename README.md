# vue-nuxt-app
フロントエンド開発　

### 機能

- Vue + Nuxt で作った簡単なウェブサイト
<img width="700" alt="screenshot 2020-06-24 at 15 10 19" src="https://user-images.githubusercontent.com/2384963/85507173-d8c7a400-b62c-11ea-9b25-a73af4425e5e.png">

### デプロイ先

- Netlify を使って、次の URL にデプロイしています。

  https://sharp-shockley-891ece.netlify.app/


### リポジトリ内容について

- このリポジトリの内容は、一部の情報を省略しています。（cognito の設定や API URL 等）
- なので、デプロイしたソースそのものではありません。

### 使用技術について

使用技術と、使用箇所は次のようになります。

- Vue.js, Nuxt.js (SPA mode)
- Vuex
[store/auth.js](https://github.com/amarillons/public-vue-nuxt-app/blob/develop/store/auth.js)
- Vuetify（= UIフレームワーク）
- axios （HTTP 通信）
[axios.get 等](https://github.com/amarillons/public-vue-nuxt-app/blob/c3df60be1b90e01f3215c306f0bb5bf3af1795c3/pages/kasens/index.vue#L59)
- AWS cognito （認証）
[plugins/amplify.js](https://github.com/amarillons/public-vue-nuxt-app/blob/develop/plugins/amplify.js)
- AWS AppSync + DynamoDB + GraphQL（サーバーレスバックエンド、NoSQL） 

  [middleware/auth.js](https://github.com/amarillons/public-vue-nuxt-app/blob/develop/middleware/auth.js)　　[appsync/messages.js](https://github.com/amarillons/public-vue-nuxt-app/blob/develop/appsync/messages.js)　　[cognito/keijiban.vue](https://github.com/amarillons/public-vue-nuxt-app/blob/c2d47b7746c0513dcdd1eedc23cebeb2a131be10/pages/cognito/keijiban.vue#L98)

- PHP + PDO + MySQL + xserver + REST（RDB バックエンド）
[kasens/index.vue](https://github.com/amarillons/public-vue-nuxt-app/blob/28a1719d817b7812572917630d5782ba332ac269/pages/kasens/index.vue#L59)

- 画像は、「wikipedia」「いらすとや」さんのものを使用。

