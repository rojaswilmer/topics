define("fullTopicView",["jquery","underscore","backbone","NotesView","NoteModel","text!../templates/fullTopic.html","jqueryColor"],function(e,t,n,r,i,s){function p(e){return e.$notes=e.$el.find("#notes"),e.$notes[0]?(e.notes=new n.Collection,e.notes.url=c,e.noteView=new r({collection:e.notes,el:e.$notes[0],notes_url:c})):delete e.$notes,e}var o,u,a,f,l,c,h=["Read the Markdown documentation to make beautiful notes! <a href='http://daringfireball.net/projects/markdown/'>http://daringfireball.net/pro...</a>","Remember to read the description of this project: <a href='http://topics.herokuapp.com/sadasant/topic/89bfef93da3549baface0b8aa34fe63578b8ddd70eee79dcd3910ecd57ce9b0c'>http://topics.herokuapp.com/sadasant/top...</a>"];return o=n.View.extend({el:"#box",initialize:function(r){var i=e("#JSONnotes"),o,u=this;this.$full=this.$el.find("#fulltopic"),this.notes=new n.Collection,this.user=r.user,this.topic_id=r.topic_id,c="/api/1/"+r.user.attributes.screen_name+"/topic/"+r.topic_id+"/notes",this.notes.url=c,this.template=t.template(s),l=e("#loading"),a=e(".newNote")},events:{"click .topicname .edit":"editTopicName","keyup .topicname .editname":"updateCount","click .topicname .cancel":"cancelEdit","click .topicname .save":"saveTopic","click .topicname .del":"delTopic","keyup .newNote .text":"updateNewNoteCount","click .newNote .new":"addNote","click #header .title .back":"back","click #header .user .bye":"logout","click .note .text":"showNote"},render:function(t){var n=this.$el,r=this,i=Math.random()*h.length>>0,s={user:this.user.attributes,topic:this.model.attributes,tip:h[i]};n.hide().html(this.template(s)).fadeIn(500,function(){l=e("#loading"),a=e(".newNote"),r.$topicname=r.$el.find(".topicname"),r.$editname=r.$topicname.find(".editname"),r.$h2=r.$topicname.find("h2"),r.$del=r.$topicname.find(".del"),r.$edit=r.$topicname.find(".edit"),r.$save=r.$topicname.find(".save"),r.$cancel=r.$topicname.find(".cancel"),r.$load=r.$topicname.find(".load"),r.$count=r.$topicname.find(".count"),r.$countSpan=r.$count.find("span"),f=a.find(".count span"),$newNoteText=a.find(".text"),r.updateCount(),r.$full[0]||(r.$full=r.$el.find("#fulltopic")),r.$notes||p(r).notes.fetch({success:function(){l.fadeOut(500,function(){r.noteView.renderAll()}).addClass("stop")},error:function(){l.addClass("error")}})})},editTopicName:function(){this.cachedName=this.$editname.val(),this.$h2.addClass("hide"),this.$del.addClass("hide"),this.$edit.addClass("hide"),this.$editname.removeClass("hide"),this.$save.removeClass("hide"),this.$cancel.removeClass("hide"),this.$count.removeClass("hide")},updateCount:function(){var e=140-this.$editname.val().length;e<0&&(e='<span style="color:red">'+e+"</span>"),this.$countSpan.html(e)},cancelEdit:function(){this.$editname.val(this.cachedName),this.updateCount(),this.$h2.removeClass("hide"),this.$del.removeClass("hide"),this.$edit.removeClass("hide"),this.$editname.addClass("hide"),this.$save.addClass("hide"),this.$cancel.addClass("hide"),this.$count.addClass("hide")},saveTopic:function(){var e=this.$editname.val(),t=this;!e||e===this.cachedName||e.length>140?this.$editname.css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3):(this.$save.addClass("hide"),this.$load.removeClass("hide"),this.model.save("name",e,{url:"api/1/"+t.user.attributes.screen_name+"/topic/"+t.model.attributes._id,success:function(){t.$save.removeClass("hide"),t.$load.addClass("hide"),t.$count.addClass("hide"),t.$h2.html(e),t.cachedName=e,t.cancelEdit()},error:function(){t.$load.addClass("error")}}))},delTopic:function(){var e=this.model.attributes.name.replace(/</g,"&lt;"),t=this;e.length>33&&(e=e.slice(0,32)+"..."),u.render({text:'Remove the topic "<b>'+e+'</b>"?',yes:"Yes!",no:"Nope"},function(){t.$del.addClass("hide"),t.$load.removeClass("hide"),t.model.destroy({url:"api/1/"+t.user.attributes.screen_name+"/topic/"+t.model.attributes._id,success:function(){window.location.hash=""},error:function(){t.$load.addClass("error")}})})},updateNewNoteCount:function(){var e=2048-$newNoteText.val().length;e<0&&(e='<span style="color:red">'+e+"</span>"),f.html(e)},addNote:function(t){var n=this.$el,r=$newNoteText,s=a.find(".load"),o=a.find(".new"),u=e.trim(r.val()),f=this.notes,l=this,c;!u||u.length>2048?r.css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3):(o.hide(),s.removeClass("hide"),r.val(""),this.updateNewNoteCount(),c=new i({text:u,user_id:this.model.attributes.user_id,topic_id:this.topic_id}),c.save({wait:!0}),c.user_screen_name=this.model.attributes.user_screen_name,c.on("change",function(){l.$notes[0]||(l.$notes=l.$el.find("#notes"),l.noteView.$el=l.$notes,l.noteView.el=l.$notes[0]),f.add(c),s.addClass("hide"),o.show()}))},back:function(){window.location.href="#"},logout:function(e){e.preventDefault(),u.render({text:"Are you leaving now?",yes:"Yes!",no:"Nope"},function(){window.location.hash="logout"})},remove:function(e){var t=this.$el,n=this.$full,r=this;this.undelegateEvents(),t.fadeOut(500,function(){n.remove(),t.show(),e&&e()})},showNote:function(e){}}),o.setConfirmView=function(e){u=e,r.setConfirmView(u)},o})