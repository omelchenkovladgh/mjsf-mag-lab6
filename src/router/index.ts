import {createRouter, createWebHistory} from 'vue-router';
import ToDo from "../components/ToDo.vue";
import About from "../components/About.vue";
import SignUp from "../components/SignUp.vue";
import LogIn from "../components/LogIn.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import store from "../store"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'toDo',
            component: ToDo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/sign-up',
            name: 'signup',
            component: SignUp,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/log-in',
            name: 'logIn',
            component: LogIn,
            meta: {
                requiresAuth: false
            }
        },
    ]
})

const currentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), () => {
            removeListener();
            resolve(store.getters.GET_IS_AUTHENTICATED);
        }, reject)
    })
}
router.beforeEach(async (to) => {
    if (to.meta.requiresAuth && !await currentUser()) {
        return {name: 'logIn'};
    }
    if ((to.name === 'logIn' || to.name === 'signUp') && await currentUser()) {
        return {name: 'toDo'}
    }
    return true;
})
export default router;