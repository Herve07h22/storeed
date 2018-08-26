<template>
    <div>
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
                            <h1 class="title is-4">{{bio.id}}</h1>
                            <p class="subtitle is-6">{{bio.name}}</p>
                            <p>{{bio.description}} </p>
                            <br>
                            <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" class="twitter-follow-button twitter-follow-button-rendered" style="position: static; visibility: visible; width: 79px; height: 28px;" title="Twitter Follow Button" src="https://platform.twitter.com/widgets/follow_button.1025be460f33762a866ea882e1687ff4.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=TheFamily&amp;show_count=false&amp;show_screen_name=false&amp;size=l&amp;time=1534674571537" data-screen-name="TheFamily"></iframe>
                        </div>  
                    </div>
                </div>

                <div class="is-hidden-mobile">
                    <br><hr>
                    <div class="level">
                        <div class="level-left">
                            <p class="control">
                                <input class="input is-rounded" type="text" placeholder="Search" v-model="filterText">
                            </p>
                        </div>
                        <div class="level-right">
                            <span v-if="filterTag" class="tag is-rounded is-primary is-medium">{{filterTag}}<button class="delete is-small" v-on:click="filterTag=''"></button></span>
                        </div>
                    </div>
                    <table class="table is-narrow is-hoverable is-fullwidth">
                        <thead>
                                <tr>
                                <th><abbr title="Age (in days)" class="is-size-7">Age</abbr></th>
                                <th><abbr title="Rank" class="is-size-7">Rk</abbr></th>
                                <th><abbr class="is-size-7">Title</abbr></th>
                                </tr>
                            </thead>
                        <tbody>    
                            <tr v-for="post in filteredPost" :key="post.url">
                                <td >
                                    <span class="is-size-7 has-text-weight-light">{{post.age}}d</span>
                                </td>
                                <td >
                                    <span class="is-size-7 has-text-weight-light">{{post.rank}}</span>
                                </td>
                                <td>
                                    <a class="is-size-7" :href="post.url">{{post.titre}}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

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
                  
                  <article class="box" v-for="post in sortedPost" :key="post.url">
                      <div class="media">
                          <figure class="media-left is-hidden-mobile is-clipped">
                                  <p class="image is-128x128">
                                      <img :src="post.image">
                                  </p>
                          </figure>
                          <div class="media-content">     
                          
                              <p class="title is-5">{{post.titre}}</p>
                              <p class="heading">By {{post.author}} - {{post.age}} days ago</p>
                              <div class="tags" v-if="post.tags" >
                                  <a v-for="tag in post.tags" :key="tag" class="tag filter is-rounded is-primary" v-on:click="filterTag=tag">{{tag}}</a>
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

export default {
  props: ["tweet_id"],
  data() {
    return {
      posts: [],
      bio: {},
      errors: [],
      loading: false,
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
      sortedPost() {
          if (this.sortedByDate) {
            return this.posts.sort( (postA, postB) => postA.age - postB.age ).slice(0, 10)
          }
          else {
              return this.posts.sort( (postA, postB) => postB.rank - postA.rank ).slice(0, 10)
          }
      },
    filteredPost() {
        const filterPosts = function(post, textFilter, tagFilter) {
            // return true if it matches
            return (!textFilter || (post.titre.toLowerCase().indexOf(textFilter)>-1 )) && (!tagFilter || post.tags.includes(tagFilter))
        }
        return this.posts.filter( (post) => filterPosts(post,this.filterText, this.filterTag ) )
    }
  },
  methods: {
    fetchData() {
      this.errors = [];
      this.loading = true;
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
      //this.loading = false;
    },
    switchToPopular() {},
    switchToRecent() {}
  }
};
</script>
