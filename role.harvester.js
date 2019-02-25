/**
 *
 * @type {Object}
 */
module.exports = {

    /**
     *
     * @param {Creep} creep
     */
    standardAction: function (creep) {

        console.log("running");
        if (creep.carry[RESOURCE_ENERGY] === 0) {
            creep.say("work");
            creep.memory.status = "work"
        }
        else if (_.sum(creep.carry) === creep.carryCapacity) {
            creep.say("return");
            creep.memory.status = "return";
        }

        creep.say(creep.memory.status);
        if (creep.memory.status === "work") {
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else if (creep.memory.status === "return") {
            let spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: function (structure) {
                    return structure.structureType === STRUCTURE_SPAWN;
                }
            });
            console.log(creep.transfer(spawn, RESOURCE_ENERGY));
            if (spawn && creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }

    }
};