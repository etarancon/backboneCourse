/**
 * Created by e.tarancondelgado on 30/12/16.
 */

var TodoItem = Backbone.Model.extend({
    validate: function (attrs) {
        if (!attrs.description) {
            return "Description is required";
        }
    }

});