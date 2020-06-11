<template>
  <div class="contain py2">
    <div class="page-actions">
      <router-link class="btn--primary" to="/workers/new">Start a Worker</router-link>
    </div>
    <h3 class="page-header">Workers</h3>
    <h4 class="section-header">Market watchers</h4>
    <div class="text" v-if="!watchers.length">
      <p>You don't have any market watchers.</p>
    </div>
    <table class="full market clickable" v-if="watchers.length">
      <thead>
        <tr>
          <th>exchange</th>
          <th>currency</th>
          <th>asset</th>
          <th>status</th>
          <th>started at</th>
          <th>last update</th>
          <th>duration</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable" v-for="gekko in watchers" v-on:click="$router.push({path: `/workers/${gekko.id}`})">
          <td>{{ gekko.config.watch.exchange }}</td>
          <td>{{ gekko.config.watch.currency }}</td>
          <td>{{ gekko.config.watch.asset }}</td>
          <td>{{ status(gekko) }}</td>
          <td><template v-if="gekko.events.initial.candle">{{ fmt(gekko.events.initial.candle.start) }}</template></td>
          <td><template v-if="gekko.events.latest.candle">{{ fmt(gekko.events.latest.candle.start) }}</template></td>
          <td><template v-if="gekko.events.initial.candle && gekko.events.latest.candle">{{ timespan(gekko.events.latest.candle.start, gekko.events.initial.candle.start) }}</template></td>
        </tr>
      </tbody>
    </table>

    <br/>

    <h4 class="section-header">Strat runners</h4>
    <div class="text" v-if="!stratrunners.length">
      <p>You don't have any stratrunners.</p>
    </div>
    <table class="full" v-if="stratrunners.length">
      <thead>
        <tr>
          <th>exchange</th>
          <th>currency</th>
          <th>asset</th>
          <th>status</th>
          <th>duration</th>
          <th>strategy</th>
          <th>PnL</th>
          <th>type</th>
          <th>trades</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable" v-for="gekko in stratrunners" v-on:click="$router.push({path: `/workers/${gekko.id}`})">
          <td>{{ gekko.config.watch.exchange }}</td>
          <td>{{ gekko.config.watch.currency }}</td>
          <td>{{ gekko.config.watch.asset }}</td>
          <td>{{ status(gekko) }}</td>
          <td><template v-if="gekko.events.initial.candle && gekko.events.latest.candle">{{ timespan(gekko.events.latest.candle.start, gekko.events.initial.candle.start) }}</template></td>
          <td>{{ gekko.config.tradingAdvisor.method }}</td>
          <td><template v-if="!report(gekko)">0</template><template v-if="report(gekko)">{{ round(report(gekko).profit) }} {{ report(gekko).currency }}</template></td>
          <td>{{ gekko.logType }}</td>
          <td><template v-if="!gekko.events.tradeCompleted">0</template><template v-if="gekko.events.tradeCompleted">{{ gekko.events.tradeCompleted.length }}</template></td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="hr"></div> -->
  </div>
</template>

<script>
// global moment
// global humanizeDuration

export default {
  created: function() {
    this.timer = setInterval(() => {
      this.now = moment();
    }, 1000)
  },
  destroyed: function() {
    clearTimeout(this.timer);
  },
  data: () => {
    return {
      timer: false,
      now: moment()
    }
  },
  computed: {
    stratrunners: function() {
      return _.values(this.$store.state.gekkos)
      .concat(_.values(this.$store.state.archivedGekkos))
      .filter(g => {
        if(g.logType === 'papertrader')
        return true;

        if(g.logType === 'tradebot')
        return true;

        return false;
      })
    },
    watchers: function() {
      return _.values(this.$store.state.gekkos)
      .concat(_.values(this.$store.state.archivedGekkos))
      .filter(g => g.logType === 'watcher')
    }
  },
  methods: {
    humanizeDuration: (n) => window.humanizeDuration(n),
    moment: mom => moment.utc(mom),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
    timespan: function(a, b) {
      return this.humanizeDuration(this.moment(a).diff(this.moment(b)))
    },
    status: state => {
      if(state.errored)
      return 'errored';
      if(state.stopped)
      return 'stopped';
      if(state.active)
      return 'running';

      console.log('unknown state:', state);
    },
    report: state => {
      return _.get(state, 'events.latest.performanceReport');
    }
  }
}
</script>

<style>
table.clickable {
  border-collapse: separate;
}

tr.clickable td:nth-child(1) {
  /* padding-left: 5px; */
}

tr.clickable {
  cursor: pointer;
}
</style>
