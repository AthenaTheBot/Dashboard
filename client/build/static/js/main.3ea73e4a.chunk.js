(this["webpackJsonptest-app"]=this["webpackJsonptest-app"]||[]).push([[0],{44:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n(22),s=n.n(c),r=n(13),i=n(6),o=n(16),l=n(75),d=n(76),u=n(20),j=n(7),b=n.n(j),h=n(5),m=Object(a.createContext)({}),v=n(25),p=(n(44),n(1));var O=function(e){var t=e.options,n=void 0===t?[]:t,a=e.disabled,c=void 0===a||a,s=Object(i.f)(),r=0;return Object(p.jsx)("ul",{className:c?"dropdown disabled":"dropdown",children:null===n||void 0===n?void 0:n.map((function(e){return Object(p.jsx)("li",{style:{color:"".concat(e.color)},onClick:function(){!function(e){arguments.length>1&&void 0!==arguments[1]&&!arguments[1]?window.location.replace(e):s(e)}(e.link,e.passive)},children:e.label},r++)}))})},f=(n(46),function(e){var t=e.drodpownOptions,n=Object(a.useContext)(m).user,c=Object(a.useState)(!0),s=Object(h.a)(c,2),r=s[0],i=s[1];return Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)("div",{className:"profile-part",children:n?Object(p.jsxs)("div",{id:"profile",className:"profile",onClick:function(){r?(i(!1),b()(".dropdown-icon").addClass("profile-dropdown-icon-collapsed")):(i(!0),b()(".dropdown-icon").removeClass("profile-dropdown-icon-collapsed"))},children:[Object(p.jsx)("img",{id:"profile-avatar",src:n.avatar?"https://cdn.discordapp.com/avatars/".concat(n.id,"/").concat(n.avatar,".png"):"/assets/images/default.png",alt:"Profile"}),Object(p.jsx)("p",{id:"profile-username",children:n.username}),Object(p.jsx)(v.a,{className:"dropdown-icon"})]}):Object(p.jsx)("a",{id:"log-btn",className:"loginBtn",href:"/oauth/login",children:"Login"})}),Object(p.jsx)(O,{options:t,disabled:r})]})}),x=(n(47),function(e){var t=e.activeElement;return Object(p.jsx)(a.Fragment,{children:Object(p.jsx)("div",{className:"athena-navbar",children:Object(p.jsxs)(l.a,{bg:"transparent",expand:"lg",collapseOnSelect:!0,variant:"dark",children:[Object(p.jsx)(r.b,{className:"navbar-brand",to:"/",children:Object(p.jsx)("img",{src:"/assets/images/logo.png",width:"64",height:"64",className:"d-inline-block align-top",alt:"Athena"})}),Object(p.jsx)(u.c,{className:"athena-navbar-toggler",onClick:function(){b()("#basic-navbar-nav").hasClass("collapse")?(b()("#basic-navbar-nav").removeClass("collapse"),b()("#basic-navbar-nav").addClass("collapsed"),b()("#basic-navbar-nav").addClass("fadeIn"),setTimeout((function(){b()("#basic-navbar-nav").removeClass("fadeIn")}),400)):(b()("#basic-navbar-nav").removeClass("collapsed"),b()("#basic-navbar-nav").addClass("collapse"))}}),Object(p.jsxs)(l.a.Collapse,{id:"basic-navbar-nav",children:[Object(p.jsxs)(d.a,{className:"mr-auto",children:[Object(p.jsx)(r.b,{className:"home"===t?"active nav-link":"nav-link",to:"/",children:"Home"}),Object(p.jsx)(r.b,{className:"commands"===t?"active nav-link":"nav-link",to:"/commands",children:"Commands"}),Object(p.jsxs)("a",{target:"_blank",rel:"noopener noreferrer",className:"support"===t?"active nav-link":"nav-link",href:"/support",children:["Support"," ",Object(p.jsx)(u.a,{style:{marginBottom:"3px",marginLeft:"4px"}})]})]}),Object(p.jsx)(f,{drodpownOptions:[{label:"Servers",link:"/servers",passive:!0},{label:"Logout",link:"/oauth/logout",passive:!1,color:"var( --primary-error)"}]})]})]})})})}),g=(n(51),function(){return Object(p.jsx)("div",{className:"athena-footer",children:Object(p.jsxs)("div",{className:"athena-footer-content",children:[Object(p.jsxs)("div",{className:"athena-footer-brand",children:[Object(p.jsx)("img",{src:"/assets/images/logo.png",alt:"Athena"}),Object(p.jsx)("p",{children:"Athena is a multi-purpose discord bot that aims to serve every function of a discord bot that can perform."})]}),Object(p.jsxs)("div",{className:"athena-footer-link-part",children:[Object(p.jsxs)("ul",{className:"athena-footer-links",children:[Object(p.jsx)("h3",{children:"General"}),Object(p.jsx)("li",{children:Object(p.jsx)(r.b,{to:"/",children:"Home"})}),Object(p.jsx)("li",{children:Object(p.jsx)(r.b,{to:"/commands",children:"Commands"})})]}),Object(p.jsxs)("ul",{className:"athena-footer-links",children:[Object(p.jsx)("h3",{children:"Legal"}),Object(p.jsx)("li",{children:Object(p.jsx)(r.b,{to:"/privacy",children:"Privacy Policy"})}),Object(p.jsx)("li",{children:Object(p.jsx)(r.b,{to:"/terms",children:"Terms of Service"})}),Object(p.jsx)("li",{children:Object(p.jsxs)("a",{href:"/support",children:["Contact Us"," ",Object(p.jsx)(u.a,{style:{marginBottom:"3px",marginLeft:"4px"}})]})})]})]})]})})}),N=(n(52),function(){return Object(p.jsxs)("div",{className:"athena-main",children:[Object(p.jsx)(o.a,{children:Object(p.jsx)("title",{children:"Athena - The Discord Bot"})}),Object(p.jsx)(x,{activeElement:"home"}),Object(p.jsx)("header",{children:Object(p.jsxs)("div",{className:"headMsg",children:[Object(p.jsxs)("h1",{children:["A Discord Bot that can fulfill your server needs for"," ",Object(p.jsx)("span",{style:{color:"var(--primary-theme)"},children:"FREE"})]}),Object(p.jsx)("p",{children:"Athena is a multi-functional discord bot that offers many services for free such as playing any song you desire or making moderation of your server easier."})]})}),Object(p.jsx)("main",{children:Object(p.jsxs)("div",{className:"features",children:[Object(p.jsx)("div",{className:"feature",children:Object(p.jsxs)("div",{id:"feature_music",className:"featureContent",children:[Object(p.jsx)("img",{src:"/assets/images/feature_music.svg",alt:"Music"}),Object(p.jsxs)("div",{className:"feature_desc",children:[Object(p.jsx)("h1",{children:"Music"}),Object(p.jsx)("p",{children:"Athena has a powerful music module which you can listen to music from Youtube and Spotify."})]})]})}),Object(p.jsx)("div",{className:"feature",children:Object(p.jsxs)("div",{id:"feature_moderation",className:"featureContent",children:[Object(p.jsx)("img",{src:"/assets/images/feature_moderation.svg",alt:"Music"}),Object(p.jsxs)("div",{className:"feature_desc",children:[Object(p.jsx)("h1",{children:"Moderation"}),Object(p.jsx)("p",{children:"With Athena's big range of moderation commands you can moderate your server easily and quickly!"})]})]})}),Object(p.jsx)("div",{className:"feature",children:Object(p.jsxs)("div",{id:"feature_fun",className:"featureContent",children:[Object(p.jsx)("img",{src:"/assets/images/feature_fun.svg",alt:"Music"}),Object(p.jsxs)("div",{className:"feature_desc",children:[Object(p.jsx)("h1",{children:"Fun"}),Object(p.jsx)("p",{children:"Do you like fun commands such as magik ? Because we do and we put some fun commands to Athena that you may love such as mimic command!"})]})]})}),Object(p.jsx)("div",{className:"feature",children:Object(p.jsxs)("div",{id:"feature_misc",className:"featureContent",children:[Object(p.jsx)("img",{src:"/assets/images/feature_misc.svg",alt:"Music"}),Object(p.jsxs)("div",{className:"feature_desc",children:[Object(p.jsx)("h1",{children:"Misc"}),Object(p.jsx)("p",{children:"Other commands that we couldn't put in a section such as fortnite stats or weather forecast."})]})]})})]})}),Object(p.jsx)("footer",{children:Object(p.jsxs)("div",{className:"question",children:[Object(p.jsx)("h1",{children:"Ready to try Athena?"}),Object(p.jsx)("a",{href:"/invite",className:"btn-main",children:"Invite Athena!"})]})}),Object(p.jsx)(g,{})]})}),y=(n(53),function(e){var t=e.active,n=e.coverAllPage,c=e.loaderColor,s=e.loaderMsg;return Object(a.useEffect)((function(){t?b()(".loader").removeClass("loader-disabled"):(b()(".loader").addClass("loader-disabled"),setTimeout((function(){b()(".loader").addClass("disabled")}),610)),n?b()(".loader").addClass("cover"):b()(".loader").removeClass("cover")})),Object(p.jsxs)("div",{className:"loader",children:[Object(p.jsxs)("div",{className:"spinner",children:[Object(p.jsx)("div",{style:{backgroundColor:c},className:"bounce1"}),Object(p.jsx)("div",{style:{backgroundColor:c},className:"bounce2"}),Object(p.jsx)("div",{style:{backgroundColor:c},className:"bounce3"})]}),Object(p.jsx)("p",{style:{display:"__empty"===s?"none":"block"},children:s||"Sit tight! We are getting there.."})]})}),k=(n(54),function(e){var t=e.name,n=e.usage,a=e.description,c=e.reqPerms,s=e.reqBotPerms;return Object(p.jsxs)("div",{className:"command",onClick:function(e){b()(e.currentTarget).children(".command-expand").hasClass("command-active")?b()(e.currentTarget).children(".command-expand").removeClass("command-active"):b()(e.currentTarget).children(".command-expand").addClass("command-active")},children:[Object(p.jsxs)("h5",{children:["at! ",Object(p.jsx)("span",{id:"command-name",children:t})," ",Object(p.jsx)("code",{children:n||"None"})]}),Object(p.jsxs)("div",{className:"command-expand",children:[Object(p.jsxs)("p",{children:["Description:"," ",Object(p.jsx)("span",{id:"command-desc",children:a||"None"})]}),Object(p.jsxs)("p",{children:["Required Perms:"," ",c&&c.length>0?c.map((function(e){return Object(p.jsx)("code",{children:e})})):"None"]}),Object(p.jsxs)("p",{children:["Required Bot Perms:"," ",s&&s.length>0?s.map((function(e){return Object(p.jsx)("code",{children:e})})):"None"]})]})]})}),C=(n(55),function(){var e=0,t=0,n=Object(a.useContext)(m),c=n.getCommands,s=n.commands,r=Object(a.useState)(!1),i=Object(h.a)(r,2),l=i[0],d=i[1],u=Object(a.useState)([]),j=Object(h.a)(u,2),v=j[0],O=j[1],f=Object(a.useState)([]),N=Object(h.a)(f,2),C=N[0],w=N[1];Object(a.useEffect)((function(){c()}),[]),Object(a.useEffect)((function(){s?(O(s),w(s),d(!0)):(O([]),w([]),d(!1))}),[s]);var S=function(e,t){if(e&&v&&s){var n;if("All"===e)n=v;else{var a=[];a.push(v),n=a.filter((function(t){return t.category!==e}));for(var c=0;c<n.length;c++)n[c].commands=[];n.push(v.find((function(t){return t.category===e})))}for(var r=document.getElementsByClassName("category"),i=0;i<r.length;i++)r[i].classList=["category"];w(n),t.currentTarget.classList.add("activeCategory"),b()(".command .command-active").removeClass("command-active")}};return Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)(o.a,{children:Object(p.jsx)("title",{children:"Commands - Athena"})}),Object(p.jsx)(x,{activeElement:"commands"}),Object(p.jsxs)("div",{className:"command-page-header",children:[Object(p.jsx)("h1",{style:{color:"var(--primary-theme)"},children:"Commands"}),Object(p.jsx)("p",{children:"List of all commands that is currently running on Athena."})]}),Object(p.jsx)("div",{className:"commands-container",children:l?Object(p.jsxs)(a.Fragment,{children:[Object(p.jsxs)("div",{className:"categories",children:[Object(p.jsx)("h5",{className:"category activeCategory",onClick:function(e){S("All",e)},children:"All"}),null===v||void 0===v?void 0:v.map((function(e){return t++,Object(p.jsx)("h5",{onClick:function(t){S(e.category,t)},className:"category",children:e.category},t)}))]}),Object(p.jsx)("div",{className:"commands",children:C.map((function(t){return t.commands.map((function(t){return e++,Object(p.jsx)(k,{name:t.name,usage:t.usage,description:t.description,reqPerms:t.required_perms,reqBotPerms:t.required_bot_perms},e)}))}))})]}):Object(p.jsx)(y,{active:!0})}),Object(p.jsx)(g,{})]})}),w=(n(56),function(){return Object(p.jsxs)("div",{className:"athena-pg-not-found-container",children:[Object(p.jsx)("h1",{children:"404"}),Object(p.jsx)("p",{children:"Ooops! It looks like the page you are trying to access not found!"}),Object(p.jsx)(r.b,{className:"athena-pg-not-found-btn",to:"/",children:"Go back to home"})]})}),S=n(4),E=n.n(S),A=n(9),R=n(35);n(58);var T=function(e){var t=e.page,n=Object(a.useState)(null),c=Object(h.a)(n,2),s=c[0],r=c[1],i=Object(a.useState)(null),l=Object(h.a)(i,2),d=l[0],u=l[1];return Object(a.useEffect)((function(){Object(A.a)(E.a.mark((function e(){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,fetch("/legalDocs/".concat(t)).then(function(){var e=Object(A.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,t.text();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return null}));case 3:if(n=e.sent){e.next=8;break}return u("Error"),r("An error occured while loading this legal document, please try again later or [contact us](/support)."),e.abrupt("return");case 8:u((a=t).slice(0,1).toUpperCase()+a.slice(1,a.length)),r(n);case 10:case"end":return e.stop()}var a}),e)})))()}),[t]),Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)(x,{}),Object(p.jsx)(o.a,{children:Object(p.jsx)("title",{children:"Legal - Athena"})}),Object(p.jsxs)("div",{className:"athena-legal-container",children:[Object(p.jsx)("div",{className:"athena-legal-head",children:Object(p.jsx)("h1",{style:{color:"var(--primary-theme)"},children:d})}),Object(p.jsx)("div",{className:"athena-legal-content",children:s?Object(p.jsx)(R.a,{children:s}):Object(p.jsx)(y,{loaderMsg:"Fetching legal document...",active:!0})})]}),Object(p.jsx)(g,{})]})},_=(n(59),function(){return Object(p.jsxs)("div",{className:"athena-error-container",children:[Object(p.jsx)(o.a,{children:Object(p.jsx)("title",{children:"Ooops! - Athena"})}),Object(p.jsx)("h1",{children:"Ooops!"}),Object(p.jsx)("p",{children:"It looks like an un expected error occured on our site. Please give us some time to solve the issue!"}),Object(p.jsx)(r.b,{className:"athena-error-btn",to:"/",children:"Go back to home"})]})}),M=n(19),U=n.n(M);n(60);var F=function(e){var t=e.id,n=e.children,a=e.bgColor,c=e.color,s=e.buttonClicked;return Object(p.jsx)("div",{id:t,className:"athena-button",style:{backgroundColor:a,color:c},onClick:function(e){s&&s(e)},children:n})};n(61);var I=function(e){var t=e.id,n=e.available,a=e.name,c=e.icon,s=Object(i.f)(),r=function(){n?s("/dashboard/".concat(t)):window.location.replace("/invite")};return Object(p.jsxs)("div",{className:"athena-server",onClick:r,children:[Object(p.jsxs)("div",{className:"server-top",children:[Object(p.jsx)("div",{style:{backgroundImage:"url(".concat(c||"/assets/images/default.png",")")},className:"server-bg"}),Object(p.jsx)("div",{className:"server-icon",children:Object(p.jsx)("img",{src:c||"/assets/images/default.png",alt:""})})]}),Object(p.jsxs)("div",{className:"server-bottom",children:[Object(p.jsx)("h3",{children:a}),Object(p.jsx)(F,{buttonClicked:r,children:n?"Go To Dashboard":"Invite Athena"})]})]})};n(62);var L=function(){var e=Object(a.useContext)(m),t=e.getUserGuilds,n=e.servers;return Object(a.useEffect)((function(){if(!U.a.get("session"))return window.location.replace("/oauth/login");n||t()}),[]),Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)(o.a,{children:Object(p.jsx)("title",{children:"Servers - Athena"})}),Object(p.jsxs)("div",{className:"athena-servers-container",children:[Object(p.jsx)(x,{}),Object(p.jsxs)("div",{className:"athena-servers",children:[Object(p.jsxs)("div",{className:"athena-servers-head",children:[Object(p.jsx)("h1",{children:"Your Servers"}),Object(p.jsx)("p",{children:"All of the servers that you can manage are listed here.."})]}),Object(p.jsx)("div",{className:"athena-servers-body",children:n?null===n||void 0===n?void 0:n.map((function(e){return Object(p.jsx)(I,{id:e.id,available:e.available,name:e.name,icon:e.icon?e.icon:"/assets/images/default.png"})})):Object(p.jsx)(y,{active:!0})})]}),Object(p.jsx)(g,{})]})]})},P=n(36);n(63);var B=function(){var e,t,n=Object(a.useContext)(m).currentServer;return n?Object(p.jsxs)("div",{className:"module-overview-container",children:[Object(p.jsxs)("div",{className:"dash-module-prop",children:[Object(p.jsx)("h5",{className:"dash-module-prop-name",children:"Text Channels"}),Object(p.jsx)("h5",{className:"dash-module-prop-value",children:(null===n||void 0===n||null===(e=n.channels)||void 0===e?void 0:e.text)?n.channels.text:0})]}),Object(p.jsxs)("div",{className:"dash-module-prop",children:[Object(p.jsx)("h5",{className:"dash-module-prop-name",children:"Voice Channels"}),Object(p.jsx)("h5",{className:"dash-module-prop-value",children:(null===n||void 0===n||null===(t=n.channels)||void 0===t?void 0:t.voice)?n.channels.voice:0})]}),Object(p.jsxs)("div",{className:"dash-module-prop",children:[Object(p.jsx)("h5",{className:"dash-module-prop-name",children:"Members"}),Object(p.jsx)("h5",{className:"dash-module-prop-value",children:(null===n||void 0===n?void 0:n.members)?n.members:0})]}),Object(p.jsxs)("div",{className:"dash-module-prop",children:[Object(p.jsx)("h5",{className:"dash-module-prop-name",children:"Roles"}),Object(p.jsx)("h5",{className:"dash-module-prop-value",children:(null===n||void 0===n?void 0:n.roles)?n.roles:0})]}),Object(p.jsxs)("div",{className:"dash-module-prop",children:[Object(p.jsx)("h5",{className:"dash-module-prop-name",children:"Created At"}),Object(p.jsx)("h5",{className:"dash-module-prop-value",children:(null===n||void 0===n?void 0:n.createdAt)?n.createdAt:"Unknown"})]})]}):Object(p.jsx)(y,{active:!0,loaderMsg:"Loading server data.."})},q=n(11);n(64);var G=function(e){var t=e.loading,n=e.active,c=e.savedChanges,s=e.resetChanges,r=function(){b()(".athena-changes-detected-container").addClass("athena-changes-detected-closing"),setTimeout((function(){b()(".athena-changes-detected-container p").text("Changes, detected! Save changes or reset"),b()(".athena-changes-detected-container").removeAttr("style")}),700)},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e||(b()(".athena-changes-detected-container p").text("An error has occured! Try again"),b()(".athena-changes-detected-container").css("background-color","var(--primary-error)")),setTimeout((function(){return r()}),t)};return n?Object(p.jsxs)("div",{className:"athena-changes-detected-container",children:[Object(p.jsx)("p",{children:"Changes, detected! Save changes or reset"}),Object(p.jsxs)("div",{className:"athena-changes-detected-buttons",children:[Object(p.jsx)(F,{id:"reset-btn",buttonClicked:function(){s&&s(i)},children:"Reset Changes"}),Object(p.jsx)(F,{buttonClicked:function(){c&&c(i)},children:t?Object(p.jsx)(y,{active:!0,loaderColor:"white",loaderMsg:"__empty"}):"Save Changes"})]})]}):Object(p.jsx)(a.Fragment,{})},D=(n(65),function(e){var t=e.options,n=e.inputUpdated,c=Object(a.useState)([]),s=Object(h.a)(c,2),r=s[0],i=s[1],o=Object(a.useState)(),l=Object(h.a)(o,2),d=l[0],u=l[1],j=Object(a.useState)(!1),b=Object(h.a)(j,2),m=b[0],v=b[1],O=0;Object(a.useEffect)((function(){var e=t.filter((function(e){return!0!==e.active})),n=null;t.forEach((function(e){e.active&&!n&&(n=e)})),i(e),u(n)}),[t]);var f=function(){v(!m)};return Object(p.jsxs)("div",{className:"athena-input-select-container",children:[Object(p.jsx)("div",{className:"athena-input-select-main",onClick:f,children:Object(p.jsx)("p",{children:(null===d||void 0===d?void 0:d.content)?d.content:"Not selected"})}),m?Object(p.jsx)("ul",{className:"athena-input-options",children:r.map((function(e){return e.compId=O++,Object(p.jsx)("li",{onClick:function(){!function(e){var t=r;d&&t.push(d),t=t.filter((function(t){return t!==e})),u(e),i(t),n&&n(e),f()}(e)},className:"athena-input-option",children:e.content},e.compId)}))}):Object(p.jsx)(a.Fragment,{})]})}),V=(n(66),function(e){var t=e.placeHolder,n=e.value,c=e.id,s=e.inputUpdated,r=Object(a.useState)(n),i=Object(h.a)(r,2),o=i[0],l=i[1];return Object(p.jsx)(a.Fragment,{children:Object(p.jsx)("input",{id:c,className:"athena-input-text",type:"text",value:o,placeholder:t,onChange:function(e){l(e.currentTarget.value),s&&s(e.currentTarget.value)}})})}),H=function(){var e=Object(A.a)(E.a.mark((function e(t,n,a){var c;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(U.a.get("session")){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch("/api/guilds/".concat(t,"/").concat(n),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return 200===e.status})).catch((function(e){return!1}));case 5:return c=e.sent,e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),J=H,W=function(){var e=Object(A.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getAvailableLanguages").then((function(e){return e.json()})).then((function(e){return e.data})).catch((function(e){return null}));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Y=W;var z=function(){var e,t=Object(a.useContext)(m),n=t.currentServer,c=t.setCurrentServer,s=Object(a.useState)(null===n||void 0===n||null===(e=n.modules)||void 0===e?void 0:e.settings),r=Object(h.a)(s,2),i=r[0],o=r[1],l=Object(a.useState)(!1),d=Object(h.a)(l,2),u=d[0],j=d[1],b=Object(a.useState)(!1),v=Object(h.a)(b,2),O=v[0],f=v[1],x=Object(a.useState)(!1),g=Object(h.a)(x,2),N=g[0],k=g[1],C=Object(a.useState)(),w=Object(h.a)(C,2),S=w[0],R=w[1];Object(a.useEffect)((function(){Object(A.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S){e.next=5;break}return e.next=3,Y(null===n||void 0===n?void 0:n.id);case 3:(t=e.sent)&&R(t);case 5:case"end":return e.stop()}}),e)})))()}),[]),Object(a.useEffect)((function(){N?j(!0):k(!0)}),[i,j]);var T=function(){var e=Object(A.a)(E.a.mark((function e(t){var a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f(!0),e.next=3,J(null===n||void 0===n?void 0:n.id,"settings",i);case 3:(a=e.sent)&&(n.modules.settings=i),t(a,400),setTimeout((function(){c(n),f(!1),j(!1)}),1500);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return i?Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)("div",{className:"module-settings-container",children:Object(p.jsxs)("div",{className:"module-prop",children:[Object(p.jsx)("h3",{className:"module-prop-title",children:"Bot Prefix"}),Object(p.jsx)("p",{className:"module-prop-description",children:"Change Athena's prefix in your server."}),Object(p.jsx)("hr",{}),Object(p.jsx)("div",{className:"module-prop-body",children:Object(p.jsx)(V,{inputUpdated:function(e){o((function(t){return Object(q.a)(Object(q.a)({},t),{},{prefix:e})}))},value:null===i||void 0===i?void 0:i.prefix})})]})}),Object(p.jsx)("div",{className:"module-settings-container",children:Object(p.jsxs)("div",{className:"module-prop",children:[Object(p.jsx)("h3",{className:"module-prop-title",children:"Bot Language"}),Object(p.jsx)("p",{className:"module-prop-description",children:"Change Athena's language in your server."}),Object(p.jsx)("hr",{}),Object(p.jsx)("div",{className:"module-prop-body",children:Object(p.jsx)(D,{inputUpdated:function(e){o((function(t){return Object(q.a)(Object(q.a)({},t),{},{language:e.id})}))},options:S?S.map((function(e){return{content:e.label,id:e.id,active:(null===i||void 0===i?void 0:i.language)===e.id}})):[]})})]})}),Object(p.jsx)(G,{resetChanges:function(e){var t;(null===n||void 0===n||null===(t=n.modules)||void 0===t?void 0:t.settings)&&(o(null),e(),setTimeout((function(){var e;o(null===n||void 0===n||null===(e=n.modules)||void 0===e?void 0:e.settings),f(!1),j(!1)}),700))},savedChanges:T,loading:O,active:u})]}):Object(p.jsx)(y,{loaderMsg:"Loading server settings..",active:!0})},K=function(){var e=Object(A.a)(E.a.mark((function e(t){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(U.a.get("session")){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch("/api/guilds/".concat(t,"/getAvailableRoles")).then((function(e){return e.json()})).then((function(e){return e.data})).catch((function(e){return null}));case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=K;var X=function(){var e,t=Object(a.useContext)(m),n=t.currentServer,c=t.setCurrentServer,s=Object(a.useState)(null===n||void 0===n||null===(e=n.modules)||void 0===e?void 0:e.moderation),r=Object(h.a)(s,2),i=r[0],o=r[1],l=Object(a.useState)(!1),d=Object(h.a)(l,2),u=d[0],j=d[1],b=Object(a.useState)(!1),v=Object(h.a)(b,2),O=v[0],f=v[1],x=Object(a.useState)(!1),g=Object(h.a)(x,2),N=g[0],k=g[1],C=Object(a.useState)(),w=Object(h.a)(C,2),S=w[0],R=w[1];Object(a.useEffect)((function(){Object(A.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S){e.next=5;break}return e.next=3,Q(null===n||void 0===n?void 0:n.id);case 3:(t=e.sent)&&(null===t||void 0===t||t.push({id:null,name:"Not selected"}),R(t));case 5:case"end":return e.stop()}}),e)})))()}),[]),Object(a.useEffect)((function(){N?j(!0):k(!0)}),[i,o]);var T=function(){var e=Object(A.a)(E.a.mark((function e(t){var a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f(!0),e.next=3,J(null===n||void 0===n?void 0:n.id,"moderation",i);case 3:(a=e.sent)&&(n.modules.moderation=i),t(a,400),setTimeout((function(){c(n),f(!1),j(!1)}),1500);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return i?Object(p.jsxs)(a.Fragment,{children:[Object(p.jsx)("div",{className:"module-moderation-container",children:Object(p.jsx)("div",{className:"module-configuration-container",children:Object(p.jsxs)("div",{className:"module-prop",children:[Object(p.jsx)("h3",{className:"module-prop-title",children:"Admin Role"}),Object(p.jsx)("p",{className:"module-prop-description",children:"Change the admin role in your server."}),Object(p.jsx)("hr",{}),Object(p.jsx)("div",{className:"module-prop-body",children:Object(p.jsx)(D,{inputUpdated:function(e){o((function(t){return Object(q.a)(Object(q.a)({},t),{},{adminRole:e.id})}))},options:S?S.map((function(e){return{content:e.name,id:e.id,active:i.adminRole===e.id}})):[]})})]})})}),Object(p.jsx)("div",{className:"module-moderation-container",children:Object(p.jsx)("div",{className:"module-configuration-container",children:Object(p.jsxs)("div",{className:"module-prop",children:[Object(p.jsx)("h3",{className:"module-prop-title",children:"Mod Role"}),Object(p.jsx)("p",{className:"module-prop-description",children:"Change mod role in your server."}),Object(p.jsx)("hr",{}),Object(p.jsx)("div",{className:"module-prop-body",children:Object(p.jsx)(D,{inputUpdated:function(e){o((function(t){return Object(q.a)(Object(q.a)({},t),{},{modRole:e.id})}))},options:S?S.map((function(e){return{content:e.name,id:e.id,active:i.modRole===e.id}})):[]})})]})})}),Object(p.jsx)("div",{className:"module-moderation-container",children:Object(p.jsx)("div",{className:"module-configuration-container",children:Object(p.jsxs)("div",{className:"module-prop",children:[Object(p.jsx)("h3",{className:"module-prop-title",children:"Auto Role"}),Object(p.jsx)("p",{className:"module-prop-description",children:"Change auto role in your server."}),Object(p.jsx)("hr",{}),Object(p.jsx)("div",{className:"module-prop-body",children:Object(p.jsx)(D,{inputUpdated:function(e){o((function(t){return Object(q.a)(Object(q.a)({},t),{},{autoRole:e.id})}))},options:S?S.map((function(e){return{content:e.name,id:e.id,active:i.autoRole===e.id}})):[]})})]})})}),Object(p.jsx)(G,{resetChanges:function(e){var t;(null===n||void 0===n||null===(t=n.modules)||void 0===t?void 0:t.moderation)&&(o(null),e(),setTimeout((function(){var e;o(null===n||void 0===n||null===(e=n.modules)||void 0===e?void 0:e.moderation),f(!1),j(!1)}),700))},savedChanges:T,loading:O,active:u})]}):Object(p.jsx)(y,{loaderMsg:"Loading moderation settings..",active:!0})};n(67);var Z=function(){return Object(p.jsxs)("div",{className:"module-notice",children:[Object(p.jsx)("h5",{children:"WARNING:\xa0\xa0"}),Object(p.jsx)("p",{children:"This module is currently under maintenance, thank you for your understanding!"})]})};var $=function(){return Object(p.jsx)("div",{className:"module-music-container",children:Object(p.jsx)(Z,{})})},ee=function(e){var t=e.category,n=t.slice(0,1).toUpperCase()+t.slice(1,t.length),c=function(){switch(t){case"overview":return Object(p.jsx)(B,{});case"settings":return Object(p.jsx)(z,{});case"moderation":return Object(p.jsx)(X,{});case"music":return Object(p.jsx)($,{});default:return Object(p.jsx)(a.Fragment,{})}};return Object(p.jsxs)("div",{className:"dash-module",children:[Object(p.jsxs)("div",{className:"dash-module-title",children:[Object(p.jsx)("h1",{children:n}),Object(p.jsx)(f,{drodpownOptions:[{label:"Servers",link:"/servers",passive:!0},{label:"Logout",link:"/oauth/logout",passive:!1,color:"var( --primary-error)"}]})]}),Object(p.jsx)("div",{className:"dash-module-body",children:Object(p.jsx)(c,{})})]})};n(68);var te=function(){var e=Object(a.useContext)(m),t=e.guilds,n=e.setCurrentServer,c=Object(i.g)().guildId,s=Object(i.f)(),r=Object(a.useState)([]),o=Object(h.a)(r,2),l=o[0],d=o[1],j=Object(a.useState)("overview"),O=Object(h.a)(j,2),f=O[0],x=O[1];Object(a.useEffect)((function(){Object(A.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object(M.get)("session")){e.next=4;break}return e.abrupt("return",window.location.replace("/oauth/login"));case 4:return e.next=6,fetch("/api/guilds/".concat(c)).then(function(){var e=Object(A.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,t.json();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return null}));case 6:if(t=e.sent){e.next=9;break}return e.abrupt("return",s("/servers"));case 9:n(t),d(t);case 11:case"end":return e.stop()}}),e)})))()}),[t,c,s]);var g=function(){b()(".dash-module-selector").removeClass("module-selectory-enabled"),b()(".athena-dash-fade").css("display","none")},N=function(e){x(e),g()};return Object(a.useEffect)((function(){b()(".dash-module-title h1").off("click").on("click",(function(e){b()(".dash-module-selector").hasClass("module-selectory-enabled")?g():(b()(".dash-module-selector").addClass("module-selectory-enabled"),b()(".athena-dash-fade").css("display","block"))})),b()(".athena-dash-fade").off("click").on("click",(function(e){g()}))})),Object(p.jsxs)("div",{className:"athena-dash-container",children:[Object(p.jsx)("div",{className:"athena-dash-fade"}),l?Object(p.jsxs)(a.Fragment,{children:[Object(p.jsxs)("div",{className:"dash-module-selector",children:[Object(p.jsxs)("div",{className:"module-selector-guild",children:[Object(p.jsx)("div",{style:{backgroundImage:"url(".concat((null===l||void 0===l?void 0:l.icon)?l.icon:"/assets/images/default.png",")")},className:"module-selector-guild-background"}),Object(p.jsxs)("div",{className:"module-selector-guild-inner",children:[Object(p.jsx)("img",{src:(null===l||void 0===l?void 0:l.icon)?l.icon:"/assets/images/default.png",alt:(null===l||void 0===l?void 0:l.name)?l.name:"Guild Name"}),Object(p.jsx)("h5",{children:(null===l||void 0===l?void 0:l.name)?l.name:"Guild Name"})]})]}),Object(p.jsxs)("ul",{className:"module-selector-body",children:[Object(p.jsx)("p",{className:"module-selectory-body-title",children:"CATEGORIES"}),Object(p.jsxs)("li",{onClick:function(){N("overview")},className:"module-selectory-body-element",children:[Object(p.jsx)(u.b,{}),Object(p.jsx)("p",{children:"Overview"})]}),Object(p.jsxs)("li",{onClick:function(){N("settings")},className:"module-selectory-body-element",children:[Object(p.jsx)(v.b,{}),Object(p.jsx)("p",{children:"Settings"})]}),Object(p.jsxs)("li",{onClick:function(){N("moderation")},className:"module-selectory-body-element",children:[Object(p.jsx)(u.d,{}),Object(p.jsx)("p",{children:"Moderation"})]}),Object(p.jsxs)("li",{onClick:function(){N("music")},className:"module-selectory-body-element",children:[Object(p.jsx)(P.a,{}),Object(p.jsx)("p",{children:"Music"})]})]})]}),Object(p.jsx)("div",{className:"dash-module-container",children:Object(p.jsx)(ee,{category:f})})]}):Object(p.jsx)(y,{coverAllPage:!0,active:!0})]})},ne=(n(69),n(70),function(){var e=Object(a.useContext)(m).getUser;return Object(a.useEffect)((function(){e()}),[e]),Object(p.jsx)(r.a,{children:Object(p.jsxs)(i.c,{children:[Object(p.jsx)(i.a,{path:"/",element:Object(p.jsx)(N,{})}),Object(p.jsx)(i.a,{path:"/commands",element:Object(p.jsx)(C,{})}),Object(p.jsx)(i.a,{path:"/servers",element:Object(p.jsx)(L,{})}),Object(p.jsx)(i.a,{path:"/dashboard/:guildId",element:Object(p.jsx)(te,{})}),Object(p.jsx)(i.a,{path:"/privacy",element:Object(p.jsx)(T,{page:"privacy"})}),Object(p.jsx)(i.a,{path:"/terms",element:Object(p.jsx)(T,{page:"terms"})}),Object(p.jsx)(i.a,{path:"/error",element:Object(p.jsx)(_,{})}),Object(p.jsx)(i.a,{path:"/*",element:Object(p.jsx)(w,{})})]})})}),ae=n(77),ce=function(e,t){switch(t.type){case"SET_USER":return Object(q.a)(Object(q.a)({},e),{},{user:t.payload});case"SET_SERVERS":return Object(q.a)(Object(q.a)({},e),{},{servers:t.payload});case"SET_COMMANDS":return Object(q.a)(Object(q.a)({},e),{},{commands:t.payload});case"SET_CURRENT_SERVER":return Object(q.a)(Object(q.a)({},e),{},{currentServer:t.payload});default:return e}},se={user:null,servers:null,commands:null,currentServer:null},re=function(e){var t=Object(a.useReducer)(ce,se),n=Object(h.a)(t,2),c=n[0],s=n[1],r=Object(ae.a)(0),i=Object(h.a)(r,1)[0],o=function(){var e=Object(A.a)(E.a.mark((function e(t){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===i||void 0===i?void 0:i.session){e.next=2;break}return e.abrupt("return");case 2:if(t||!c.user){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,fetch("/api/users/@me").then(function(){var e=Object(A.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,t.json();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){return e.data})).catch((function(e){return null}));case 6:if(n=e.sent){e.next=9;break}return e.abrupt("return");case 9:s({type:"SET_USER",payload:n});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(A.a)(E.a.mark((function e(t){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===i||void 0===i?void 0:i.session){e.next=2;break}return e.abrupt("return");case 2:if(t||!c.servers){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,fetch("/api/users/@me/guilds").then(function(){var e=Object(A.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,t.json();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){return e.data})).catch((function(e){return null}));case 6:if(n=e.sent){e.next=9;break}return e.abrupt("return");case 9:s({type:"SET_SERVERS",payload:n});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(A.a)(E.a.mark((function e(t){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t||!c.commands){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,fetch("/api/commands").then(function(){var e=Object(A.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,t.json();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){return e.data})).catch((function(e){return null}));case 4:if(n=e.sent){e.next=7;break}return e.abrupt("return");case 7:s({type:"SET_COMMANDS",payload:n});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(A.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s({type:"SET_CURRENT_SERVER",payload:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)(m.Provider,{value:Object(q.a)(Object(q.a)({},c),{},{getUser:o,getUserGuilds:l,getCommands:d,setCurrentServer:u}),children:e.children})};s.a.render(Object(p.jsx)(re,{children:Object(p.jsx)(ne,{})}),document.getElementById("__athena"))}},[[71,1,2]]]);