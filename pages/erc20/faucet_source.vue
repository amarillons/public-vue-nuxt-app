<template>
  <div>
    <v-row>
      <v-toolbar elevation="0">
        <v-toolbar-title>テスト用トークン Faucet</v-toolbar-title>
      </v-toolbar>
      <v-card-text>テスト用にデプロイした ERC20 トークンを配布するシステム（サーバーサイド）のソースコード</v-card-text>
    </v-row>
    <!-- <v-row>
      <v-card-title>テスト用トークン Faucet</v-card-title>
      <v-card-text>テスト用にデプロイした ERC20 トークンを配布するシステム（サーバーサイド）のソースコード</v-card-text>
    </v-row>-->
    <v-row>
      <v-card-title>使った技術</v-card-title>
      <v-card-text>
        <li>
          Firebase Cloud Function
          <a
            href="https://firebase.google.com/docs/functions" target="_blank"
          rel="noopener noreferer"
          >https://firebase.google.com/docs/functions</a>
        </li>
        <li>Node.js 8</li>
        <li>
          Express フレームワーク
          <a href="https://expressjs.com/" target="_blank"
          rel="noopener noreferer">https://expressjs.com/</a>
        </li>
        <li>
          web3.js
          <a
            href="https://web3js.readthedocs.io/en/v1.2.9/#" target="_blank"
          rel="noopener noreferer"
          >https://web3js.readthedocs.io/en/v1.2.9/#</a>
        </li>
        <li>
          Infura.io
          <a href="https://infura.io/" target="_blank"
          rel="noopener noreferer">https://infura.io/</a>
        </li>
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-title>ソースコード</v-card-title>
      <v-card-text>
        <code>
          const functions = require('firebase-functions');
          const Web3 = require('web3');
          const bodyParser = require('body-parser')
          const express = require('express')
          const app = express()
          const provider = 'https://rinkeby.infura.io/v3/(project id)'
          const web3 = new Web3(provider);
          const chainId = 4; // Rinkeby
          app.use(bodyParser.urlencoded({
          extended: true
          }));
          app.use(bodyParser.json());
          const getBalance = async (tokenAddress, eoaAddress) => {

          const balance = await web3.eth.call({
          to: tokenAddress,
          data: '0x70a08231000000000000000000000000' + eoaAddress.slice(2),
          })
          return web3.utils.hexToNumberString(balance);
          }
          const generateRawTransaction = (nonce, gasPrice, tokenAddress, eoaAddress, originAddress, amountDecimal) => {
          console.log('nonce:', nonce);
          console.log(`eoa: ${eoaAddress}, token: ${tokenAddress}, amountDecimal: ${amountDecimal}`)
          const amountInt = web3.utils.toWei(amountDecimal.toString());
          const amountHex = web3.utils.toHex(amountInt);
          console.log(`amount hex is ${amountHex}`);
          const rawTransaction = {
          "from": originAddress,
          "to": tokenAddress,
          "data": "0xa9059cbb" // transfer
          + eoaAddress.slice(2).padStart(64, "0")
          + amountHex.slice(2).padStart(64, "0"), // amount
          "gas": 1000000,
          "gasPrice": gasPrice,
          "nonce": nonce,
          "chainId": chainId
          };
          return rawTransaction;
          }
          const tokenTransfer = async (tokenAddress, eoaAddress, amountDecimal) => {
          const decryptedAccount = web3.eth.accounts.privateKeyToAccount('(private key of account))');
          const gwei = 1000000000;
          let txCount = await web3.eth.getTransactionCount(decryptedAccount.address);
          let initialGasPrice = 10 * gwei;
          let nonce = txCount;

          let gasPrice = initialGasPrice;

          console.log(`nonce is ${nonce}`);

          console.log(`transfer is ${tokenAddress}, ${eoaAddress}`);

          console.log('Sending tx.. gasPrice:', gasPrice);
          const rawTransaction = generateRawTransaction(nonce, gasPrice, tokenAddress, eoaAddress, decryptedAccount.address, amountDecimal);
          console.log(`raw transaction is ${JSON.stringify(rawTransaction)}`);
          const signedTx = await decryptedAccount.signTransaction(rawTransaction);

          const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

          console.log(`transaction sent.`)
          return receipt;
          }

          app.post('/send_token/', async (req, res) => {
          // const toAddress = req.body.to_address;
          // const tokenAddress = req.body.token_address;
          console.log(req.body);
          const result = await tokenTransfer(req.body.token_address, req.body.to_address, req.body.amount_decimal)
          // res.send(`received: ${req.body}`);
          res.send(result);
          })
          app.listen(3000, () => console.log('Example app listening on port 3000!'))
          exports.app = functions.https.onRequest(app);
        </code>
      </v-card-text>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "simple"
};
</script>

<style>
</style>