<template>
  <div class="wrapper">
    <text class="greeting">About</text>
    <text class="message">This is the about page.</text>
    <text class="button" @click="back">Back</text>
  </div>
</template>

<script>
const navigator = weex.requireModule('navigator');
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    }
  },
  methods: {
    back () {
      navigator.pop({ animated: 'true' })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 424px;
    height: 200px;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
  .button {
    width: 400px;
    font-size: 60px;
    text-align: center;
    padding: 20px;
    border-width: 2px;
    border-style: solid;
    color: #666666;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
</style>
