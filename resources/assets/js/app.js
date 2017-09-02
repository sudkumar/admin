const Vue = require("vue")
const App = require('js/components/App.vue')

Vue.component('app', App);

const app = new Vue({
    el: '#app'
});
