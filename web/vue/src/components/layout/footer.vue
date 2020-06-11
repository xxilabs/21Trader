<template lang='pug'>
  footer.p3
    .contain
      p &copy; 21Trader | XXI Capital, LLC
</template>

<script>
const gekkoPackage = require('../../../../../package.json');
const uiPackage = require('../../../package.json');

export default {
  data: () => {
    return {
      version: {
        gekko: gekkoPackage.version,
        ui: uiPackage.version
      }
    }
  }
}
</script>

<style>
  footer p {
    font-size: 12px;
    text-align: right;
    letter-spacing: 1px;
    font-weight: bold;
    opacity: 0.8;
  }
</style>
