// http://stackoverflow.com/questions/7190898/progress-bar-with-html-and-css

<template lang='pug'>
.progressbarWrapper(v-if='progress')
  p <strong>{{ round(progress) }}%</strong>
  .progressbar
    div(:style='{width: progress + "%"}')
</template>

<script>
export default {
  props: ['progress'],
  methods: {
    round: n => (+n).toFixed(2)
  }
}
</script>

<style>
.progressbarWrapper p {
  text-align: center;
  font-size: 20px;
}

.progressbar {
  background-color: rgba(216,216,216,.99);
  border-radius: 13px; /* (height of inner div) / 2 + padding */
  padding: 0px;
}


@keyframes shimmer{
    0%{
        background-position: 0px 0
    }
    100%{
        background-position: 960px 0
    }
}

.progressbar > div {
  height: 20px;
  border-radius: 10px;
  /* Progress bar animation */
  background-color: rgba(186, 84, 245, 1);
  animation-duration: 1500ms;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, rgba(186, 84, 245, 1) 10%, rgba(225, 78, 203, 0.3) 25%, rgba(186, 84, 245, 1) 40%);
  background-size: 960px 50px;
  background-position: left;
  position: relative;
}
</style>
