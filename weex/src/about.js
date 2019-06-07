import Vue from 'vue';
import weex from 'weex-vue-render';

weex.init(Vue);

// import your .vue App.
const App = require('about.vue')
// must have a '#root' element in your html body.
App.$el = '#root'
// instantiate
new App()