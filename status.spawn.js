/**
 * A series of helper functions designed to quickly calculate the state changes for a spawn.
 * Uses the spawn as a parameter and acts as static calculation functions.
 *
 * @type {Object}
 */
module.exports = {
    /**
     *
     * @param {StructureSpawn} spawn The spawn to run calculations on.
     */
    shouldSpawn: function (spawn) {
        if (spawn.room.memory.spawnQueue[0] && !(spawn.spawning)) {
            
        }
    },

    /**
     *
     * @param {Spawnable} spawnable
     */
    // timeToSpawn: function (spawnable) {
    //     new Spawna
    // }
};