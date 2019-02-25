/**
 * A series of helper functions designed to quickly calculate the state changes for a spawn.
 * Uses the spawn as a parameter and acts as static calculation functions.
 *
 * @type {Object}
 */
module.exports = {

    /**
     *
     * @param {StructureSpawn} spawn
     */
    spawnNext: function (spawn) {
        let roomScale = (spawn.room.controller.level * Memory.scaleTo);
        if (!Memory.war) {
            if (roomScale > spawn.room.find(FIND_MY_CREEPS).length) {
                if (spawn.room.find(FIND_MY_CREEPS,
                    {
                        filter: function (creep) {
                            return creep.memory.role === "harvester"
                        }
                    }).length < (roomScale * (3 / 5))) {
                    return "harvester";
                } else if (spawn.room.find(FIND_MY_CREEPS,
                    {
                        filter: function (creep) {
                            return creep.memory.role === "builder"
                        }
                    }).length < (roomScale * (2 / 5))) {
                    return "builder"
                }
                else {
                    return false;
                }
            }
        }
    },
    /**
     *
     *
     * @param {StructureSpawn} spawn
     */
    spawnTime: function(spawn) {
        let energy = spawn.energy;
        let time = 0;
        while (energy > 50) {
            if (energy > 100) {energy -= 100; time += 3;}//one WORK part
            if (energy > 50) {energy -= 50; time += 3;}//one CARRY part
            if (energy > 50) {energy -= 50; time += 3;}//one MOVE part
        }
        return time;
    },

    /**
     *
     * @param {StructureSpawn} spawn The spawn to run calculations on.
     */
    shouldSpawn: function (spawn) {
        let spawnable = this.spawnNext(spawn);
        if (spawnable && !(spawn.spawning)) {
            for (let each in spawn.room.find(FIND_MY_CREEPS)) {
                if (each.pos.findClosestByPath(FIND_MY_SPAWNS).id === spawn.id && this.spawnTime(spawn) > (each.ticksToLive - 10)) {
                    return "renew";
                }
            }
            return spawnable;
        }
        return false;
    }
};