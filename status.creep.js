/**
 * A series of helper functions designed to quickly calculate extra statuses of each creep.
 * Uses creep as a parameter and acts as static calculation functions.
 *
 * @type {Object}
 */
module.exports = {

    /**
     * Returns a number corresponding to the number of ticks required for a creep to move one square on plains.
     * This method is rendered useless in other contexts and should only be used for referential speed of creeps.
     *
     * @param creepToCalculate The creep to perform the calculation on.
     * @return {number} The relative speed of the creep in number of ticks per 1 square of movement.
     */
    speed: function(creepToCalculate) {
        let weight = 0;
        let movement = 0;
        for (let i = 0; i < creepToCalculate.body.length; i++) {
             if (creepToCalculate.body[i].type === CARRY) {
                if (_.sum(creepToCalculate.carry) > 0) {
                     weight += 1;
                }
            }
            else if (creepToCalculate.body[i].type === MOVE) {
                movement += 1;
            }
            else {
                 weight += 1;
            }
         
        }
    

        if (weight / movement <= 1) {
            return 1;
        }
        else {
            if (weight % movement) {
                return (weight / movement) + 1;
            }
            else {
                return weight / movement;
            }
         
        }
    },

    /**
     * Calculates the total weight of a creep as determined by how many non-MOVE body parts it has.
     * Takes into account whether the creep is carrying anything.
     *
     * @param creepToCalculate The creep to perform the calculation on.
     * @return {number} The current calculated weight for the creep.
     */
    creepWeight: function(creepToCalculate) {
        let weight = 0;
        for (let i = 0; i < creepToCalculate.body.length; i++) {
            if (creepToCalculate.body[i].type === CARRY) {
                if (_.sum(creepToCalculate.carry) > 0) {
                    weight += 1;
                }
            }
            else if (creepToCalculate.body[i].type === MOVE) {
            }
            else {
                weight += 1;
            }

        }
        return weight;
    },

    /**
     * Calculates the total number of MOVE body parts on the creep.
     *
     * @param creepToCalculate The creep to perform the calculation on.
     * @return {number} The number of MOVE pieces the creep has.
     */
    creepMovement: function(creepToCalculate) {
        let movement = 0;
        for (let i = 0; i < creepToCalculate.body.length; i++) {
            if (creepToCalculate.body[i].type === MOVE) {
                movement += 1;
            }
        }
        return movement;
    },

    /**
     * Calculates the number of ticks required for a creep to reach the nearest spawn within their current room.
     * Uses pos.findPathTo(), room.getTerrain(), and it's speed to properly calculate the required ticks.
     *
     * Only works to calculate for the path in the current room.
     *
     * @param creepToCalculate The creep to perform calculations on.
     * @return {number} The number of ticks that would be required for a creep to reach spawn if it started moving now.
     * or -1 if there is no path.
     */
    ticksToSpawn: function (creepToCalculate) {
        let movement = this.creepMovement(creepToCalculate);
        let weight = this.creepWeight(creepToCalculate);
        let time = 0;
        const terrain = creepToCalculate.room.getTerrain();
        if (!creepToCalculate.pos.findInRange(FIND_MY_SPAWNS, 1)) {
            for (let each in creepToCalculate.pos.findPathTo(creepToCalculate.pos.findClosestByPath(FIND_MY_SPAWNS))) {
                // noinspection JSUnfilteredForInLoop
                if (creepToCalculate.room.getPositionAt(each.x, each.y).lookFor(LOOK_STRUCTURES)[0].structureType === STRUCTURE_ROAD) {
                    time += (weight * 1) - (movement * 2);
                } else {
                    // noinspection JSUnfilteredForInLoop
                    switch (terrain.get(each.x, each.y)) {
                        case TERRAIN_MASK_SWAMP:
                            time += (weight * 10) - (movement * 2);
                            break;
                        case 0:
                            time += (weight * 2) - (movement * 2);
                            break;
                        default:
                            return -1;
                    }
                }
            }
        }
        return time;
    }

};