(()=>{function e(e,t,i,n){Object.defineProperty(e,t,{get:i,set:n,enumerable:!0,configurable:!0})}class t{constructor(e,t){this.document=e,this.options=t,this.isStaticHead=!1,this.head=null}async init(){if(!this.head){if(this.options.prefersDynamicAssessment()){this.head=this.document.head;return}try{let e=await this.getStaticHTML();e=e.replace(/(\<\/?)(head)/ig,"$1static-head");let t=this.document.implementation.createHTMLDocument("New Document");t.documentElement.innerHTML=e,this.head=t.querySelector("static-head"),this.head?this.isStaticHead=!0:this.head=this.document.head}catch(e){console.error(`${this.options.loggingPrefix}An exception occurred while getting the static <head>:`,e),this.head=this.document.head}this.isStaticHead||console.warn(`${this.options.loggingPrefix}Unable to parse the static (server-rendered) <head>. Falling back to document.head`,this.head)}}async getStaticHTML(){let e=this.document.location.href,t=await fetch(e);return await t.text()}getHead(){return this.head}stringifyElement(e){return e.getAttributeNames().reduce((t,i)=>t+=`[${CSS.escape(i)}=${JSON.stringify(e.getAttribute(i))}]`,e.nodeName)}getLoggableElement(e){if(!this.isStaticHead)return e;let t=this.stringifyElement(e),i=Array.from(this.document.head.querySelectorAll(t));if(0==i.length)return e;if(1==i.length)return i[0];let n=this.document.createElement("div"),s=this.document.createElement("div");s.innerHTML=e.innerHTML;let r=i.find(e=>(n.innerHTML=e.innerHTML,n.innerHTML==s.innerHTML));return r||e}createElementFromSelector(e){let t=e.match(/^[A-Za-z]+/)[0];if(!t)return;let i=document.createElement(t),n=e.match(/\[([A-Za-z-]+)="([^"]+)"\]/g)||[];return n.forEach(e=>{let[t,n]=e.replace("[","").replace("]","").split("=");i.setAttribute(t,n.slice(1,-1))}),i}logElementFromSelector({weight:e,selector:t,innerHTML:i,isValid:n,customValidations:s={}}){e=+e;let r=this.getElementVisualization(e),a=this.createElementFromSelector(t);a.innerHTML=i,a=this.getLoggableElement(a),this.logElement({viz:r,weight:e,element:a,isValid:n,customValidations:s})}logElement({viz:e,weight:t,element:i,isValid:n,customValidations:s,omitPrefix:r=!1}){r||(e.visual=`${this.options.loggingPrefix}${e.visual}`);let a="log",o=[e.visual,e.style,t+1,i];if(!this.options.isValidationEnabled()){console[a](...o);return}let{payload:l,warnings:c}=s;l&&o.push(l),c?.length?(a="warn",c.forEach(e=>o.push(`❌ ${e}`))):!n&&(this.options.prefersDynamicAssessment()||this.isStaticHead)&&(a="warn",o.push(`❌ invalid element (${i.tagName})`)),console[a](...o)}logValidationWarnings(e){this.options.isValidationEnabled()&&e.forEach(({warning:e,elements:t=[],element:i})=>{t=t.map(this.getLoggableElement.bind(this)),console.warn(`${this.options.loggingPrefix}${e}`,...t,i)})}getColor(e){return this.options.palette[10-e]}getHeadVisualization(e){let t=e.map(e=>"%c ").join(""),i=e.map(e=>{let t=this.getColor(e);return`background-color: ${t}; padding: 5px; margin: 0 -1px;`});return{visual:t,styles:i}}getElementVisualization(e){let t=`%c${Array(e+1).fill("█").join("")}`,i=this.getColor(e),n=`color: ${i}`;return{visual:t,style:n}}visualizeHead(e,t,i){let n=this.getHeadVisualization(i.map(({weight:e})=>e));console.groupCollapsed(`${this.options.loggingPrefix}${e} %chead%c order
${n.visual}`,"font-family: monospace","font-family: inherit",...n.styles),i.forEach(({weight:e,element:t,isValid:i,customValidations:n})=>{let s=this.getElementVisualization(e);this.logElement({viz:s,weight:e,element:t,isValid:i,customValidations:n,omitPrefix:!0})}),console.log(`${e} %chead%c element`,"font-family: monospace","font-family: inherit",t),console.groupEnd()}}function i(e){return[`oklch(5% .1 ${e})`,`oklch(13% .2 ${e})`,`oklch(25% .2 ${e})`,`oklch(35% .25 ${e})`,`oklch(50% .27 ${e})`,`oklch(67% .31 ${e})`,`oklch(72% .25 ${e})`,`oklch(80% .2 ${e})`,`oklch(90% .1 ${e})`,`oklch(99% .0.5 ${e})`,"#ccc"]}let n=["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2","#cccccc"],s=i(320),r=i(200),a={DEFAULT:n,PINK:s,BLUE:r};class o{constructor({preferredAssessmentMode:e=o.AssessmentMode.STATIC,validation:t=!0,palette:i=n,loggingPrefix:s="Capo: "}={}){this.setPreferredAssessmentMode(e),this.setValidation(t),this.setPalette(i),this.setLoggingPrefix(s)}static get AssessmentMode(){return{STATIC:"static",DYNAMIC:"dynamic"}}static get Palettes(){return a}prefersStaticAssessment(){return this.preferredAssessmentMode===o.AssessmentMode.STATIC}prefersDynamicAssessment(){return this.preferredAssessmentMode===o.AssessmentMode.DYNAMIC}isValidationEnabled(){return this.validation}setPreferredAssessmentMode(e){if(!this.isValidAssessmentMode(e))throw Error(`Invalid option: preferred assessment mode, expected AssessmentMode.STATIC or AssessmentMode.DYNAMIC, got "${e}".`);this.preferredAssessmentMode=e}setPreferredAssessmentModeToStatic(e){let t=o.AssessmentMode.STATIC;e||(t=o.AssessmentMode.DYNAMIC),this.setPreferredAssessmentMode(t)}setValidation(e){if(!this.isValidValidation(e))throw Error(`Invalid option: validation, expected boolean, got "${e}".`);this.validation=e}setPalette(e){if(!this.isValidPalette(e))throw Error(`Invalid option: palette, expected [${Object.keys(a).join("|")}] or an array of colors, got "${e}".`);if("string"==typeof e){this.palette=a[e];return}this.palette=e}setLoggingPrefix(e){if(!this.isValidLoggingPrefix(e))throw Error(`Invalid option: logging prefix, expected string, got "${e}".`);this.loggingPrefix=e}isValidAssessmentMode(e){return Object.values(o.AssessmentMode).includes(e)}isValidValidation(e){return"boolean"==typeof e}isValidPalette(e){return"string"==typeof e?Object.keys(a).includes(e):!!Array.isArray(e)&&11===e.length&&e.every(e=>"string"==typeof e)}isValidLoggingPrefix(e){return"string"==typeof e}isPreferredPalette(e){return JSON.stringify(this.palette)==JSON.stringify(e)}valueOf(){return{preferredAssessmentMode:this.preferredAssessmentMode,validation:this.validation,palette:this.palette,loggingPrefix:this.loggingPrefix}}}var l={};e(l,"isOriginTrial",()=>h),e(l,"isMetaCSP",()=>m),e(l,"getHeadWeights",()=>u);let c={META:10,TITLE:9,PRECONNECT:8,ASYNC_SCRIPT:7,IMPORT_STYLES:6,SYNC_SCRIPT:5,SYNC_STYLES:4,PRELOAD:3,DEFER_SCRIPT:2,PREFETCH_PRERENDER:1,OTHER:0},d={META:function(e){return e.matches("meta:is([charset], [http-equiv], [name=viewport]), base")},TITLE:function(e){return e.matches("title")},PRECONNECT:function(e){return e.matches("link[rel=preconnect]")},ASYNC_SCRIPT:function(e){return e.matches("script[src][async]")},IMPORT_STYLES:function(e){return!!e.matches("style")&&/@import/.test(e.textContent)},SYNC_SCRIPT:function(e){return e.matches("script:not([src][defer],[src][type=module],[src][async],[type*=json])")},SYNC_STYLES:function(e){return e.matches("link[rel=stylesheet],style")},PRELOAD:function(e){return e.matches("link:is([rel=preload], [rel=modulepreload])")},DEFER_SCRIPT:function(e){return e.matches("script[src][defer], script:not([src][async])[src][type=module]")},PREFETCH_PRERENDER:function(e){return e.matches("link:is([rel=prefetch], [rel=dns-prefetch], [rel=prerender])")}};function h(e){return e.matches('meta[http-equiv="origin-trial"i]')}function m(e){return e.matches('meta[http-equiv="Content-Security-Policy" i]')}function u(e){let t=Array.from(e.children);return t.map(e=>({element:e,weight:function(e){for([id,detector]of Object.entries(d))if(detector(e))return c[id];return c.OTHER}(e)}))}var g={};e(g,"isValidElement",()=>p),e(g,"hasValidationWarning",()=>y),e(g,"getValidationWarnings",()=>E),e(g,"getCustomValidations",()=>A);let f=new Set(["base","link","meta","noscript","script","style","template","title"]);function p(e){return f.has(e.tagName.toLowerCase())}function y(e){return!!(!p(e)||e.matches(`:has(:not(${Array.from(f).join(", ")}))`)||e.matches("title:is(:nth-of-type(n+2))")||e.matches("base:is(:nth-of-type(n+2))")||m(e))}function E(e){let t=[],i=Array.from(e.querySelectorAll("title")),n=i.length;1!=n&&t.push({warning:`Expected exactly 1 <title> element, found ${n}`,elements:i});let s=Array.from(e.querySelectorAll("base")),r=s.length;r>1&&t.push({warning:`Expected at most 1 <base> element, found ${r}`,elements:s});let a=e.querySelector('meta[http-equiv="Content-Security-Policy" i]');return a&&t.push({warning:"CSP meta tags disable the preload scanner due to a bug in Chrome. Use the CSP header instead. Learn more: https://crbug.com/1458493",element:a}),e.querySelectorAll("*").forEach(i=>{if(p(i))return;let n=i;for(;n.parentElement!=e;)n=n.parentElement;t.push({warning:`${i.tagName} elements are not allowed in the <head>`,element:n})}),t}function A(e){return h(e)?function(e){let t={payload:null,warnings:[]},i=e.getAttribute("content");try{var n,s;t.payload=function(e){let t=new Uint8Array([...atob(e)].map(e=>e.charCodeAt(0))),i=new DataView(t.buffer),n=i.getUint32(65,!1),s=JSON.parse(new TextDecoder().decode(t.slice(69,69+n)));return s.expiry=new Date(1e3*s.expiry),s}(i),t.payload.expiry<new Date&&t.warnings.push("expired"),t.payload.isThirdParty||(n=t.payload.origin,s=document.location.href,new URL(n).origin===new URL(s).origin)||t.warnings.push("invalid origin")}catch{t.warnings.push("invalid token")}return t}(e):m(e)?{warnings:["meta CSP discouraged. See https://crbug.com/1458493."]}:{}}async function S(e){await e.init(),function(e,t){let i=t.getValidationWarnings(e.getHead());e.logValidationWarnings(i)}(e,g);let t=function(e,t,i){let n=e.getHead(),s=i.getHeadWeights(n).map(({element:i,weight:n})=>({weight:n,element:e.getLoggableElement(i),isValid:!t.hasValidationWarning(i),customValidations:t.getCustomValidations(i)}));e.visualizeHead("Actual",n,s);let r=Array.from(s).sort((e,t)=>t.weight-e.weight),a=document.createElement("head");return r.forEach(({element:e})=>{a.appendChild(e.cloneNode(!0))}),e.visualizeHead("Sorted",a,r),s}(e,g,l);return{actual:t.map(({element:t,weight:i,isValid:n,customValidations:s})=>({weight:i,color:e.getColor(i),selector:e.stringifyElement(t),innerHTML:t.innerHTML,isValid:n,customValidations:s}))}}async function w(){let{options:e}=await chrome.storage.sync.get("options");return new o(e)}!async function(){let e=await w(),i=new t(document,e),{click:n}=await chrome.storage.local.get("click");if(n)i.logElementFromSelector(JSON.parse(n)),await chrome.storage.local.remove("click");else{let e=await S(i);await chrome.storage.local.set({data:e})}}()})();