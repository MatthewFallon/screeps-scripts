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
                if (!Game.creeps[spawnable + name]) {
                    name = spawnable + name;
                }
                else {
                    name += 1;
                }
            }
            let opts = {
                memory: {
                    role: spawnable,
                    status: "work"
                }
            };
            spawn.spawnCreep(body, name, opts);
        }
        else if (spawnable === "renew") {
            for (let each in spawn.pos.findInRange(FIND_MY_CREEPS, 3)) {
                console.log(Game.creeps[each]);
                if(Game.creeps[each].memory.status === "renew") {
                    spawn.renewCreep(Game.creeps[each]);
                }
                if (Game.creeps[each].ticksToLive === 1500) {
                    Game.creeps[each].memory.status = "work";
                }
            }
        }
    }
};