let statusSpawn = require("status.spawn");

module.exports = {

    /**
     *
     * @param {StructureSpawn} spawn
     */
    standardAction: function (spawn) {
        let spawnable = statusSpawn.shouldSpawn(spawn);
        let energy = spawn.energy;
        if (spawnable && spawnable !== "renew") {
            let body = [];
            while (energy > 50) {
                if (energy > 100) {energy -= 100; body.push(WORK);}//one WORK part
                if (energy > 50) {energy -= 50; body.push(CARRY);}//one CARRY part
                if (energy > 50) {energy -= 50; body.push(MOVE);}//one MOVE part
            }
            let name = 1;
            while (typeof name === "number") {
                if (Game.creeps.indexOf(spawnable + name) === -1) {
                    name = spawnable + name;
                }
                else {
                    name += 1;
                }
            }
            let opts = {
                memory: {
                    role: spawnable
                }
            };
            spawn.spawnCreep(body, name, opts);
        }
        else if (spawnable === "renew") {
            for (let each in spawn.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: function (creep) {
                        creep.memory.status = "renew";
                    }})) {
                spawn.renewCreep(Game.creeps[each]);
            }
        }
    }
};