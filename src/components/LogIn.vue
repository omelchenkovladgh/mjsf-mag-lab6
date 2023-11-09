<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-12 col-xl-4">
                    <div class="card mask-custom">
                        <div class="card-body p-4 text-white">
                            <form @submit.prevent="login">
                                <h2>Log in</h2>
                                <div class="mb-2">
                                    <input type="email" placeholder="Email" required v-model="email">
                                </div>
                                <div class="mb-2">
                                    <input type="password" placeholder="Password" required v-model="password">
                                </div>
                                <div v-if="error.show">
                                    <p class="text-danger">{{ error.text }}</p>
                                </div>
                                <button class="mt-3 mb-3">Log in</button>
                                <p>Don`t have an account?
                                    <router-link to="/sign-up">Sign Up</router-link>
                               </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
  <script>
  import {signInWithEmailAndPassword} from 'firebase/auth'
  import {auth} from '../firebase'
  import router from "../router";
  import ToDo from "../components/ToDo.vue";
  import {mapActions} from "vuex";
  
  export default {
    components: {ToDo},
    data() {
      return {
        email: '',
        password: '',
        error: {text: '', show: false}
      }
    },
    methods: {
      ...mapActions(['authUser']),
      login() {
        signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
              this.authUser(auth.currentUser);
              router.push({path: '/'})
            })
            .catch((error) => {
              this.error.text = error.message;
              this.error.show = true;
            })
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



</style>