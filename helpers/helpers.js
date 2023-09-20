const helpers = {
    compare: function (a, comparator, b) {
        if (eval(a + comparator + b)) {
            return true
        } else {
            return false
        }
    },

}

module.exports = helpers;