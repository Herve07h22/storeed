import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Blog from '@/components/Blog'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    { path: '/',       name: 'HelloWorld',  component: HelloWorld },
    { path: '/:tweet_id', name: 'Blog',  component: Blog, props:true },
    { path: '*',       name: 'default',  component: HelloWorld },
  ]
})
