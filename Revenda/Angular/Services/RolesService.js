function RolesService($http, $httpParamSerializerJQLike, $q, $rootScope, $localStorage) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    service = this;

    service.list = function () {

        var result = $q.defer();

        $rootScope.loader = true;

        $http({
            url: '/account/roleslist',
            method: "GET",            
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'                
            }
        }).then(function (response, status) {
            result.resolve(response);
        }, function (response) {
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });

        return result.promise;

    }

}

RolesService.$inject = ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope', '$localStorage'];
module.exports = RolesService;