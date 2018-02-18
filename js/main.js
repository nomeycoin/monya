require("../scss/index.scss")
require('../res/onsenui/css/onsenui.min.css')
require('../res/onsenui/css/onsen-css-components.min.css')
require('../res/onsenui/js/onsenui.min.js')

require('../res/cordova-plugin-qrscanner-lib.min.js')

const Vue = require("vue/dist/vue.runtime.min")
const VueOnsen = require('../res/onsenui/vue-onsenui.min.js')
const Vuex = require("vuex")


Vue.use(VueOnsen)
Vue.use(Vuex)

Vue.component('custom-bar', require("../component/customBar.js"))
Vue.component('currency-set', require("../component/currencySet.js"))
Vue.component('timestamp', require("../component/timestamp.js"))

Vue.directive('focus', {
  inserted: function (el,binding) {
    el.focus()
  }
})
exports.vm= new Vue({
  el:"#app",
  render(h){
    return h("navigator")
  },
  data(){
    return {}
  },
  components:{
    navigator:require("../component/navigator.js")
  },
  store:require("../js/store.js"),
  beforeMount() {
    if(this.$ons.platform.isAndroid()&&window.StatusBar){
       window.StatusBar.styleLightContent()
     }
    this.$ons.enableAutoStatusBarFill()
    const html = document.documentElement;
    if (this.$ons.platform.isIPhoneX()) {
      if(window.cordova){
        html.setAttribute('onsflag-iphonex-portrait', '');
      }
      html.setAttribute('onsflag-iphonex-landscape', '');
    }
    
  }
})
const coinUtil=require("../js/coinUtil")
window.handleOpenURL=function(url) {
  coinUtil.queueUrl(url)
}

if ('serviceWorker' in navigator&&!window.cordova) {
  navigator.serviceWorker.register('./sw.js');
}
