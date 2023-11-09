import services from '../services'

export default {
    install: (app) => {
        app.provide('services', services);
    }
}