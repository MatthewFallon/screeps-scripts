
 let init = require('initialize');
 let role = require('role');
 let spawn = require("spawn");

     
if (!(Memory.scale)) {
    init.initialize();
}

module.exports.loop = function() {
    for (let each in Game.creeps) {
        role.standardAction(Game.creeps[each]);
    }
    for (let each in Game.spawns) {
        spawn.standardAction(each);
    }
};