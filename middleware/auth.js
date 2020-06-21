import { Auth } from "aws-amplify";

export default async ({ redirect }) => {
  let isSignedIn = false;
  await Auth.currentUserInfo()
    .then(data => (isSignedIn = Boolean(data)))
    .then(() => isSignedIn || redirect("/signin"));
};
