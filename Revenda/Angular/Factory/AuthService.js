function AuthService($http, $httpParamSerializerJQLike, $localStorage, $q, $location) {

    var as = this;

    as.userData = {
        Perfil: null,
        isAuthenticated: false,
        email: ''
    };

    as.getPerfil = function() {
        $http({
                url: '/account/getperfil',
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'Bearer ' + as.userData.Token
                }
            })
            .then(function (response, status) {
                    as.userData.Perfil = response.data;
                    $localStorage.userData = as.userData;
                },
                function(response) {
                })
            .finally(function() {

            });
    };

    return {
      
        getUserData: function () {
            return $localStorage.userData;
        },        
        signin: function (param) {
            
           // $localStorage.token = null;
            var result = $q.defer();
            $http({
                url: '/Token',
                method: "POST",
                data: $httpParamSerializerJQLike(param),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (response, status) {
                console.log(response);                
                as.userData = {
                    Perfil: null,
                    isAuthenticated: true,
                    UserName: param.UserName,
                    Token: response.data.access_token
                };                
                as.getPerfil();
                result.resolve(response);
            }, function (response) {
                result.reject(response);
            }).finally(function () {
                
            });
            return result.promise;
        },
        
        logout: function (data) {
            delete $localStorage.userData;
            $q.when();
        }
    };

}

AuthService.$inject = ['$http', '$httpParamSerializerJQLike', '$localStorage', '$q', '$location'];
module.exports = AuthService;