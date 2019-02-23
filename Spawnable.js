/**
 * Class definition for a spawnable creep to be fed into spawnCreep()
 *
 * @type {Object}
 */
module.exports = class  Spawnable{
    /**
     *
     * @param {Array} body Contains body constants to be added to creep.
     * @param {String} name
     * @param {Object} memory
     */
    constructor(body, name, memory) {
        this.body = body;
        this.name = name;
        this.memory = memory;
    }
};