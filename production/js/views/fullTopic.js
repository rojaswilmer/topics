define("FullTopicView",["jquery","underscore","backbone","NotesView","NoteModel","text!../templates/fullTopic.html"],function(e,t,n,r,i,s){function v(e){return e.$notes=e.$el.find("#notes"),e.$notes[0]?(e.notes=new n.Collection,e.notes.url=h,e.noteView=new r({collection:e.notes,el:e.$notes[0],notes_url:h})):delete e.$notes,e}function m(t){function s(){i&&r.sortable("destroy")}function o(t,s){var o=r.find("li.note"),u=[].map.call(o,function(e){return e.id.slice(6)}),a=s.item,f=a.find(".del"),l=a.find(".load");f.hide(),l.removeClass("hide"),i=!0,e.post(n.url+"/sort",{positions:u},function(e){e.status==="ok"?(i=!1,l.addClass("hide"),f.show()):l.addClass("error")})}var n=t.notes,r=e("ul#notes"),i=!1;r.sortable({opacity:.8,items:".note",cursor:"move",start:s,update:o})}var o,u,a,f,l,c,h,p,d=['Read the Markdown documentation to make beautiful notes!<br/><a href="http://daringfireball.net/projects/markdown/">http://daringfireball.net/pro...</a>','Remember to read the description of this project:<br/><a href="http://topics.sadasant.com/sadasant/topic/89bfef93da3549baface0b8aa34fe63578b8ddd70eee79dcd3910ecd57ce9b0c">http://topics.sadasant.com/sadasant/topic...</a>','Are you having an issue? Write us in our github repo:<br/><a href="https://github.com/sadasant/topics/issues">https://github.com/sadasant/top...</a>',,,];return o=n.View.extend({el:"#box",initialize:function(r){this.$full=this.$el.find("#fulltopic"),this.notes=new n.Collection,this.user=r.user,this.topic_id=r.topic_id,p="/api/1/"+r.user.attributes.screen_name+"/topic/"+r.topic_id,h=p+"/notes",this.notes.url=h,this.template=t.template(s),c=e("#loading"),f=e(".newNote")},events:{"click .topicname .edit":"editTopicName","keyup .topicname .editname":"updateCount","click .topicname .cancel":"cancelEdit","click .topicname .save":"saveTopic","click .topicname .del":"delTopic","keyup .newNote .text":"updateNewNoteCount","click .newNote .new":"addNote","click #header .title .back":"back","click #header .user .bye":"logout","click .sendMail .send":"sendMail"},render:function(){var t=this.$el,n=this,r=Math.random()*d.length>>0,i={user:this.user.attributes,topic:this.model.attributes,tip:d[r]};t.hide().html(this.template(i)).fadeIn(500,function(){c=e("#loading"),f=e(".newNote"),n.$topicname=n.$el.find(".topicname"),n.$editname=n.$topicname.find(".editname"),n.$h2=n.$topicname.find("h2"),n.$del=n.$topicname.find(".del"),n.$edit=n.$topicname.find(".edit"),n.$save=n.$topicname.find(".save"),n.$cancel=n.$topicname.find(".cancel"),n.$load=n.$topicname.find(".load"),n.$count=n.$topicname.find(".count"),n.$countSpan=n.$count.find("span"),l=f.find(".count span"),a=f.find(".text"),n.updateCount(),n.$full[0]||(n.$full=n.$el.find("#fulltopic")),n.$notes?m(n):v(n).notes.fetch({success:function(){c.fadeOut(500,function(){n.noteView.renderAll(),m(n)}).addClass("stop")},error:function(){c.addClass("error")}})})},editTopicName:function(){this.cachedName=this.$editname.val(),this.$h2.addClass("hide"),this.$del.addClass("hide"),this.$edit.addClass("hide"),this.$editname.removeClass("hide"),this.$save.removeClass("hide"),this.$cancel.removeClass("hide"),this.$count.removeClass("hide")},updateCount:function(){var e=140-this.$editname.val().length;e<0&&(e='<span style="color:red">'+e+"</span>"),this.$countSpan.html(e)},cancelEdit:function(){this.$editname.val(this.cachedName),this.updateCount(),this.$h2.removeClass("hide"),this.$del.removeClass("hide"),this.$edit.removeClass("hide"),this.$editname.addClass("hide"),this.$save.addClass("hide"),this.$cancel.addClass("hide"),this.$count.addClass("hide")},saveTopic:function(){var e=this.$editname.val(),t=this;!e||e===this.cachedName||e.length>140?this.$editname.css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3):(this.$save.addClass("hide"),this.$load.removeClass("hide"),this.model.save("name",e,{url:"api/1/"+t.user.attributes.screen_name+"/topic/"+t.model.attributes._id,success:function(){t.$save.removeClass("hide"),t.$load.addClass("hide"),t.$count.addClass("hide"),t.$h2.html(e),t.cachedName=e,t.cancelEdit()},error:function(){t.$load.addClass("error")}}))},delTopic:function(){var e=this.model.attributes.name.replace(/</g,"&lt;"),t=this;e.length>33&&(e=e.slice(0,32)+"..."),u.render({text:'Remove the topic "<b>'+e+'</b>"?',yes:"Yes!",no:"Nope"},function(){t.$del.addClass("hide"),t.$load.removeClass("hide"),t.model.destroy({url:"api/1/"+t.user.attributes.screen_name+"/topic/"+t.model.attributes._id,success:function(){window.location.hash=""},error:function(){t.$load.addClass("error")}})})},updateNewNoteCount:function(){var e=2048-a.val().length;e<0&&(e='<span style="color:red">'+e+"</span>"),l.html(e)},addNote:function(){var t=a,n=f.find(".load"),r=f.find(".new"),s=e.trim(t.val()),o=this.notes,u=this,l;!s||s.length>2048?t.css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3):(r.hide(),n.removeClass("hide"),t.val(""),this.updateNewNoteCount(),l=new i({text:s,user_id:this.model.attributes.user_id,topic_id:this.topic_id}),l.save({wait:!0}),l.user_screen_name=this.model.attributes.user_screen_name,l.on("change",function(){u.$notes[0]||(u.$notes=u.$el.find("#notes"),u.noteView.$el=u.$notes,u.noteView.el=u.$notes[0]),o.add(l),n.addClass("hide"),r.show()}))},back:function(){window.location.href="#"},logout:function(e){e.preventDefault(),u.render({text:"Are you leaving now?",yes:"Yes!",no:"Nope"},function(){window.location.hash="logout"})},sendMail:function(t){var n=e(".sendMail"),r=n.find(".send"),i=n.find(".load"),s=n.find("input"),o=s.val(),u=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;u.test(o)?(r.hide(),i.removeClass("hide"),e.post(p+"/email",{email:o},function(e){e.status==="ok"?(s.val(""),r.show(),i.addClass("hide")):s.css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3)})):s.val("").css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3)},remove:function(e){var t=this.$el,n=this.$full;this.undelegateEvents(),t.fadeOut(500,function(){n.remove(),t.show(),e&&e()})}}),o.setConfirmView=function(e){u=e,r.setConfirmView(u)},o})