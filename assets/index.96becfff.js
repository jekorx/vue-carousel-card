var e=Object.defineProperty,a=Object.prototype.hasOwnProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,l=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r,n=(e,n)=>{for(var o in n||(n={}))a.call(n,o)&&l(e,o,n[o]);if(t)for(var o of t(n))r.call(n,o)&&l(e,o,n[o]);return e};import{d as o,r as s,c as i,w as u,E as c,o as d,n as v,a as p,p as h,i as m,b as f,e as y,T as g,f as _,g as C,h as I,F as x,j as b,k as w,l as k,m as L,v as M,t as S,q as $,s as z,u as B,x as E,y as O,z as j,A,B as H}from"./vendor.ff15cb8a.js";!function(e=".",a="__import__"){try{self[a]=new Function("u","return import(u)")}catch(t){const r=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[a]=e=>new Promise(((t,n)=>{const o=new URL(e,r);if(self[a].moduleMap[o])return t(self[a].moduleMap[o]);const s=new Blob([`import * as m from '${o}';`,`${a}.moduleMap['${o}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){n(new Error(`Failed to import: ${e}`)),l(i)},onload(){t(self[a].moduleMap[o]),l(i)}});document.head.appendChild(i)})),self[a].moduleMap={}}}("/vue-carousel-card/assets/");const R="undefined"==typeof window,P=e=>{for(const a of e){const e=a.target.__resizeListeners__||[];e.length&&e.forEach((e=>e()))}};var N=o({name:"CarouselCard",props:{initialIndex:{type:Number,default:0},height:{type:String,default:"200"},trigger:{type:String,default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:{type:String,default:"",validator:e=>["outside","none",""].includes(e)},indicator:{type:Boolean,default:!0},arrow:{type:String,default:"hover"},type:{type:String,default:""},loop:{type:Boolean,default:!0},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},pauseOnHover:{type:Boolean,default:!0}},emits:["change"],setup(e,{emit:a}){const t=s(null),r=s(0),l=s(0),n=s([]),o=s(-1),f=s(null),y=s(!1),g=i((()=>n.value.some((e=>e.label.toString().length>0)))),_=i((()=>"never"!==e.arrow&&"vertical"!==e.direction)),C=i((()=>["carousel-card",`carousel-card-${e.direction}`])),I=i((()=>{const a=["carousel-card-indicators",`carousel-card-indicators-${e.direction}`];return g.value&&a.push("carousel-card-indicators-labels"),"vertical"===e.direction||"outside"!==e.indicatorPosition&&"card"!==e.type||a.push("carousel-card-indicators-outside"),a}));u(n,(a=>{a.length>0&&x(e.initialIndex)})),u(o,((e,t)=>{b(t),t>-1&&a("change",e,t)})),u((()=>e.autoplay),(e=>{e?k():w()})),u((()=>e.loop),(()=>{x(o.value)}));const x=a=>{if("string"==typeof a){const e=n.value.filter((e=>e.name===a));e.length>0&&(a=n.value.indexOf(e[0]))}if(a=Number(a),isNaN(a)||a!==Math.floor(a))return void console.warn("[Vue-Carousel-Card Warn][Carousel-card] index must be an integer.");const t=n.value.length,r=o.value;o.value=a<0?e.loop?t-1:0:a>=t?e.loop?0:t-1:a,r===o.value&&b(r)},b=e=>{n.value.forEach(((a,t)=>{a.translateItem(t,o.value,e)}))},w=()=>{f.value&&clearInterval(f.value)},k=()=>{e.interval<=0||!e.autoplay||(f.value=setInterval(L,e.interval))},L=()=>{o.value<n.value.length-1?o.value++:e.loop&&(o.value=0)},M=c.throttle(300,!0,(e=>{x(e)})),S=c.throttle(300,!0,(e=>{z(e)})),$=()=>{x(o.value+1)},z=a=>{"hover"===e.trigger&&a!==o.value&&(o.value=a)};return d((()=>{v((()=>{var a,s;t.value&&(a=t.value,s=b,R||(a.__resizeListeners__||(a.__resizeListeners__=[],a.__ro__=new m(P),a.__ro__.observe(a)),a.__resizeListeners__.push(s)),r.value=t.value.offsetWidth,l.value=t.value.offsetHeight),e.initialIndex<n.value.length&&e.initialIndex>=0&&(o.value=e.initialIndex),k()}))})),p((()=>{var e,a;t.value&&(e=t.value,a=b,e&&e.__resizeListeners__&&(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(a),1),e.__resizeListeners__.length||e.__ro__.disconnect()))})),h("injectCarouselCardScope",{offsetWidth:r,offsetHeight:l,type:e.type,items:n,direction:e.direction,loop:e.loop,addItem:e=>{n.value.push(e)},removeItem:e=>{const a=n.value.findIndex((a=>a.uid===e));-1!==a&&(n.value.splice(a,1),o.value===a&&$())},setActiveItem:x}),{rootRef:t,items:n,activeIndex:o,hover:y,hasLabel:g,arrowDisplay:_,carouselCardClazz:C,indicatorsClazz:I,setActiveItem:x,handleMouseEnter:()=>{y.value=!0,e.pauseOnHover&&w()},handleMouseLeave:()=>{y.value=!1,k()},handleButtonEnter:a=>{"vertical"!==e.direction&&n.value.forEach(((e,t)=>{a===((e,a)=>{const t=n.value.length;return a===t-1&&e.inStage&&n.value[0].active||e.inStage&&n.value[a+1]&&n.value[a+1].active?"left":!!(0===a&&e.inStage&&n.value[t-1].active||e.inStage&&n.value[a-1]&&n.value[a-1].active)&&"right"})(e,t)&&(e.hover=!0)}))},handleButtonLeave:()=>{"vertical"!==e.direction&&n.value.forEach((e=>{e.hover=!1}))},prev:()=>{x(o.value-1)},next:$,handleIndicatorClick:e=>{o.value=e},handleIndicatorHover:z,throttledArrowClick:M,throttledIndicatorHover:S}}});const U=y("i",null,null,-1),W=y("i",null,null,-1),X={class:"carousel-card-button"};N.render=function(e,a,t,r,l,n){return k(),f("div",{ref:"rootRef",class:e.carouselCardClazz,onMouseenter:a[7]||(a[7]=w(((...a)=>e.handleMouseEnter&&e.handleMouseEnter(...a)),["stop"])),onMouseleave:a[8]||(a[8]=w(((...a)=>e.handleMouseLeave&&e.handleMouseLeave(...a)),["stop"]))},[y("div",{style:{height:e.height},class:"carousel-card-container"},[e.arrowDisplay?(k(),f(g,{key:0,name:"carousel-card-arrow-left"},{default:_((()=>[L(y("button",{type:"button",class:"carousel-card-arrow carousel-card-arrow-left",onMouseenter:a[1]||(a[1]=a=>e.handleButtonEnter("left")),onMouseleave:a[2]||(a[2]=(...a)=>e.handleButtonLeave&&e.handleButtonLeave(...a)),onClick:a[3]||(a[3]=w((a=>e.throttledArrowClick(e.activeIndex-1)),["stop"]))},[U],544),[[M,("always"===e.arrow||e.hover)&&(e.loop||e.activeIndex>0)]])])),_:1})):C("",!0),e.arrowDisplay?(k(),f(g,{key:1,name:"carousel-card-arrow-right"},{default:_((()=>[L(y("button",{type:"button",class:"carousel-card-arrow carousel-card-arrow-right",onMouseenter:a[4]||(a[4]=a=>e.handleButtonEnter("right")),onMouseleave:a[5]||(a[5]=(...a)=>e.handleButtonLeave&&e.handleButtonLeave(...a)),onClick:a[6]||(a[6]=w((a=>e.throttledArrowClick(e.activeIndex+1)),["stop"]))},[W],544),[[M,("always"===e.arrow||e.hover)&&(e.loop||e.activeIndex<e.items.length-1)]])])),_:1})):C("",!0),I(e.$slots,"default")],4),"none"!==e.indicatorPosition?(k(),f("ul",{key:0,class:e.indicatorsClazz},[(k(!0),f(x,null,b(e.items,((a,t)=>(k(),f("li",{key:t,class:["carousel-card-indicator",`carousel-card-indicator-${e.direction}`,{"is-active":t===e.activeIndex}],onMouseenter:a=>e.throttledIndicatorHover(t),onClick:w((a=>e.handleIndicatorClick(t)),["stop"])},[y("button",X,[e.hasLabel?(k(),f("span",{key:0,textContent:S(a.label)},null,8,["textContent"])):C("",!0)])],42,["onMouseenter","onClick"])))),128))],2)):C("",!0)],34)};var Y=o({name:"CarouselCardItem",props:{name:{type:String,default:""},label:{type:[String,Number],default:""}},setup(e){const a=z(),t=s(!1),r=s(0),l=s(1),o=s(!1),u=s(!1),c=s(!1),v=s(!1),p=B("injectCarouselCardScope"),h=i((()=>p.direction)),m=i((()=>"vertical"===h.value?{msTransform:`translateY(${r.value}px) translateX(-50%) scale(${l.value})`,webkitTransform:`translateY(${r.value}px) translateX(-50%) scale(${l.value})`,transform:`translateY(${r.value}px) translateX(-50%) scale(${l.value})`,left:"50%"}:{msTransform:`translateX(${r.value}px) translateY(-50%) scale(${l.value})`,webkitTransform:`translateX(${r.value}px) translateY(-50%) scale(${l.value})`,transform:`translateX(${r.value}px) translateY(-50%) scale(${l.value})`,top:"50%"})),f=(e,a,t)=>{const n=p.items.value.length,s=p.type;"card"!==s&&void 0!==t&&(v.value=e===a||e===t),e!==a&&n>2&&(e=((e,a,t)=>0===a&&e===t-1?-1:a===t-1&&0===e?t:e<a-1&&a-e>=t/2?t+1:e>a+1&&e-a>=t/2?-2:e)(e,a,n)),"card"===s?("vertical"===h.value&&console.warn("[Vue-Carousel-Card Warn][Carousel-card] vertical direction is not supported in card mode"),c.value=Math.round(Math.abs(e-a))<=1,o.value=e===a,r.value=((e,a)=>{const t=p.offsetWidth.value;return c.value?t*(1.17*(e-a)+1)/4:e<a?-1.83*t/4:3.83*t/4})(e,a),l.value=o.value?1:.83):(o.value=e===a,r.value=((e,a,t)=>p[t?"offsetHeight":"offsetWidth"].value*(e-a))(e,a,"vertical"===h.value)),u.value=!0};return d((()=>{p.addItem&&a&&p.addItem(n(n({uid:a.uid},e),{hover:t,translate:r,scale:l,active:o,ready:u,inStage:c,animating:v,translateItem:f}))})),$((()=>{p.removeItem&&a&&p.removeItem(a.uid)})),{type:p.type,ready:u,active:o,inStage:c,hover:t,animating:v,itemStyle:m,translateItem:f,handleItemClick:()=>{if(p&&"card"===p.type&&a){const e=p.items.value.map((e=>e.uid)).indexOf(a.uid);p.setActiveItem(e)}}}}});const T={key:0,class:"carousel-card-mask"};Y.render=function(e,a,t,r,l,n){return L((k(),f("div",{style:e.itemStyle,class:[{"is-active":e.active,"carousel-card-item-card":"card"===e.type,"is-in-stage":e.inStage,"is-hover":e.hover,"is-animating":e.animating},"carousel-card-item"],onClick:a[1]||(a[1]=(...a)=>e.handleItemClick&&e.handleItemClick(...a))},["card"===e.type?L((k(),f("div",T,null,512)),[[M,!e.active]]):C("",!0),I(e.$slots,"default")],6)),[[M,e.ready]])},N.install=e=>{e.component(N.name,N)},Y.install=e=>{e.component(Y.name,Y)};var D=o({name:"App",components:{CarouselCard:N,CarouselCardItem:Y},setup(){const e=s();return{carouselCardRef:e,changeHandle:e=>{console.log(e)},next:()=>{var a;null==(a=e.value)||a.next()},prev:()=>{var a;null==(a=e.value)||a.prev()},setActiveItem:()=>{var a;null==(a=e.value)||a.setActiveItem(0)}}}});const F=O();j("data-v-7e576a6c");const V={class:"demo"},q={style:{"text-align":"center",padding:"10px"}};A();const G=F(((e,a,t,r,l,n)=>{const o=E("CarouselCardItem"),s=E("CarouselCard");return k(),f("div",V,[y(s,{ref:"carouselCardRef",interval:7e3,autoplay:!1,height:"260px",type:"card",arrow:"always",onChange:e.changeHandle},{default:F((()=>[(k(),f(x,null,b(6,(e=>y(o,{key:e},{default:F((()=>[y("h1",{textContent:S(e)},null,8,["textContent"])])),_:2},1024))),64))])),_:1},8,["onChange"]),y("div",q,[y("button",{onClick:a[1]||(a[1]=(...a)=>e.prev&&e.prev(...a))},"prev"),y("button",{onClick:a[2]||(a[2]=(...a)=>e.next&&e.next(...a))},"next"),y("button",{onClick:a[3]||(a[3]=(...a)=>e.setActiveItem&&e.setActiveItem(...a))},"set to first")]),y(s,{interval:3e3,height:"300px",autoplay:!1,arrow:"always",direction:"vertical"},{default:F((()=>[(k(),f(x,null,b(6,(e=>y(o,{key:e},{default:F((()=>[y("h1",{textContent:S(e)},null,8,["textContent"])])),_:2},1024))),64))])),_:1})])}));D.render=G,D.__scopeId="data-v-7e576a6c";H(D).mount("#app");
