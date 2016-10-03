
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({
    idAttribute:"registrationNumber",
    urlRoot:"/api/vehicles",
    start:function(){
        console.log("Vehicle started");
    },
    validate:function(attrs){
        if(!attrs.registrationNumber){
            return "Error";
        }
    }
});

var Vehicles = Backbone.Collection.extend({
   model:Vehicle 
});

var vehicles = new Vehicles([
    new Vehicle({registrationNumber:"XLI887",color:"Blue"}),
    new Vehicle({registrationNumber:"ZNP123",color:"Blue"})
]);
vehicles.add(new Vehicle({registrationNumber:"XUV456",color:"Gray"}));

var blueVehicles = vehicles.where({color:"Blue"});  
console.log(blueVehicles);

var vehicle1 = vehicles.findWhere({registrationNumber:'XLI887'});
console.log("The vehicle is ",vehicle1);

vehicles.remove(vehicle1);

var JSON = vehicles.toJSON();
console.log('The JSON of the collection is ',JSON);

vehicles.each(function(vehicle){
   console.log(vehicle.get('registrationNumber')); 
});




