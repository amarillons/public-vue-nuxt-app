<template>
  <div>
    <v-row>
      <v-toolbar elevation="0">
        <v-toolbar-title>ERC20 トークンを操作する</v-toolbar-title>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-card-title>サンプルトークン</v-card-title>
      <v-card-text>
        ここでは、次のトークン
        <a
          href="https://rinkeby.etherscan.io/address/0x4E944bb0399553c36461F678ff8c188D9A8f3FA3#code"
          target="_blank"
          rel="noopener noreferer"
        >https://rinkeby.etherscan.io/address/0x4E944bb0399553c36461F678ff8c188D9A8f3FA3#code</a>
        を操作していきます。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>使った技術</v-card-title>
      <v-card-text>
        <li>Metamask</li>
        <li>Solidity</li>
        <li>Remix editor</li>
        <li>Vue + Nuxt.js</li>
        <li>
          Firebase Cloud Function
          <a
            href="https://firebase.google.com/docs/functions"
            target="_blank"
            rel="noopener noreferer"
          >https://firebase.google.com/docs/functions</a>
        </li>
        <li>Node.js 8</li>
        <li>
          Express フレームワーク
          <a
            href="https://expressjs.com/"
            target="_blank"
            rel="noopener noreferer"
          >https://expressjs.com/</a>
        </li>
        <li>
          web3.js
          <a
            href="https://web3js.readthedocs.io/en/v1.2.9/#"
            target="_blank"
            rel="noopener noreferer"
          >https://web3js.readthedocs.io/en/v1.2.9/#</a>
        </li>
        <li>
          Infura.io
          <a
            href="https://infura.io/"
            target="_blank"
            rel="noopener noreferer"
          >https://infura.io/</a>
        </li>
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-text>Metamask でテストネット(rinkeby) に接続しているとします</v-card-text>
      <v-btn @click="enableEthereum">Enable Ethereum</v-btn>
    </v-row>
    <v-row>
      <v-card-title>トークンのコードについて</v-card-title>
      <v-card-text>
        ERC20 トークンの
        <a
          href="https://rinkeby.etherscan.io/address/0x4E944bb0399553c36461F678ff8c188D9A8f3FA3#code"
          target="_blank"
          rel="noopener noreferer"
        >Solidity コード</a>
        は、OpenZeppelin が公開して
        いるサンプルコードを参考にして作成しています。
        <a
          href="https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20"
          target="_blank"
          rel="noopener noreferer"
        >https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20</a>
      </v-card-text>
      <v-card-text>
        <img src="~/assets/computer_screen_programming.png" width="120" />
      </v-card-text>
      <v-card-text>
        コントラクトのコードは、Etherscan で検証して公開（= verify and publish）することができます。
        Etherscan は、Ethereum の履歴を閲覧・検索することができる web サービスです。
        公開済み（デプロイ済み）のコントラクトは、検証者がコードをアップロードして、コンパイル済みのコードと照らし合わせることにより、Etherscan 上で Solidity ソースコードを誰でも見られる状態にすることができます。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>トークンのデプロイ方法</v-card-title>
      <v-card-text>
        トークンのデプロイをするには、Truffle (
        <a
          href="https://www.trufflesuite.com/"
          target="_blank"
          rel="noopener noreferer"
        >https://www.trufflesuite.com/</a>
        ) を使う方法や、Remix の Deploy and Run Transaction タブからデプロイする方法などがあります。
        一度デプロイしたコントラクトは、ブロックチェーンの性質上 修正することができないので、
        デプロイをするときは慎重に行う必要があります。
      </v-card-text>
      <img src="~/assets/computer_hacker_white1_woman.png" width="120" />
      <v-card-text>
        トークンを複数コントラクトから構成することもでき、その場合はメインのコントラクトは別のコントラクトのアドレスを持つことによって、
        処理を別コントラクトに移譲することもできます。（プロキシとして使う方法）
        この場合には、プロキシの先のコントラクトを後から入れ替えることができるので、コントラクトを後から修正するようにしておくことも可能となります。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>ERC20トークンのメソッドの説明</v-card-title>
      <v-card-text>
        ERC20トークンに実装されているメソッド一覧
        <br />
        <a
          href="https://eips.ethereum.org/EIPS/eip-20"
          target="_blank"
          rel="noopener noreferer"
        >https://eips.ethereum.org/EIPS/eip-20</a>
        <li>name ... トークンの名称</li>
        <li>symbol ... トークンシンボル（3-4 文字程度の短縮名称）</li>
        <li>decimals ... トークンの小数点以下の最大桁数（Ether は 18）</li>
        <li>balanceOf ... 各アドレスごとのトークン所持額</li>
        <li>transfer ... トークン送金</li>
        <li>transferFrom ... トークンを代理で送金するためのメソッド</li>
        <li>approve ... transferFrom で自分の代理で送る最大金額を設定するメソッド</li>
        <li>allowance ... approve メソッドで設定された最大金額</li>
      </v-card-text>
      <!-- <v-btn @click="getBalance">Get Balance</v-btn> -->
    </v-row>
    <v-row>
      <v-card-title>テストネットのトークンを取得する(Node.js)</v-card-title>
      <v-card-text>
        デプロイしたトークンを一定量取得するための Faucet を作成して、トークンを取得します。
        Faucet は、Firebase Cloud Function + Node.js で作りました。実行するには、
        送付先の Rinkeby アドレスを入力して下の「Faucet からトークンを取得」ボタンを押します。
      </v-card-text>
      <v-card-text>
        ソースコードは、
        <a href="erc20/faucet_source" target="_blank" rel="noopener noreferer">ここ</a>に置いています。
      </v-card-text>
      <v-card-text>
        <img src="~/assets/mizu_kitchen_tareru.png" width="60" />
      </v-card-text>
      <v-text-field label="アドレス"></v-text-field>
      <v-chip color="white"></v-chip>
      <v-btn @click="getToken">Faucet からトークンを取得</v-btn>
    </v-row>

    <v-row>
      <v-card-title>スマートコントラクトにトークン配布機能(Solidity)</v-card-title>
      <!-- <v-card-text>残高は {{ balanceFloat }} {{ tokenSymbol }}</v-card-text> -->
      <v-card-text>
        今回使うコントラクトでは、通常の ERC20 のメソッドに加えて、残高を 100 にするメソッド
        <code>getMe()</code> を作っています。
        このメソッドを作った理由は、トークン配布・取得を容易にするためです。
        Solidity での実装は次のようにしています
      </v-card-text>
      <v-card-text>
        <code>
          function giveMe () public {
          _balances[msg.sender] = 0x56BC75E2D63100000;
          }
        </code>
      </v-card-text>
    </v-row>
    <v-row>
      {{ tokenSymbol }} トークンの残高を 100 にする
      <v-chip color="white"></v-chip>
      <v-btn>実行</v-btn>
    </v-row>
    <v-row>
      <v-card-title>コントラクトコードの実行(Metamask)</v-card-title>
      <v-card-text>
        トークンの残高取得や、他のアドレスへのトークン送金を行うためには、
        コントラクトアドレスを to としてトランザクションを送る必要があります。
        トランザクションの内部には、to のほかに optional で data （バイト列）を送ることができ、
        data の内部でメソッド名（のハッシュ）と、メソッドの引数（送金先・送金額など）を設定します。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-text>他のアドレスにトークンを送ります。</v-card-text>
    </v-row>
    <v-row>
      <v-chip>送付先アドレス</v-chip>
      <v-chip color="white"></v-chip>
      <v-text-field></v-text-field>
    </v-row>
    <v-row>
      <v-chip>送信額</v-chip>
      <v-chip color="white"></v-chip>
      <v-text-field></v-text-field>
    </v-row>
    <v-row>
      <v-btn @click="sendToken">送信</v-btn>
    </v-row>

    <v-row>
      <v-card-title>トランザクションが決定するまでの時間</v-card-title>
      <v-card-text>
        だいたい15-20秒程度でブロックが生成されるので、ガス価格を標準以上に設定
        しておけば、１分程度でトランザクションが取り込まれる。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>データ取得方法(Metamask)</v-card-title>
      <v-card-text>
        Ethereum のデータはバイト列にエンコードされているので、取得する際は ABI encoding のドキュメント
        <a
          href="https://solidity.readthedocs.io/en/develop/abi-spec.html#use-of-dynamic-types"
          target="_blank"
          rel="noopener noreferer"
        >https://solidity.readthedocs.io/en/develop/abi-spec.html#use-of-dynamic-types</a>
        にしたがってデコードする必要があります。
        たとえば、このページ内で Token Symbol （String 型）を取得して表示するためには次のようにしています。
      </v-card-text>
      <v-card-text>
        <code>
          const transactionParameters = {
          gas: "0x100000000",
          to: this.tokenAddress,
          from: ethereum.selectedAddress,
          data:
          "0x95d89b410000000000000000000000000000000000000000000000000000000000000000",
          chainId: ethereum.networkVersion
          };
          ethereum.sendAsync(
          {
          method: "eth_call",
          params: [transactionParameters],
          from: ethereum.selectedAddress
          },
          (err, response) => {
          if (err) {
          console.log(`error is ${error}`);
          } else {
          const result = response.result;
          console.log(`get token symbol is ${JSON.stringify(result)}`);
          this.tokenSymbol = this.hex_to_ascii(result);
          }
          }
          );
        </code>
      </v-card-text>
      <v-card-text>
        この中の
        <code>transactionParameters</code> では、Ethereum call で指定するパラメータを指定しています。
        to はつねにコントラクトアドレスとなります
        パラメータ内の data の 0x95d89b41 は、コントラクトのメソッド名
        <code>symbol()</code> の Keccak 256 ハッシュの最初の 4 バイトを指定しています。
        Ethereum call を実行する場合には、Metamask で署名する必要はありません。
        <code>hex_to_ascii</code> は、バイト列から UTF-8 へのデコード関数です。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>その他のコントラクトコード実行方法</v-card-title>
      <v-card-text>
        以上のステップで、
        <li>Metamask を使ったクライアントからのトランザクション送信</li>
        <li>web3.js を使ったサーバー(Firebase Cloud Function)からのトランザクション送信</li>を行いました。
      </v-card-text>
      <v-card-text>
        このほかに
        <li>
          Geth 等のノードにアクセスできる場合には、curl コマンド等で JSON-RPC を
          実行する
        </li>ことで、コントラクトのメソッドを実行することができます。
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>参考文献</v-card-title>
      <v-card-text>
        <li>
          <a
            href="https://www.oreilly.com/library/view/mastering-ethereum/9781491971932/"
            target="_blank"
            rel="noopener noreferer"
          >Mastering Ethereum</a>
        </li>
        <li>
          <a href="https://docs.metamask.io/guide/">Metamask Docs</a>
        </li>
      </v-card-text>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "simple",
  data() {
    return {
      tokenAddress: "0x4E944bb0399553c36461F678ff8c188D9A8f3FA3",
      tokenSymbol: "",
      selectedAddress: "",
      networkVersion: "",
      balanceFloat: "",
      tokenSymbol: ""
    };
  },
  methods: {
    getToken() {
      // call a cloud function
      // hidden from public repository
    },
    sendToken() {
      console.log(`トークン送信`);
    },
    getDecimals() {
      const transactionParameters = {
        gas: "0x100000000",
        to: this.tokenAddress, // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        data:
          "0x313ce5670000000000000000000000000000000000000000000000000000000000000000", // Optional, but used for defining smart contract creation and interaction.
        chainId: ethereum.networkVersion // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      ethereum.sendAsync(
        {
          method: "eth_call",
          params: [transactionParameters],
          from: ethereum.selectedAddress
        },
        (err, response) => {
          if (err) {
            // Handle the error
            console.log(`error is ${error}`);
          } else {
            const result = response.result;
            console.log(`get decimals is ${JSON.stringify(result)}`);
          }
        }
      );
    },
    getTokenSymbol() {
      const transactionParameters = {
        gas: "0x100000000",
        to: this.tokenAddress, // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        data:
          "0x95d89b410000000000000000000000000000000000000000000000000000000000000000", // Optional, but used for defining smart contract creation and interaction.
        chainId: ethereum.networkVersion // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      ethereum.sendAsync(
        {
          method: "eth_call",
          params: [transactionParameters],
          from: ethereum.selectedAddress
        },
        (err, response) => {
          if (err) {
            // Handle the error
            console.log(`error is ${error}`);
          } else {
            const result = response.result;
            // console.log(`get token symbol is ${JSON.stringify(result)}`);
            this.tokenSymbol = this.hex_to_ascii(result);
          }
        }
      );
    },
    getBalance() {
      console.log(`selected address is ${ethereum.selectedAddress}`);
      const transactionParameters = {
        // nonce: "0x00", // ignored by MetaMask
        // gasPrice: "0x9184e72a000", // customizable by user during MetaMask confirmation.
        // gas: "0x2710", // customizable by user during MetaMask confirmation.
        to: this.tokenAddress, // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        // value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data:
          "0x70a082310000000000000000000000005d11A8b34359aa5BC6eB28CaB252Fe1Bf877EF97", // Optional, but used for defining smart contract creation and interaction.
        chainId: ethereum.networkVersion // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      //   "invalid argument 0: json: cannot unmarshal hex number
      //   with leading zero digits into Go struct field CallArgs.gasPrice
      //   of type *hexutil.Big"

      ethereum.sendAsync(
        {
          method: "eth_call",
          params: [transactionParameters],
          from: ethereum.selectedAddress
        },
        (err, response) => {
          if (err) {
            // Handle the error
            console.log(`error is ${error}`);
          } else {
            const result = response.result;
            console.log(
              `result is ${JSON.stringify(result)}, ${parseInt(result, 16)}`
            );
            const balanceInt = parseInt(result, 16);
            console.log(
              `float is ${parseFloat(balanceInt) / 1000000000000000000}`
            );
            this.balanceFloat = parseFloat(balanceInt) / 1000000000000000000;
          }
        }
      );
    },
    tokenButton() {},
    enableEthereum() {
      ethereum.enable();
    },
    hex_to_ascii(str1) {
      // https://www.w3resource.com/javascript-exercises/javascript-string-exercise-28.php
      var hex = str1.toString();
      var str = "";
      for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
      }
      return str;
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
    }
    this.getBalance();
    this.getTokenSymbol();
    this.getDecimals();

    // const symbol =
    //   "0x0000000000000000000000000000000000000000000000000000000000000003464a540000000000000000000000000000000000000000000000000000000000";
    // // const string = decodeURIComponent(escape(symbol));
    // console.log(`decodeed is ${this.hex_to_ascii(symbol)}`);
  }
};
</script>

<style>
</style>