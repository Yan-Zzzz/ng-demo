var root = './node_modules/',
    packages = [
        'angular/angular.min.js',
         'angular-ui-router/release/angular-ui-router.min.js'
    ];

module.exports = {
    root: root,
    packages: packages.map(function(item) {
    	return root + item;
    })
};
