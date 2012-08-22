define("NotesView",["jquery","underscore","backbone","text!../templates/note.html","ConfirmView"],function(e,t,n,r){var i,s={"click .del":"remove","click .edit":"edit","click .cancel":"cancelEdit","click .save":"save","keyup .editbox":"updateCount","click img":"openImage"},o,u,a,f;return i=n.View.extend({initialize:function(n){t(this).bindAll("add"),n.notes_url&&(f=n.notes_url.slice(0,n.notes_url.length-1)),this.collection&&(u=this.collection,this.collection.bind("add",this.add),this.tags=[],a=e("#loading")),this.template=t.template(r)},render:function(){var t=this;return e(this.el).html(this.template({note:this.model.attributes})).fadeIn(0,function(){t.$el.find("pre code").each(function(e,t){window.hljs.highlightBlock(t)})}),this},add:function(e){var t=new i({model:e}),n=this;t.delegateEvents(s),this.tags[e.attributes._id]=t,a.before(t.render().el),e.id=e.attributes._id,e.urlRoot="api/1/note",e.bind("delete",function(t){n.collection.remove(e),e.destroy({url:f+"/"+e.attributes._id,success:function(){t()},error:function(e,t,r){n.$el.find(".load").addClass("error"),console.log("ERROR",t)}})})},renderAll:function(){var e=this;t.each(this.collection.models,function(t){e.add(t)})},remove:function(){var e=this.$el,t=this,n=this.model.attributes.text.replace(/</g,"&lt;");n.length>33&&(n=n.slice(0,32)+"..."),o.render({text:'Remove the note "<b>'+n+'</b>"?',yes:"Yes!",no:"Nope"},function(){e.find(".del").addClass("hide"),e.find(".load").removeClass("hide"),t.model.trigger("delete",function(){e.fadeOut(100,function(){e.remove()})})})},edit:function(t){this.el.id||(this.$el=e(t.currentTarget.parentElement)),this.$editbox=this.$el.find(".editbox"),this.$text=this.$el.find(".text"),this.$del=this.$el.find(".del"),this.$edit=this.$el.find(".edit"),this.$save=this.$el.find(".save"),this.$cancel=this.$el.find(".cancel"),this.$count=this.$el.find(".count"),this.$countSpan=this.$count.find("span"),this.updateCount(),this.cachedText=this.$editbox.val(),this.$del.addClass("hide").hide(),this.$edit.addClass("hide"),this.$text.addClass("hide"),this.$editbox.removeClass("hide"),this.$save.removeClass("hide"),this.$cancel.removeClass("hide"),this.$count.removeClass("hide")},updateCount:function(){var e=2048-this.$editbox.val().length;e<0&&(e='<span style="color:red">'+e+"</span>"),this.$countSpan.html(e)},cancelEdit:function(){this.$editbox.val(this.cachedText),this.updateCount(),this.$del.removeClass("hide").show(),this.$edit.removeClass("hide"),this.$text.removeClass("hide"),this.$editbox.addClass("hide"),this.$save.addClass("hide"),this.$cancel.addClass("hide"),this.$count.addClass("hide")},save:function(){var e=this.$el.find(".editbox"),t=this.$el.find(".text"),n=this.$el.find(".save"),r=this.$el.find(".load"),i=e.val(),s=this,o=this.$el[0].id.slice(6),a=this.el.id?this.model:u.find(function(e){return e.attributes._id===o});!i||i===this.cachedText||i.length>2048?e.css("background-color","#FCF8D0").animate({backgroundColor:"#fff"},1e3):(n.addClass("hide"),r.removeClass("hide"),a.save("text",i,{url:f+"/"+a.attributes._id,success:function(){n.removeClass("hide"),r.addClass("hide"),s.cachedText=i,t.html(a.get("parsed")).find("pre code").each(function(e,t){window.hljs.highlightBlock(t)}),s.cancelEdit()},error:function(e,t,n){r.addClass("error"),console.log("ERROR",t)}}))},openImage:function(e){window.open(e.target.src)}}),i.setConfirmView=function(e){o=e},i})