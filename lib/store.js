
/**
 * dependencies.
 */

var unserialize = require('yiwn-unserialize');
var each = require('yiwn-each');

var storage;

/**
 * Safari throws when a user
 * blocks access to cookies / localstorage.
 */

try {
    storage = window.localStorage;
} catch (e) {
    storage = null;
}

/**
 * Expose `store`
 */

module.exports = store;

/**
 * Store the given `key`, `val`.
 *
 * @param {String|Object} key
 * @param {Mixed} value
 * @return {Mixed}
 * @api public
 */

function store(key, value){
    var length = arguments.length;
    // store()
    if (0 === length)
        return all();
    // store('key', 'value')
    if (2 <= length)
        return set(key, value);

    // ??
    if (1 != length)
        return;

    // store(null)
    if (null == key)
        return storage.clear();
    // store('key')
    if ('string' == typeof key)
        return get(key);
    // store({ key: 'value' })
    if ('object' == typeof key)
        return each(key, set);
}

/**
 * supported flag.
 */

store.supported = !! storage;

/**
 * Set `key` to `val`.
 *
 * @param {String} key
 * @param {Mixed} val
 */

function set(key, val){
    return null == val
        ? storage.removeItem(key)
        : storage.setItem(key, JSON.stringify(val));
}

/**
 * Get `key`.
 *
 * @param {String} key
 * @return {Mixed}
 */

function get(key){
    return unserialize(storage.getItem(key));
}

/**
 * Get all.
 *
 * @return {Object}
 */

function all(){
    var i = storage.length,
        key;

    var data = {};

    while (i--) {
        key = storage.key(i);
        data[key] = get(key);
    }

    return data;
}
