<template>
  <div class="contain py2">
    <h3 class="page-header">Datasets</h3>
    <div class="">
      <h4 class="section-header">Local data</h4>
      <small>
        21Trader needs local market data in order to backtest strategies. The local data can also be used in a warmup period when running a strategy against a live market.
      </small>
    </div>
    <!-- <hr/> -->
    <h4 class="section-header">Available datasets</h4>
    <div class="txt--center my2 dataset-picker-area section-area" v-if="datasetScanstate === 'idle'">
      <a class="w100--s btn--primary scan-btn" href="#" v-on:click.prevent="scan">Scan available data</a>
    </div>
    <div class="txt--center my2" v-if="datasetScanstate === 'scanning'">
      <spinner></spinner>
    </div>
    <div class="my2" v-if="datasetScanstate === 'scanned'">
      <div class="bg--orange p1 warning my1" v-if="unscannableMakets.length">
        <p class="clickable" v-if="!viewUnscannable" v-on:click.prevent="toggleUnscannable">Some markets were unscannable, click here for details.</p>
        <template v-if="viewUnscannable">
          <p>Unable to find datasets in the following markets:</p>
          <div class="mx2" v-for="market in unscannableMakets">- {{ market.exchange }}:{{ market.currency }}:{{ market.asset }}</div>
        </template>
      </div>
      <template v-if="datasets.length">
        <table class="full data">
          <thead>
            <tr>
              <th>exchange</th>
              <th>currency</th>
              <th>asset</th>
              <th>from</th>
              <th>to</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="set in datasets">
              <td>{{ set.exchange }}</td>
              <td>{{ set.currency }}</td>
              <td>{{ set.asset }}</td>
              <td>{{ fmt(set.from) }}</td>
              <td>{{ fmt(set.to) }}</td>
              <td>{{ humanizeDuration(set.to.diff(set.from)) }}</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-if="!datasets.length">
        <p>It looks like you don't have any local data yet.</p>
      </template>
    </div>
    <div class="my2">
      <h4 class="section-header">Import more data</h4>
      <p class="text">You can easily import more market data directly from exchanges using the importer.</p>
      <router-link class="btn--primary" to="/data/importer">Go to the importer!</router-link>
    </div>
  </div>
</template>

<script>

import spinner from '../global/blockSpinner.vue'
import marked from '../../tools/marked'
import dataset from '../global/mixins/dataset'
// global moment
// global humanizeDuration

let intro = marked(`

## Local data

21Trader needs local market data in order to backtest strategies. The local
data can also be used in a warmup period when running a strategy against a
live market.

`);

export default {
  mixins: [ dataset ],
  components: {
    spinner
  },
  data: () => {
    return {
      intro,
      viewUnscannable: false
    }
  },
  methods: {
    toggleUnscannable: function() { this.viewUnscannable = true },
    humanizeDuration: (n) => window.humanizeDuration(n),
    fmt: mom => mom.format('YYYY-MM-DD HH:mm'),
  }
}
</script>

<style>

.clickable {
  cursor: pointer;
}

table.full {
  width: 100%;
}

table thead {
  border-width: 0;
}

table tbody tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

table tr:hover {
  background-color: rgba(255, 255, 255, 0.15)!important;
}

table td {
  padding: 10px 5px!important;
  font-size: 13px;
}

table.full td {
  /* padding: 0.5rem 0; */
}

table.full.data th {
  text-align: left;
  /* padding: 0.5rem 0; */
}

.warning p {
  margin: 0;
  padding: 0;
}
</style>
