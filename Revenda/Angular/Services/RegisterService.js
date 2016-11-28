function RegisterService($http, $httpParamSerializerJQLike, $q, $rootScope, $localStorage) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    service = this;

    service.insert = function (data) {

        var result = $q.defer();

        $rootScope.loader = true;

        $http({
            url: '/account/register',
            method: "POST",
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Bearer ' + $localStorage.userData.Token
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

RegisterService.$inject = ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope', '$localStorage'];
module.exports = RegisterService;