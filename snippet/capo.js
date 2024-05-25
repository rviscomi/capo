(() => {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
const $eb5be8077a65b10b$var$Hues = {
    PINK: 320,
    BLUE: 200
};
function $eb5be8077a65b10b$export$921514c0345db5eb(hue) {
    return [
        `oklch(5% .1 ${hue})`,
        `oklch(13% .2 ${hue})`,
        `oklch(25% .2 ${hue})`,
        `oklch(35% .25 ${hue})`,
        `oklch(50% .27 ${hue})`,
        `oklch(67% .31 ${hue})`,
        `oklch(72% .25 ${hue})`,
        `oklch(80% .2 ${hue})`,
        `oklch(90% .1 ${hue})`,
        `oklch(99% .05 ${hue})`,
        "#ccc"
    ];
}
const $eb5be8077a65b10b$export$e6952b12ade67489 = [
    "#9e0142",
    "#d53e4f",
    "#f46d43",
    "#fdae61",
    "#fee08b",
    "#e6f598",
    "#abdda4",
    "#66c2a5",
    "#3288bd",
    "#5e4fa2",
    "#cccccc"
];
const $eb5be8077a65b10b$export$d68d0fda4a10dbc2 = $eb5be8077a65b10b$export$921514c0345db5eb($eb5be8077a65b10b$var$Hues.PINK);
const $eb5be8077a65b10b$export$738c3b9a44c87ecc = $eb5be8077a65b10b$export$921514c0345db5eb($eb5be8077a65b10b$var$Hues.BLUE);
const $eb5be8077a65b10b$export$9a82c28ef488e918 = {
    DEFAULT: $eb5be8077a65b10b$export$e6952b12ade67489,
    PINK: $eb5be8077a65b10b$export$d68d0fda4a10dbc2,
    BLUE: $eb5be8077a65b10b$export$738c3b9a44c87ecc
};
function $eb5be8077a65b10b$export$18c940335d915715(elementColor) {
    let invalidColor = "#cccccc";
    if (elementColor == invalidColor) invalidColor = "red";
    return `repeating-linear-gradient(45deg, ${elementColor}, ${elementColor} 3px, ${invalidColor} 3px, ${invalidColor} 6px)`;
}


var $d410929ede0a2ee4$exports = {};

$parcel$export($d410929ede0a2ee4$exports, "IO", () => $d410929ede0a2ee4$export$8f8422ac5947a789);

class $d410929ede0a2ee4$export$8f8422ac5947a789 {
    constructor(document1, options, output = window.console){
        this.document = document1;
        this.options = options;
        this.console = output;
        this.isStaticHead = false;
        this.head = null;
    }
    async init() {
        if (this.head) return;
        if (this.options.prefersDynamicAssessment()) {
            this.head = this.document.querySelector("head");
            return;
        }
        try {
            let html = await this.getStaticHTML();
            html = html.replace(/(\<\/?)(head)/gi, "$1static-head");
            const staticDoc = this.document.implementation.createHTMLDocument("New Document");
            staticDoc.documentElement.innerHTML = html;
            this.head = staticDoc.querySelector("static-head");
            if (this.head) this.isStaticHead = true;
            else this.head = this.document.head;
        } catch (e) {
            this.console.error(`${this.options.loggingPrefix}An exception occurred while getting the static <head>:`, e);
            this.head = this.document.head;
        }
        if (!this.isStaticHead) this.console.warn(`${this.options.loggingPrefix}Unable to parse the static (server-rendered) <head>. Falling back to document.head`, this.head);
    }
    async getStaticHTML() {
        const url = this.document.location.href;
        const response = await fetch(url);
        return await response.text();
    }
    getHead() {
        return this.head;
    }
    stringifyElement(element) {
        return element.getAttributeNames().reduce((id, attr)=>{
            return id += `[${CSS.escape(attr)}=${JSON.stringify(element.getAttribute(attr))}]`;
        }, element.nodeName);
    }
    getLoggableElement(element) {
        if (!this.isStaticHead) return element;
        const selector = this.stringifyElement(element);
        const candidates = Array.from(this.document.head.querySelectorAll(selector));
        if (candidates.length == 0) return element;
        if (candidates.length == 1) return candidates[0];
        // The way the static elements are parsed makes their innerHTML different.
        // Recreate the element in DOM and compare its innerHTML with those of the candidates.
        // This ensures a consistent parsing and positive string matches.
        const candidateWrapper = this.document.createElement("div");
        const elementWrapper = this.document.createElement("div");
        elementWrapper.innerHTML = element.innerHTML;
        const candidate = candidates.find((c)=>{
            candidateWrapper.innerHTML = c.innerHTML;
            return candidateWrapper.innerHTML == elementWrapper.innerHTML;
        });
        if (candidate) return candidate;
        return element;
    }
    // Note: AI-generated function.
    createElementFromSelector(selector) {
        // Extract the tag name from the selector
        const tagName = selector.match(/^[A-Za-z]+/)[0];
        if (!tagName) return;
        // Create the new element
        const element = document.createElement(tagName);
        // Extract the attribute key-value pairs from the selector
        const attributes = selector.match(/\[([A-Za-z-]+)="([^"]+)"\]/g) || [];
        // Set the attributes on the new element
        attributes.forEach((attribute)=>{
            // Trim square brackets
            attribute = attribute.slice(1, -1);
            const delimeterPosition = attribute.indexOf("=");
            // Everything before the =
            const key = attribute.slice(0, delimeterPosition);
            // Everything after the =, with quotes trimmed
            const value = attribute.slice(delimeterPosition + 1).slice(1, -1);
            element.setAttribute(key, value);
        });
        return element;
    }
    logElementFromSelector({ weight: weight, selector: selector, innerHTML: innerHTML, isValid: isValid, customValidations: customValidations = {} }) {
        weight = +weight;
        const viz = this.getElementVisualization(weight);
        let element = this.createElementFromSelector(selector);
        element.innerHTML = innerHTML;
        element = this.getLoggableElement(element);
        this.logElement({
            viz: viz,
            weight: weight,
            element: element,
            isValid: isValid,
            customValidations: customValidations
        });
    }
    logElement({ viz: viz, weight: weight, element: element, isValid: isValid, customValidations: customValidations, omitPrefix: omitPrefix = false }) {
        if (!omitPrefix) viz.visual = `${this.options.loggingPrefix}${viz.visual}`;
        let loggingLevel = "log";
        const args = [
            viz.visual,
            viz.style,
            weight + 1,
            element
        ];
        if (!this.options.isValidationEnabled()) {
            this.console[loggingLevel](...args);
            return;
        }
        const { payload: payload, warnings: warnings } = customValidations;
        if (payload) {
            if (typeof payload.expiry == "string") // Deserialize origin trial expiration dates.
            payload.expiry = new Date(payload.expiry);
            args.push(payload);
        }
        if (warnings?.length) {
            // Element-specific warnings.
            loggingLevel = "warn";
            args.push("\n" + warnings.map((warning)=>`  ❌ ${warning}`).join("\n"));
        } else if (!isValid && (this.options.prefersDynamicAssessment() || this.isStaticHead)) {
            // General warnings.
            loggingLevel = "warn";
            args.push(`\n  ❌ invalid element (${element.tagName})`);
        }
        this.console[loggingLevel](...args);
    }
    logValidationWarnings(warnings) {
        if (!this.options.isValidationEnabled()) return;
        warnings.forEach(({ warning: warning, elements: elements = [], element: element })=>{
            elements = elements.map(this.getLoggableElement.bind(this));
            this.console.warn(`${this.options.loggingPrefix}${warning}`, ...elements, element || "");
        });
    }
    getColor(weight) {
        return this.options.palette[10 - weight];
    }
    getHeadVisualization(elements) {
        let visual = "";
        const styles = [];
        elements.forEach(({ weight: weight, isValid: isValid })=>{
            visual += "%c ";
            const color = this.getColor(weight);
            let style = `padding: 5px; margin: 0 -1px; `;
            if (isValid) style += `background-color: ${color};`;
            else style += `background-image: ${(0, $eb5be8077a65b10b$export$18c940335d915715)(color)}`;
            styles.push(style);
        });
        return {
            visual: visual,
            styles: styles
        };
    }
    getElementVisualization(weight) {
        const visual = `%c${new Array(weight + 1).fill("█").join("")}`;
        const color = this.getColor(weight);
        const style = `color: ${color}`;
        return {
            visual: visual,
            style: style
        };
    }
    visualizeHead(groupName, headElement, headWeights) {
        const headViz = this.getHeadVisualization(headWeights);
        this.console.groupCollapsed(`${this.options.loggingPrefix}${groupName} %chead%c order\n${headViz.visual}`, "font-family: monospace", "font-family: inherit", ...headViz.styles);
        headWeights.forEach(({ weight: weight, element: element, isValid: isValid, customValidations: customValidations })=>{
            const viz = this.getElementVisualization(weight);
            this.logElement({
                viz: viz,
                weight: weight,
                element: element,
                isValid: isValid,
                customValidations: customValidations,
                omitPrefix: true
            });
        });
        this.console.log(`${groupName} %chead%c element`, "font-family: monospace", "font-family: inherit", headElement);
        this.console.groupEnd();
    }
}


var $5b739339de321a37$exports = {};

$parcel$export($5b739339de321a37$exports, "Options", () => $5b739339de321a37$export$c019608e5b5bb4cb);

class $5b739339de321a37$export$c019608e5b5bb4cb {
    constructor({ preferredAssessmentMode: preferredAssessmentMode = $5b739339de321a37$export$c019608e5b5bb4cb.AssessmentMode.STATIC, validation: validation = true, palette: palette = $eb5be8077a65b10b$export$e6952b12ade67489, loggingPrefix: loggingPrefix = "Capo: " } = {}){
        this.setPreferredAssessmentMode(preferredAssessmentMode);
        this.setValidation(validation);
        this.setPalette(palette);
        this.setLoggingPrefix(loggingPrefix);
    }
    static get AssessmentMode() {
        return {
            STATIC: "static",
            DYNAMIC: "dynamic"
        };
    }
    static get Palettes() {
        return $eb5be8077a65b10b$export$9a82c28ef488e918;
    }
    prefersStaticAssessment() {
        return this.preferredAssessmentMode === $5b739339de321a37$export$c019608e5b5bb4cb.AssessmentMode.STATIC;
    }
    prefersDynamicAssessment() {
        return this.preferredAssessmentMode === $5b739339de321a37$export$c019608e5b5bb4cb.AssessmentMode.DYNAMIC;
    }
    isValidationEnabled() {
        return this.validation;
    }
    setPreferredAssessmentMode(preferredAssessmentMode) {
        if (!this.isValidAssessmentMode(preferredAssessmentMode)) throw new Error(`Invalid option: preferred assessment mode, expected AssessmentMode.STATIC or AssessmentMode.DYNAMIC, got "${preferredAssessmentMode}".`);
        this.preferredAssessmentMode = preferredAssessmentMode;
    }
    setPreferredAssessmentModeToStatic(prefersStatic) {
        let mode = $5b739339de321a37$export$c019608e5b5bb4cb.AssessmentMode.STATIC;
        if (!prefersStatic) mode = $5b739339de321a37$export$c019608e5b5bb4cb.AssessmentMode.DYNAMIC;
        this.setPreferredAssessmentMode(mode);
    }
    setValidation(validation) {
        if (!this.isValidValidation(validation)) throw new Error(`Invalid option: validation, expected boolean, got "${validation}".`);
        this.validation = validation;
    }
    setPalette(palette) {
        if (!this.isValidPalette(palette)) throw new Error(`Invalid option: palette, expected [${Object.keys($eb5be8077a65b10b$export$9a82c28ef488e918).join("|")}] or an array of colors, got "${palette}".`);
        if (typeof palette === "string") {
            this.palette = $eb5be8077a65b10b$export$9a82c28ef488e918[palette];
            return;
        }
        this.palette = palette;
    }
    setLoggingPrefix(loggingPrefix) {
        if (!this.isValidLoggingPrefix(loggingPrefix)) throw new Error(`Invalid option: logging prefix, expected string, got "${loggingPrefix}".`);
        this.loggingPrefix = loggingPrefix;
    }
    isValidAssessmentMode(assessmentMode) {
        return Object.values($5b739339de321a37$export$c019608e5b5bb4cb.AssessmentMode).includes(assessmentMode);
    }
    isValidValidation(validation) {
        return typeof validation === "boolean";
    }
    isValidPalette(palette) {
        if (typeof palette === "string") return Object.keys($eb5be8077a65b10b$export$9a82c28ef488e918).includes(palette);
        if (!Array.isArray(palette)) return false;
        return palette.length === 11 && palette.every((color)=>typeof color === "string");
    }
    isValidLoggingPrefix(loggingPrefix) {
        return typeof loggingPrefix === "string";
    }
    isPreferredPalette(palette) {
        return JSON.stringify(this.palette) == JSON.stringify(palette);
    }
    valueOf() {
        return {
            preferredAssessmentMode: this.preferredAssessmentMode,
            validation: this.validation,
            palette: this.palette,
            loggingPrefix: this.loggingPrefix
        };
    }
}


var $9c3989fcb9437829$exports = {};

$parcel$export($9c3989fcb9437829$exports, "ElementWeights", () => $9c3989fcb9437829$export$881088883fcab450);
$parcel$export($9c3989fcb9437829$exports, "ElementDetectors", () => $9c3989fcb9437829$export$6ade8bb3620eb74b);
$parcel$export($9c3989fcb9437829$exports, "isMeta", () => $9c3989fcb9437829$export$daeb0db0c224decd);
$parcel$export($9c3989fcb9437829$exports, "isTitle", () => $9c3989fcb9437829$export$e55aad21605f020a);
$parcel$export($9c3989fcb9437829$exports, "isPreconnect", () => $9c3989fcb9437829$export$a3316bd0a640eb8b);
$parcel$export($9c3989fcb9437829$exports, "isAsyncScript", () => $9c3989fcb9437829$export$20e2051ffd813ee3);
$parcel$export($9c3989fcb9437829$exports, "isImportStyles", () => $9c3989fcb9437829$export$be443fc6335656f0);
$parcel$export($9c3989fcb9437829$exports, "isSyncScript", () => $9c3989fcb9437829$export$65983fc0a5543400);
$parcel$export($9c3989fcb9437829$exports, "isSyncStyles", () => $9c3989fcb9437829$export$9d6cdbffb13bee21);
$parcel$export($9c3989fcb9437829$exports, "isPreload", () => $9c3989fcb9437829$export$226ad5ba23be83f0);
$parcel$export($9c3989fcb9437829$exports, "isDeferScript", () => $9c3989fcb9437829$export$3d269f86e8bd1d24);
$parcel$export($9c3989fcb9437829$exports, "isPrefetchPrerender", () => $9c3989fcb9437829$export$4d2ed086e1fec499);
$parcel$export($9c3989fcb9437829$exports, "META_HTTP_EQUIV_KEYWORDS", () => $9c3989fcb9437829$export$b7417cf4a2235f73);
$parcel$export($9c3989fcb9437829$exports, "isOriginTrial", () => $9c3989fcb9437829$export$38a04d482ec50f88);
$parcel$export($9c3989fcb9437829$exports, "isMetaCSP", () => $9c3989fcb9437829$export$14b1a2f64a600585);
$parcel$export($9c3989fcb9437829$exports, "getWeight", () => $9c3989fcb9437829$export$de32fe5d64aee40c);
$parcel$export($9c3989fcb9437829$exports, "getHeadWeights", () => $9c3989fcb9437829$export$5cc4a311ddbe699c);
const $9c3989fcb9437829$export$881088883fcab450 = {
    META: 10,
    TITLE: 9,
    PRECONNECT: 8,
    ASYNC_SCRIPT: 7,
    IMPORT_STYLES: 6,
    SYNC_SCRIPT: 5,
    SYNC_STYLES: 4,
    PRELOAD: 3,
    DEFER_SCRIPT: 2,
    PREFETCH_PRERENDER: 1,
    OTHER: 0
};
const $9c3989fcb9437829$export$6ade8bb3620eb74b = {
    META: $9c3989fcb9437829$export$daeb0db0c224decd,
    TITLE: $9c3989fcb9437829$export$e55aad21605f020a,
    PRECONNECT: $9c3989fcb9437829$export$a3316bd0a640eb8b,
    ASYNC_SCRIPT: $9c3989fcb9437829$export$20e2051ffd813ee3,
    IMPORT_STYLES: $9c3989fcb9437829$export$be443fc6335656f0,
    SYNC_SCRIPT: $9c3989fcb9437829$export$65983fc0a5543400,
    SYNC_STYLES: $9c3989fcb9437829$export$9d6cdbffb13bee21,
    PRELOAD: $9c3989fcb9437829$export$226ad5ba23be83f0,
    DEFER_SCRIPT: $9c3989fcb9437829$export$3d269f86e8bd1d24,
    PREFETCH_PRERENDER: $9c3989fcb9437829$export$4d2ed086e1fec499
};
const $9c3989fcb9437829$export$b7417cf4a2235f73 = [
    "accept-ch",
    "content-security-policy",
    "content-type",
    "default-style",
    "delegate-ch",
    "origin-trial",
    "x-dns-prefetch-control"
];
function $9c3989fcb9437829$export$daeb0db0c224decd(element) {
    const httpEquivSelector = $9c3989fcb9437829$export$b7417cf4a2235f73.map((keyword)=>{
        return `[http-equiv="${keyword}" i]`;
    }).join(", ");
    return element.matches(`meta:is([charset], ${httpEquivSelector}, [name=viewport]), base`);
}
function $9c3989fcb9437829$export$e55aad21605f020a(element) {
    return element.matches("title");
}
function $9c3989fcb9437829$export$a3316bd0a640eb8b(element) {
    return element.matches("link[rel=preconnect]");
}
function $9c3989fcb9437829$export$20e2051ffd813ee3(element) {
    return element.matches("script[src][async]");
}
function $9c3989fcb9437829$export$be443fc6335656f0(element) {
    const importRe = /@import/;
    if (element.matches("style")) return importRe.test(element.textContent);
    /* TODO: Support external stylesheets.
  if (element.matches('link[rel=stylesheet][href]')) {
    let response = fetch(element.href);
    response = response.text();
    return importRe.test(response);
  } */ return false;
}
function $9c3989fcb9437829$export$65983fc0a5543400(element) {
    return element.matches("script:not([src][defer],[src][type=module],[src][async],[type*=json])");
}
function $9c3989fcb9437829$export$9d6cdbffb13bee21(element) {
    return element.matches("link[rel=stylesheet],style");
}
function $9c3989fcb9437829$export$226ad5ba23be83f0(element) {
    return element.matches("link:is([rel=preload], [rel=modulepreload])");
}
function $9c3989fcb9437829$export$3d269f86e8bd1d24(element) {
    return element.matches("script[src][defer], script:not([src][async])[src][type=module]");
}
function $9c3989fcb9437829$export$4d2ed086e1fec499(element) {
    return element.matches("link:is([rel=prefetch], [rel=dns-prefetch], [rel=prerender])");
}
function $9c3989fcb9437829$export$38a04d482ec50f88(element) {
    return element.matches('meta[http-equiv="origin-trial"i]');
}
function $9c3989fcb9437829$export$14b1a2f64a600585(element) {
    return element.matches('meta[http-equiv="Content-Security-Policy" i], meta[http-equiv="Content-Security-Policy-Report-Only" i]');
}
function $9c3989fcb9437829$export$de32fe5d64aee40c(element) {
    for (let [id, detector] of Object.entries($9c3989fcb9437829$export$6ade8bb3620eb74b)){
        if (detector(element)) return $9c3989fcb9437829$export$881088883fcab450[id];
    }
    return $9c3989fcb9437829$export$881088883fcab450.OTHER;
}
function $9c3989fcb9437829$export$5cc4a311ddbe699c(head) {
    const headChildren = Array.from(head.children);
    return headChildren.map((element)=>{
        return {
            element: element,
            weight: $9c3989fcb9437829$export$de32fe5d64aee40c(element)
        };
    });
}


var $580f7ed6bc170ae8$exports = {};

$parcel$export($580f7ed6bc170ae8$exports, "VALID_HEAD_ELEMENTS", () => $580f7ed6bc170ae8$export$79e124b7caef7aa9);
$parcel$export($580f7ed6bc170ae8$exports, "CONTENT_TYPE_SELECTOR", () => $580f7ed6bc170ae8$export$2f975f13375faaa1);
$parcel$export($580f7ed6bc170ae8$exports, "HTTP_EQUIV_SELECTOR", () => $580f7ed6bc170ae8$export$9739336dee0b3205);
$parcel$export($580f7ed6bc170ae8$exports, "PRELOAD_SELECTOR", () => $580f7ed6bc170ae8$export$5540ac2a18901364);
$parcel$export($580f7ed6bc170ae8$exports, "isValidElement", () => $580f7ed6bc170ae8$export$a8257692ac88316c);
$parcel$export($580f7ed6bc170ae8$exports, "hasValidationWarning", () => $580f7ed6bc170ae8$export$eeefd08c3a6f8db7);
$parcel$export($580f7ed6bc170ae8$exports, "getValidationWarnings", () => $580f7ed6bc170ae8$export$b01ab94d0cd042a0);
$parcel$export($580f7ed6bc170ae8$exports, "getCustomValidations", () => $580f7ed6bc170ae8$export$6c93e2175c028eeb);

const $580f7ed6bc170ae8$export$79e124b7caef7aa9 = new Set([
    "base",
    "link",
    "meta",
    "noscript",
    "script",
    "style",
    "template",
    "title"
]);
const $580f7ed6bc170ae8$export$2f975f13375faaa1 = 'meta[http-equiv="content-type" i], meta[charset]';
const $580f7ed6bc170ae8$export$9739336dee0b3205 = "meta[http-equiv]";
const $580f7ed6bc170ae8$export$5540ac2a18901364 = 'link:is([rel="preload" i], [rel="modulepreload" i])';
function $580f7ed6bc170ae8$export$a8257692ac88316c(element) {
    return $580f7ed6bc170ae8$export$79e124b7caef7aa9.has(element.tagName.toLowerCase());
}
function $580f7ed6bc170ae8$export$eeefd08c3a6f8db7(element) {
    // Element itself is not valid.
    if (!$580f7ed6bc170ae8$export$a8257692ac88316c(element)) return true;
    // Children are not valid.
    if (element.matches(`:has(:not(${Array.from($580f7ed6bc170ae8$export$79e124b7caef7aa9).join(", ")}))`)) return true;
    // <title> is not the first of its type.
    if (element.matches("title:is(:nth-of-type(n+2))")) return true;
    // <base> is not the first of its type.
    if (element.matches("base:has(~ base), base ~ base")) return true;
    // CSP meta tag anywhere.
    if ((0, $9c3989fcb9437829$export$14b1a2f64a600585)(element)) return true;
    // Invalid http-equiv.
    if ($580f7ed6bc170ae8$var$isInvalidHttpEquiv(element)) return true;
    // Invalid meta viewport.
    if ($580f7ed6bc170ae8$var$isInvalidMetaViewport(element)) return true;
    // Invalid default-style.
    if ($580f7ed6bc170ae8$var$isInvalidDefaultStyle(element)) return true;
    // Invalid character encoding.
    if ($580f7ed6bc170ae8$var$isInvalidContentType(element)) return true;
    // Origin trial expired, or invalid origin.
    if ($580f7ed6bc170ae8$var$isInvalidOriginTrial(element)) return true;
    // Preload is unnecessary.
    if ($580f7ed6bc170ae8$var$isUnnecessaryPreload(element)) return true;
    return false;
}
function $580f7ed6bc170ae8$export$b01ab94d0cd042a0(head) {
    const validationWarnings = [];
    const titleElements = Array.from(head.querySelectorAll("title"));
    const titleElementCount = titleElements.length;
    if (titleElementCount != 1) validationWarnings.push({
        warning: `Expected exactly 1 <title> element, found ${titleElementCount}`,
        elements: titleElements
    });
    const metaViewport = head.querySelectorAll('meta[name="viewport" i]');
    if (metaViewport.length != 1) validationWarnings.push({
        warning: `Expected exactly 1 <meta name=viewport> element, found ${metaViewport.length}`
    });
    const baseElements = Array.from(head.querySelectorAll("base"));
    const baseElementCount = baseElements.length;
    if (baseElementCount > 1) validationWarnings.push({
        warning: `Expected at most 1 <base> element, found ${baseElementCount}`,
        elements: baseElements
    });
    const metaCSP = head.querySelector('meta[http-equiv="Content-Security-Policy" i]');
    if (metaCSP) validationWarnings.push({
        warning: "CSP meta tags disable the preload scanner due to a bug in Chrome. Use the CSP header instead. Learn more: https://crbug.com/1458493",
        element: metaCSP
    });
    head.querySelectorAll("*").forEach((element)=>{
        if ($580f7ed6bc170ae8$export$a8257692ac88316c(element)) return;
        let root = element;
        while(root.parentElement != head)root = root.parentElement;
        validationWarnings.push({
            warning: `${element.tagName} elements are not allowed in the <head>`,
            element: root
        });
    });
    const originTrials = Array.from(head.querySelectorAll('meta[http-equiv="Origin-Trial" i]'));
    originTrials.forEach((element)=>{
        const metadata = $580f7ed6bc170ae8$var$validateOriginTrial(element);
        if (metadata.warnings.length == 0) return;
        validationWarnings.push({
            warning: `Invalid origin trial token: ${metadata.warnings.join(", ")}`,
            elements: [
                element
            ],
            element: metadata.payload
        });
    });
    return validationWarnings;
}
function $580f7ed6bc170ae8$export$6c93e2175c028eeb(element) {
    if ((0, $9c3989fcb9437829$export$38a04d482ec50f88)(element)) return $580f7ed6bc170ae8$var$validateOriginTrial(element);
    if ((0, $9c3989fcb9437829$export$14b1a2f64a600585)(element)) return $580f7ed6bc170ae8$var$validateCSP(element);
    if ($580f7ed6bc170ae8$var$isDefaultStyle(element)) return $580f7ed6bc170ae8$var$validateDefaultStyle(element);
    if ($580f7ed6bc170ae8$var$isMetaViewport(element)) return $580f7ed6bc170ae8$var$validateMetaViewport(element);
    if ($580f7ed6bc170ae8$var$isContentType(element)) return $580f7ed6bc170ae8$var$validateContentType(element);
    if ($580f7ed6bc170ae8$var$isHttpEquiv(element)) return $580f7ed6bc170ae8$var$validateHttpEquiv(element);
    if ($580f7ed6bc170ae8$var$isUnnecessaryPreload(element)) return $580f7ed6bc170ae8$var$validateUnnecessaryPreload(element);
    return {};
}
function $580f7ed6bc170ae8$var$validateCSP(element) {
    const warnings = [];
    let payload = null;
    if (element.matches('meta[http-equiv="Content-Security-Policy-Report-Only" i]')) {
        //https://w3c.github.io/webappsec-csp/#meta-element
        warnings.push("CSP Report-Only is forbidden in meta tags");
        return warnings;
    }
    if (element.matches('meta[http-equiv="Content-Security-Policy" i]')) warnings.push("meta CSP discouraged. See https://crbug.com/1458493.");
    const content = element.getAttribute("content");
    if (!content) {
        warnings.push("Invalid CSP. The content attribute must be set.");
        return {
            warnings: warnings,
            payload: payload
        };
    }
    const directives = Object.fromEntries(content.split(/\s*;\s*/).map((directive)=>{
        const [key, ...value] = directive.split(" ");
        return [
            key,
            value.join(" ")
        ];
    }));
    payload = payload ?? {};
    payload.directives = directives;
    if ("report-uri" in directives) warnings.push("The report-uri directive is not supported. Use the Content-Security-Policy-Report-Only HTTP header instead.");
    if ("frame-ancestors" in directives) warnings.push("The frame-ancestors directive is not supported. Use the Content-Security-Policy HTTP header instead.");
    if ("sandbox" in directives) warnings.push("The sandbox directive is not supported. Use the Content-Security-Policy HTTP header instead.");
    return {
        warnings: warnings,
        payload: payload
    };
}
function $580f7ed6bc170ae8$var$isInvalidOriginTrial(element) {
    if (!(0, $9c3989fcb9437829$export$38a04d482ec50f88)(element)) return false;
    const { warnings: warnings } = $580f7ed6bc170ae8$var$validateOriginTrial(element);
    return warnings.length > 0;
}
function $580f7ed6bc170ae8$var$validateOriginTrial(element) {
    const metadata = {
        payload: null,
        warnings: []
    };
    const token = element.getAttribute("content");
    try {
        metadata.payload = $580f7ed6bc170ae8$var$decodeOriginTrialToken(token);
    } catch  {
        metadata.warnings.push("invalid token");
        return metadata;
    }
    if (metadata.payload.expiry < new Date()) metadata.warnings.push("expired");
    if (!$580f7ed6bc170ae8$var$isSameOrigin(metadata.payload.origin, document.location.href)) {
        const subdomain = $580f7ed6bc170ae8$var$isSubdomain(metadata.payload.origin, document.location.href);
        // Cross-origin OTs are only valid if:
        //   1. The document is a subdomain of the OT origin and the isSubdomain config is set
        //   2. The isThirdParty config is set
        if (subdomain && !metadata.payload.isSubdomain) metadata.warnings.push("invalid subdomain");
        else if (!subdomain && !metadata.payload.isThirdParty) metadata.warnings.push("invalid third-party origin");
    }
    return metadata;
}
// Adapted from https://glitch.com/~ot-decode.
function $580f7ed6bc170ae8$var$decodeOriginTrialToken(token) {
    const buffer = new Uint8Array([
        ...atob(token)
    ].map((a)=>a.charCodeAt(0)));
    const view = new DataView(buffer.buffer);
    const length = view.getUint32(65, false);
    const payload = JSON.parse(new TextDecoder().decode(buffer.slice(69, 69 + length)));
    payload.expiry = new Date(payload.expiry * 1000);
    return payload;
}
function $580f7ed6bc170ae8$var$isSameOrigin(a, b) {
    return new URL(a).origin === new URL(b).origin;
}
// Whether b is a subdomain of a
function $580f7ed6bc170ae8$var$isSubdomain(a, b) {
    // www.example.com ends with .example.com
    a = new URL(a);
    b = new URL(b);
    return b.host.endsWith(`.${a.host}`);
}
function $580f7ed6bc170ae8$var$isDefaultStyle(element) {
    return element.matches('meta[http-equiv="default-style" i]');
}
function $580f7ed6bc170ae8$var$isContentType(element) {
    return element.matches($580f7ed6bc170ae8$export$2f975f13375faaa1);
}
function $580f7ed6bc170ae8$var$isHttpEquiv(element) {
    return element.matches($580f7ed6bc170ae8$export$9739336dee0b3205);
}
function $580f7ed6bc170ae8$var$isMetaViewport(element) {
    return element.matches('meta[name="viewport" i]');
}
function $580f7ed6bc170ae8$var$isInvalidDefaultStyle(element) {
    if (!$580f7ed6bc170ae8$var$isDefaultStyle(element)) return false;
    const { warnings: warnings } = $580f7ed6bc170ae8$var$validateDefaultStyle(element);
    return warnings.length > 0;
}
function $580f7ed6bc170ae8$var$isInvalidContentType(element) {
    if (!$580f7ed6bc170ae8$var$isContentType(element)) return false;
    const { warnings: warnings } = $580f7ed6bc170ae8$var$validateContentType(element);
    return warnings.length > 0;
}
function $580f7ed6bc170ae8$var$isInvalidHttpEquiv(element) {
    if (!$580f7ed6bc170ae8$var$isHttpEquiv(element)) return false;
    const { warnings: warnings } = $580f7ed6bc170ae8$var$validateHttpEquiv(element);
    return warnings.length > 0;
}
function $580f7ed6bc170ae8$var$isInvalidMetaViewport(element) {
    if (!$580f7ed6bc170ae8$var$isMetaViewport(element)) return false;
    const { warnings: warnings } = $580f7ed6bc170ae8$var$validateMetaViewport(element);
    return warnings.length > 0;
}
function $580f7ed6bc170ae8$var$isUnnecessaryPreload(element) {
    if (!element.matches($580f7ed6bc170ae8$export$5540ac2a18901364)) return false;
    const href = element.getAttribute("href");
    if (!href) return false;
    const preloadedUrl = $580f7ed6bc170ae8$var$absolutifyUrl(href);
    return $580f7ed6bc170ae8$var$findElementWithSource(element.parentElement, preloadedUrl) != null;
}
function $580f7ed6bc170ae8$var$findElementWithSource(root, sourceUrl) {
    const linksAndScripts = Array.from(root.querySelectorAll(`link:not(${$580f7ed6bc170ae8$export$5540ac2a18901364}), script`));
    return linksAndScripts.find((e)=>{
        const src = e.getAttribute("href") || e.getAttribute("src");
        if (!src) return false;
        return sourceUrl == $580f7ed6bc170ae8$var$absolutifyUrl(src);
    });
}
function $580f7ed6bc170ae8$var$absolutifyUrl(href) {
    return new URL(href, document.baseURI).href;
}
function $580f7ed6bc170ae8$var$validateDefaultStyle(element) {
    const warnings = [];
    let payload = null;
    // Check if the value points to an alternate stylesheet with that title
    const title = element.getAttribute("content");
    const stylesheet = element.parentElement.querySelector(`link[rel~="alternate" i][rel~="stylesheet" i][title="${title}"]`);
    if (!title) warnings.push("This has no effect. The content attribute must be set to a valid stylesheet title.");
    else if (!stylesheet) {
        payload = {
            alternateStylesheets: Array.from(element.parentElement.querySelectorAll('link[rel~="alternate" i][rel~="stylesheet" i]'))
        };
        warnings.push(`This has no effect. No alternate stylesheet found having title="${title}".`);
    }
    warnings.push("Even when used correctly, the default-style method of setting a preferred stylesheet results in a flash of unstyled content. Use modern CSS features like @media rules instead.");
    return {
        warnings: warnings,
        payload: payload
    };
}
function $580f7ed6bc170ae8$var$validateContentType(element) {
    const warnings = [];
    let payload = null;
    // https://html.spec.whatwg.org/multipage/semantics.html#character-encoding-declaration
    // Check if there exists both meta[http-equiv] and meta[chartset] variations
    if (element.matches(':is(meta[charset] ~ meta[http-equiv="content-type" i])') || element.matches(":has(~ meta[charset])")) {
        const encodingDeclaration = element.parentElement.querySelector("meta[charset]");
        payload = payload ?? {};
        payload.encodingDeclaration = encodingDeclaration;
        warnings.push(`There can only be one meta-based character encoding declaration per document. Already found \`${encodingDeclaration.outerHTML}\`.`);
    }
    // Check if it compeltely exists in the first 1024 bytes
    const charPos = element.ownerDocument.documentElement.outerHTML.indexOf(element.outerHTML) + element.outerHTML.length;
    if (charPos > 1024) {
        payload = payload ?? {};
        payload.characterPosition = charPos;
        warnings.push(`The element containing the character encoding declaration must be serialized completely within the first 1024 bytes of the document. Found at byte ${charPos}.`);
    }
    // Check that the character encoding is UTF-8
    let charset = null;
    if (element.matches("meta[charset]")) charset = element.getAttribute("charset");
    else {
        const charsetPattern = /text\/html;\s*charset=(.*)/i;
        charset = element.getAttribute("content")?.match(charsetPattern)?.[1]?.trim();
    }
    if (charset?.toLowerCase() != "utf-8") {
        payload = payload ?? {};
        payload.charset = charset;
        warnings.push(`Documents are required to use UTF-8 encoding. Found "${charset}".`);
    }
    if (warnings.length) // Append the spec source to the last warning
    warnings[warnings.length - 1] += "\nLearn more: https://html.spec.whatwg.org/multipage/semantics.html#character-encoding-declaration";
    return {
        warnings: warnings,
        payload: payload
    };
}
function $580f7ed6bc170ae8$var$validateHttpEquiv(element) {
    const warnings = [];
    const type = element.getAttribute("http-equiv").toLowerCase();
    const content = element.getAttribute("content")?.toLowerCase();
    switch(type){
        case "content-security-policy":
        case "content-security-policy-report-only":
        case "origin-trial":
        case "content-type":
        case "default-style":
            break;
        case "refresh":
            if (!content) {
                warnings.push("This doesn't do anything. The content attribute must be set. However, using refresh is discouraged.");
                break;
            }
            if (content.includes("url=")) warnings.push("Meta auto-redirects are discouraged. Use HTTP 3XX responses instead.");
            else warnings.push("Meta auto-refreshes are discouraged unless users have the ability to disable it.");
            break;
        case "x-dns-prefetch-control":
            if (content == "on") warnings.push(`DNS prefetching is enabled by default. Setting it to "${content}" has no effect.`);
            else if (content != "off") warnings.push(`This is a non-standard way of disabling DNS prefetching, which is a performance optimization. Found content="${content}". Use content="off" if you have a legitimate security concern, otherwise remove it.`);
            else warnings.push("This is non-standard, however most browsers support disabling speculative DNS prefetching. It should still be noted that DNS prefetching is a generally accepted performance optimization and you should only disable it if you have specific security concerns.");
            break;
        case "cache-control":
        case "etag":
        case "pragma":
        case "expires":
        case "last-modified":
            warnings.push("This doesn't do anything. Use HTTP headers for any cache directives.");
            break;
        case "x-frame-options":
            warnings.push("This doesn't do anything. Use the CSP HTTP header with the frame-ancestors directive instead.");
            break;
        case "x-ua-compatible":
        case "content-style-type":
        case "content-script-type":
        case "imagetoolbar":
        case "cleartype":
        case "page-enter":
        case "page-exit":
        case "site-enter":
        case "site-exit":
        case "msthemecompatible":
        case "window-target":
            warnings.push("This doesn't do anything. It was an Internet Explorer feature and is now deprecated.");
            break;
        case "content-language":
        case "language":
            warnings.push("This is non-conforming. Use the html[lang] attribute instead.");
            break;
        case "set-cookie":
            warnings.push("This is non-conforming. Use the Set-Cookie HTTP header instead.");
            break;
        case "application-name":
        case "author":
        case "description":
        case "generator":
        case "keywords":
        case "referrer":
        case "theme-color":
        case "color-scheme":
        case "viewport":
        case "creator":
        case "googlebot":
        case "publisher":
        case "robots":
            warnings.push(`This doesn't do anything. Did you mean \`meta[name=${type}]\`?`);
            break;
        case "encoding":
            warnings.push("This doesn't do anything. Did you mean `meta[charset]`?");
            break;
        case "title":
            warnings.push("This doesn't do anything. Did you mean to use the `title` tag instead?");
            break;
        case "accept-ch":
        case "delegate-ch":
            warnings.push("This is non-standard and may not work across browsers. Use HTTP headers instead.");
            break;
        default:
            warnings.push("This is non-standard and may not work across browsers. http-equiv is not an alternative to HTTP headers.");
            break;
    }
    return {
        warnings: warnings
    };
}
function $580f7ed6bc170ae8$var$validateMetaViewport(element) {
    const warnings = [];
    let payload = null;
    // Redundant meta viewport validation.
    if (element.matches('meta[name="viewport" i] ~ meta[name="viewport" i]')) {
        const firstMetaViewport = element.parentElement.querySelector('meta[name="viewport" i]');
        payload = {
            firstMetaViewport: firstMetaViewport
        };
        warnings.push("Another meta viewport element has already been declared. Having multiple viewport settings can lead to unexpected behavior.");
        return {
            warnings: warnings,
            payload: payload
        };
    }
    // Additional validation performed only on the first meta viewport.
    const content = element.getAttribute("content")?.toLowerCase();
    if (!content) {
        warnings.push("Invalid viewport. The content attribute must be set.");
        return {
            warnings: warnings,
            payload: payload
        };
    }
    const directives = Object.fromEntries(content.split(",").map((directive)=>{
        const [key, value] = directive.split("=");
        return [
            key?.trim(),
            value?.trim()
        ];
    }));
    if ("width" in directives) {
        const width = directives["width"];
        if (Number(width) < 1 || Number(width) > 10000) warnings.push(`Invalid width "${width}". Numeric values must be between 1 and 10000.`);
        else if (width != "device-width") warnings.push(`Invalid width "${width}".`);
    }
    if ("height" in directives) {
        const height = directives["height"];
        if (Number(height) < 1 || Number(height) > 10000) warnings.push(`Invalid height "${height}". Numeric values must be between 1 and 10000.`);
        else if (height != "device-height") warnings.push(`Invalid height "${height}".`);
    }
    if ("initial-scale" in directives) {
        const initialScale = Number(directives["initial-scale"]);
        if (isNaN(initialScale)) warnings.push(`Invalid initial zoom level "${directives["initial-scale"]}". Values must be numeric.`);
        if (initialScale < 0.1 || initialScale > 10) warnings.push(`Invalid initial zoom level "${initialScale}". Values must be between 0.1 and 10.`);
    }
    if ("minimum-scale" in directives) {
        const minimumScale = Number(directives["minimum-scale"]);
        if (isNaN(minimumScale)) warnings.push(`Invalid minimum zoom level "${directives["minimum-scale"]}". Values must be numeric.`);
        if (minimumScale < 0.1 || minimumScale > 10) warnings.push(`Invalid minimum zoom level "${minimumScale}". Values must be between 0.1 and 10.`);
    }
    if ("maximum-scale" in directives) {
        const maxScale = Number(directives["maximum-scale"]);
        if (isNaN(maxScale)) warnings.push(`Invalid maximum zoom level "${directives["maximum-scale"]}". Values must be numeric.`);
        if (maxScale < 0.1 || maxScale > 10) warnings.push(`Invalid maximum zoom level "${maxScale}". Values must be between 0.1 and 10.`);
        if (maxScale < 2) warnings.push(`Disabling zoom levels under 2x can cause accessibility issues. Found "${maxScale}".`);
    }
    if ("user-scalable" in directives) {
        const userScalable = directives["user-scalable"];
        if (userScalable == "no" || userScalable == "0") warnings.push(`Disabling zooming can cause accessibility issues to users with visual impairments. Found "${userScalable}".`);
        if (![
            "0",
            "1",
            "yes",
            "no"
        ].includes(userScalable)) warnings.push(`Unsupported value "${userScalable}" found.`);
    }
    if ("interactive-widget" in directives) {
        const interactiveWidget = directives["interactive-widget"];
        const validValues = [
            "resizes-visual",
            "resizes-content",
            "overlays-content"
        ];
        if (!validValues.includes(interactiveWidget)) warnings.push(`Unsupported value "${interactiveWidget}" found.`);
    }
    if ("viewport-fit" in directives) {
        const viewportFit = directives["viewport-fit"];
        const validValues = [
            "auto",
            "contain",
            "cover"
        ];
        if (!validValues.includes(viewportFit)) warnings.push(`Unsupported value "${viewportFit}" found. Should be one of: ${validValues.join(", ")}.`);
    }
    if ("shrink-to-fit" in directives) warnings.push("The shrink-to-fit directive has been obsolete since iOS 9.2.\n  See https://www.scottohara.me/blog/2018/12/11/shrink-to-fit.html");
    const validDirectives = new Set([
        "width",
        "height",
        "initial-scale",
        "minimum-scale",
        "maximum-scale",
        "user-scalable",
        "interactive-widget"
    ]);
    Object.keys(directives).filter((directive)=>{
        if (validDirectives.has(directive)) // The directive is valid.
        return false;
        if (directive == "shrink-to-fit") // shrink-to-fit is not valid, but we have a separate warning for it.
        return false;
        if (directive == "viewport-fit") // viewport-fit is non-standard, but widely supported.
        // https://github.com/rviscomi/capo.js/issues/110
        return false;
        return true;
    }).forEach((directive)=>{
        warnings.push(`Invalid viewport directive "${directive}".`);
    });
    return {
        warnings: warnings,
        payload: payload
    };
}
function $580f7ed6bc170ae8$var$validateUnnecessaryPreload(element) {
    const href = element.getAttribute("href");
    const preloadedUrl = $580f7ed6bc170ae8$var$absolutifyUrl(href);
    const preloadedElement = $580f7ed6bc170ae8$var$findElementWithSource(element.parentElement, preloadedUrl);
    if (!preloadedElement) throw new Error("Expected an invalid preload, but none found.");
    return {
        warnings: [
            `This preload has little to no effect. ${href} is already discoverable by another ${preloadedElement.tagName} element.`
        ]
    };
}




function $0eec6c831ab0f90a$export$8679af897d1c058e(io, validation) {
    const validationWarnings = validation.getValidationWarnings(io.getHead());
    io.logValidationWarnings(validationWarnings);
}
function $0eec6c831ab0f90a$export$b65597cffe09aebc(io, validation, rules) {
    const headElement = io.getHead();
    const headWeights = rules.getHeadWeights(headElement).map(({ element: element, weight: weight })=>{
        return {
            weight: weight,
            element: io.getLoggableElement(element),
            isValid: !validation.hasValidationWarning(element),
            customValidations: validation.getCustomValidations(element)
        };
    });
    io.visualizeHead("Actual", headElement, headWeights);
    const sortedWeights = Array.from(headWeights).sort((a, b)=>b.weight - a.weight);
    const sortedHead = document.createElement("head");
    sortedWeights.forEach(({ element: element })=>{
        sortedHead.appendChild(element.cloneNode(true));
    });
    io.visualizeHead("Sorted", sortedHead, sortedWeights);
    return headWeights;
}


const $fd3091053c5dfffc$var$CAPO_GLOBAL = "__CAPO__";
async function $fd3091053c5dfffc$var$run() {
    const options = new $5b739339de321a37$exports.Options(self[$fd3091053c5dfffc$var$CAPO_GLOBAL]);
    const io = new $d410929ede0a2ee4$exports.IO(document, options);
    await io.init();
    $0eec6c831ab0f90a$export$8679af897d1c058e(io, $580f7ed6bc170ae8$exports);
    $0eec6c831ab0f90a$export$b65597cffe09aebc(io, $580f7ed6bc170ae8$exports, $9c3989fcb9437829$exports);
}
$fd3091053c5dfffc$var$run();

})();
