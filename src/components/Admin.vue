<template>
    <section class="section">
      <div class="title has-text-centered">Admin</div>
      <p class="has-text-centered">
        <button class="button is-medium is-primary" @click="onLogin">Login using google</button>
      </p>
      <br>
      <p class="has-text-centered">
        <button class="button is-medium is-primary" @click="onLogout">Logout</button>
      </p>
    </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

var provider = new firebase.auth.GoogleAuthProvider();

export default {
  name: "Confirmation",
  methods: {
    onLogin() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log("Logged in", token, user);
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          console.log("Error", errorCode, errorMessage, email, credential);
        });
    },
    onLogout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
          console.log("Logout error", error);
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  text-align: center;
}
</style>
