<template>
  <div id="chartWrapper" class="contain" v-bind:class="{ clickable: !isClicked }">
    <div class="shield" v-on:click.prevent="click"></div>
    <svg id="chart section-area" width="960" :height="height"></svg>
  </div>
</template>

<script>

import chart from '../../../d3/chart4'
import { draw as drawMessage, clear as clearMessage } from '../../../d3/message'

const MIN_CANDLES = 4;

export default {
  props: ['data', 'height'],

  data: function() {
    return {
      isClicked: false
    }
  },

  watch: {
    data: function() { this.render() },
  },

  created: function() { setTimeout( this.render, 100) },
  beforeDestroy: function() {
    this.remove();
  },

  methods: {
    click: function() {
      this.isClicked = true;
    },
    render: function() {
      this.remove();

      if(_.size(this.data.candles) < MIN_CANDLES) {
        drawMessage('Not enough data to spawn chart');
      } else {
        chart(this.data.candles, this.data.trades, this.height);
      }
    },
    remove: function() {
      d3.select('#chart').html('');
    }
  }
}
</script>

<style>

#chartWrapper.clickable {
  position: relative;
}

#chartWrapper.clickable .shield {
  cursor: zoom-in;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: grey; */
  opacity: 0.1;
}

#chart {
  width: 100%;
}

#chart circle {
  clip-path: url(#clip);
}

#chart .zoom {
  cursor: move;
  fill: none;
  pointer-events: all;
}

#chart .line {
  fill: rgba(255, 255, 255, 0.1);
  stroke: white;
  stroke-width: 1.5px;
  clip-path: url(#clip);
}

#chart .price.line {
  /* stroke-width: 2.5px; */
}

#chart circle.buy {
  fill: #7FFF00;
}

#chart circle.sell {
  fill: red;
}

#chart .axis {
  stroke: white;
  /* fill: white; */
}
#chart .axisLine {
  stroke: white;
}
#chart .tick {
  font-weight: 100;
  letter-spacing: 1px;
  font-family: "Poppins", sans-serif;
  color: white;
  fill: white;
  stroke: white;
}

#chart .message {
  fill: rgba(255, 255, 255, 0.5);
  text-anchor: middle;
}
</style>
