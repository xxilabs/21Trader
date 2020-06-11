<template>
  <div class="my2">
    <div class="contain" v-if="!data">
      <h1>Unknown Worker instance</h1>
      <p>Worker doesn't know what worker this is...</p>
    </div>
    <div v-if="data">
      <!-- <h2 class="contain">{{ type }}</h2> -->
      <div class="contain p1 bg--orange" v-if="isArchived">
        This is an archived Worker, it is currently not running anymore.
      </div>
      <div class="contain p1 bg--orange" v-if="data.errorMessage">
        This is Worker crashed with the following error: {{ data.errorMessage }}
      </div>
      <div class="grd contain">
        <h3 class="page-header">Worker <small>{{id}}</small></h3>
        <div class="grd-row">
          <div class="grd-row-col-3-6 worker-grd worker-grd-striped">
            <h4 class="section-header">Market</h4>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Exchange</div>
              <div class="grd-row-col-3-6">{{ config.watch.exchange }}</div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Currency</div>
              <div class="grd-row-col-3-6">{{ config.watch.currency }}</div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Asset</div>
              <div class="grd-row-col-3-6">{{ config.watch.asset }}</div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Type</div>
              <div class="grd-row-col-3-6">{{ type }}</div>
            </div>
          </div>
          <div class="grd-row-col-3-6 worker-grd worker-grd-striped">
            <h4 class="section-header">Runtime</h4>
            <spinner v-if="isLoading"></spinner>
            <template v-if="!isLoading">
              <div class="grd-row" v-if="initialEvents.candle">
                <div class="grd-row-col-2-6">Watching since</div>
                <div class="grd-row-col-4-6">{{ fmt(initialEvents.candle.start) }}</div>
              </div>
              <div class="grd-row" v-if="latestEvents.candle">
                <div class="grd-row-col-2-6">Received data until</div>
                <div class="grd-row-col-4-6">{{ fmt(latestEvents.candle.start) }}</div>
              </div>
              <div class="grd-row" v-if="latestEvents.candle">
                <div class="grd-row-col-2-6">Data spanning</div>
                <div class="grd-row-col-4-6">{{ humanizeDuration(moment(latestEvents.candle.start).diff(moment(initialEvents.candle.start))) }}</div>
              </div>
              <template v-if="isStratrunner">
                <div class="grd-row">
                  <div class="grd-row-col-2-6">Amount of trades</div>
                  <div class="grd-row-col-4-6">{{ trades.length }}</div>
                </div>
                <div class="grd-row">
                  <div class="grd-row-col-2-6">Candle size</div>
                  <div class="grd-row-col-4-6">{{ config.tradingAdvisor.candleSize }}</div>
                </div>
                <div class="grd-row">
                  <div class="grd-row-col-2-6">History size</div>
                  <div class="grd-row-col-4-6">{{ config.tradingAdvisor.historySize }}</div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <br/>
        <div class="contain p1 bg--orange" v-if="warmupRemaining">
          This stratrunner is still warming up for the next <i>{{ warmupRemaining.replace(',', ' and ') }}</i>, it will not trade until it is warmed up.
        </div>
        <div class="grd-row" v-if="isStratrunner">
          <div class="grd-row-col-3-6 worker-grd">
            <h4 class="section-header">Strategy</h4>
            <div class="grd-row">
              <div class="grd-row-col-3-6">Name</div>
              <div class="grd-row-col-3-6"><strong>{{ stratName }}</strong></div>
            </div>
            <div class="grd-row">
              <div class="grd-row-col-3-6">
                Parameters <pre>{{ stratParams }}</pre>
              </div>
            </div>
          </div>
          <div class="grd-row-col-3-6 worker-grd">
            <h4 class="section-header">Profit report</h4>
            <template v-if="!report">
              <p>
                <em v-if="isArchived">This Worker never executed a trade..</em>
                <em v-if="!isArchived">Waiting for at least one trade..</em>
              </p>
            </template>
            <template v-if="report">
              <div class="grd-row">
                <div class="grd-row-col-3-6">Start balance</div>
                <div class="grd-row-col-3-6">{{ round(report.startBalance) }}</div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Current balance</div>
                <div class="grd-row-col-3-6">{{ round(report.balance) }}</div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Market</div>
                <div class="grd-row-col-3-6">
                  {{round(report.market / 100 * report.startPrice)}} {{ config.watch.currency }} ({{ round(report.market) }} %)
                </div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Profit</div>
                <div class="grd-row-col-3-6">
                  {{ round(report.profit) }} {{ config.watch.currency }} ({{ round(report.relativeProfit) }} %)
                </div>
              </div>
              <div class="grd-row">
                <div class="grd-row-col-3-6">Alpha</div>
                <div class="grd-row-col-3-6">{{ round(report.alpha) }} {{ config.watch.currency }}</div>
              </div>
            </template>
          </div>
        </div>
        <p v-if="isStratrunner && !watcher && !isArchived">WARNING: stale worker, not attached to a watcher, please report <a href="https://github.com/askmike/worker/issues">here</a>.</p>
        <p v-if="!isArchived"><a class="w100--s my1 btn--red" v-on:click="stopWorker">Stop Worker</a></p>
        <p v-if="isArchived"><a class="w100--s my1 btn--red" v-on:click="deleteWorker">Delete Worker</a></p>
        <p v-if="isStratrunner && watcher && !isArchived"><em>This worker gets market data from <router-link :to="'/workers/' + watcher.id">this market watcher</router-link></em>.</p>
      </div>
      <template v-if="!isLoading">
        <h4 class="contain section-header">Market graph</h4>
        <spinner v-if="candleFetch === 'fetching'"></spinner>
        <template v-if="candleFetch === 'fetched'">
          <chart :data="chartData" :height="300"></chart>
        </template>
        <roundtrips v-if="isStratrunner" :roundtrips="roundtrips"></roundtrips>
      </template>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import _ from 'lodash'

