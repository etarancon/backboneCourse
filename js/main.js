
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Song = Backbone.Model.extend({
   initialize:function(){
       console.log("Hello Backbone");
   } 
});

var song = new Song();