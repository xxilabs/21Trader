import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import store from './store'

import backtester from './components/backtester/backtester.vue'

import data from './components/data/data.vue'
import importer from './components/data/import/importer.vue'
import singleImport from './components/data/import/single.vue'
import config from './components/config/config.vue'

import gekkoList from './components/gekko/list.vue'
import newGekko from './components/gekko/new.vue'
import singleGekko from './components/gekko/singleGekko.vue'
import { connect as connectWS } from './components/global/ws'

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/workers' },
    { path: '/backtest', component: backtester },
    { path: '/config', component: config },
    { path: '/data', component: data },
    { path: '/data/importer', component: importer },
    { path: '/data/importer/import/:id', component: singleImport },
    { path: '/workers', component: gekkoList },
    { path: '/workers/new', component: newGekko },
    { path: '/workers/:id', component: singleGekko },
  ]
});

// setup some stuff
connectWS();

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
