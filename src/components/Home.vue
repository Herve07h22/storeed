<template>
  <div>
    <section class="hero is-info is-medium">
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" >
          </a>

          <span class="navbar-burger" :class="{'is-active':isOpenMenu}" @click="isOpenMenu=!isOpenMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div class="navbar-menu" :class="{'is-active' :isOpenMenu}">
          <div class="navbar-end">
            <a class="navbar-item" href="#examples">
              Examples
            </a>
            <a class="navbar-item" href="#why">
              What is storeed.me ?
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
  <legals :isVisible="legalsDisplay" @close="legalsDisplay=false"></legals>
  <div class="hero-body">
      <div class="columns">
        <div class="column is-two-fifths">
          <p class="title has-text-centered">
          Instantly turn your twitter feed into a personnal blog
          </p>
          <p class="subtitle has-text-centered">
            Collect and share your favorite posts.
          </p>
          <div class="box">
            <div class="field">
              <label class="label">Twitter id</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" :class="{ 'is-success': isValidTwitterId, 'is-danger': !isValidTwitterId && twitterId}" type="text" placeholder="@yourId" v-model="twitterId">
                <span class="icon is-small is-left">
                  <i class="fab fa-twitter"></i>
                </span>
                <span v-if="twitterId" class="icon is-small is-right">
                  <i v-if="isValidTwitterId" class="fas fa-check"></i>
                  <i v-else class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <div v-if="twitterId">
                <p v-if="isValidTwitterId" class="help is-success">This twitter id is correct</p>
                <p v-else class="help is-danger">The twitter id should look like @something</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" :class="{ 'is-success': isValidMail, 'is-danger': !isValidMail && mail }" type="email" placeholder="name@mydomain.com" v-model="mail" >
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span v-if="mail" class="icon is-small is-right">
                  <i v-if="isValidMail" class="fas fa-check"></i>
                  <i v-else class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <div v-if="mail">
                <p v-if="isValidMail" class="help is-success">This email looks good</p>
                <p v-else class="help is-danger">The mail should look like something@domaine.com</p>
              </div>
            </div>
          <div class="field">
            <div class="control has-text-centered">
              <button v-if="!launched" class="button is-link" @click="buildSite" :disabled="!isValidMail || !isValidTwitterId">Build my blog now !</button>
              <button v-else class="button is-link is-loading">We are building your blog</button>
            </div>
          </div>
          <p v-if="message">{{message}}</p>
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
<br>
<section>
  <div class="container" id="examples">
    <h1 class="title">Examples</h1>
    <div class="columns">
      <div class="column is-one-third">
        <sample twitter_id="youyuxi"></sample>
      </div>
      <div class="column is-one-third">
        <sample twitter_id="FullstackDevJS"></sample>
      </div>
      <div class="column is-one-third">
        <sample twitter_id="snipcart"></sample>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <sample twitter_id="didier_goas"></sample>
      </div>
      <div class="column is-one-third">
        <sample twitter_id="MaOberlehner"></sample>
      </div>
      <div class="column is-one-third">
        <sample twitter_id="francoisz"></sample>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <sample twitter_id="julsimon"></sample>
      </div>
      <div class="column is-one-third">
        <sample twitter_id="ThisIsSethsBlog"></sample>
      </div>
      <div class="column is-one-third">
        <sample twitter_id="aureliendebord"></sample>
      </div>
    </div>
  </div>
</section>
<hr>
<section>
  <div class="container" id="why">
    <h1 class="title">What is storeed.me ?</h1>
    <div class="content">
      <p> This side project was inspired by Francois Zaninotto's post <a href="http://www.redotheweb.com/2014/01/20/why-I-tweet-three-links-a-day.html"> "Why I Tweet Three Links A Day"</a>.
      Francois explains that twitter is a great way to store and to share interesting links.
      As a solo entrepreneur, I spend a reasonnable time in a day reading posts. 
      And the most efficient way to get some reading suggestions is to look at the links curated by someone who share the same points of interest.
      </p> 
      <p>With another perspective, I thought it would also make sense to design a personnal blog with something wider than a simple picture of me, 
      followed by a static list of my skills/projects. Publishing my favourite posts is a way to tell who I am. 
      So I made this simple tool that gets all the links embedded in you last tweets, then analyze each post to get 
      some data : title, author, description, picture.
      The result is dumped to a json file. I wrote a couple of vue.js components to show the result and implement some features (sort, search).      
       </p>
      <h3>What about "DIY with Netlify" ?</h3>
      <p>The idea is to let you design your personnal blog. You can instanciate a basic nuxt template on Netlify, and modify it as you want to
        do a custom site : your design, your domain, and more additionnal pages. Before that, you will have to get some twitter dev credentials. 
      </p>
      <p>Up to now, this feature is still under development
        </p>
      <h3>What about pricing ?</h3>
      <p>Storeed.me is free. I am thinking about a small fee if you want to automaticly run the generation engine each day/week 
        to keep your list up to date. I'd love to hear from you about suggested features !</p>
    </div>
    </div>
</section>


<footer class="footer">
  <div class="container has-text-centered">
    <p>Made with love in Cotentin by <a href="mailto:contact@camilab.co"> camilab.co </a>- <a class="has-text-link" @click="legalsDisplay=true">terms and conditions</a> - copyright 2018 
    </p>
  </div>
</footer>

  </div>
</template>

<script>
import axios from "axios";
import Sample from '@/components/Sample.vue'
import Legals from '@/components/Legals.vue'

export default {
  name: 'Home',
  components : {
    Sample, 
    Legals
  },
  data () {
    return {
      twitterId: "",
      mail : "",
      launched : false,
      message : "",
      legalsDisplay : false,
      isOpenMenu : false
    }
  },
  computed: {
    isValidMail() {
      return this.validEmail(this.mail)
    },
    isValidTwitterId() {
      return this.validTwitter(this.twitterId)
    }
  }, 
  methods : {
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validTwitter(twitter) {
      var re = /^@(\w){1,15}$/ ;
      return re.test(twitter);
    },
    buildSite() {
      this.message = ""
      this.launched=true
      axios
        .post(`https://yptcbavuv9.execute-api.eu-west-3.amazonaws.com/api/new`, {
          twitter_id: this.twitterId.slice(1),
          mail: this.mail
        })
        .then(response => {
          // this.message = response.data;
          this.message = `We are building your page. We will send you an e-mail to ${this.mail} as soon as it is done.`
          this.launched=false
        })
        .catch(e => {
          this.message = "Ooh.. Something went wrong. Pease check you twitter id.";
          this.launched=false;
        });
    }
  }
}
</script>

