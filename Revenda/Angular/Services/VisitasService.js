function VisitasService($http, $httpParamSerializerJQLike, $q, $rootScope, $localStorage) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    service = this;

    service.list = function () {

        var result = $q.defer();

        $rootScope.loader = true;

        $http({
            url: '/visitas',
            method: "GET",
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

    service.disponiveis = function () {

        var result = $q.defer();

        $rootScope.loader = true;

        $http({
            url: '/visitas/disponiveis',
            method: "GET",
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

    service.agendadas = function () {

        var result = $q.defer();

        $rootScope.loader = true;

        $http({
            url: '/visitas/agendadas',
            method: "GET",
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

    service.add = function (data) {
        var result = $q.defer();
        $rootScope.loader = true;
        $http({
            url: '/visitas/add',
            method: "POST",
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Bearer ' + $localStorage.userData.Token
            }
        }).then(function (response, status) {
            result.resolve(true);
        }, function (response) {
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });

        return result.promise;
    }

    service.PegarVisita = function (data) {
        var result = $q.defer();
        $rootScope.loader = true;
        $http({
            url: '/visitas/pegarvisita',
            method: "POST",
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Bearer ' + $localStorage.userData.Token
            }
        }).then(function (response, status) {
            result.resolve(true);
        }, function (response) {
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });

        return result.promise;
    }



}

VisitasService.$inject = ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope', '$localStorage'];
module.exports = VisitasService;