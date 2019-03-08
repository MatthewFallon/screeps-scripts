/**
 * A series of helper functions designed to quickly calculate the state changes for a spawn.
 * Uses the spawn as a parameter and acts as static calculation functions.
 *
 * @type {Object}
 */
module.exports = {

    spawnRatio: {
        "totalPeace": 5,
        "harvester": 2,
        "builder": 3,
        "totalWar": 10
    },

    /**
     *
     * @param {StructureSpawn} spawn
     */
    spawnNext: function (spawn) {
        let openSources = 0;
        for (let each in spawn.room.find(FIND_SOURCES)) {
            for (let position in spawn.room.lookForAtArea(LOOK_TERRAIN, each.pos.y + 1, each.pos.x - 1, each.pos.y - 1, each.pos.x + 1, true)) {
                if (position.terrain !== "wall") {
                    openSources += 1;
                }
            }
        }
        let roomScale = (spawn.room.controller.level * openSources);
        if (!Memory.war) {
            if (roomScale > spawn.room.find(FIND_MY_CREEPS).length) {
                if (spawn.room.find(FIND_MY_CREEPS,
                    {
                        filter: function (creep) {
                            return creep.memory.role === "harvester"
                        }
                    }).length < Math.ceil(roomScale * (this.spawnRatio.harvester / this.spawnRatio.totalPeace))) {
                    return "harvester";
                } else if (spawn.room.find(FIND_MY_CREEPS,
                    {
                        filter: function (creep) {
                            return creep.memory.role === "builder"
                        }
                    }).length < Math.floor(roomScale * (this.spawnRatio.builder / this.spawnRatio.totalPeace))) {
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
        let energy = spawn.energyCapacity;
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
        if (spawnable && !(spawn.spawning) && spawn.energy === spawn.energyCapacity) {
            for (let each of spawn.room.find(FIND_MY_CREEPS)) {
                if (each.pos.findClosestByPath(FIND_MY_SPAWNS) === spawn && this.spawnTime(spawn) > (each.ticksToLive - 10)) {
                    return "renew";
                }
            }
            return spawnable;
        }
        return "renew";
    }
};