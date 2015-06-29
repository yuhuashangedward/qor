!function(t){"function"==typeof define&&define.amd?define("datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"number"==typeof t}function i(t){return"undefined"==typeof t}function a(t,i){var a=[];return e(i)&&a.push(i),a.slice.apply(t,a)}function n(t){return t%4===0&&t%100!==0||t%400===0}function o(t,e){return[31,n(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function r(t){var e,i,a=t.match(/[.\/\-\s].*?/)||"/",n=t.split(/\W+/);if(!n||0===n.length)throw new Error("Invalid date format.");for(t={separator:a[0],parts:n},i=0,e=n.length;e>i;i++)switch(n[i]){case"dd":case"d":t.day=!0;break;case"mm":case"m":t.month=!0;break;case"yyyy":case"yy":t.year=!0}return t}function s(t,e){var i,a,n,o,r,s,l;if(i="string"==typeof t&&t?t.split(e.separator):[],a=e.parts.length,t=new Date,n=t.getFullYear(),o=t.getDate(),r=t.getMonth(),i.length===a)for(l=0;a>l;l++)switch(s=parseInt(i[l],10)||1,e.parts[l]){case"dd":case"d":o=s;break;case"mm":case"m":r=s-1;break;case"yy":n=2e3+s;break;case"yyyy":n=s}return new Date(n,r,o,0,0,0,0)}function l(t,e){var i,a={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()},n=[],o=e.parts.length;for(a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m,i=0;o>i;i++)n.push(a[e.parts[i]]);return n.join(e.separator)}var d=t(window),c=t(document),h=function(e,i){this.$element=t(e),this.options=t.extend({},h.DEFAULTS,t.isPlainObject(i)&&i),this.visible=!1,this.isInput=!1,this.isInline=!1,this.init()};h.prototype={constructor:h,init:function(){var e,i=this.$element,a=this.options;this.$trigger=t(a.trigger||i),this.$picker=e=t(a.template),this.$years=e.find('[data-type="years picker"]'),this.$months=e.find('[data-type="months picker"]'),this.$days=e.find('[data-type="days picker"]'),this.isInput=i.is("input")||i.is("textarea"),this.isInline=a.inline&&(a.container||!this.isInput),this.isInline?(e.find(".datepicker-arrow").hide(),t(a.container||i).append(e)):(t(a.container||"body").append(e),this.place(),e.hide()),a.date&&i.data("date",a.date),this.format=r(a.dateFormat),this.fillWeek(),this.bind(),this.update(),this.isInline&&this.show()},bind:function(){var e=this.$element,i=this.options;this.$picker.on("click",t.proxy(this.click,this)),this.isInline||(this.isInput&&(e.on("keyup",t.proxy(this.update,this)),i.trigger||e.on("focus",t.proxy(this.show,this))),this.$trigger.on("click",t.proxy(this.show,this)))},showView:function(t){var e=this.format;if(e.year||e.month||e.day)switch(t){case 2:case"years":this.$months.hide(),this.$days.hide(),e.year?(this.fillYears(),this.$years.show()):this.showView(0);break;case 1:case"months":this.$years.hide(),this.$days.hide(),e.month?(this.fillMonths(),this.$months.show()):this.showView(2);break;default:this.$years.hide(),this.$months.hide(),e.day?(this.fillDays(),this.$days.show()):this.showView(1)}},hideView:function(){this.options.autoClose&&this.hide()},place:function(){var t=this.$trigger,e=t.offset();this.$picker.css({position:"absolute",top:e.top+t.outerHeight(),left:e.left,zIndex:this.options.zIndex})},show:function(){this.visible||(this.visible=!0,this.$picker.show(),this.isInline||(d.on("resize",t.proxy(this.place,this)),c.on("click",t.proxy(function(t){t.target!==this.$element[0]&&this.hide()},this))),this.showView(this.options.viewStart))},hide:function(){this.visible&&(this.visible=!1,this.$picker.hide(),this.isInline||(d.off("resize",this.place),c.off("click",this.hide)))},update:function(){var t=this.$element,e=t.data("date")||(this.isInput?t.prop("value"):t.text());this.date=e=s(e,this.format),this.viewDate=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this.fillAll()},change:function(){var t=this.$element,e=l(this.date,this.format);this.isInput?t.prop("value",e):this.isInline||t.text(e),t.data("date",e).trigger("change")},getMonthByNumber:function(t,i){var a=this.options,n=i?a.monthsShort:a.months;return n[e(t)?t:this.date.getMonth()]},getDayByNumber:function(t,i,a){var n=this.options,o=a?n.daysMin:i?n.daysShort:n.days;return o[e(t)?t:this.date.getDay()]},getDate:function(t){return t?l(this.date,this.format):new Date(this.date)},template:function(e){var i=this.options,a={text:"",type:"",selected:!1,disabled:!1};return t.extend(a,e),["<"+i.itemTag+" ",a.selected?'class="'+i.selectedClass+'"':a.disabled?'class="'+i.disabledClass+'"':"",a.type?' data-type="'+a.type+'"':"",">",a.text,"</"+i.itemTag+">"].join("")},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillYears:function(){var t,e,i="",a=[],n=this.options.yearSuffix||"",o=this.date.getFullYear(),r=this.viewDate.getFullYear();for(i=r-5+n+" - "+(r+6)+n,e=-5;7>e;e++)t=r+e===o,a.push(this.template({text:r+e,type:t?"year selected":"year",selected:t,disabled:-5===e||6===e}));this.$picker.find('[data-type="years current"]').html(i),this.$picker.find('[data-type="years"]').empty().html(a.join(""))},fillMonths:function(){var t,e,i="",a=[],n=this.options.monthsShort,o=this.date.getFullYear(),r=this.date.getMonth(),s=this.viewDate.getFullYear();for(i=s.toString()+this.options.yearSuffix||"",e=0;12>e;e++)t=s===o&&e===r,a.push(this.template({text:n[e],type:t?"month selected":"month",selected:t}));this.$picker.find('[data-type="year current"]').html(i),this.$picker.find('[data-type="months"]').empty().html(a.join(""))},fillWeek:function(){var e,i=this.options,a=[],n=i.daysMin,o=parseInt(i.weekStart,10)%7;for(n=t.merge(n.slice(o),n.slice(0,o)),e=0;7>e;e++)a.push(this.template({text:n[e]}));this.$picker.find('[data-type="week"]').html(a.join(""))},fillDays:function(){var e,i,a,n,r,s,l="",d=[],c=[],h=[],p=[],u=this.options.monthsShort,f=this.options.yearSuffix||"",m=this.date.getFullYear(),y=this.date.getMonth(),g=this.date.getDate(),v=this.viewDate.getFullYear(),b=this.viewDate.getMonth(),k=parseInt(this.options.weekStart,10)%7;for(l=this.options.showMonthAfterYear?v+f+" "+u[b]:u[b]+" "+v+f,a=0===b?o(v-1,11):o(v,b-1),r=1;a>=r;r++)c.push(this.template({text:r,type:"day prev",disabled:!0}));for(n=new Date(v,b,1,0,0,0,0),s=(7+(n.getDay()-k))%7,s=s>0?s:7,c=c.slice(a-s),a=11===b?o(v+1,0):o(v,b+1),r=1;a>=r;r++)p.push(this.template({text:r,type:"day next",disabled:!0}));for(a=o(v,b),n=new Date(v,b,a,0,0,0,0),s=(7-(n.getDay()+1-k))%7,s=s>=42-(c.length+a)?s:s+7,p=p.slice(0,s),r=1;a>=r;r++)e=v===m&&b===y&&r===g,i=this.options.isDisabled(new Date(v,b,r)),h.push(this.template({text:r,type:i?"day disabled":e?"day selected":"day",selected:e,disabled:i}));t.merge(d,c),t.merge(d,h),t.merge(d,p),this.$picker.find('[data-type="month current"]').html(l),this.$picker.find('[data-type="days"]').empty().html(d.join(""))},click:function(e){var i,a,n,o,r,s=t(e.target),l=/^\d{2,4}$/,d=!1;if(e.stopPropagation(),e.preventDefault(),0!==s.length)switch(i=this.viewDate.getFullYear(),a=this.viewDate.getMonth(),n=this.viewDate.getDate(),r=s.data().type){case"years prev":case"years next":i="years prev"===r?i-10:i+10,o=s.text(),d=l.test(o),d&&(i=parseInt(o,10),this.date=new Date(i,a,Math.min(n,28),0,0,0,0)),this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.fillYears(),d&&(this.showView(1),this.change());break;case"year prev":case"year next":i="year prev"===r?i-1:i+1,this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.fillMonths();break;case"year current":this.format.year&&this.showView(2);break;case"year selected":this.format.month?this.showView(1):this.hideView();break;case"year":i=parseInt(s.text(),10),this.date=new Date(i,a,Math.min(n,28),0,0,0,0),this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.format.month?this.showView(1):this.hideView(),this.change();break;case"month prev":case"month next":a="month prev"===r?a-1:"month next"===r?a+1:a,this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.fillDays();break;case"month current":this.format.month&&this.showView(1);break;case"month selected":this.format.day?this.showView(0):this.hideView();break;case"month":a=s.parent().children().index(s),this.date=new Date(i,a,Math.min(n,28),0,0,0,0),this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.format.day?this.showView(0):this.hideView(),this.change();break;case"day prev":case"day next":case"day":a="day prev"===r?a-1:"day next"===r?a+1:a,n=parseInt(s.text(),10),this.date=new Date(i,a,n,0,0,0,0),this.viewDate=new Date(i,a,n,0,0,0,0),this.fillDays(),"day"===r&&this.hideView(),this.change();break;case"day selected":this.hideView(),this.change();break;case"day disabled":this.hideView()}}},h.DEFAULTS={date:!1,dateFormat:"mm/dd/yyyy",disabledClass:"disabled",selectedClass:"selected",autoClose:!1,inline:!1,trigger:!1,container:!1,showMonthAfterYear:!1,zIndex:1,viewStart:0,weekStart:0,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",template:'<div class="datepicker-container" data-type="datepicker"><div class="datepicker-arrow"></div><div class="datepicker-content"><div class="content-years" data-type="years picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="years prev">&lsaquo;</li><li class="col-5" data-type="years current"></li><li class="datepicker-next" data-type="years next">&rsaquo;</li></ul><ul class="datepicker-years" data-type="years"></ul></div><div class="content-months" data-type="months picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="year prev">&lsaquo;</li><li class="col-5" data-type="year current"></li><li class="datepicker-next" data-type="year next">&rsaquo;</li></ul><ul class="datepicker-months" data-type="months"></ul></div><div class="content-days" data-type="days picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="month prev">&lsaquo;</li><li class="col-5" data-type="month current"></li><li class="datepicker-next" data-type="month next">&rsaquo;</li></ul><ul class="datepicker-week" data-type="week"></ul><ul class="datepicker-days" data-type="days"></ul></div></div></div>',isDisabled:function(){return!1}},h.setDefaults=function(e){t.extend(h.DEFAULTS,e)},h.other=t.fn.datepicker,t.fn.datepicker=function(e){var n,o=a(arguments,1);return this.each(function(){var i,a=t(this),r=a.data("datepicker");r||a.data("datepicker",r=new h(this,e)),"string"==typeof e&&t.isFunction(i=r[e])&&(n=i.apply(r,o))}),i(n)?this:n},t.fn.datepicker.Constructor=h,t.fn.datepicker.setDefaults=h.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=h.other,this}}),function(t){"function"==typeof define&&define.amd?define("qor-comparator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.init()};return e.prototype={constructor:e,init:function(){t.fn.modal&&(this.$modal=t(e.TEMPLATE.replace(/\{\{key\}\}/g,Date.now())).appendTo("body"),this.$modal.modal(this.options))},show:function(){this.$modal.modal("show")}},e.DEFAULTS={keyboard:!0,backdrop:!0,remote:!1,show:!0},e.TEMPLATE='<div class="modal fade qor-comparator-modal" id="qorComparatorModal{{key}}" aria-labelledby="qorComparatorModalLabel{{key}}" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="qorComparatorModalLabel{{key}}">Diff</h5></div><div class="modal-body"></div></div></div></div>',e.plugin=function(i){var a,n=[].slice.call(arguments,1);return this.each(function(){var o,r=t(this),s=r.data("qor.comparator");s?i="show":r.data("qor.comparator",s=new e(this,i)),"string"==typeof i&&t.isFunction(o=s[i])&&(a=o.apply(s,n))}),"undefined"==typeof a?this:a},t(function(){t.fn.modal&&t(document).on("click.qor.comparator.initiator",'[data-toggle="qor.comparator"]',function(i){var a=t(this);i.preventDefault(),e.plugin.call(a,a.data())})}),e}),function(t){"function"==typeof define&&define.amd?define("qor-cropper",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=window.URL||window.webkitURL,i=function(e,a){this.$element=t(e),this.options=t.extend(!0,{},i.DEFAULTS,a),this.built=!1,this.url=null,this.init()};return i.prototype={constructor:i,init:function(){var e,i,a,n,o=this.$element,r=this.options;if(r.parent&&(e=o.closest(r.parent)),e.length||(e=o.parent()),r.target&&(i=e.find(r.target)),i.length||(i=t("<img>")),r.output){this.$output=e.find(r.output);try{a=JSON.parse(this.$output.val())}catch(s){console.log(s.message)}}this.$parent=e,this.$image=i,o.on("change",t.proxy(this.read,this)),this.data=a||{},n=i.data("originalUrl"),n||(n=i.prop("src"),n&&t.isFunction(r.replace)&&(n=r.replace(n))),this.load(n),o.on("change",t.proxy(this.read,this))},read:function(){var t,i=this.$element.prop("files");i&&(t=i[0],/^image\/\w+$/.test(t.type)&&e&&this.load(e.createObjectURL(t),!0))},load:function(t,i){t&&(this.built||this.build(),/^blob:\w+/.test(this.url)&&e&&e.revokeObjectURL(this.url),this.url=t,i&&(this.data[this.options.key]=null,this.$image.attr("src",t)))},build:function(){var e,a,n;this.built||(this.built=!0,this.$cropper=e=t(i.TEMPLATE).appendTo(this.$parent),this.$canvas=e.find(".qor-cropper-canvas").html(this.$image),this.$toggle=a=e.find(".qor-cropper-toggle"),this.$modal=n=e.find(".qor-cropper-modal"),n.on({"shown.bs.modal":t.proxy(this.start,this),"hidden.bs.modal":t.proxy(this.stop,this)}),a.on("click",function(){n.modal()}))},start:function(){var e=this.$modal,i=t("<img>").attr("src",this.url),a=this.data,n=this.options.key,o=this;e.find(".modal-body").html(i),i.cropper({data:a[n],background:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){e.find(".qor-cropper-save").one("click",function(){var t,r=i.cropper("getData");a[n]={x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)},o.imageData=i.cropper("getImageData"),o.cropData=r;try{t=i.cropper("getCroppedCanvas").toDataURL()}catch(s){console.log(s.message)}o.output(t),e.modal("hide")})}})},stop:function(){this.$modal.find(".modal-body > img").cropper("destroy").remove()},output:function(e){var i=t.extend({},this.data,this.options.data);e?this.$image.attr("src",e):this.preview(),this.$output.val(JSON.stringify(i))},preview:function(){var e,i=this.$cropper,a=Math.max(i.width(),320),n=Math.max(i.height(),180),o=this.imageData,r=this.cropData,s=r.width/r.height,l=a,d=n;n*s>a?d=l/s:l=d*s,e=r.width/l,t.each(r,function(t,i){r[t]=i/e}),this.$canvas.css({width:r.width,height:r.height}),this.$image.css({width:o.naturalWidth/e,height:o.naturalHeight/e,maxWidth:"none",maxHeight:"none",marginLeft:-r.x,marginTop:-r.y})},destroy:function(){this.$element.off("change"),this.built&&(this.$toggle.off("click"),this.$modal.off("shown.bs.modal hidden.bs.modal"))}},i.DEFAULTS={target:"",output:"",parent:"",key:"qorCropper",data:null},i.TEMPLATE='<div class="qor-cropper"><div class="qor-cropper-canvas"></div><a class="qor-cropper-toggle" title="Crop the image"><span class="sr-only">Toggle Cropper</span></a><div class="modal fade qor-cropper-modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Crop the image</h5></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-cropper-save">OK</button></div></div></div></div></div>',i.plugin=function(e){var a,n=[].slice.call(arguments,1);return this.each(function(){var o,r=t(this),s=r.data("qor.cropper");s||r.data("qor.cropper",s=new i(this,e)),"string"==typeof e&&t.isFunction(o=s[e])&&(a=o.apply(s,n))}),"undefined"==typeof a?this:a},t(function(){var e=".qor-fileinput",a={target:"img",output:"textarea",parent:".form-group",key:"CropOption",data:{Crop:!0},replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})}};t(document).on("click.qor.cropper.initiator",e,function(){i.plugin.call(t(this),a)}).on("renew.qor.initiator",function(n){var o=t(e,n.target);o.length&&i.plugin.call(o,a)}).triggerHandler("renew.qor.initiator")}),i}),function(t){"function"==typeof define&&define.amd?define("qor-datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.date=null,this.formatDate=null,this.built=!1,this.init()};return e.prototype={init:function(){t.fn.datepicker&&(this.$element.on("click",t.proxy(this.show,this)),this.options.show&&this.show())},build:function(){var i,a,n,o,r,s=this;this.built||(this.$modal=i=t(e.TEMPLATE).appendTo("body"),a=i.find(".qor-datepicker-year"),n=i.find(".qor-datepicker-month"),o=i.find(".qor-datepicker-week"),r=i.find(".qor-datepicker-day"),i.find(".qor-datepicker-embedded").on("change",function(){var e,i=t(this);s.date=e=i.datepicker("getDate"),s.formatDate=i.datepicker("getDate",!0),a.text(e.getFullYear()),n.text(String(i.datepicker("getMonthByNumber",e.getMonth(),!0)).toUpperCase()),o.text(i.datepicker("getDayByNumber",e.getDay())),r.text(e.getDate())}).datepicker({date:this.$element.val(),dateFormat:"yyyy-mm-dd",inline:!0}).triggerHandler("change"),i.find(".qor-datepicker-save").on("click",t.proxy(this.pick,this)),this.built=!0)},show:function(){this.built||this.build(),this.$modal.modal("show")},pick:function(){this.$element.val(this.formatDate),this.$modal.modal("hide")}},e.DEFAULTS={show:!0},e.TEMPLATE='<div class="modal fade qor-datepicker-modal" id="qorDatepickerModal" tabindex="-1" role="dialog" aria-labelledby="qorDatepickerModalLabel" aria-hidden="true"><div class="modal-dialog qor-datepicker"><div class="modal-content"><div class="modal-header sr-only"><h5 class="modal-title" id="qorDatepickerModalLabel">Pick a date</h5></div><div class="modal-body"><div class="qor-datepicker-picked"><div class="qor-datepicker-week"></div><div class="qor-datepicker-month"></div><div class="qor-datepicker-day"></div><div class="qor-datepicker-year"></div></div><div class="qor-datepicker-embedded"></div></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-datepicker-save">OK</button></div></div></div></div>',e.plugin=function(i){var a,n=[].slice.call(arguments,1);return this.each(function(){var o,r=t(this),s=r.data("qor.datepicker");s?i="show":r.data("qor.datepicker",s=new e(this,i)),"string"==typeof i&&t.isFunction(o=s[i])&&(a=o.apply(s,n))}),"undefined"==typeof a?this:a},t(function(){t.fn.datepicker&&(t(document).on("click.qor.datepicker.initiator",'[data-toggle="qor.datepicker"]',function(){var i=t(this);e.plugin.call(i,i.data())}),t(document).on("click.datepicker.initiator",'[data-toggle="datepicker"]',function(){var e=t(this);e.data("datepicker")||e.datepicker({autoClose:!0}),e.datepicker("show")}))}),e}),function(t){"function"==typeof define&&define.amd?define("qor-filter",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e,n){var o,r=a.search;return t.isArray(e)&&(o=i(r),t.each(e,function(e,i){e=t.inArray(i,o),-1===e?o.push(i):n&&o.splice(e,1)}),r="?"+o.join("&")),r}function i(t){var e=[];return t&&t.indexOf("?")>-1&&(t=t.split("?")[1],t&&t.indexOf("#")>-1&&(t=t.split("#")[0]),t&&(e=t.split("&"))),e}var a=window.location,n=function(e,i){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,i),this.init()};return n.prototype={constructor:n,init:function(){var t=this.$element,e=this.options,i=t.find(e.toggle);i.length&&(this.$toggle=i,this.parse(),this.bind())},bind:function(){this.$element.on("click",this.options.toggle,t.proxy(this.toggle,this))},parse:function(){var e=this.options,n=i(a.search);this.$toggle.each(function(){var a=t(this);t.each(i(a.attr("href")),function(i,o){var r=t.inArray(o,n)>-1;return a.toggleClass(e.activeClass,r),r?!1:void 0})})},toggle:function(n){var o,r=t(n.target),s=i(n.target.href);n.preventDefault(),o=r.hasClass(this.options.activeClass)?e(s,!0):e(s),a.search=o}},n.DEFAULTS={toggle:"",activeClass:"active"},n.plugin=function(e){return this.each(function(){var i=t(this);i.data("qor.filter")||i.data("qor.filter",new n(this,e))})},t(function(){t(document).on("renew.qor.initiator",function(e){var i=t(".qor-label-group",e.target);i.length&&n.plugin.call(i,{toggle:".label",activeClass:"label-primary"})}).triggerHandler("renew.qor.initiator")}),n}),function(t){"function"==typeof define&&define.amd?define("qor-redactor",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e){var i=[];return t.isPlainObject(e)&&t.each(e,function(){i.push(arguments[1])}),i.join()}function i(t){var e=t&&t.split(",");return t=null,e&&4===e.length&&(t={x:Number(e[0]),y:Number(e[1]),width:Number(e[2]),height:Number(e[3])}),t}var a=".qor.redactor",n="click"+a,o="focus"+a,r="blur"+a,s="imageupload"+a,l="imagedelete"+a,d=/x|y|width|height/,c=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},c.DEFAULTS,i),this.init()};return c.prototype={constructor:c,init:function(){var e=this,i=this.$element,a=this.options,d=i.closest(a.parent),h=t.proxy(this.click,this);this.$button=t(c.BUTTON),i.on(s,function(e,i){t(i).on(n,h)}).on(l,function(e,i){t(i).off(n,h)}).on(o,function(t){console.log(t.type),d.find("img").off(n,h).on(n,h)}).on(r,function(t){console.log(t.type),d.find("img").off(n,h)}),t("body").on(n,function(){e.$button.off(n).detach()})},click:function(e){var i=this,a=t(e.target);e.stopPropagation(),setTimeout(function(){i.$button.insertBefore(a).off(n).one(n,function(){i.crop(a)})},1)},crop:function(a){var n=this.options,o=a.attr("src"),r=o,s=t("<img>"),l=t(c.TEMPLATE);t.isFunction(n.replace)&&(r=n.replace(r)),s.attr("src",r),l.appendTo("body").modal("show").find(".modal-body").append(s),l.one("shown.bs.modal",function(){s.cropper({data:i(a.attr("data-crop-option")),background:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){l.find(".qor-cropper-save").one("click",function(){var i={};t.each(s.cropper("getData"),function(t,e){d.test(t)&&(i[t]=Math.round(e))}),t.ajax(n.remote,{type:"POST",contentType:"application/json",data:JSON.stringify({Url:o,CropOption:i,Crop:!0}),dataType:"json",success:function(o){t.isPlainObject(o)&&o.url&&(a.attr("src",o.url).attr("data-crop-option",e(i)).removeAttr("style").removeAttr("rel"),t.isFunction(n.complete)&&n.complete(),l.modal("hide"))},error:function(){console.log(arguments)}})})}})}).one("hidden.bs.modal",function(){s.cropper("destroy").remove(),l.remove()})}},c.DEFAULTS={remote:!1,toggle:!1,parent:!1,replace:null,complete:null},c.BUTTON='<span class="redactor-image-cropper">Crop</span>',c.TEMPLATE='<div class="modal fade qor-cropper-modal" id="qorCropperModal" tabindex="-1" role="dialog" aria-labelledby="qorCropperModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="qorCropperModalLabel">Crop the image</h5></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-cropper-save">OK</button></div></div></div></div>',c.plugin=function(){return this.each(function(){var e,i=t(this);i.data("qor.redactor")||(i.data("qor.redactor",!0),e=i.data(),i.redactor({imageUpload:e.uploadUrl,fileUpload:e.uploadUrl,initCallback:function(){i.data("qor.redactor",new c(i,{remote:e.cropUrl,toggle:".redactor-image-cropper",parent:".form-group",replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})},complete:t.proxy(function(){this.code.sync()},this)}))},focusCallback:function(){i.triggerHandler(o)},blurCallback:function(){i.triggerHandler(r)},imageUploadCallback:function(){i.triggerHandler(s,arguments[0])},imageDeleteCallback:function(){i.triggerHandler(l,arguments[1])}}))})},t(function(){t.fn.redactor&&t(document).on("renew.qor.initiator",function(e){var i=t('textarea[data-toggle="qor.redactor"]',e.target);i.length&&c.plugin.call(i)}).triggerHandler("renew.qor.initiator")}),c}),function(t){"function"==typeof define&&define.amd?define("qor-replicator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.index=0,this.init()};return e.prototype={constructor:e,init:function(){var t,e=this.$element,i=this.options,a=e.find(i.itemClass);a.length&&(t=a.filter(i.newClass),t.length||(t=a.last()),this.$template=t,this.template=t.clone().removeClass("hide").prop("outerHTML"),this.parse(),this.bind())},parse:function(){var t=0;this.template=this.template.replace(/(\w+)\="(\S*\[\d+\]\S*)"/g,function(e,i,a){return a=a.replace(/^(\S*)\[(\d+)\]([^\[\]]*)$/,function(e,n,o,r){return e===a?("name"===i&&(t=o),n+"[{{index}}]"+r):void 0}),i+'="'+a+'"'}),this.index=parseFloat(t)},bind:function(){var e=this.$element,i=this.options;e.on("click",i.addClass,t.proxy(this.add,this)),e.on("click",i.delClass,t.proxy(this.del,this))},add:function(e){var i,a=this.$template;return a.hasClass("hide")?void a.removeClass("hide"):(i=t(e.target).closest(this.options.addClass),void(i.length&&i.before(this.template.replace(/\{\{index\}\}/g,++this.index))))},del:function(e){var i,a=this.options,n=t(e.target).closest(a.itemClass);n.is(a.newClass)?n.remove():(n.children(":visible").addClass("hidden").hide(),i=t(a.alertTemplate.replace("{{name}}",this.parseName(n))),i.find(a.undoClass).one("click",function(){i.remove(),n.children(".hidden").removeClass("hidden").show()}),n.append(i))},parseName:function(t){var e=t.find("input[name]").attr("name");return e?e.replace(/[^\[\]]+$/,""):void 0}},e.DEFAULTS={itemClass:"",newClass:"",addClass:"",delClass:"",alertTemplate:""},e.plugin=function(i){return this.each(function(){var a=t(this);a.data("qor.replicator")||a.data("qor.replicator",new e(this,i))})},t(function(){var i=".qor-collection-group",a={itemClass:".qor-collection",newClass:".qor-collection-new",addClass:".qor-collection-add",delClass:".qor-collection-del",undoClass:".qor-collection-undo",alertTemplate:'<div class="alert alert-danger"><input type="hidden" name="{{name}}._destroy" value="1"><a href="javascript:void(0);" class="alert-link qor-collection-undo">Undo Delete</a></div>'};t(document).on("click.qor.replicator.initiator",i,function(){e.plugin.call(t(this),a)}).on("renew.qor.initiator",function(n){var o=t(i,n.target);o.length&&e.plugin.call(o,a)}).triggerHandler("renew.qor.initiator")}),e}),function(t){"function"==typeof define&&define.amd?define("qor-selector",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(){var e=t(this);e.prop("multiple")||e.find("option[selected]").length||e.prepend('<option value="" selected></option>'),e.chosen()}t(function(){t.fn.chosen&&t(document).on("renew.qor.initiator",function(i){var a=t('select[data-toggle="qor.selector"]',i.target);a.length&&e.call(a)}).triggerHandler("renew.qor.initiator")})}),function(t){"function"==typeof define&&define.amd?define("qor-widgets",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e={};return e.init=function(){this.confirm(),this.checkAll(),this.tooltip()},e.confirm=function(){t(document).on("click.qor.confirmer","[data-confirm]",function(e){var i,a=t(this),n=a.data();n.confirm&&(window.confirm(n.confirm)?/DELETE/i.test(n.method)&&(e.preventDefault(),i=n.url||a.attr("href"),n=t.extend({},n,{_method:"DELETE"}),t.post(i,n,function(){window.location.reload()})):e.preventDefault())})},e.checkAll=function(){t(".qor-check-all").each(function(){var e=t(this);e.attr("title","Check all").tooltip().on("click",function(){this.disabled||t(this).attr("data-original-title",this.checked?"Uncheck all":"Check all").closest("table").find(":checkbox:not(.qor-check-all)").prop("checked",this.checked)}),this.checked&&e.triggerHandler("click")})},e.tooltip=function(){t('[data-toggle="tooltip"]').tooltip()},t(function(){e.init()}),e});