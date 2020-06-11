<script>

import top from './components/layout/header.vue'
import bottom from './components/layout/footer.vue'
import modal from './components/layout/modal.vue'

export default {
  name: 'app',
  components: {
    top,
    bottom,
    modal
  }
}
</script>

<template lang='pug'>
  #app
    top
    .fill
      router-view.view
    bottom
    modal
</template>

<style>

body {
  background-color: #1e1e2f;
  color: #fff;
  font-family: "Poppins", sans-serif;
  padding-top: 70px;
}

.page-header {
  font-weight: 200;
  margin-top: 10px;
  padding-bottom: 10px;
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.4); */
}
.page-header small {
  font-size: 16px;
  font-weight: 400;
}

.section-header {
  font-weight: 600;
  opacity: 0.9;
  /* letter-spacing: 1px; */
}

.bg--orange {
  /* background-color: rgba(245, 163, 91, 0.8); */
  background: linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.btn--red {
  background-color: rgba(201, 17, 0, 0.7);
  border: 1px solid rgba(201, 17, 0, 1);
  cursor: pointer;
}
.btn--red:hover {
  background-color: rgba(201, 17, 0, 1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.fill {
  flex: 1;
}

.text {
  max-width: 500px;
}

input {
  background: none;
  margin-top: 0.5em;
}

.params {
  min-height: 235px;
  line-height: 1.3em;
}

.hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 10px;
  background-color: rgba(250,250,250,.99);
}

.contain {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.btn--primary {
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
  height: 36px;
  padding: 0 14px;
  border-radius: 4px;

  background-color: rgba(186, 84, 245, 0.6);
  border: 1px solid rgba(186, 84, 245, 0.9);

  text-shadow: 0 1px 3px rgba(36,180,126,.4);
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  color: #fff;
  text-decoration: none;
  line-height: 36px;
  transition: transform 250ms;
}

.btn--primary:hover {
  /* transform: translateY(-1px); */
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  background-color: rgba(186, 84, 245, 0.8);
  color: #fff;
  text-decoration: none;
}

.btn--primary:active,
.btn--primary:focus {
  background-color: rgba(186, 84, 245, 0.8);
  color: #fff;
  text-decoration: none;
}

.btn--primary:active {
  transform: translateY(1px);
}

.page-actions {
  float: right;
  margin-top: 17px;
}

.section-area {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}

.pl1 {
  padding-left: 1rem;
}
.pr1 {
  padding-right: 1rem;
}

input {
  border-radius: 3px;
}
select {
  padding: 10px!important;
}
input, input:focus, input:hover, select, select:hover, select:focus {
  outline: none!important;
  box-shadow: none!important;
}

textarea {
  color: black!important;
}
textarea:focus {
  outline: 0;
  box-shadow: none;
  border: none;
}
</style>
