import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
// import { AmplifyPlugin } from 'aws-amplify-vue'

const awsconfig = {
  Auth: {
    identityPoolId: 'ap-northeast-1:xxxxx-xxxxx-xxxxx-xxxxx-xxxxx',
    region: 'ap-northeast-1',
    identityPoolRegion: 'ap-northeast-1',
    userPoolId: 'ap-northeast-xxxxx',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  },
  aws_appsync_graphqlEndpoint:
    'https://xxxxx.appsync-api.ap-northeast-1.amazonaws.com/graphql',
  aws_appsync_region: 'ap-northeast-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
}

Amplify.configure(awsconfig)