/**
 * Created by e.tarancondelgado on 30/12/16.
 */

var TodoItemsView = Backbone.View.extend({
    tagName:"ul",
    id:"todoItems",

    initialize:function(options){
        if(!(options && options.model)){
            throw new Error("Model no defined to todoItems");
        }
    },

    render: function () {
        var self = this;

        this.model.each(function (todoItem) {
            var view = new TodoItemView({model: todoItem});

            self.$el.append(view.render().$el);
        });

        return this;
    }
});