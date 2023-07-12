(() => {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
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


class $d410929ede0a2ee4$export$8f8422ac5947a789 {
    constructor(document1, options){
        this.document = document1;
        this.options = options;
        this.isStaticHead = false;
        this.head = null;
    }
    async init() {
        if (this.head) return;
        if (this.options.prefersDynamicAssessment()) {
            this.head = this.document.head;
            return;
        }
        try {
            let html = await this.getStaticHTML();
            html = html.replace(/(\<\/?)(head)/ig, "$1static-head");
            const staticDoc = this.document.implementation.createHTMLDocument("New Document");
            staticDoc.documentElement.innerHTML = html;
            this.head = staticDoc.querySelector("static-head");
            if (this.head) this.isStaticHead = true;
            else this.head = this.document.head;
        } catch (e) {
            console.error(`${this.options.loggingPrefix}An exception occurred while getting the static <head>:`, e);
            this.head = this.document.head;
        }
        if (!this.isStaticHead) console.warn(`${this.options.loggingPrefix}Unable to parse the static (server-rendered) <head>. Falling back to document.head`, this.head);
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
        return element.getAttributeNames().reduce((id, attr)=>id += `[${attr}=${JSON.stringify(element.getAttribute(attr))}]`, element.nodeName);
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
            const [key, value] = attribute.replace("[", "").replace("]", "").split("=");
            element.setAttribute(key, value.slice(1, -1));
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
            console[loggingLevel](...args);
            return;
        }
        const { payload: payload, warnings: warnings } = customValidations;
        if (payload) args.push(payload);
        if (warnings?.length) {
            // Element-specific warnings.
            loggingLevel = "warn";
            warnings.forEach((warning)=>args.push(`❌ ${warning}`));
        } else if (!isValid && (this.options.prefersDynamicAssessment() || this.isStaticHead)) {
            // General warnings.
            loggingLevel = "warn";
            args.push(`❌ invalid element (${element.tagName})`);
        }
        console[loggingLevel](...args);
    }
    logValidationWarnings(warnings) {
        if (!this.options.isValidationEnabled()) return;
        warnings.forEach(({ warning: warning, elements: elements = [], element: element })=>{
            elements = elements.map(this.getLoggableElement.bind(this));
            console.warn(`${this.options.loggingPrefix}${warning}`, ...elements, element || "");
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
        console.groupCollapsed(`${this.options.loggingPrefix}${groupName} %chead%c order\n${headViz.visual}`, "font-family: monospace", "font-family: inherit", ...headViz.styles);
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
        console.log(`${groupName} %chead%c element`, "font-family: monospace", "font-family: inherit", headElement);
        console.groupEnd();
    }
}



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

$parcel$export($9c3989fcb9437829$exports, "isOriginTrial", () => $9c3989fcb9437829$export$38a04d482ec50f88);
$parcel$export($9c3989fcb9437829$exports, "isMetaCSP", () => $9c3989fcb9437829$export$14b1a2f64a600585);
$parcel$export($9c3989fcb9437829$exports, "getHeadWeights", () => $9c3989fcb9437829$export$5cc4a311ddbe699c);
const $9c3989fcb9437829$var$ElementWeights = {
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
const $9c3989fcb9437829$var$ElementDetectors = {
    META: $9c3989fcb9437829$var$isMeta,
    TITLE: $9c3989fcb9437829$var$isTitle,
    PRECONNECT: $9c3989fcb9437829$var$isPreconnect,
    ASYNC_SCRIPT: $9c3989fcb9437829$var$isAsyncScript,
    IMPORT_STYLES: $9c3989fcb9437829$var$isImportStyles,
    SYNC_SCRIPT: $9c3989fcb9437829$var$isSyncScript,
    SYNC_STYLES: $9c3989fcb9437829$var$isSyncStyles,
    PRELOAD: $9c3989fcb9437829$var$isPreload,
    DEFER_SCRIPT: $9c3989fcb9437829$var$isDeferScript,
    PREFETCH_PRERENDER: $9c3989fcb9437829$var$isPrefetchPrerender
};
function $9c3989fcb9437829$var$isMeta(element) {
    return element.matches("meta:is([charset], [http-equiv], [name=viewport]), base");
}
function $9c3989fcb9437829$var$isTitle(element) {
    return element.matches("title");
}
function $9c3989fcb9437829$var$isPreconnect(element) {
    return element.matches("link[rel=preconnect]");
}
function $9c3989fcb9437829$var$isAsyncScript(element) {
    return element.matches("script[src][async]");
}
function $9c3989fcb9437829$var$isImportStyles(element) {
    const importRe = /@import/;
    if (element.matches("style")) return importRe.test(element.textContent);
    /* TODO: Support external stylesheets.
  if (element.matches('link[rel=stylesheet][href]')) {
    let response = fetch(element.href);
    response = response.text();
    return importRe.test(response);
  } */ return false;
}
function $9c3989fcb9437829$var$isSyncScript(element) {
    return element.matches("script:not([src][defer],[src][type=module],[src][async],[type*=json])");
}
function $9c3989fcb9437829$var$isSyncStyles(element) {
    return element.matches("link[rel=stylesheet],style");
}
function $9c3989fcb9437829$var$isPreload(element) {
    return element.matches("link:is([rel=preload], [rel=modulepreload])");
}
function $9c3989fcb9437829$var$isDeferScript(element) {
    return element.matches("script[src][defer], script:not([src][async])[src][type=module]");
}
function $9c3989fcb9437829$var$isPrefetchPrerender(element) {
    return element.matches("link:is([rel=prefetch], [rel=dns-prefetch], [rel=prerender])");
}
function $9c3989fcb9437829$export$38a04d482ec50f88(element) {
    return element.matches('meta[http-equiv="origin-trial"i]');
}
function $9c3989fcb9437829$export$14b1a2f64a600585(element) {
    return element.matches('meta[http-equiv="Content-Security-Policy" i]');
}
function $9c3989fcb9437829$var$getWeight(element) {
    for ([id, detector] of Object.entries($9c3989fcb9437829$var$ElementDetectors)){
        if (detector(element)) return $9c3989fcb9437829$var$ElementWeights[id];
    }
    return $9c3989fcb9437829$var$ElementWeights.OTHER;
}
function $9c3989fcb9437829$export$5cc4a311ddbe699c(head) {
    const headChildren = Array.from(head.children);
    return headChildren.map((element)=>{
        return {
            element: element,
            weight: $9c3989fcb9437829$var$getWeight(element)
        };
    });
}


var $580f7ed6bc170ae8$exports = {};

$parcel$export($580f7ed6bc170ae8$exports, "isValidElement", () => $580f7ed6bc170ae8$export$a8257692ac88316c);
$parcel$export($580f7ed6bc170ae8$exports, "hasValidationWarning", () => $580f7ed6bc170ae8$export$eeefd08c3a6f8db7);
$parcel$export($580f7ed6bc170ae8$exports, "getValidationWarnings", () => $580f7ed6bc170ae8$export$b01ab94d0cd042a0);
$parcel$export($580f7ed6bc170ae8$exports, "getCustomValidations", () => $580f7ed6bc170ae8$export$6c93e2175c028eeb);

const $580f7ed6bc170ae8$var$VALID_HEAD_ELEMENTS = new Set([
    "base",
    "link",
    "meta",
    "noscript",
    "script",
    "style",
    "template",
    "title"
]);
function $580f7ed6bc170ae8$export$a8257692ac88316c(element) {
    return $580f7ed6bc170ae8$var$VALID_HEAD_ELEMENTS.has(element.tagName.toLowerCase());
}
function $580f7ed6bc170ae8$export$eeefd08c3a6f8db7(element) {
    // Element itself is not valid.
    if (!$580f7ed6bc170ae8$export$a8257692ac88316c(element)) return true;
    // Children are not valid.
    if (element.matches(`:has(:not(${Array.from($580f7ed6bc170ae8$var$VALID_HEAD_ELEMENTS).join(", ")}))`)) return true;
    // <title> is not the first of its type.
    if (element.matches("title:is(:nth-of-type(n+2))")) return true;
    // <base> is not the first of its type.
    if (element.matches("base:has(~ base), base ~ base")) return true;
    // CSP meta tag anywhere.
    if ((0, $9c3989fcb9437829$export$14b1a2f64a600585)(element)) return true;
    // Origin trial expired or cross-origin.
    if ($580f7ed6bc170ae8$var$isInvalidOriginTrial(element)) return true;
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
    return {};
}
function $580f7ed6bc170ae8$var$validateCSP(element) {
    return {
        warnings: [
            "meta CSP discouraged. See https://crbug.com/1458493."
        ]
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
        if (metadata.payload.expiry < new Date()) metadata.warnings.push("expired");
        if (!metadata.payload.isThirdParty && !$580f7ed6bc170ae8$var$isSameOrigin(metadata.payload.origin, document.location.href)) metadata.warnings.push("invalid origin");
    } catch  {
        metadata.warnings.push("invalid token");
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


const $fd3091053c5dfffc$var$CAPO_GLOBAL = "__CAPO__";
async function $fd3091053c5dfffc$var$run() {
    const options = new (0, $5b739339de321a37$export$c019608e5b5bb4cb)(self[$fd3091053c5dfffc$var$CAPO_GLOBAL]);
    const io = new (0, $d410929ede0a2ee4$export$8f8422ac5947a789)(document, options);
    await io.init();
    $0eec6c831ab0f90a$export$8679af897d1c058e(io, $580f7ed6bc170ae8$exports);
    $0eec6c831ab0f90a$export$b65597cffe09aebc(io, $580f7ed6bc170ae8$exports, $9c3989fcb9437829$exports);
}
$fd3091053c5dfffc$var$run();

})();
