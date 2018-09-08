<template>
    <div class="section">
        <div class="columns">
            <div class="column is-5">
                <h1 class="title">About me</h1>
                <div class="section">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-128x128">
                                <img :src="bio.image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <h1 class="title is-4">{{bio.name}}</h1>
                            <p class="subtitle is-6">{{bio.id}}</p>
                            <p>{{bio.description}} </p>
                            <br>

                            <a v-if="bio.id" :href="twitterUrl" class="button is-info" data-size="large" data-show-screen-name="false" data-show-count="false">
                                <span class="icon">
                                    <i class="fab fa-twitter"></i>
                                </span>
                                <span>Follow</span>
                            </a>
                        </div>  
                    </div>
                </div>

                <div>
                    <br><hr>
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <p class="control">
                                    <input class="input is-rounded" type="text" placeholder="Search" v-model="filterText">
                                </p>
                            </div>
                            <div class="level-item">
                                <span v-if="filterTag" class="tag is-rounded is-primary is-medium">{{filterTag}}<button class="delete is-small" v-on:click="filterTag=''"></button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
              <h2 class="title">My reading list</h2>
              <div class="tabs">
                      <ul>
                        <li id="popular_tab" v-bind:class="{ 'is-active': !sortedByDate }"><a v-on:click="sortedByDate=false">Popular</a></li>
                        <li id="recent_tab" v-bind:class="{ 'is-active': sortedByDate }"><a v-on:click="sortedByDate=true">Recent</a></li>
                      </ul>
                    </div>
              
              <div>
              <vue-simple-spinner v-if="isLoading" :line-size="12" message="Loading posts"></vue-simple-spinner>    
                  <article class="box" v-for="post in selectedPost" :key="post.url">
                      <div class="media">
                          <figure class="media-left is-hidden-mobile is-clipped">
                                  <p class="image is-128x128">
                                      <img :src="post.image">
                                  </p>
                          </figure>
                          <div class="media-content">     
                          
                              <p class="title is-5">{{post.titre}}</p>
                              <p class="heading"><span v-if="post.author">By {{post.author}} - </span>{{post.age}} days ago</p>
                              <div class="tags" v-if="post.tags" >
                                  <a v-for="tag in post.tags" class="tag filter is-rounded is-primary" v-on:click="filterTag=tag">#{{tag}}</a>
                              </div>
                          </div>
                      </div>
                      <p>{{post.description}} <a target="_blank" :href="post.url">Read more</a></p>    
                  </article>
                                    
              </div>
              
          </div>
      
        </div>

    </div>
</template>

<script>
import axios from "axios";
import VueSimpleSpinner from '@/components/Spinner.vue'

export default {
  props: ["tweet_id"],
  components : {
    VueSimpleSpinner
  },
  data() {
    return {
      posts: [],
      bio: {},
      errors: [],
      sortedByDate : false,
      filterText : "",
      filterTag : ""
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  computed: {
      selectedPost() {
        const sortByDate = (posts) => posts.sort( (postA, postB) => postA.age - postB.age )
        const sortByRank = (posts) => posts.sort( (postA, postB) => postB.rank - postA.rank )
        const sortedByDateOrRank = (posts, sortedByDate) => (sortedByDate ? sortByDate(posts) : sortByRank(posts))
        
        const filterPostsCondition = (post, textFilter, tagFilter) => (!textFilter || (post.titre.toLowerCase().indexOf(textFilter)>-1 )) && (!tagFilter || post.tags.includes(tagFilter))
        const filteredPost = (posts, textFilter, tagFilter) => posts.filter( (post) => filterPostsCondition(post,textFilter, tagFilter) )

        return filteredPost(sortedByDateOrRank(this.posts, this.sortedByDate), this.filterText, this.filterTag)

      },
      twitterUrl() {
          return `https://twitter.com/${this.bio.id}?ref_src=twsrc%5Etfw`
      },
      isLoading() {
          return this.posts.length == 0
      }
  },
  methods: {
    fetchData() {
      this.errors = [];
      
      // replace `getPost` with your data fetching util / API wrapper
      axios
        .get(
          `https://s3.eu-west-3.amazonaws.com/storeed.me/${
            this.tweet_id
          }/posts.json`
        )
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });

      axios
        .get(
          `https://s3.eu-west-3.amazonaws.com/storeed.me/${
            this.tweet_id
          }/bio.json`
        )
        .then(response => {
          // JSON responses are automatically parsed.
          this.bio = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
