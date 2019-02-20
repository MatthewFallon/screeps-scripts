/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('status.creep');
 * mod.thing == 'a thing'; // true
 */
 
 
module.exports = {
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
    }

};