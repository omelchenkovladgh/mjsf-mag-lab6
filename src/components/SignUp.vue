<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-12 col-xl-4">
                    <div class="card mask-custom">
                        <div class="card-body p-4 text-white">
                           <form @submit.prevent="signUp">
                                <div v-if="!resendEmail">
                                    <h2>Register</h2>
                                    <div class="mb-2">
                                        <input aria-required="true" type="text" placeholder="Username" required v-model="username">
                                    </div>
                                    <div class="mb-2">
                                        <input aria-required="true" type="email" placeholder="Email" required v-model="email">
                                    </div>
                                    <div class="mb-2">
                                        <input min="8" aria-required="true" type="password" placeholder="Password" required v-model="password">
                                    </div>
                                    <div v-if="error.show">
                                        <p class="text-danger">{{ error.text }}</p>
                                    </div>
                                    <button class="mt-3 mb-3">Sign Up</button>
                                    <p>Already have an account?
                                        <router-link to="/log-in">Sign In</router-link>
                                    </p>
                                </div>
                                <div v-else>
                                    <p class="sign-up-msg">Please, check your email to verify your profile</p>
                                    <p class="fw-lighter resend-verif" v-if="resendEmail" @click="resendVerificationEmail">Resend email verification</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
  <script>
  import {createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from 'firebase/auth'
  import {auth} from '../firebase'
  import {mapActions} from "vuex";
  
  export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: {
        text: '',
        show: false
      },
      resendEmail: false
    }
  },
  methods: {
    ...mapActions(['authUser']),
    signUp() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: this.username
            })
            this.verifyUser();
            this.authUser(auth.currentUser)
            this.resendEmail = true;
          })
          .catch((error) => {
            this.error.text = error.message;
            this.error.show = true;
          })
    },
    resendVerificationEmail() {
      auth.currentUser.reload()
      if (!auth.currentUser.emailVerified) {
        this.verifyUser()
      }
        else {
          this.authUser(auth.currentUser)
          router.push('/')
        }
      },
  
      verifyUser() {
        const actionCodeSettings = {url: `http://localhost:5173/?verified`};
        sendEmailVerification(auth.currentUser, actionCodeSettings);
      }
    }
  }
  </script>

<style scoped>
.mask-custom {
  background: rgba(24, 24, 16, 0.2);
  border-radius: 2em;
  backdrop-filter: blur(25px);
  border: 2px solid rgba(255, 255, 255, 0.05);
  background-clip: padding-box;
  box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
}

input{
    background: rgba(24, 24, 16, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(25px);
    border-width: 0px;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
    padding-left: 20px;
    padding-block: 5px;
    margin-top: 10px;
    color: white;
    width: 100%;
}

input::placeholder {
    color: rgb(170,170,170);
}

.sign-up-msg{
  color: white;
  font-weight: 500;
  font-size: 24px;
}

.resend-verif{
  cursor: pointer;
}
</style>