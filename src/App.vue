<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getClientHeight } from '@/assets/js/dom.js';
export default {
  name: 'App',
  mounted() {
    var oApp = document.getElementById('app');
    oApp.style.height = getClientHeight() + 'px';
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

/* Don't kill focus outline for keyboard users: http://24ways.org/2009/dont-lose-your-focus */
a {
  text-decoration: none;
}
a:hover, a:active {
    outline: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
img{
  box-sizing: border-box;
}
.v-modal {
  z-index: 98!important;
}
.mint-cell-wrapper {
  font-size: 14px!important;
}
.c_red {
  color: #d94a4a;
}
.c_green {
  color: #24e792;
}
.mint-cell-text {
  vertical-align: middle;
  min-width: 100px;
  display: inline-block;
}
</style>
