<template>
<div>
    <div class="media">
        <div class="media-left">
            <figure class="image is-128x128">
                <img :src="bio.image">
            </figure>
        </div>
        <div class="media-content">
            <h1 class="title is-4">{{bio.name}}</h1>
            <p class="subtitle is-6">@{{bio.id}}</p>
            <a v-if="bio.id" :href="storeedUrl" class="button is-info" data-size="large" data-show-screen-name="false" data-show-count="false">
                <span class="icon">
                    <i class="far fa-share-square"></i>
                </span>
                <span>Show me</span>
            </a>
        </div>
    </div>
    <br>
    <p>{{bio.description}} </p>
    
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Sample',
    props : {
        twitter_id: {
            type: String,
            default: 'youyixu'
        }
    },
    data () {
        return {
        bio: {}
        }
    },
    computed : {
        storeedUrl() {
          return `https://www.storeed.me/${this.bio.id}`
      },
    },
    mounted() {
        // Query bio
        if (this.twitter_id) {
            console.log("twitter id = " + this.twitter_id)
            axios
            .get(`https://s3.eu-west-3.amazonaws.com/storeed.me/${this.twitter_id}/bio.json`)
            .then(response => {
            // JSON responses are automatically parsed.
            this.bio = response.data;
            })
            .catch(e => {
            this.bio = {
                description : e,
                image : '',
                id : this.image,
                name : 'Error'
            }
            });
        }
    }
}
</script>
