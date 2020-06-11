<template>
  <div>
    <!-- <div id="top"></div>
    <header class="bg--off-white grd">
        <div class="contain grd-row">
            <h3 class="py1 px2 col-2">21Trader</h3>
        </div>
    </header> -->
    <nav class="nav-21">
      <div class="menu contain">
        <router-link class="py1" to="/workers">
          <i class="las la-cogs"></i> Workers
        </router-link>
        <router-link class="py1" to="/backtest">
          <i class="las la-vial"></i> Backtest
        </router-link>
        <router-link class="py1" to="/data">
          <i class="las la-table"></i> Datasets
        </router-link>
        <router-link class="py1" to="/config">
          <i class="las la-cog"></i> Config
        </router-link>
        <a class="py1" href="https://xxilabs.github.io/21Trader/#/" target="_blank">
          <i class="las la-book"></i> Docs
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style>
.menu {
  display: flex;
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 2rem;
  background-color: rgba(250,250,250,.04);
}

.menu a {
  flex: 1 1 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
  font-size: 14px;
  font-weight: bold;
  opacity: 0.7;
}

.menu a:hover {
  background-color: rgba(250,250,250,.25);
}

.menu a i {
  font-size: 18px;
  position: relative;
  top: 1px;
  left: -3px;
}

.menu .router-link-active {
  opacity: 1;
  background-color: rgba(250,250,250,.3);
}

.menu a:hover {
  /* text-decoration: underline; */
}

.nav-21 {
  position: fixed;
  z-index: 10000;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 57px;
  /* width: 100%; */
  background: linear-gradient(45deg, rgba(186, 84, 245, 0.3) 0%, rgba(186, 84, 245, 0.1) 100%), #1e1e2f;
  /* border: 1px solid rgba(186, 84, 245, 1); */
  border-radius: 4px;
  box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.6);
}
</style>
