(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var g;function h(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var k="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function aa(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var l=aa(this);function m(a,b){if(b)a:{var c=l;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&k(c,a,{configurable:!0,writable:!0,value:b})}}
m("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}
function c(f,y){this.g=f;k(this,"description",{configurable:!0,writable:!0,value:y})}
if(a)return a;c.prototype.toString=function(){return this.g};
var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return b});
m("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=l[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&k(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ba(h(this))}})}return a});
function ba(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function n(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:h(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}
var ca="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},p;
if("function"==typeof Object.setPrototypeOf)p=Object.setPrototypeOf;else{var q;a:{var da={a:!0},r={};try{r.__proto__=da;q=r.a;break a}catch(a){}q=!1}p=q?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var t=p;
m("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&c.push(b[d]);return c}});
function ea(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
m("Array.prototype.values",function(a){return a?a:function(){return ea(this,function(b,c){return c})}});
var u=this||self;function v(a){a=a.split(".");for(var b=u,c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function w(a,b){a=a.split(".");var c=u;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
;var x,z=v("CLOSURE_FLAGS"),A=z&&z[610401301];x=null!=A?A:!1;var B,C=u.navigator;B=C?C.userAgentData||null:null;function D(a){return x?B?B.brands.some(function(b){return(b=b.brand)&&-1!=b.indexOf(a)}):!1:!1}
function E(a){var b;a:{if(b=u.navigator)if(b=b.userAgent)break a;b=""}return-1!=b.indexOf(a)}
;function F(){return x?!!B&&0<B.brands.length:!1}
function G(){return F()?D("Chromium"):(E("Chrome")||E("CriOS"))&&!(F()?0:E("Edge"))||E("Silk")}
;!E("Android")||G();G();E("Safari")&&(G()||(F()?0:E("Coast"))||(F()?0:E("Opera"))||(F()?0:E("Edge"))||(F()?D("Microsoft Edge"):E("Edg/"))||F()&&D("Opera"));var H=Math.max,fa=H.apply,I=Object.values({aa:1,Y:2,X:4,da:8,ca:16,ba:32,U:64,ea:128,W:256,V:512,Z:1024}),J;if(I instanceof Array)J=I;else{for(var ha=n(I),K,L=[];!(K=ha.next()).done;)L.push(K.value);J=L}fa.call(H,Math,J);function M(){this.s=this.s;this.B=this.B}
M.prototype.s=!1;M.prototype.dispose=function(){this.s||(this.s=!0,this.G())};
M.prototype.G=function(){if(this.B)for(;this.B.length;)this.B.shift()()};var N=u.window,ia,ja,O=(null==N?void 0:null==(ia=N.yt)?void 0:ia.config_)||(null==N?void 0:null==(ja=N.ytcfg)?void 0:ja.data_)||{};w("yt.config_",O);function P(a,b){return a in O?O[a]:b}
;function ka(a,b){a=la(a);return void 0===a&&void 0!==b?b:Number(a||0)}
function la(a){var b=P("EXPERIMENTS_FORCED_FLAGS",{})||{};return void 0!==b[a]?b[a]:P("EXPERIMENT_FLAGS",{})[a]}
;var ma=ka("web_emulated_idle_callback_delay",300),na=1E3/60-3,oa=[8,5,4,3,2,1,0];
function Q(a){a=void 0===a?{}:a;M.call(this);this.i=[];this.h={};this.D=this.g=0;this.C=this.l=!1;this.u=[];this.A=this.F=!1;for(var b=n(oa),c=b.next();!c.done;c=b.next())this.i[c.value]=[];this.j=0;this.N=a.timeout||1;this.o=na;this.m=0;this.H=this.R.bind(this);this.M=this.T.bind(this);this.J=this.O.bind(this);this.K=this.P.bind(this);this.L=this.S.bind(this);if(b=!!window.requestIdleCallback&&!!window.cancelIdleCallback)b=la("disable_scheduler_requestIdleCallback"),b=!("string"===typeof b&&"false"===
b?0:b);this.I=b;(this.v=!1!==a.useRaf&&!!window.requestAnimationFrame)&&document.addEventListener("visibilitychange",this.H)}
Q.prototype=ca(M.prototype);Q.prototype.constructor=Q;if(t)t(Q,M);else for(var R in M)if("prototype"!=R)if(Object.defineProperties){var ra=Object.getOwnPropertyDescriptor(M,R);ra&&Object.defineProperty(Q,R,ra)}else Q[R]=M[R];function sa(a,b){var c=Date.now();S(b);b=Date.now()-c;a.l||(a.o-=b)}
function ta(a,b,c,d){++a.D;if(10===c)return sa(a,b),a.D;var e=a.D;a.h[e]=b;a.l&&!d?a.u.push({id:e,priority:c}):(a.i[c].push(e),a.C||a.l||(0!==a.g&&T(a)!==a.m&&U(a),a.start()));return e}
function ua(a){a.u.length=0;for(var b=5;0<=b;b--)a.i[b].length=0;a.i[8].length=0;a.h={};U(a)}
function T(a){if(a.i[8].length){if(a.A)return 4;if(!document.hidden&&a.v)return 3}for(var b=5;b>=a.j;b--)if(0<a.i[b].length)return 0<b?!document.hidden&&a.v?3:2:1;return 0}
function va(a){var b=v("yt.logging.errors.log");b&&b(a)}
function S(a){try{a()}catch(b){va(b)}}
function wa(a){for(var b=n(oa),c=b.next();!c.done;c=b.next())if(a.i[c.value].length)return!0;return!1}
g=Q.prototype;g.P=function(a){var b=void 0;a&&(b=a.timeRemaining());this.F=!0;V(this,b);this.F=!1};
g.T=function(){V(this)};
g.O=function(){xa(this)};
g.S=function(a){this.A=!0;var b=T(this);4===b&&b!==this.m&&(U(this),this.start());V(this,void 0,a);this.A=!1};
g.R=function(){document.hidden||xa(this);this.g&&(U(this),this.start())};
function xa(a){U(a);a.l=!0;for(var b=Date.now(),c=a.i[8];c.length;){var d=c.shift(),e=a.h[d];delete a.h[d];e&&S(e)}ya(a);a.l=!1;wa(a)&&a.start();a.o-=Date.now()-b}
function ya(a){for(var b=0,c=a.u.length;b<c;b++){var d=a.u[b];a.i[d.priority].push(d.id)}a.u.length=0}
function V(a,b,c){a.A&&4===a.m&&a.g||U(a);a.l=!0;b=Date.now()+(b||a.o);for(var d=a.i[5];d.length;){var e=d.shift(),f=a.h[e];delete a.h[e];if(f)try{f(c)}catch(Ea){va(Ea)}}for(d=a.i[4];d.length;)c=d.shift(),e=a.h[c],delete a.h[c],e&&S(e);d=a.F?0:1;d=a.j>d?a.j:d;if(!(Date.now()>=b)){do{a:{c=a;e=d;for(f=3;f>=e;f--)for(var y=c.i[f];y.length;){var pa=y.shift(),qa=c.h[pa];delete c.h[pa];if(qa){c=qa;break a}}c=null}c&&S(c)}while(c&&Date.now()<b)}a.l=!1;ya(a);a.o=na;wa(a)&&a.start()}
g.start=function(){this.C=!1;if(0===this.g)switch(this.m=T(this),this.m){case 1:var a=this.K;this.g=this.I?window.requestIdleCallback(a,{timeout:3E3}):window.setTimeout(a,ma);break;case 2:this.g=window.setTimeout(this.M,this.N);break;case 3:this.g=window.requestAnimationFrame(this.L);break;case 4:this.g=window.setTimeout(this.J,0)}};
function U(a){if(a.g){switch(a.m){case 1:var b=a.g;a.I?window.cancelIdleCallback(b):window.clearTimeout(b);break;case 2:case 4:window.clearTimeout(a.g);break;case 3:window.cancelAnimationFrame(a.g)}a.g=0}}
g.G=function(){ua(this);U(this);this.v&&document.removeEventListener("visibilitychange",this.H);M.prototype.G.call(this)};var W=v("yt.scheduler.instance.timerIdMap_")||{},za=ka("kevlar_tuner_scheduler_soft_state_timer_ms",800),X=0,Y=0;function Z(){var a=v("ytglobal.schedulerInstanceInstance_");if(!a||a.s)a=new Q(P("scheduler")||{}),w("ytglobal.schedulerInstanceInstance_",a);return a}
function Aa(){Ba();var a=v("ytglobal.schedulerInstanceInstance_");a&&(a&&"function"==typeof a.dispose&&a.dispose(),w("ytglobal.schedulerInstanceInstance_",null))}
function Ba(){ua(Z());for(var a in W)W.hasOwnProperty(a)&&delete W[Number(a)]}
function Ca(a,b,c){if(!c)return c=void 0===c,-ta(Z(),a,b,c);var d=window.setTimeout(function(){var e=ta(Z(),a,b);W[d]=e},c);
return d}
function Da(a){var b=Z();sa(b,a)}
function Fa(a){var b=Z();if(0>a)delete b.h[-a];else{var c=W[a];c?(delete b.h[c],delete W[a]):window.clearTimeout(a)}}
function Ga(){Ha()}
function Ha(){window.clearTimeout(X);Z().start()}
function Ia(){var a=Z();U(a);a.C=!0;window.clearTimeout(X);X=window.setTimeout(Ga,za)}
function Ja(){window.clearTimeout(Y);Y=window.setTimeout(function(){Ka(0)},za)}
function Ka(a){Ja();var b=Z();b.j=a;b.start()}
function La(a){Ja();var b=Z();b.j>a&&(b.j=a,b.start())}
function Ma(){window.clearTimeout(Y);var a=Z();a.j=0;a.start()}
;v("yt.scheduler.initialized")||(w("yt.scheduler.instance.dispose",Aa),w("yt.scheduler.instance.addJob",Ca),w("yt.scheduler.instance.addImmediateJob",Da),w("yt.scheduler.instance.cancelJob",Fa),w("yt.scheduler.instance.cancelAllJobs",Ba),w("yt.scheduler.instance.start",Ha),w("yt.scheduler.instance.pause",Ia),w("yt.scheduler.instance.setPriorityThreshold",Ka),w("yt.scheduler.instance.enablePriorityThreshold",La),w("yt.scheduler.instance.clearPriorityThreshold",Ma),w("yt.scheduler.initialized",!0));}).call(this);
