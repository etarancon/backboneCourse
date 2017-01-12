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

        this.model.on('add',this.onAddNewItem,this);
    },

    events:{
        "click .addNewItem":"onAddClick",
        "keypress #newItemDescription":"onKeyPress"
    },

    onKeyPress:function(e){
        if(e.keyCode == 13){
            this.onAddClick();
        }
    },

    onAddNewItem:function(todoItem){
        var view = new TodoItemView({model:todoItem});

        this.$el.append(view.render().$el);
    },

    onAddClick:function(){
        var $input = this.$('#newItemDescription');
        var description = $input.val();

        if($input.val()){
            var todoItem = new TodoItem({description:description});
            this.model.add(todoItem);
            $input.val("");
        }

    },

    render: function () {
        var self = this;

        self.$el.append("<input id='newItemDescription' class='text' autofocus /><button class='addNewItem'>Add</button>");

        this.model.each(function (todoItem) {
            var view = new TodoItemView({model: todoItem});

            self.$el.append(view.render().$el);
        });

        return this;
    }
});