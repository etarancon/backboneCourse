/**
 * Created by e.tarancondelgado on 30/12/16.
 */

var TodoItemView = Backbone.View.extend({
    tagName:"li",

    initialize:function(options){
            if(!(options && options.model)){
                throw new Error ("Model is not specified");
            }
    },

    render: function () {
        this.$el.html(this.model.get("description"));

        return this;
    }
});