<template lang='pug'>
.grd
  .grd-row
    .grd-row-col-3-6.pr1
      h4 Market
      market-picker(v-on:market='updateMarketConfig', only-importable='true')
    .grd-row-col-3-6.pl1
      range-creator(v-on:range='updateRange')
</template>

<script>

import marketPicker from '../../global/configbuilder/marketpicker.vue'
import rangeCreator from '../../global/configbuilder/rangecreator.vue'
import _ from 'lodash'

export default {
  data: () => {
    return {
      market: {},
      range: {}
    }
  },
  components: {
    marketPicker,
    rangeCreator
  },
  computed: {
    config: function() {

      let config = {};
      Object.assign(
        config,
        this.market,
        {
          importer: {
            daterange: this.range
          }
        },
        {
          candleWriter: { enabled: true }
        }
      );

      return config;
    }
  },
  methods: {
    updateMarketConfig: function(mc) {
      this.market = mc;
      this.emitConfig();
    },
    updateRange: function(range) {
      this.range = range;
      this.emitConfig();
    },
    emitConfig: function() {
      this.$emit('config', this.config);
    }
  }
}
</script>

<style>
</style>