import { post } from '../../tools/ajax'
import spinner from '../global/blockSpinner.vue'
import chart from '../backtester/result/chartWrapper.vue'
import roundtrips from '../backtester/result/roundtripTable.vue'
import paperTradeSummary from '../global/paperTradeSummary.vue'
// global moment

export default {
  created: function() {
    if(!this.isLoading)
    this.getCandles();
  },
  components: {
    spinner,
    chart,
    paperTradeSummary,
    roundtrips
  },
  data: () => {
    return {
      candleFetch: 'idle',
      candles: false
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    workers: function() {
      return this.$store.state.gekkos;
    },
    archivedWorkers: function() {
      return this.$store.state.archivedWorkers;
    },
    data: function() {
      if(!this.workers)
      return false;
      if(_.has(this.workers, this.id))
      return this.workers[this.id];
      if(_.has(this.archivedWorkers, this.id))
      return this.archivedWorkers[this.id];

      return false;
    },
    config: function() {
      return _.get(this, 'data.config');
    },
    latestEvents: function() {
      return _.get(this, 'data.events.latest');
    },
    initialEvents: function() {
      return _.get(this, 'data.events.initial');
    },
    trades: function() {
      return _.get(this, 'data.events.tradeCompleted') || [];
    },
    roundtrips: function() {
      return _.get(this, 'data.events.roundtrip') || [];
    },
    isLive: function() {
      return _.has(this.workers, this.id);
    },
    type: function() {
      return this.data.logType;
    },
    isStratrunner: function() {
      return this.type !== 'watcher';
    },
    isArchived: function() {
      return this.data.stopped;
    },
    warmupRemaining: function() {
      if(!this.isStratrunner) {
        return false;
      }

      if(this.isArchived) {
        return false;
      }

      if(this.initialEvents.stratWarmupCompleted) {
        return false;
      }

      if(!this.initialEvents.candle) {
        return false;
      }

      const historySize = _.get(this.config, 'tradingAdvisor.historySize');

      if(!historySize) {
        return false;
      }

      const warmupTime = _.get(this.config, 'tradingAdvisor.candleSize') * historySize;

      return humanizeDuration(
        moment(this.initialEvents.candle.start).add(warmupTime, 'm').diff(moment()),
        { largest: 2 }
      );
    },
    chartData: function() {
      return {
        candles: this.candles,
        trades: this.trades
      }
    },
    report: function() {
      return _.get(this.latestEvents, 'performanceReport');
    },
    stratName: function() {
      if(this.data)
      return this.data.config.tradingAdvisor.method;
    },
    stratParams: function() {
      if(!this.data)
      return 'Loading...';

      let stratParams = Vue.util.extend({}, this.data.config[this.stratName]);
      delete stratParams.__empty;

      if(_.isEmpty(stratParams))
      return 'No parameters'

      return JSON.stringify(stratParams, null, 4);
    },
    isLoading: function() {
      if(!this.data)
      return true;
      if(!_.get(this.data, 'events.initial.candle'))
      return true;
      if(!_.get(this.data, 'events.latest.candle'))
      return true;

      return false;
    },
    watcher: function() {
      if(!this.isStratrunner) {
        return false;
      }

      let watch = Vue.util.extend({}, this.data.config.watch);
      return _.find(this.workers, g => {
        if(g.id === this.id)
        return false;

        return _.isEqual(watch, g.config.watch);
      });
    },
    hasLeechers: function() {
      if(this.isStratrunner) {
        return false;
      }

      let watch = Vue.util.extend({}, this.data.config.watch);

      return _.find(this.workers, g => {
        if(g.id === this.id)
        return false;

        return _.isEqual(watch, g.config.watch);
      });
    }
  },
  watch: {
    'data.events.latest.candle.start': function() {
      setTimeout(this.getCandles, _.random(100, 2000));
    }
  },
  methods: {
    round: n => (+n).toFixed(5),
    humanizeDuration: (n, x) => window.humanizeDuration(n, x),
    moment: mom => moment.utc(mom),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    getCandles: function() {
      if(this.isLoading) {
        return;
      }

      if(this.candleFetch === 'fetching') {
        return;
      }

      this.candleFetch = 'fetching';

      let to = this.data.events.latest.candle.start;
      let from = this.data.events.initial.candle.start;
      let candleSize = 1;

      if(this.type !== 'watcher') {
        candleSize = this.data.config.tradingAdvisor.candleSize;
      }

      let config = {
        watch: this.data.config.watch,
        daterange: {
          to, from
        },
        candleSize
      };

      // We timeout because of 2 reasons:
      // - In case we get a batch of candles we only fetch once
      // - This way we give the db (mostly sqlite) some time to write
      //   the result before we query it.
      setTimeout(() => {
        post('getCandles', config, (err, res) => {
          this.candleFetch = 'fetched';
          if(!res || res.error || !_.isArray(res))
          return console.log(res);

          this.candles = res.map(c => {
            c.start = moment.unix(c.start).utc().format();
            return c;
          });
        })
      }, _.random(150, 2500));
    },
    stopWorker: function() {
      if(this.hasLeechers) {
        return alert('This Worker is fetching market data for multiple stratrunners, stop these first.');
      }

      if(!confirm('Are you sure you want to stop this Worker?')) {
        return;
      }

      post('stopWorker', { id: this.data.id }, (err, res) => {
        console.log('stopped worker');
      });
    },
    deleteWorker: function() {
      if(!this.isArchived) {
        return alert('This Worker is still running, stop it first!');
      }

      if(!confirm('Are you sure you want to delete this Worker?')) {
        return;
      }

      post('deleteWorker', { id: this.data.id }, (err, res) => {
        this.$router.push({
          path: `/workers/`
        });
      });
    }
  }
}
</script>

<style>
.grd {
  padding: 0!important;
}
.worker-grd {
  margin: 0 1px;
}
.worker-grd-striped .grd-row {
  padding: 4px 10px!important;
}
.worker-grd .grd-row:hover {
  background-color: rgba(255, 255, 255, 0.15)!important;
}
.worker-grd .grd-row {
  padding: 4px;
  font-size: 13px;
}
.worker-grd-striped .grd-row:nth-child(2) {
  border-top: 1px solid white;
}
.worker-grd-striped .grd-row:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
