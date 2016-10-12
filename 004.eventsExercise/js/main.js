
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({
    idAttribute: "registrationNumber",
    urlRoot: "/api/vehicles",
    start: function () {
        console.log("Vehicle started");
    },
    validate: function (attrs) {
        if (!attrs.registrationNumber) {
            return "Error";
        }
    }
});

var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

var VehicleView = Backbone.View.extend({
    tagName: "li",
    className:"vehicle",
    events:{
      "click .deleteButton": "onDeleteItem"  
    },
    render: function () {
        var template = _.template($("#vehicleListItemTemplate").html());
        var html = template(this.model.toJSON());
        this.$el.attr({"data-color":this.model.get("color")});
        this.$el.html(html);

        return this;
    },
    onDeleteItem:function(){
        this.remove();
    }
});

var VehiclesView = Backbone.View.extend({
    tagName: "ul",
    initialize:function(options){
        this.collection = options.collection;
        this.bus = options.bus;
        
        this.bus.on("addNewVehicle",this.addNewVehicle,this);
    },
    addNewVehicle:function(registerNumber){

        var model = new Vehicle({registrationNumber: registerNumber});
        var vehicleView = new VehicleView({model: model});
        
        this.$el.prepend(vehicleView.render().$el);
    },
    render: function () {
        var self = this;

        this.collection.each(function (vehicle) {
            var vehicleView = new VehicleView({model: vehicle});
            self.$el.append(vehicleView.render().$el);

            return this;
        });
    }

});

var NewVehicle = Backbone.View.extend({
   el:"#newVehicle",
   events: {
       "click #addVehicle" : "addVehicleTrigger"
  },
  initialize:function(options){
      this.bus = options.bus;
  },
  addVehicleTrigger:function(){
 var input = this.$el.find("input");
    var registerNumber = input.val();
    input.val("");
    this.bus.trigger("addNewVehicle",registerNumber);  
  },
   render:function(){
       
   },
});

/* Intantiations */
var bus = _.extend({},Backbone.Events);


var vehicles = new Vehicles([
    new Vehicle({registrationNumber: "XLI887", color: "Blue"}),
    new Vehicle({registrationNumber: "ZNP123", color: "Gray"}),
    new Vehicle({registrationNumber: "XUV456", color: "Blue"})
]);


var vehiclesView = new VehiclesView({el: "#vehiclesList", collection: vehicles, bus:bus});
vehiclesView.render();


var newVehicle = new NewVehicle({bus:bus});
