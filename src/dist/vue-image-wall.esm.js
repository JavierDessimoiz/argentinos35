import e from"lodash";var n={name:"ImageFrame",props:["propLinkImages","propId","propConfigGeneral","propConfigMode","propRuntimeVariable","propGetContainerOffset","propImageFrameWidthPercentage"],mounted(){this.$el.addEventListener("mouseenter",this.onMouseEnter)},beforeDestroy(){this.$el.removeEventListener("mouseenter",this.onMouseEnter)},computed:{getComputedWidthPixel:function(){return this.propImageFrameWidthPercentage*this.propRuntimeVariable.width},styleDiv:function(){return{transform:`skew(-${this.propConfigGeneral.degreeSkew}deg)`,width:100*this.propImageFrameWidthPercentage+"%","border-right":`${this.propConfigGeneral.border.thickness}px ${this.propConfigGeneral.border.color} solid`,height:this.propConfigGeneral.height+"px",transition:this.propConfigMode.duration+"ms ease"}},styleImg:function(){return{width:this.getComputedWidthPixel+2*this.propGetContainerOffset+5+"px",left:-this.propGetContainerOffset+"px",transform:`skew(${this.propConfigGeneral.degreeSkew}deg)`,transition:this.propConfigMode.duration+"ms ease"}}},methods:{onMouseEnter:function(){this.$emit("setHoverImage",this.propId)}}};function t(e,n,t,i,r,o,a,s,p,d){"boolean"!=typeof a&&(p=s,s=a,a=!1);const l="function"==typeof t?t.options:t;let m;if(e&&e.render&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,r&&(l.functional=!0)),i&&(l._scopeId=i),o?(m=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,p(e)),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=m):n&&(m=a?function(e){n.call(this,d(e,this.$root.$options.shadowRoot))}:function(e){n.call(this,s(e))}),m)if(l.functional){const e=l.render;l.render=function(n,t){return m.call(t),e(n,t)}}else{const e=l.beforeCreate;l.beforeCreate=e?[].concat(e,m):[m]}return t}const i="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function r(e){return(e,n)=>function(e,n){const t=i?n.media||"default":e,r=a[t]||(a[t]={ids:new Set,styles:[]});if(!r.ids.has(e)){r.ids.add(e);let t=n.source;if(n.map&&(t+="\n/*# sourceURL="+n.map.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n.map))))+" */"),r.element||(r.element=document.createElement("style"),r.element.type="text/css",n.media&&r.element.setAttribute("media",n.media),void 0===o&&(o=document.head||document.getElementsByTagName("head")[0]),o.appendChild(r.element)),"styleSheet"in r.element)r.styles.push(t),r.element.styleSheet.cssText=r.styles.filter(Boolean).join("\n");else{const e=r.ids.size-1,n=document.createTextNode(t),i=r.element.childNodes;i[e]&&r.element.removeChild(i[e]),i.length?r.element.insertBefore(n,i[e]):r.element.appendChild(n)}}}(e,n)}let o;const a={};const s=n;var p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{style:e.styleDiv,attrs:{id:"image-frame"}},[t("img",{ref:"elementImage",style:e.styleImg,attrs:{alt:"Some Image",src:e.propLinkImages[e.propId]}})])};p._withStripped=!0;const d={name:"ImageWall",components:{ImageFrame:t({render:p,staticRenderFns:[]},(function(e){e&&e("data-v-367149a4_0",{source:"#image-frame[data-v-367149a4] {\n  box-sizing: content-box;\n  overflow: hidden;\n  display: inline-block;\n}\n#image-frame img[data-v-367149a4] {\n  display: block;\n  position: relative;\n  object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n\n/*# sourceMappingURL=ImageFrame.vue.map */",map:{version:3,sources:["/home/travis/build/asvrada/vue-image-wall/src/components/ImageFrame.vue","ImageFrame.vue"],names:[],mappings:"AA+DA;EACA,uBAAA;EACA,gBAAA;EAEA,qBAAA;AC/DA;ADiEA;EACA,cAAA;EACA,kBAAA;EACA,iBAAA;EACA,YAAA;EACA,WAAA;AC/DA;;AAEA,yCAAyC",file:"ImageFrame.vue",sourcesContent:["<template>\n  <div id=\"image-frame\" v-bind:style=\"styleDiv\">\n    <img alt=\"Some Image\" ref=\"elementImage\" v-bind:src=\"propLinkImages[propId]\" v-bind:style=\"styleImg\">\n  </div>\n</template>\n\n<script>\n  export default {\n    name: 'ImageFrame',\n    props: [\n      'propLinkImages',\n      'propId',\n      'propConfigGeneral',\n      'propConfigMode',\n\n      'propRuntimeVariable',\n\n      'propGetContainerOffset',\n      'propImageFrameWidthPercentage',\n    ],\n    mounted() {\n      // Added listener for mouse hovering\n      this.$el.addEventListener('mouseenter', this.onMouseEnter);\n    },\n    beforeDestroy() {\n      this.$el.removeEventListener('mouseenter', this.onMouseEnter);\n    },\n    computed: {\n      /**\n       * Return a float in range: 0 - 1\n       */\n      getComputedWidthPixel: function () {\n        return this.propImageFrameWidthPercentage * this.propRuntimeVariable.width;\n      },\n      styleDiv: function () {\n        return {\n          transform: `skew(-${this.propConfigGeneral.degreeSkew}deg)`,\n          'width': `${this.propImageFrameWidthPercentage * 100}%`,\n          'border-right': `${this.propConfigGeneral.border.thickness}px ${this.propConfigGeneral.border.color} solid`,\n          'height': `${this.propConfigGeneral.height}px`,\n          'transition': `${this.propConfigMode.duration}ms ease`,\n        };\n      },\n      styleImg: function () {\n        return {\n          width: `${this.getComputedWidthPixel + 2 * this.propGetContainerOffset + 5}px`,\n          // left will be based on skew and height\n          left: `${-this.propGetContainerOffset}px`,\n          transform: `skew(${this.propConfigGeneral.degreeSkew}deg)`,\n          transition: `${this.propConfigMode.duration}ms ease`,\n        };\n      },\n    },\n    methods: {\n      onMouseEnter: function () {\n        // change current hovering image to this id\n        this.$emit('setHoverImage', this.propId);\n      },\n    },\n  };\n<\/script>\n\n<style scoped lang=\"scss\">\n  #image-frame {\n    box-sizing: content-box;\n    overflow: hidden;\n\n    display: inline-block;\n\n    img {\n      display: block;\n      position: relative;\n      object-fit: cover;\n      height: 100%;\n      width: 100%;\n    }\n  }\n</style>","#image-frame {\n  box-sizing: content-box;\n  overflow: hidden;\n  display: inline-block;\n}\n#image-frame img {\n  display: block;\n  position: relative;\n  object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n\n/*# sourceMappingURL=ImageFrame.vue.map */"]},media:void 0})}),s,"data-v-367149a4",false,undefined,!1,r,void 0,void 0)},props:["propListImages","propConfigMode","propConfigGeneral","propRuntimeVariable","propGetContainerOffset","propImageFrameWidthsPercentage"],methods:{handleSetHoverImage:function(e){this.$emit("setHoverImage",e)}},computed:{styleWall:function(){return{border:`${this.propConfigGeneral.border.thickness}px ${this.propConfigGeneral.border.color} solid`,height:this.propConfigGeneral.height+"px","border-radius":this.propConfigGeneral.radius+"px"}},styleContainer:function(){return{left:`-${this.propGetContainerOffset}px`}}}};var l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{style:e.styleWall,attrs:{id:"image-wall"}},[t("div",{style:e.styleContainer,attrs:{id:"container_images"}},e._l(e.propListImages.length,(function(n){return t("image-frame",{key:n,attrs:{"prop-link-images":e.propListImages,"prop-id":n-1,"prop-config-mode":e.propConfigMode,"prop-config-general":e.propConfigGeneral,"prop-runtime-variable":e.propRuntimeVariable,"prop-get-container-offset":e.propGetContainerOffset,"prop-image-frame-width-percentage":e.propImageFrameWidthsPercentage[n-1]},on:{setHoverImage:e.handleSetHoverImage}})})),1)])};l._withStripped=!0;const m={name:"ImageWallWrapper",components:{ImageWall:t({render:l,staticRenderFns:[]},(function(e){e&&e("data-v-4cb5c92a_0",{source:"#image-wall[data-v-4cb5c92a] {\n  overflow: hidden;\n  box-sizing: border-box;\n}\n#image-wall #container_images[data-v-4cb5c92a] {\n  white-space: nowrap;\n  position: relative;\n}\n\n/*# sourceMappingURL=ImageWall.vue.map */",map:{version:3,sources:["/home/travis/build/asvrada/vue-image-wall/src/components/ImageWall.vue","ImageWall.vue"],names:[],mappings:"AA+DA;EACA,gBAAA;EACA,sBAAA;AC9DA;ADgEA;EACA,mBAAA;EACA,kBAAA;AC9DA;;AAEA,wCAAwC",file:"ImageWall.vue",sourcesContent:['<template>\n  <div id="image-wall" v-bind:style="styleWall">\n    <div id="container_images" v-bind:style="styleContainer">\n      <image-frame\n        v-for="id in propListImages.length"\n        v-bind:key="id"\n\n        v-bind:prop-link-images="propListImages"\n\n        v-bind:prop-id="id - 1"\n        v-bind:prop-config-mode="propConfigMode"\n        v-bind:prop-config-general="propConfigGeneral"\n\n        v-bind:prop-runtime-variable="propRuntimeVariable"\n\n        v-bind:prop-get-container-offset="propGetContainerOffset"\n        v-bind:prop-image-frame-width-percentage="propImageFrameWidthsPercentage[id - 1]"\n\n        @setHoverImage="handleSetHoverImage"\n      ></image-frame>\n    </div>\n  </div>\n</template>\n\n<script>\n  import ImageFrame from \'./ImageFrame.vue\';\n\n  export default {\n    name: \'ImageWall\',\n    components: { ImageFrame },\n    props: [\n      \'propListImages\',\n      \'propConfigMode\',\n      \'propConfigGeneral\',\n\n      \'propRuntimeVariable\',\n\n      // getter from previous vuex store\n      \'propGetContainerOffset\',\n      \'propImageFrameWidthsPercentage\',\n    ],\n    methods: {\n      handleSetHoverImage: function (id) {\n        this.$emit(\'setHoverImage\', id);\n      },\n    },\n    computed: {\n      styleWall: function () {\n        return {\n          border: `${this.propConfigGeneral.border.thickness}px ${this.propConfigGeneral.border.color} solid`,\n          height: `${this.propConfigGeneral.height}px`, \'border-radius\': `${this.propConfigGeneral.radius}px`,\n        };\n      },\n      styleContainer: function () {\n        return {\n          left: `-${this.propGetContainerOffset}px`,\n        };\n      },\n    },\n  };\n<\/script>\n\n<style scoped lang="scss">\n  #image-wall {\n    overflow: hidden;\n    box-sizing: border-box;\n\n    #container_images {\n      white-space: nowrap;\n      position: relative;\n    }\n  }\n</style>',"#image-wall {\n  overflow: hidden;\n  box-sizing: border-box;\n}\n#image-wall #container_images {\n  white-space: nowrap;\n  position: relative;\n}\n\n/*# sourceMappingURL=ImageWall.vue.map */"]},media:void 0})}),d,"data-v-4cb5c92a",false,undefined,!1,r,void 0,void 0)},props:["linkImages"],mounted(){const n=this;window.addEventListener("resize",e.debounce((()=>{n.onWindowResize()}),500)),n.onWindowResize()},data:function(){return{runtimeVariables:{hovering:null,mouseX:1,width:0},config:{general:{radius:30,height:200,degreeSkew:15,border:{thickness:2,color:"orange"}},mode:"b",b:{scale:3,duration:250}}}},methods:{onWindowResize:function(){const e=this.$el.getBoundingClientRect().width;e!==this.width&&(this.runtimeVariables.width=e)},getWidthPercentageByID:function(e){let n=null;const t=this,i=this.config.mode;switch(i){case"b":n=t.getWidthPercentageByIDModeB;break;default:throw"Error: Invalid mode: "+i}return n(e)},getWidthPercentageByIDModeB:function(e){const n=this.linkImages.length;if(0===this.runtimeVariables.width)return 1/n;const t=1/n,i=(1+this.config.general.height*this.getTan/this.runtimeVariables.width)/n,r=this.runtimeVariables.hovering;if(null===r)return i;const o=this.config.b.scale;return r===e?i*o:i*((1-o*t)/((n-1)*t))},handleSetHoverImage:function(e){this.runtimeVariables.hovering=e}},computed:{getTan:function(){return Math.tan(this.config.general.degreeSkew*Math.PI/180)},getContainerOffset:function(){return this.config.general.height/2*this.getTan},getImageFrameWidthsPercentage:function(){let e=[];for(let n=0;n<this.linkImages.length;n++)e.push(this.getWidthPercentageByID(n));return e}}};var g=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"image-wall-wrapper"}},[t("image-wall",{attrs:{"prop-list-images":e.linkImages,"prop-config-mode":e.config[e.config.mode],"prop-config-general":e.config.general,"prop-runtime-variable":e.runtimeVariables,"prop-get-container-offset":e.getContainerOffset,"prop-image-frame-widths-percentage":e.getImageFrameWidthsPercentage},on:{setHoverImage:e.handleSetHoverImage}})],1)};g._withStripped=!0;const c=t({render:g,staticRenderFns:[]},(function(e){e&&e("data-v-f1d8566a_0",{source:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",map:{version:3,sources:[],names:[],mappings:"",file:"ImageWallWrapper.vue"},media:void 0})}),m,"data-v-f1d8566a",false,undefined,!1,r,void 0,void 0);c.install=function(e){e.component("vue-image-wall",c)},"undefined"!=typeof window&&window.Vue&&window.Vue.component("vue-image-wall",c);export default c;