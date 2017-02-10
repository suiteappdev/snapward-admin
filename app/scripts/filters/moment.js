angular.module('shoplyApp').filter('moment', function() {
    return function(dateString) {
        return moment(dateString).fromNow();
    };
});