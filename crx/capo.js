(()=>{function e(e,t,i,n){Object.defineProperty(e,t,{get:i,set:n,enumerable:!0,configurable:!0})}function t(e){return[`oklch(5% .1 ${e})`,`oklch(13% .2 ${e})`,`oklch(25% .2 ${e})`,`oklch(35% .25 ${e})`,`oklch(50% .27 ${e})`,`oklch(67% .31 ${e})`,`oklch(72% .25 ${e})`,`oklch(80% .2 ${e})`,`oklch(90% .1 ${e})`,`oklch(99% .05 ${e})`,"#ccc"]}let i=["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2","#cccccc"],n=t(320),s=t(200),a={DEFAULT:i,PINK:n,BLUE:s};var r={};e(r,"IO",()=>o);class o{constructor(e,t,i=window.console){this.document=e,this.options=t,this.console=i,this.isStaticHead=!1,this.head=null}async init(){if(!this.head){if(this.options.prefersDynamicAssessment()){this.head=this.document.querySelector("head");return}try{let e=await this.getStaticHTML();e=e.replace(/(\<\/?)(head)/gi,"$1static-head");let t=this.document.implementation.createHTMLDocument("New Document");t.documentElement.innerHTML=e,this.head=t.querySelector("static-head"),this.head?this.isStaticHead=!0:this.head=this.document.head}catch(e){this.console.error(`${this.options.loggingPrefix}An exception occurred while getting the static <head>:`,e),this.head=this.document.head}this.isStaticHead||this.console.warn(`${this.options.loggingPrefix}Unable to parse the static (server-rendered) <head>. Falling back to document.head`,this.head)}}async getStaticHTML(){let e=this.document.location.href,t=await fetch(e);return await t.text()}getHead(){return this.head}stringifyElement(e){return e.getAttributeNames().reduce((t,i)=>t+=`[${CSS.escape(i)}=${JSON.stringify(e.getAttribute(i))}]`,e.nodeName)}getLoggableElement(e){if(!this.isStaticHead)return e;let t=this.stringifyElement(e),i=Array.from(this.document.head.querySelectorAll(t));if(0==i.length)return e;if(1==i.length)return i[0];let n=this.document.createElement("div"),s=this.document.createElement("div");s.innerHTML=e.innerHTML;let a=i.find(e=>(n.innerHTML=e.innerHTML,n.innerHTML==s.innerHTML));return a||e}createElementFromSelector(e){let t=e.match(/^[A-Za-z]+/)[0];if(!t)return;let i=document.createElement(t),n=e.match(/\[([A-Za-z-]+)="([^"]+)"\]/g)||[];return n.forEach(e=>{e=e.slice(1,-1);let t=e.indexOf("="),n=e.slice(0,t),s=e.slice(t+1).slice(1,-1);i.setAttribute(n,s)}),i}logElementFromSelector({weight:e,selector:t,innerHTML:i,isValid:n,customValidations:s={}}){e=+e;let a=this.getElementVisualization(e),r=this.createElementFromSelector(t);r.innerHTML=i,r=this.getLoggableElement(r),this.logElement({viz:a,weight:e,element:r,isValid:n,customValidations:s})}logElement({viz:e,weight:t,element:i,isValid:n,customValidations:s,omitPrefix:a=!1}){a||(e.visual=`${this.options.loggingPrefix}${e.visual}`);let r="log",o=[e.visual,e.style,t+1,i];if(!this.options.isValidationEnabled()){this.console[r](...o);return}let{payload:l,warnings:c}=s;l&&("string"==typeof l.expiry&&(l.expiry=new Date(l.expiry)),o.push(l)),c?.length?(r="warn",o.push("\n"+c.map(e=>`  ❌ ${e}`).join("\n"))):!n&&(this.options.prefersDynamicAssessment()||this.isStaticHead)&&(r="warn",o.push(`
  ❌ invalid element (${i.tagName})`)),this.console[r](...o)}logValidationWarnings(e){this.options.isValidationEnabled()&&e.forEach(({warning:e,elements:t=[],element:i})=>{t=t.map(this.getLoggableElement.bind(this)),this.console.warn(`${this.options.loggingPrefix}${e}`,...t,i||"")})}getColor(e){return this.options.palette[10-e]}getHeadVisualization(e){let t="",i=[];return e.forEach(({weight:e,isValid:n})=>{t+="%c ";let s=this.getColor(e),a="padding: 5px; margin: 0 -1px; ";if(n)a+=`background-color: ${s};`;else{let e;a+=`background-image: ${s==(e="#cccccc")&&(e="red"),`repeating-linear-gradient(45deg, ${s}, ${s} 3px, ${e} 3px, ${e} 6px)`}`}i.push(a)}),{visual:t,styles:i}}getElementVisualization(e){let t=`%c${Array(e+1).fill("█").join("")}`,i=this.getColor(e),n=`color: ${i}`;return{visual:t,style:n}}visualizeHead(e,t,i){let n=this.getHeadVisualization(i);this.console.groupCollapsed(`${this.options.loggingPrefix}${e} %chead%c order
${n.visual}`,"font-family: monospace","font-family: inherit",...n.styles),i.forEach(({weight:e,element:t,isValid:i,customValidations:n})=>{let s=this.getElementVisualization(e);this.logElement({viz:s,weight:e,element:t,isValid:i,customValidations:n,omitPrefix:!0})}),this.console.log(`${e} %chead%c element`,"font-family: monospace","font-family: inherit",t),this.console.groupEnd()}}var l={};e(l,"Options",()=>c);class c{constructor({preferredAssessmentMode:e=c.AssessmentMode.STATIC,validation:t=!0,palette:n=i,loggingPrefix:s="Capo: "}={}){this.setPreferredAssessmentMode(e),this.setValidation(t),this.setPalette(n),this.setLoggingPrefix(s)}static get AssessmentMode(){return{STATIC:"static",DYNAMIC:"dynamic"}}static get Palettes(){return a}prefersStaticAssessment(){return this.preferredAssessmentMode===c.AssessmentMode.STATIC}prefersDynamicAssessment(){return this.preferredAssessmentMode===c.AssessmentMode.DYNAMIC}isValidationEnabled(){return this.validation}setPreferredAssessmentMode(e){if(!this.isValidAssessmentMode(e))throw Error(`Invalid option: preferred assessment mode, expected AssessmentMode.STATIC or AssessmentMode.DYNAMIC, got "${e}".`);this.preferredAssessmentMode=e}setPreferredAssessmentModeToStatic(e){let t=c.AssessmentMode.STATIC;e||(t=c.AssessmentMode.DYNAMIC),this.setPreferredAssessmentMode(t)}setValidation(e){if(!this.isValidValidation(e))throw Error(`Invalid option: validation, expected boolean, got "${e}".`);this.validation=e}setPalette(e){if(!this.isValidPalette(e))throw Error(`Invalid option: palette, expected [${Object.keys(a).join("|")}] or an array of colors, got "${e}".`);if("string"==typeof e){this.palette=a[e];return}this.palette=e}setLoggingPrefix(e){if(!this.isValidLoggingPrefix(e))throw Error(`Invalid option: logging prefix, expected string, got "${e}".`);this.loggingPrefix=e}isValidAssessmentMode(e){return Object.values(c.AssessmentMode).includes(e)}isValidValidation(e){return"boolean"==typeof e}isValidPalette(e){return"string"==typeof e?Object.keys(a).includes(e):!!Array.isArray(e)&&11===e.length&&e.every(e=>"string"==typeof e)}isValidLoggingPrefix(e){return"string"==typeof e}isPreferredPalette(e){return JSON.stringify(this.palette)==JSON.stringify(e)}valueOf(){return{preferredAssessmentMode:this.preferredAssessmentMode,validation:this.validation,palette:this.palette,loggingPrefix:this.loggingPrefix}}}var u={};e(u,"ElementWeights",()=>h),e(u,"ElementDetectors",()=>d),e(u,"isMeta",()=>p),e(u,"isTitle",()=>g),e(u,"isPreconnect",()=>f),e(u,"isAsyncScript",()=>y),e(u,"isImportStyles",()=>b),e(u,"isSyncScript",()=>w),e(u,"isSyncStyles",()=>v),e(u,"isPreload",()=>T),e(u,"isDeferScript",()=>E),e(u,"isPrefetchPrerender",()=>S),e(u,"META_HTTP_EQUIV_KEYWORDS",()=>m),e(u,"isOriginTrial",()=>A),e(u,"isMetaCSP",()=>P),e(u,"getWeight",()=>$),e(u,"getHeadWeights",()=>x);let h={META:10,TITLE:9,PRECONNECT:8,ASYNC_SCRIPT:7,IMPORT_STYLES:6,SYNC_SCRIPT:5,SYNC_STYLES:4,PRELOAD:3,DEFER_SCRIPT:2,PREFETCH_PRERENDER:1,OTHER:0},d={META:p,TITLE:g,PRECONNECT:f,ASYNC_SCRIPT:y,IMPORT_STYLES:b,SYNC_SCRIPT:w,SYNC_STYLES:v,PRELOAD:T,DEFER_SCRIPT:E,PREFETCH_PRERENDER:S},m=["accept-ch","content-security-policy","content-type","default-style","delegate-ch","origin-trial","x-dns-prefetch-control"];function p(e){let t=m.map(e=>`[http-equiv="${e}" i]`).join(", ");return e.matches(`meta:is([charset], ${t}, [name=viewport]), base`)}function g(e){return e.matches("title")}function f(e){return e.matches("link[rel=preconnect]")}function y(e){return e.matches("script[src][async]")}function b(e){return!!e.matches("style")&&/@import/.test(e.textContent)}function w(e){return e.matches("script:not([src][defer],[src][type=module],[src][async],[type*=json])")}function v(e){return e.matches("link[rel=stylesheet],style")}function T(e){return e.matches("link:is([rel=preload], [rel=modulepreload])")}function E(e){return e.matches("script[src][defer], script:not([src][async])[src][type=module]")}function S(e){return e.matches("link:is([rel=prefetch], [rel=dns-prefetch], [rel=prerender])")}function A(e){return e.matches('meta[http-equiv="origin-trial"i]')}function P(e){return e.matches('meta[http-equiv="Content-Security-Policy" i], meta[http-equiv="Content-Security-Policy-Report-Only" i]')}function $(e){for(let[t,i]of Object.entries(d))if(i(e))return h[t];return h.OTHER}function x(e){let t=Array.from(e.children);return t.map(e=>({element:e,weight:$(e)}))}var C={};e(C,"VALID_HEAD_ELEMENTS",()=>V),e(C,"CONTENT_TYPE_SELECTOR",()=>L),e(C,"HTTP_EQUIV_SELECTOR",()=>M),e(C,"PRELOAD_SELECTOR",()=>N),e(C,"isValidElement",()=>H),e(C,"hasValidationWarning",()=>k),e(C,"getValidationWarnings",()=>I),e(C,"getCustomValidations",()=>O);let V=new Set(["base","link","meta","noscript","script","style","template","title"]),L='meta[http-equiv="content-type" i], meta[charset]',M="meta[http-equiv]",N='link:is([rel="preload" i], [rel="modulepreload" i])';function H(e){return V.has(e.tagName.toLowerCase())}function k(e){return!!(!H(e)||e.matches(`:has(:not(${Array.from(V).join(", ")}))`)||e.matches("title:is(:nth-of-type(n+2))")||e.matches("base:has(~ base), base ~ base")||P(e)||function(e){if(!U(e))return!1;let{warnings:t}=J(e);return t.length>0}(e)||function(e){if(!z(e))return!1;let{warnings:t}=K(e);return t.length>0}(e)||function(e){if(!R(e))return!1;let{warnings:t}=Y(e);return t.length>0}(e)||function(e){if(!q(e))return!1;let{warnings:t}=W(e);return t.length>0}(e)||function(e){if(!A(e))return!1;let{warnings:t}=D(e);return t.length>0}(e)||_(e))}function I(e){let t=[],i=Array.from(e.querySelectorAll("title")),n=i.length;1!=n&&t.push({warning:`Expected exactly 1 <title> element, found ${n}`,elements:i});let s=e.querySelectorAll('meta[name="viewport" i]');1!=s.length&&t.push({warning:`Expected exactly 1 <meta name=viewport> element, found ${s.length}`});let a=Array.from(e.querySelectorAll("base")),r=a.length;r>1&&t.push({warning:`Expected at most 1 <base> element, found ${r}`,elements:a});let o=e.querySelector('meta[http-equiv="Content-Security-Policy" i]');o&&t.push({warning:"CSP meta tags disable the preload scanner due to a bug in Chrome. Use the CSP header instead. Learn more: https://crbug.com/1458493",element:o}),e.querySelectorAll("*").forEach(i=>{if(H(i))return;let n=i;for(;n.parentElement!=e;)n=n.parentElement;t.push({warning:`${i.tagName} elements are not allowed in the <head>`,element:n})});let l=Array.from(e.querySelectorAll('meta[http-equiv="Origin-Trial" i]'));return l.forEach(e=>{let i=D(e);0!=i.warnings.length&&t.push({warning:`Invalid origin trial token: ${i.warnings.join(", ")}`,elements:[e],element:i.payload})}),t}function O(e){return A(e)?D(e):P(e)?function(e){let t=[],i=null;if(e.matches('meta[http-equiv="Content-Security-Policy-Report-Only" i]'))return t.push("CSP Report-Only is forbidden in meta tags"),t;e.matches('meta[http-equiv="Content-Security-Policy" i]')&&t.push("meta CSP discouraged. See https://crbug.com/1458493.");let n=e.getAttribute("content");if(!n)return t.push("Invalid CSP. The content attribute must be set."),{warnings:t,payload:i};let s=Object.fromEntries(n.split(/\s*;\s*/).map(e=>{let[t,...i]=e.split(" ");return[t,i.join(" ")]}));return(i=i??{}).directives=s,"report-uri"in s&&t.push("The report-uri directive is not supported. Use the Content-Security-Policy-Report-Only HTTP header instead."),"frame-ancestors"in s&&t.push("The frame-ancestors directive is not supported. Use the Content-Security-Policy HTTP header instead."),"sandbox"in s&&t.push("The sandbox directive is not supported. Use the Content-Security-Policy HTTP header instead."),{warnings:t,payload:i}}(e):R(e)?Y(e):z(e)?K(e):q(e)?W(e):U(e)?J(e):_(e)?function(e){let t=e.getAttribute("href"),i=F(t),n=j(e.parentElement,i);if(!n)throw Error("Expected an invalid preload, but none found.");return{warnings:[`This preload has little to no effect. ${t} is already discoverable by another ${n.tagName} element.`]}}(e):{}}function D(e){var t,i,n,s;let a={payload:null,warnings:[]},r=e.getAttribute("content");try{a.payload=function(e){let t=new Uint8Array([...atob(e)].map(e=>e.charCodeAt(0))),i=new DataView(t.buffer),n=i.getUint32(65,!1),s=JSON.parse(new TextDecoder().decode(t.slice(69,69+n)));return s.expiry=new Date(1e3*s.expiry),s}(r)}catch{return a.warnings.push("invalid token"),a}if(a.payload.expiry<new Date&&a.warnings.push("expired"),t=a.payload.origin,i=document.location.href,new URL(t).origin!==new URL(i).origin){let e=(n=a.payload.origin,s=document.location.href,n=new URL(n),(s=new URL(s)).host.endsWith(`.${n.host}`));e&&!a.payload.isSubdomain?a.warnings.push("invalid subdomain"):e||a.payload.isThirdParty||a.warnings.push("invalid third-party origin")}return a}function R(e){return e.matches('meta[http-equiv="default-style" i]')}function q(e){return e.matches(L)}function U(e){return e.matches(M)}function z(e){return e.matches('meta[name="viewport" i]')}function _(e){if(!e.matches(N))return!1;let t=e.getAttribute("href");if(!t)return!1;let i=F(t);return null!=j(e.parentElement,i)}function j(e,t){let i=Array.from(e.querySelectorAll(`link:not(${N}), script`));return i.find(e=>{let i=e.getAttribute("href")||e.getAttribute("src");return!!i&&t==F(i)})}function F(e){return new URL(e,document.baseURI).href}function Y(e){let t=[],i=null,n=e.getAttribute("content"),s=e.parentElement.querySelector(`link[rel~="alternate" i][rel~="stylesheet" i][title="${n}"]`);return n?s||(i={alternateStylesheets:Array.from(e.parentElement.querySelectorAll('link[rel~="alternate" i][rel~="stylesheet" i]'))},t.push(`This has no effect. No alternate stylesheet found having title="${n}".`)):t.push("This has no effect. The content attribute must be set to a valid stylesheet title."),t.push("Even when used correctly, the default-style method of setting a preferred stylesheet results in a flash of unstyled content. Use modern CSS features like @media rules instead."),{warnings:t,payload:i}}function W(e){let t=[],i=null;if(e.matches(':is(meta[charset] ~ meta[http-equiv="content-type" i])')||e.matches(":has(~ meta[charset])")){let n=e.parentElement.querySelector("meta[charset]");(i=i??{}).encodingDeclaration=n,t.push(`There can only be one meta-based character encoding declaration per document. Already found \`${n.outerHTML}\`.`)}let n=e.ownerDocument.documentElement.outerHTML.indexOf(e.outerHTML)+e.outerHTML.length;n>1024&&((i=i??{}).characterPosition=n,t.push(`The element containing the character encoding declaration must be serialized completely within the first 1024 bytes of the document. Found at byte ${n}.`));let s=null;return s=e.matches("meta[charset]")?e.getAttribute("charset"):e.getAttribute("content")?.match(/text\/html;\s*charset=(.*)/i)?.[1]?.trim(),s?.toLowerCase()!="utf-8"&&((i=i??{}).charset=s,t.push(`Documents are required to use UTF-8 encoding. Found "${s}".`)),t.length&&(t[t.length-1]+="\nLearn more: https://html.spec.whatwg.org/multipage/semantics.html#character-encoding-declaration"),{warnings:t,payload:i}}function J(e){let t=[],i=e.getAttribute("http-equiv").toLowerCase(),n=e.getAttribute("content")?.toLowerCase();switch(i){case"content-security-policy":case"content-security-policy-report-only":case"origin-trial":case"content-type":case"default-style":break;case"refresh":if(!n){t.push("This doesn't do anything. The content attribute must be set. However, using refresh is discouraged.");break}n.includes("url=")?t.push("Meta auto-redirects are discouraged. Use HTTP 3XX responses instead."):t.push("Meta auto-refreshes are discouraged unless users have the ability to disable it.");break;case"x-dns-prefetch-control":"on"==n?t.push(`DNS prefetching is enabled by default. Setting it to "${n}" has no effect.`):"off"!=n?t.push(`This is a non-standard way of disabling DNS prefetching, which is a performance optimization. Found content="${n}". Use content="off" if you have a legitimate security concern, otherwise remove it.`):t.push("This is non-standard, however most browsers support disabling speculative DNS prefetching. It should still be noted that DNS prefetching is a generally accepted performance optimization and you should only disable it if you have specific security concerns.");break;case"cache-control":case"etag":case"pragma":case"expires":case"last-modified":t.push("This doesn't do anything. Use HTTP headers for any cache directives.");break;case"x-frame-options":t.push("This doesn't do anything. Use the CSP HTTP header with the frame-ancestors directive instead.");break;case"x-ua-compatible":case"content-style-type":case"content-script-type":case"imagetoolbar":case"cleartype":case"page-enter":case"page-exit":case"site-enter":case"site-exit":case"msthemecompatible":case"window-target":t.push("This doesn't do anything. It was an Internet Explorer feature and is now deprecated.");break;case"content-language":case"language":t.push("This is non-conforming. Use the html[lang] attribute instead.");break;case"set-cookie":t.push("This is non-conforming. Use the Set-Cookie HTTP header instead.");break;case"application-name":case"author":case"description":case"generator":case"keywords":case"referrer":case"theme-color":case"color-scheme":case"viewport":case"creator":case"googlebot":case"publisher":case"robots":t.push(`This doesn't do anything. Did you mean \`meta[name=${i}]\`?`);break;case"encoding":t.push("This doesn't do anything. Did you mean `meta[charset]`?");break;case"title":t.push("This doesn't do anything. Did you mean to use the `title` tag instead?");break;case"accept-ch":case"delegate-ch":t.push("This is non-standard and may not work across browsers. Use HTTP headers instead.");break;default:t.push("This is non-standard and may not work across browsers. http-equiv is not an alternative to HTTP headers.")}return{warnings:t}}function K(e){let t=[],i=null;if(e.matches('meta[name="viewport" i] ~ meta[name="viewport" i]')){let n=e.parentElement.querySelector('meta[name="viewport" i]');return i={firstMetaViewport:n},t.push("Another meta viewport element has already been declared. Having multiple viewport settings can lead to unexpected behavior."),{warnings:t,payload:i}}let n=e.getAttribute("content")?.toLowerCase();if(!n)return t.push("Invalid viewport. The content attribute must be set."),{warnings:t,payload:i};let s=Object.fromEntries(n.split(",").map(e=>{let[t,i]=e.split("=");return[t?.trim(),i?.trim()]}));if("width"in s){let e=s.width;1>Number(e)||Number(e)>1e4?t.push(`Invalid width "${e}". Numeric values must be between 1 and 10000.`):"device-width"!=e&&t.push(`Invalid width "${e}".`)}if("height"in s){let e=s.height;1>Number(e)||Number(e)>1e4?t.push(`Invalid height "${e}". Numeric values must be between 1 and 10000.`):"device-height"!=e&&t.push(`Invalid height "${e}".`)}if("initial-scale"in s){let e=Number(s["initial-scale"]);isNaN(e)&&t.push(`Invalid initial zoom level "${s["initial-scale"]}". Values must be numeric.`),(e<.1||e>10)&&t.push(`Invalid initial zoom level "${e}". Values must be between 0.1 and 10.`)}if("minimum-scale"in s){let e=Number(s["minimum-scale"]);isNaN(e)&&t.push(`Invalid minimum zoom level "${s["minimum-scale"]}". Values must be numeric.`),(e<.1||e>10)&&t.push(`Invalid minimum zoom level "${e}". Values must be between 0.1 and 10.`)}if("maximum-scale"in s){let e=Number(s["maximum-scale"]);isNaN(e)&&t.push(`Invalid maximum zoom level "${s["maximum-scale"]}". Values must be numeric.`),(e<.1||e>10)&&t.push(`Invalid maximum zoom level "${e}". Values must be between 0.1 and 10.`),e<2&&t.push(`Disabling zoom levels under 2x can cause accessibility issues. Found "${e}".`)}if("user-scalable"in s){let e=s["user-scalable"];("no"==e||"0"==e)&&t.push(`Disabling zooming can cause accessibility issues to users with visual impairments. Found "${e}".`),["0","1","yes","no"].includes(e)||t.push(`Unsupported value "${e}" found.`)}if("interactive-widget"in s){let e=s["interactive-widget"];["resizes-visual","resizes-content","overlays-content"].includes(e)||t.push(`Unsupported value "${e}" found.`)}let a=new Set(["width","height","initial-scale","minimum-scale","maximum-scale","user-scalable","interactive-widget"]);return Object.keys(s).filter(e=>!a.has(e)).forEach(e=>{t.push(`Invalid viewport directive "${e}".`)}),{warnings:t,payload:i}}async function Q(e){await e.init(),function(e,t){let i=t.getValidationWarnings(e.getHead());e.logValidationWarnings(i)}(e,C);let t=function(e,t,i){let n=e.getHead(),s=i.getHeadWeights(n).map(({element:i,weight:n})=>({weight:n,element:e.getLoggableElement(i),isValid:!t.hasValidationWarning(i),customValidations:t.getCustomValidations(i)}));e.visualizeHead("Actual",n,s);let a=Array.from(s).sort((e,t)=>t.weight-e.weight),r=document.createElement("head");return a.forEach(({element:e})=>{r.appendChild(e.cloneNode(!0))}),e.visualizeHead("Sorted",r,a),s}(e,C,u);return{actual:t.map(({element:t,weight:i,isValid:n,customValidations:s})=>(s?.payload?.expiry&&(s.payload.expiry=s.payload.expiry.toString()),{weight:i,color:e.getColor(i),selector:e.stringifyElement(t),innerHTML:t.innerHTML,isValid:n,customValidations:s}))}}async function X(){let{options:e}=await chrome.storage.sync.get("options");return new l.Options(e)}!async function(){let e=await X(),t=new r.IO(document,e),{click:i}=await chrome.storage.local.get("click");if(i)t.logElementFromSelector(JSON.parse(i)),await chrome.storage.local.remove("click");else{let e=await Q(t);await chrome.storage.local.set({data:e})}}()})();