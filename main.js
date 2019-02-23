
 let statusCreep = require('status.creep');


     
if (!(Memory.scale)) {
    Memory.scale = 5;
}

module.exports.loop = function() {
    for (let each in Game.creeps) {
        // noinspection JSUnfilteredForInLoop
        console.log(statusCreep.speed(Game.creeps[each]));
    }
};