function ClienteController($http, AuthService, VisitasService) {

    var vm = this;

    vm.Perfil = AuthService.getUserData().Perfil;


    vm.getVisitas = function() {
        VisitasService.list().then(function (response) {
            vm.visitas = response.data;
        }, function () {

        });
    }

    vm.getVisitas();

    

    vm.tab = 1;

    vm.setTab = function (tabId) {
        vm.tab = tabId;
    };

    vm.isSet = function (tabId) {
        
        return vm.tab === tabId;
    };

    vm.adicionarVisita = function (data) {
        VisitasService.add(data).then(function (response) {
            console.log(response);
            iziToast.success({
                title: 'OK!',
                message: 'Sua visita foi adicionado com sucesso!'
            });
            vm.getVisitas();
            vm.setTab(1);
        }, function () {
            iziToast.error({
                title: 'OPS!',
                message: 'Ocorreu um erro!'
            });
        });
    }


}

ClienteController.$inject = ['$http', 'AuthService', 'VisitasService'];
module.exports = ClienteController;