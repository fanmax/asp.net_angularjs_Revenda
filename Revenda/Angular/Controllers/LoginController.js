function LoginController(AuthService, RolesService, RegisterService, $location) {


    var vm = this;

    vm.tab = 1;

    vm.setTab = function (tabId) {
        vm.tab = tabId;
    };

    vm.isSet = function (tabId) {
        return vm.tab === tabId;
    };

    vm.loginForm = {};
    vm.loginForm.grant_type = "password";
    vm.loginForm.UserName = "teste2@teste2.com";
    vm.loginForm.Password = "Passw@rd";    

    vm.login = function () {
        //console.log(vm.loginForm);
        AuthService.signin(vm.loginForm).then(function (response) {
            var user = AuthService.getUserData();            
            $location.path("/" + user.Perfil.Role);
        }, function (response) {
            //console.log("Login Error");
            //console.log(response);
            //vm.token = AuthService.getToken();
        });

        vm.loginForm.Password = "";
    };

    //Register

    vm.role;
    vm.roles;   

    vm.getRoles = function () {
        RolesService.list().then(function (response) {
            console.log(response);
            vm.roles = response.data;
        }, function (response) {
            //swal("Ops!", "Ocorreu um erro!", "error");
        });
    };

    vm.getRoles();

    vm.register = function (data) {
        console.log(data);
        RegisterService.insert(data).then(function (response) {
            
            
        }, function (response) {
            
        });
    };



}

LoginController.$inject = ['AuthService', 'RolesService', 'RegisterService', '$location'];
module.exports = LoginController;