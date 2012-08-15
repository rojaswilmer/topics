define(["jquery","underscore","backbone","HomeView","ProfileView","FullTopicView","ConfirmView","UserModel","TopicModel"],function(e,t,n,r,i,s,o,u,a){function m(e,t){var n="";t&&(n="?loop=1"),v.fetch({loop:t,url:v.url()+n,success:g,error:function(n,r,i){console.log("ERROR",r),t&&setTimeout(function(){m(e,t)},1e3)}})}function g(){var e=l;p=!0,e.homeView&&e.homeView.remove(function(){e.navigate("loading",h),e.navigate("",c)})}var f,l,c={trigger:!0},h={replace:!0},p=!1,d=new o,v;return i.setConfirmView(d),s.setConfirmView(d),f=n.Router.extend({routes:{"":"home",connect:"connect",logout:"logout",":screen_name/topic/:_id":"showTopic"},initialize:function(){l=this,v=new u({_id:"current"}),e("#welcome")[0]&&(this.homeView=new r),e("#profile")[0]&&(this.profileView=new i({model:v}));var t=e("#JSONuser"),n;t[0]?(n=JSON.parse(t.val()),v.set(n),g()):m(this)},home:function(){var t,n=v.get("user_id");if(!p)return;n?e("#fulltopic")[0]||!~window.location.hash.indexOf("/topic/")?(this.fullTopicView&&this.fullTopicView.remove(),this.profileView=new i({model:v}),this.profileView.render()):(t={user:v.attributes,topics:[]},this.profileView||(delete this.homeView,this.profileView=new i({model:v}),this.profileView.render())):(this.homeView||(this.homeView=new r),this.homeView.render())},connect:function(){if(this.profileView)return this.navigate("",c);var t=this,n=e(window).width()/2-250;window.is_mobile?window.location.href="/connect":(window.open("/connect?popup=1","sharer","width=500,height=300,top=150,left= "+n+",personalbar=0,toolbar=0,scrollbars=1,resizable=1"),m(t,!0))},logout:function(){if(!v.get("user_id"))return this.navigate("",c);var e=this;v.destroy({success:function(){v.attributes={},e.profileView.remove(function(){delete e.profileView,e.navigate("",c)})},error:function(e,t,n){console.log("ERROR",t)}})},showTopic:function(e,t){var n=this,r;v.attributes.user_id||n.navigate("",c),this.profileView&&(r=this.profileView.topics.where({_id:t})[0],r?this.profileView.remove(function(){n.fullTopicView=new s({model:r,topic_id:t,user:v}),n.fullTopicView.render()}):(r=new a({_id:t}),r.fetch({url:"/api/1/"+e+"/topic/"+t,success:function(){n.fullTopicView=new s({model:r,topic_id:t,user:v}),n.fullTopicView.render()},error:function(e,t,n){console.log("ERROR",t)}})))}}),f})