/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('initialize');
 * mod.thing == 'a thing'; // true
 */
 
 function initialize() {
     Memory.scaleTo = 5;
     Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Harvester1", {})
 }

module.exports = {
    initialize: initialize()
};