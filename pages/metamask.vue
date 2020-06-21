<template>
  <div>
    <v-col>
      <v-row>
        <v-toolbar elevation="0">
          <v-toolbar-title>Metamaskについて</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <a href="https://metamask.io/">https://metamask.io</a>とは、Ethereumを使うためのウォレットです。
          ブラウザの拡張機能として用意されています。
        </v-card-text>
        <img src="~/assets/money_hardware_wallet.png" width="120" />
      </v-row>
      <v-row>
        <v-btn color="#E1F5FE" @click="enableEthereum">Ethereumを有効化する</v-btn>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-card-title>現在の接続情報</v-card-title>
        <v-card-text>現在、Metamask から取得できた情報の一部を表示します。Metamask と接続していない場合には、（未取得）と表示されます。</v-card-text>
        <v-list v-model="items">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-card-text v-text="item.title"></v-card-text>
            <v-card-text v-text="item.value"></v-card-text>
          </v-list-item>
        </v-list>
      </v-row>
      <v-row>
        <v-card-text>
          開発者向けのドキュメントは、
          <a href="https://docs.metamask.io/guide/">https://docs.metamask.io/guide/</a> にあります。
        </v-card-text>
        <v-card-text>
          このページでは、ブラウザの Metamask を自動で検出し、ユーザーが Ethereum から情報を取得できるようにしています。
          （検出しない場合には、Metamaskにログインしてリロードしてみてください。）
        </v-card-text>
      </v-row>
      <v-row>
        <v-card-title>Ethereum アドレスの種類について</v-card-title>
        <v-card-text>
          Ethereumのアドレスには、Externally Owned Account（=EOA）とコントラクトアドレスの２種類があります。
          アドレスとは、公開鍵のハッシュの最初の40文字です。なので、アドレスは公開鍵そのものではありません。
          秘密鍵（private key）は、アカウント保持者が自分で管理します。
          ウォレットソフトで生成されるアカウントは、すべてEOAアカウントです。
        </v-card-text>
      </v-row>
      <v-row>
        <v-card-text>
          Metamaskには、複数のアドレスを保持することができます。また、Metamask は HDウォレットであり、新しいアカウントを次々と生成することもできます。
          最初に、mnemonic を記録しておくことにより、別のコンピュータからウォレットを復元することができます。
        </v-card-text>
      </v-row>
      <v-row>
        <v-card-title>手数料（gas）について</v-card-title>
        <v-card-text>Ethereumでトランザクションを送信するには、手数料として Ether が必要です。手数料の Ether は、gas と呼ばれることもあります。</v-card-text>
        <img src="~/assets/gas_station_man.png" width="120" />
        <v-card-text>
          送信する内容によって gas の量が決まります。gas price は送信者が自分で設定することができ、gas と gas price を掛け算したものが全体の手数料となります。
          gas の量の最小値は 21000 であり、これは Ether を他の EOA アカウントに送るために必要な gas の量です。
          gas price はだいたい gwei から 10 gwei 程度に設定しておけば数分以内に送信できます。gas price があまり低いと、送信後のトランザクションがブロックチェーンに取り込まれず、
          pending のままになって残る可能性があります。
        </v-card-text>
      </v-row>
      <v-row>
        <v-card-title>nonce について</v-card-title>
        <v-card-text>
          Ethereum では、トランザクションの中に nonce が入っていて、この nonce はトランザクションを送信する
          ごとに 1 ずつ増加していくことになっています。つまり、nonce はそのアドレスから現在までに送られたトランザクションの数を著します。
          トランザクションが pending になってしまった場合に同じ内容のトランザクションを送り直すには、nonce を同じものとして送り直すことになります。
          Proof of Work で使われる nonce とは、名前が同じでも違うものを指すので注意が必要です。
        </v-card-text>
      </v-row>
      <v-row>
        <v-card-title>トークンの種類について</v-card-title>
        <v-card-text>
          トークンとは、細かくて持ち運びがしやすい物を一般的に指す言葉です。
          Ethereum 上で発行されるトークンとは、プログラム上でやりとりできるデータであり、
          多くのものは標準的な規格に合わせたものが発行されています。
          規格に合わせると、ユーザーがトークンの性質を理解しやすく・使いやすくなります。
        </v-card-text>
        <v-card-text>
          よく使われる規格は、ERC20 と、ERC721 です。
        </v-card-text>
      </v-row>
      <!-- <v-row> -->
        <!-- <v-card-title>コインの価格について</v-card-title> -->
      <!-- </v-row> -->
    </v-col>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

ethereum.on("accountsChanged", function(accounts) {
  // Time to reload your interface with accounts[0]!
  console.log(`account changed`);
});

export default {
  layout: "simple",
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      networkVersion: "",
      selectedAddress: "Metamaskが検出されません。",
      items: [
        { id: 0, title: "ブロック高", value: "（未取得）", detail: "detail1" },
        { id: 1, title: "ネットワーク番号", value: "（未取得）", detail: "detail2" },
        {
          id: 2,
          title: "アドレス",
          value: "（未取得）",
          detail: "detail3"
        },
        {
          id: 3,
          title: "ガス価格",
          value: "（未取得）"
        },
        {
          id: 4,
          title: "Ether 残高",
          value: "（未取得）"
        }
      ]
    };
  },
  methods: {
    enableEthereum() {
      ethereum.enable();
    },
    async fetchBlockNumber() {
      try {
        const res = await ethereum.send("eth_blockNumber");
        this.items[0].value = parseInt(res.result, 16);
      } catch (error) {
        if (error.code === 4001) {
          // EIP 1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      }
    },
    async fetchGasPrice() {
      try {
        const res = await ethereum.send("eth_gasPrice");
        this.items[3].value = parseInt(res.result, 16) + " wei";
      } catch (error) {
        if (error.code === 4001) {
          // EIP 1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      }
    },
    async fetchBalance() {
      ethereum.sendAsync(
        {
          method: "eth_getBalance",
          params: [this.selectedAddress, "latest"]
        },
        (err, response) => {
          if (err) {
            // Handle the error
          } else {
            const result = response.result;
            console.log(`result is ${JSON.stringify(result)}`);
            this.items[4].value = parseInt(result) + " wei";
          }
        }
      );
    }
  },
  async mounted() {
    if (typeof window.ethereum !== "undefined") {
      /* deal with it */
      const ethereum = window.ethereum;
      console.log(`ethereum detected. ${ethereum.networkVersion} is version.`);
      console.log(`address is ${ethereum.selectedAddress}`);
      this.selectedAddress = ethereum.selectedAddress;
      this.networkVersion = ethereum.networkVersion;
      this.items[1].value = ethereum.networkVersion;
      this.items[2].value = ethereum.selectedAddress;
    }
    this.fetchBlockNumber();
    this.fetchGasPrice();
    this.fetchBalance();
  }
};
</script>
