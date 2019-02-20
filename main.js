
 var statusCreep = require('status.creep');


     
if (!(Memory.scale)) {
    Memory.scale = 5;
}

module.exports.loop = function() {
    console.log(statusCreep.speed(Game.creeps["Harvester1"]));
}