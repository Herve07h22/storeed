<template>
  <div>
    <section class="hero is-info is-medium">
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item is-active">
            Storeed.me
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroB">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroB" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item">
              Examples
            </a>
            <a class="navbar-item">
              About me
            </a>
            <span class="navbar-item">
              <a class="button is-info is-inverted">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>DIY on netlify</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="hero-body">
      <div class="columns">
        <div class="column is-two-fifths">
          <p class="title has-text-centered">
          Instantly turn your twitter feed into a personnal blog
          </p>
          <p class="subtitle has-text-centered">
            For free.
          </p>
          <div class="box">
            <div class="field">
              <label class="label">Twitter id</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="@yourId" v-model="twitterId">
                <span class="icon is-small is-left">
                  <i class="fab fa-twitter"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
              <p class="help is-success">This id is correct</p>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="email" placeholder="name@mydomain.com" v-model="twitterId" >
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p class="help is-danger">This email is invalid</p>
            </div>
          <div class="field">
            <div class="control has-text-centered">
              <button class="button is-link">Build my blog now !</button>
            </div>
          </div>
          </div>
        </div>
        <div class="column is-2 is-hidden-mobile">
        </div>
        <div class="column has-text-centered is-hidden-mobile">
          <figure class="image is-square">
            <img src="/static/undraw_tweetstorm_49e8.svg">
          </figure>
        </div>
        <div class="column is-2 is-hidden-mobile">
        </div>  
    </div>
  </div>
</section>

<section>
  
  
    <h1 class="title has-text-centered">Examples</h1>
  <div class="columns">
    <div class="column is-one-quarter box">
      <vue-simple-spinner hidden=true :line-size="12" message="Loading posts"></vue-simple-spinner>
    </div>
    <div class="column is-one-quarter box">
      <code>is-one-quarter</code>
    </div>
    <div class="column is-one-quarter box">
      <code>is-one-quarter</code>
    </div>
    <div class="column is-one-quarter box">
      <code>is-one-quarter</code>
    </div>
  </div>

</section>
  </div>
</template>

<script>
import VueSimpleSpinner from '@/components/Spinner.vue'

export default {
  name: 'Home',
  components : {
    VueSimpleSpinner
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

