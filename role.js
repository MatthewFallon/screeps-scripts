
let harvester = require("role.harvester");
let archer = require("role.archer");
let builder = require("role.builder");
let warrior = require("role.warrior");
let explorer = require("role.explorer");
let support = require("role.support");
let statusCreep = require("status.creep");

module.exports = {

    /**
     *
     * @param {Creep} creep
     */
    standardAction: function (creep) {
        if ((creep.ticksToLive - 10) <= statusCreep.ticksToSpawn(creep)) {
            creep.memory.status = "renew";
            creep.say("Going to " + creep.memory.status);
            creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
        }

        if (creep.memory.status === "renew") {
            if (creep.transfer(creep.room.find(FIND_MY_SPAWNS)[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
            }
        }
        else if (creep.memory.status === "work" || creep.memory.status === "return") {
            eval(creep.memory.role).standardAction(creep); //evaluates the role variable to one of the variables above.
        }
    }
};