/**
 * A set of simple initialization and reinitialization methods.
 *
 * @type {Object}
 */
module.exports = {
    initialize: function () {
        Memory.scaleTo = 5;
        Game.spawns['Spawn1'].room.memory.spawnQueue = [];
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Harvester1", {})
    }
};