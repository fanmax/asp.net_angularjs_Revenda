function AuthInterceptor($localStorage, $q, $location) {

    return {
        request: function (config) {
            config.headers = config.headers || {};           


            //if ($localStorage.userData.Token) {
            //    config.headers.Authorization = 'Bearer ' + $localStorage.userData.Token;
            //}
            

            return config;
        },

        responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
                console.log(response.status);
                $location.path('/login');
            }

            return $q.reject(response);
        }
    }

}

AuthInterceptor.$inject = ['$localStorage', '$q', '$location'];
module.exports = AuthInterceptor;