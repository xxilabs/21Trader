<template>
  <div class="contain py2">
      <h3 class="page-header">Config</h3>
      <div class="page-actions">
        <a class="btn--primary add" href="#" v-if="!addApiToggle" v-on:click.prevent="openAddApi">
          Add Exchange API
        </a>
      </div>
      <h4 class="section-header">Available API keys</h4>
      <p v-if="!apiKeySets.length"><em>You don't have any API keys yet.</em></p>

      <template v-if="addApiToggle">
        <apiConfigBuilder class="section-area"></apiConfigBuilder>
      </template>

      <table class="full keys">
        <thead>
          <tr>
            <th>exchange</th>
            <!-- <th>key</th> -->
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exchange in apiKeySets">
            <td><strong>{{ exchange }}</strong></td>
            <!-- <td>{{ exchange }}</td> -->
            <td><a href="#" v-on:click.prevent="removeApiKey(exchange)">remove</a></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import apiConfigBuilder from './apiConfigBuilder.vue';
import { post } from '../../tools/ajax';

export default {
  components: {
    apiConfigBuilder
  },
  data: () => {
    return {
      addApiToggle: false,
    }
  },
  methods: {
    openAddApi: function() {
      this.addApiToggle = true;
    },
    removeApiKey: function(exchange) {
      if(!confirm('Are you sure you want to delete these API keys?'))
        return;

      post('removeApiKey', {exchange}, (error, response) => {
        if(error)
          return alert(error);
      });
    }
  },
  computed: {
    apiKeySets: function() {
      return this.$store.state.apiKeys
    }
  },
  watch: {
    apiKeySets: function() {
      this.addApiToggle = false;
    }
  }
}
</script>

<style scoped>
  table.keys tr td {
    padding: 20px!important;
    font-size: 16px;
  }
  table.keys tr th {
    padding: 10px 20px!important;
  }
</style>
