
 let statusCreep = require('status.creep');
 let init = require('initialize');


     
if (!(Memory.scale)) {
    init.initialize();
}

module.exports.loop = function() {
    for (let each in Game.creeps) {
        // noinspection JSUnfilteredForInLoop
        console.log(statusCreep.speed(Game.creeps[each]));
    }
};