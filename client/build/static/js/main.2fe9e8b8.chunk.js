(this["webpackJsonptest-app"]=this["webpackJsonptest-app"]||[]).push([[0],{42:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(19),r=a.n(s),c=a(9),o=a(4),i=a(15),l=a(66),d=a(67),u=a(33),h=a(10),j=a.n(h),m=a(7),b=Object(n.createContext)({}),p=a(30),f=(a(42),a(1));var v=function(e){var t=e.options,a=void 0===t?[]:t,n=e.disabled,s=void 0===n||n,r=Object(o.f)(),c=0;return Object(f.jsx)("ul",{className:s?"dropdown disabled":"dropdown",children:null===a||void 0===a?void 0:a.map((function(e){return Object(f.jsx)("li",{style:{color:"".concat(e.color)},onClick:function(){!function(e){arguments.length>1&&void 0!==arguments[1]&&!arguments[1]?window.location.replace(e):r(e)}(e.link,e.passive)},children:e.label},c++)}))})},O=(a(44),function(e){var t=e.drodpownOptions,a=Object(n.useContext)(b).user,s=Object(n.useState)(!0),r=Object(m.a)(s,2),c=r[0],o=r[1];return Object(f.jsxs)(n.Fragment,{children:[Object(f.jsx)("div",{className:"profile-part",children:a?Object(f.jsxs)("div",{id:"profile",className:"profile",onClick:function(){c?(o(!1),j()(".dropdown-icon").addClass("profile-dropdown-icon-collapsed")):(o(!0),j()(".dropdown-icon").removeClass("profile-dropdown-icon-collapsed"))},children:[Object(f.jsx)("img",{id:"profile-avatar",src:a.avatar?"https://cdn.discordapp.com/avatars/".concat(a.id,"/").concat(a.avatar,".png"):"/assets/images/default.png",alt:"Profile"}),Object(f.jsx)("p",{id:"profile-username",children:a.username}),Object(f.jsx)(p.a,{className:"dropdown-icon"})]}):Object(f.jsx)("a",{id:"log-btn",className:"loginBtn",href:"/oauth/login",children:"Login"})}),Object(f.jsx)(v,{options:t,disabled:c})]})}),y=(a(45),function(e){var t=e.activeElement;return Object(f.jsx)(n.Fragment,{children:Object(f.jsx)("div",{className:"athena-navbar",children:Object(f.jsxs)(l.a,{bg:"transparent",expand:"lg",collapseOnSelect:!0,variant:"dark",children:[Object(f.jsx)(c.b,{className:"navbar-brand",to:"/",children:Object(f.jsx)("img",{src:"/assets/images/logo.png",width:"64",height:"64",className:"d-inline-block align-top",alt:"Athena"})}),Object(f.jsx)(u.a,{className:"athena-navbar-toggler",onClick:function(){j()("#basic-navbar-nav").hasClass("collapse")?(j()("#basic-navbar-nav").removeClass("collapse"),j()("#basic-navbar-nav").addClass("collapsed"),j()("#basic-navbar-nav").addClass("fadeIn"),setTimeout((function(){j()("#basic-navbar-nav").removeClass("fadeIn")}),400)):(j()("#basic-navbar-nav").removeClass("collapsed"),j()("#basic-navbar-nav").addClass("collapse"))}}),Object(f.jsxs)(l.a.Collapse,{id:"basic-navbar-nav",children:[Object(f.jsxs)(d.a,{className:"mr-auto",children:[Object(f.jsx)(c.b,{className:"home"===t?"active nav-link":"nav-link",to:"/",children:"Home"}),Object(f.jsx)(c.b,{className:"commands"===t?"active nav-link":"nav-link",to:"/commands",children:"Commands"}),Object(f.jsx)("a",{target:"_blank",rel:"noopener noreferrer",className:"support"===t?"active nav-link":"nav-link",href:"/support",children:"Support"})]}),Object(f.jsx)(O,{drodpownOptions:[{label:"Servers",link:"/servers",passive:!0},{label:"Logout",link:"/oauth/logout",passive:!1,color:"var( --primary-error)"}]})]})]})})})}),x=(a(49),function(){return Object(f.jsx)("div",{className:"athena-footer",children:Object(f.jsxs)("div",{className:"athena-footer-content",children:[Object(f.jsxs)("div",{className:"athena-footer-brand",children:[Object(f.jsx)("img",{src:"/assets/images/logo.png",alt:"Athena"}),Object(f.jsx)("p",{children:"Athena is a multi-purpose discord bot that aims to serve every function of a discord bot that can perform."})]}),Object(f.jsxs)("div",{className:"athena-footer-link-part",children:[Object(f.jsxs)("ul",{className:"athena-footer-links",children:[Object(f.jsx)("h3",{children:"General"}),Object(f.jsx)("li",{children:Object(f.jsx)(c.b,{to:"/",children:"Home"})}),Object(f.jsx)("li",{children:Object(f.jsx)(c.b,{to:"/commands",children:"Commands"})})]}),Object(f.jsxs)("ul",{className:"athena-footer-links",children:[Object(f.jsx)("h3",{children:"Legal"}),Object(f.jsx)("li",{children:Object(f.jsx)(c.b,{to:"/privacy",children:"Privacy Policy"})}),Object(f.jsx)("li",{children:Object(f.jsx)(c.b,{to:"/tos",children:"Terms of Service"})}),Object(f.jsx)("li",{children:Object(f.jsx)(c.b,{to:"/contact",children:"Contact Us"})})]})]})]})})}),g=(a(50),function(){return Object(f.jsxs)("div",{className:"athena-main",children:[Object(f.jsx)(i.a,{children:Object(f.jsx)("title",{children:"Athena - The Discord Bot"})}),Object(f.jsx)(y,{activeElement:"home"}),Object(f.jsx)("header",{children:Object(f.jsxs)("div",{className:"headMsg",children:[Object(f.jsxs)("h1",{children:["A Discord Bot that can fulfill your server needs for"," ",Object(f.jsx)("span",{style:{color:"var(--primary-theme)"},children:"FREE"})]}),Object(f.jsx)("p",{children:"Athena is a multi-functional discord bot that offers many services for free such as playing any song you desire or making moderation of your server easier."})]})}),Object(f.jsx)("main",{children:Object(f.jsxs)("div",{className:"features",children:[Object(f.jsx)("div",{className:"feature",children:Object(f.jsxs)("div",{id:"feature_music",className:"featureContent",children:[Object(f.jsx)("img",{src:"/assets/images/feature_music.svg",alt:"Music"}),Object(f.jsxs)("div",{className:"feature_desc",children:[Object(f.jsx)("h1",{children:"Music"}),Object(f.jsx)("p",{children:"Athena has a powerful music module which you can listen to music from Youtube and Spotify."})]})]})}),Object(f.jsx)("div",{className:"feature",children:Object(f.jsxs)("div",{id:"feature_moderation",className:"featureContent",children:[Object(f.jsx)("img",{src:"/assets/images/feature_moderation.svg",alt:"Music"}),Object(f.jsxs)("div",{className:"feature_desc",children:[Object(f.jsx)("h1",{children:"Moderation"}),Object(f.jsx)("p",{children:"With Athena's big range of moderation commands you can moderate your server easily and quickly!"})]})]})}),Object(f.jsx)("div",{className:"feature",children:Object(f.jsxs)("div",{id:"feature_fun",className:"featureContent",children:[Object(f.jsx)("img",{src:"/assets/images/feature_fun.svg",alt:"Music"}),Object(f.jsxs)("div",{className:"feature_desc",children:[Object(f.jsx)("h1",{children:"Fun"}),Object(f.jsx)("p",{children:"Do you like fun commands such as magik ? Because we do and we put some fun commands to Athena that you may love such as mimic command!"})]})]})}),Object(f.jsx)("div",{className:"feature",children:Object(f.jsxs)("div",{id:"feature_misc",className:"featureContent",children:[Object(f.jsx)("img",{src:"/assets/images/feature_misc.svg",alt:"Music"}),Object(f.jsxs)("div",{className:"feature_desc",children:[Object(f.jsx)("h1",{children:"Misc"}),Object(f.jsx)("p",{children:"Other commands that we couldn't put in a section such as fortnite stats or weather forecast."})]})]})})]})}),Object(f.jsx)("footer",{children:Object(f.jsxs)("div",{className:"question",children:[Object(f.jsx)("h1",{children:"Ready to try Athena?"}),Object(f.jsx)("a",{href:"/invite",className:"btn-main",children:"Invite Athena!"})]})}),Object(f.jsx)(x,{})]})}),w=(a(51),function(e){var t=e.active,a=e.coverAllPage,s=e.loaderMsg;return Object(n.useEffect)((function(){t?document.getElementById("loader").classList.remove("loader-disabled"):(document.getElementById("loader").classList.add("loader-disabled"),setTimeout((function(){document.getElementById("loader").classList.add("disabled")}),610)),a?document.getElementById("loader").classList.add("cover"):document.getElementById("loader").classList.remove("cover")})),Object(f.jsx)("div",{id:"loader",children:Object(f.jsxs)("div",{className:"spinner",children:[Object(f.jsx)("div",{className:"bounce1"}),Object(f.jsx)("div",{className:"bounce2"}),Object(f.jsx)("div",{className:"bounce3"}),Object(f.jsx)("p",{children:s||"Sit tight! We are getting there.."})]})})}),N=(a(52),function(e){var t=e.name,a=e.usage,n=e.description,s=e.reqPerms,r=e.reqBotPerms;return Object(f.jsxs)("div",{className:"command",onClick:function(e){j()(e.currentTarget).children(".command-expand").hasClass("command-active")?j()(e.currentTarget).children(".command-expand").removeClass("command-active"):j()(e.currentTarget).children(".command-expand").addClass("command-active")},children:[Object(f.jsxs)("h5",{children:["at! ",Object(f.jsx)("span",{id:"command-name",children:t})," ",Object(f.jsx)("code",{children:a||"None"})]}),Object(f.jsxs)("div",{className:"command-expand",children:[Object(f.jsxs)("p",{children:["Description:"," ",Object(f.jsx)("span",{id:"command-desc",children:n||"None"})]}),Object(f.jsxs)("p",{children:["Required Perms:"," ",Object(f.jsx)("code",{id:"command-req-perms",children:s&&s.length>0?s.join(", "):"None"})]}),Object(f.jsxs)("p",{children:["Required Bot Perms:"," ",Object(f.jsx)("code",{id:"command-req-bot-perms",children:r&&r.length>0?r.join(", "):"None"})]})]})]})}),k=(a(53),function(){var e=0,t=0,a=Object(n.useContext)(b),s=a.getCommands,r=a.commands,c=Object(n.useState)(!1),o=Object(m.a)(c,2),l=o[0],d=o[1],u=Object(n.useState)([]),h=Object(m.a)(u,2),p=h[0],v=h[1],O=Object(n.useState)([]),g=Object(m.a)(O,2),k=g[0],C=g[1];Object(n.useEffect)((function(){s()}),[]),Object(n.useEffect)((function(){r?(v(r),C(r),d(!0)):(v([]),C([]),d(!1))}),[r]);var I=function(e,t){if(e&&p&&r){var a;if("All"===e)a=p;else{var n=[];n.push(p),a=n.filter((function(t){return t.category!==e}));for(var s=0;s<a.length;s++)a[s].commands=[];a.push(p.find((function(t){return t.category===e})))}for(var c=document.getElementsByClassName("category"),o=0;o<c.length;o++)c[o].classList=["category"];C(a),t.currentTarget.classList.add("activeCategory"),j()(".command .command-active").removeClass("command-active")}};return Object(f.jsxs)(n.Fragment,{children:[Object(f.jsx)(i.a,{children:Object(f.jsx)("title",{children:"Commands - Athena"})}),Object(f.jsx)(y,{activeElement:"commands"}),Object(f.jsxs)("div",{className:"command-page-header",children:[Object(f.jsx)("h1",{style:{color:"var(--primary-theme)"},children:"Commands"}),Object(f.jsx)("p",{children:"List of all commands that is currently running on Athena."})]}),Object(f.jsx)("main",{children:Object(f.jsx)("div",{className:"commands-container",children:l?Object(f.jsxs)(n.Fragment,{children:[Object(f.jsxs)("div",{className:"categories",children:[Object(f.jsx)("h5",{className:"category activeCategory",onClick:function(e){I("All",e)},children:"All"}),null===p||void 0===p?void 0:p.map((function(e){return t++,Object(f.jsx)("h5",{onClick:function(t){I(e.category,t)},className:"category",children:e.category},t)}))]}),Object(f.jsx)("div",{className:"commands",children:k.map((function(t){return t.commands.map((function(t){return e++,Object(f.jsx)(N,{name:t.name,usage:t.usage,description:t.description,reqPerms:t.required_perms,reqBotPerms:t.required_bot_perms},e)}))}))})]}):Object(f.jsx)(w,{active:!0})})}),Object(f.jsx)(x,{})]})}),C=(a(54),function(){return Object(f.jsxs)("div",{className:"athena-pg-not-found-container",children:[Object(f.jsx)("h1",{children:"404"}),Object(f.jsx)("p",{children:"Ooops! It looks like the page you are trying to access not found!"}),Object(f.jsx)(c.b,{className:"athena-pg-not-found-btn",to:"/",children:"Go back to home"})]})}),I=function(){return Object(f.jsxs)(n.Fragment,{children:[Object(f.jsx)("h2",{children:"Introduction"}),Object(f.jsxs)("p",{children:["Your privacy is important to us. It is Athena's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, ",Object(f.jsx)("a",{href:"https://      athena.bot",children:"https://athena.bot"}),", and other sites we own and operate."," "]}),Object(f.jsxs)("p",{children:["This policy is effective as of 11 May 2021 and was last updated on 11 May 2021."," "]}),Object(f.jsx)("h3",{children:"Information We Collect"}),Object(f.jsxs)("p",{children:["Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services."," "]}),Object(f.jsx)("h4",{children:"Log Data"}),Object(f.jsxs)("p",{children:["When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device\u2019s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, other details about your visit, and technical details that occur in conjunction with any errors you may encounter."," "]}),Object(f.jsxs)("p",{children:["Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons."," "]}),Object(f.jsx)("h4",{children:"Collection and Use of Information"}),Object(f.jsxs)("p",{children:["We may collect personal information from you when you do any of the following on our website:"," "]}),Object(f.jsxs)("ul",{children:[Object(f.jsx)("li",{children:"Use a mobile device or web browser to access our content"}),Object(f.jsx)("li",{children:"Contact us via email, social media, or on any similar technologies"}),Object(f.jsx)("li",{children:"When you mention us on social media"})]}),Object(f.jsxs)("p",{children:["We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:"," "]}),Object(f.jsxs)("p",{children:["Please be aware that we may combine information we collect about you with general information or research data we receive from other trusted sources."," "]}),Object(f.jsx)("h4",{children:"Security of Your Personal Information"}),Object(f.jsxs)("p",{children:["When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification."," "]}),Object(f.jsxs)("p",{children:["Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach."," "]}),Object(f.jsxs)("p",{children:["You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services."," "]}),Object(f.jsx)("h4",{children:"How Long We Keep Your Personal Information"}),Object(f.jsxs)("p",{children:["We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you."," "]}),Object(f.jsxs)("p",{children:["However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes."," "]}),Object(f.jsx)("h3",{children:"Children\u2019s Privacy"}),Object(f.jsxs)("p",{children:["We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13."," "]}),Object(f.jsx)("h3",{children:"International Transfers of Personal Information"}),Object(f.jsxs)("p",{children:["The personal information we collect is stored and/or processed where we or our partners, affiliates, and third-party providers maintain facilities. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy."," "]}),Object(f.jsx)("h3",{children:"Your Rights and Controlling Your Personal Information"}),Object(f.jsxs)("p",{children:["You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you."," "]}),Object(f.jsxs)("p",{children:["If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person\u2019s consent to provide the personal information to us."," "]}),Object(f.jsxs)("p",{children:["If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity."," "]}),Object(f.jsxs)("p",{children:["If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date."," "]}),Object(f.jsxs)("p",{children:["If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint."," "]}),Object(f.jsx)("h3",{children:"Use of Cookies"}),Object(f.jsxs)("p",{children:["We use \u201ccookies\u201d to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified."," "]}),Object(f.jsx)("h3",{children:"Limits of Our Policy"}),Object(f.jsxs)("p",{children:["Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices."," "]}),Object(f.jsx)("h3",{children:"Changes to This Policy"}),Object(f.jsxs)("p",{children:["At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy."," "]}),Object(f.jsxs)("p",{children:["If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information."," "]}),Object(f.jsx)("h3",{children:"Contact Us"}),Object(f.jsxs)("p",{children:["For any questions or concerns regarding your privacy, you may contact us using the following details:"," "]}),Object(f.jsxs)("p",{children:["Tuna",Object(f.jsx)("br",{}),"support@athena.bot"," "]})]})};a(55);var S=function(e){var t=e.page,a=Object(n.useState)("Loading.."),s=Object(m.a)(a,2),r=s[0],c=s[1],o=Object(n.useState)("Loading.."),l=Object(m.a)(o,2),d=l[0],u=l[1];return Object(n.useEffect)((function(){switch(t){case"privacy":return u("Privacy Policy"),void c(I);case"terms":return u("Terms Of Service"),void c("We are preparing our terms of service..")}}),[t,d,r]),Object(f.jsxs)(n.Fragment,{children:[Object(f.jsx)(y,{}),Object(f.jsx)(i.a,{children:Object(f.jsx)("title",{children:"Legal - Athena"})}),Object(f.jsxs)("div",{className:"athena-legal-container",children:[Object(f.jsx)("div",{className:"athena-legal-head",children:Object(f.jsx)("h1",{style:{color:"var(--primary-theme)"},children:d})}),Object(f.jsx)("div",{className:"athena-legal-content",children:r})]}),Object(f.jsx)(x,{})]})},E=(a(56),function(){return Object(f.jsxs)("div",{className:"athena-error-container",children:[Object(f.jsx)(i.a,{children:Object(f.jsx)("title",{children:"Ooops! - Athena"})}),Object(f.jsx)("h1",{children:"Ooops!"}),Object(f.jsx)("p",{children:"It looks like an un expected error occured on our site. Please give us some time to solve the issue!"}),Object(f.jsx)(c.b,{className:"athena-error-btn",to:"/",children:"Go back to home"})]})}),P=a(34),A=a.n(P);a(57);var T=function(e){var t=e.id,a=e.name,n=e.icon,s=Object(o.f)();return Object(f.jsxs)("div",{onClick:function(){!function(e){arguments.length>1&&void 0!==arguments[1]&&!arguments[1]?window.location.replace(e):s(e)}("/dashboard/".concat(t),!0)},className:"athena-server",children:[Object(f.jsx)("img",{src:n,alt:a}),Object(f.jsx)("h1",{children:a})]})};a(58);var _=function(){var e=Object(n.useContext)(b),t=e.getUserServers,a=(e.user,e.servers);return Object(n.useEffect)((function(){if(!A.a.get("session"))return window.location.replace("/oauth/login");a||t()}),[]),Object(f.jsxs)("div",{className:"athena-servers-container",children:[Object(f.jsx)(y,{}),Object(f.jsxs)("div",{className:"athena-servers",children:[Object(f.jsxs)("div",{className:"athena-servers-head",children:[Object(f.jsx)("h1",{children:"Your Servers"}),Object(f.jsx)("p",{children:"All of the servers that you can manage are listed here.."})]}),Object(f.jsx)("div",{className:"athena-servers-body",children:a?null===a||void 0===a?void 0:a.map((function(e){var t=e.name.length>=13?e.name.slice(0,11)+"..":e.name;return Object(f.jsx)(T,{id:e.id,name:t,icon:e.icon?e.icon:"/assets/images/default.png"})})):Object(f.jsx)(w,{active:!0})})]}),Object(f.jsx)(x,{})]})},q=(a(59),a(60),function(){var e=Object(n.useContext)(b).getUser;return Object(n.useEffect)((function(){e()}),[e]),Object(f.jsx)(c.a,{children:Object(f.jsxs)(o.c,{children:[Object(f.jsx)(o.a,{path:"/",element:Object(f.jsx)(g,{})}),Object(f.jsx)(o.a,{path:"/commands",element:Object(f.jsx)(k,{})}),Object(f.jsx)(o.a,{path:"/servers",element:Object(f.jsx)(_,{})}),Object(f.jsx)(o.a,{path:"/privacy",element:Object(f.jsx)(S,{page:"privacy"})}),Object(f.jsx)(o.a,{path:"/tos",element:Object(f.jsx)(S,{page:"terms"})}),Object(f.jsx)(o.a,{path:"/error",element:Object(f.jsx)(E,{})}),Object(f.jsx)(o.a,{path:"/*",element:Object(f.jsx)(C,{})})]})})}),W=a(13),L=a(18),M=a.n(L),B=a(26),R=a(68),U=function(e,t){switch(t.type){case"SET_USER":return Object(W.a)(Object(W.a)({},e),{},{user:t.payload});case"SET_SERVERS":return Object(W.a)(Object(W.a)({},e),{},{servers:t.payload});case"SET_COMMANDS":return Object(W.a)(Object(W.a)({},e),{},{commands:t.payload});default:return e}},Y={user:null,servers:null,commands:null},F=function(e){var t=Object(n.useReducer)(U,Y),a=Object(m.a)(t,2),s=a[0],r=a[1],c=Object(R.a)(0),o=Object(m.a)(c,1)[0],i=function(){var e=Object(B.a)(M.a.mark((function e(t){var a;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===o||void 0===o?void 0:o.session){e.next=2;break}return e.abrupt("return");case 2:if(t||!s.user){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,fetch("/api/users/@me").then((function(e){return e.json()})).catch((function(e){return null}));case 6:if(a=e.sent){e.next=9;break}return e.abrupt("return");case 9:r({type:"SET_USER",payload:a});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(B.a)(M.a.mark((function e(t){var a;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===o||void 0===o?void 0:o.session){e.next=2;break}return e.abrupt("return");case 2:if(t||!s.servers){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,fetch("/api/users/@me/guilds").then((function(e){return e.json()})).catch((function(e){return null}));case 6:if(a=e.sent){e.next=9;break}return e.abrupt("return");case 9:r({type:"SET_SERVERS",payload:a});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(B.a)(M.a.mark((function e(t){var a;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t||!s.commands){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,fetch("/api/commands").then((function(e){return e.json()})).catch((function(e){return null}));case 4:if(a=e.sent,console.log(a),a){e.next=8;break}return e.abrupt("return");case 8:r({type:"SET_COMMANDS",payload:a});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(f.jsx)(b.Provider,{value:Object(W.a)(Object(W.a)({},s),{},{getUser:i,getUserServers:l,getCommands:d}),children:e.children})};r.a.render(Object(f.jsx)(F,{children:Object(f.jsx)(q,{})}),document.getElementById("root"))}},[[62,1,2]]]);