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
        if (creep.carry[RESOURCE_ENERGY] === 0) {
            creep.memory.status = "work"
        }
        else if (_.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.status = "return";
        }

        if (creep.memory.status === "work") {
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source.pos);
            }
        }
        else if (creep.memory.status === "return") {
            let site = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            let repair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (structure) {
                    return structure.hits < structure.hitsMax;
                }
            });
            let controller = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (structure) {
                    return structure.structureType === STRUCTURE_CONTROLLER;
                }
            });
            if (site) {
                if (creep.build(site) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(site.pos);
                }
            }
            else if (repair) {
                if (creep.repair(repair) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair.pos);
                }
            }
            else if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE){
                creep.moveTo(controller.pos);
            }
        }

    }
};