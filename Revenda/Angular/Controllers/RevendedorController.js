function RevendedorController(VisitasService, AuthService, $http, $q) {

    var vm = this;

    vm.Perfil = AuthService.getUserData().Perfil;

    var origin = vm.Perfil.Endereco + ',' + vm.Perfil.Numero + ',' + vm.Perfil.Cidade + '-' + vm.Perfil.UF + ',' + vm.Perfil.CEP;

    vm.tab = 1;

    vm.setTab = function (tabId) {

        if (tabId == 1) {
            vm.getVisitas();
        }

        if (tabId == 2) {
            vm.getVisitasAgendadas();
        }

        vm.tab = tabId;
    };

    vm.isSet = function (tabId) {return vm.tab === tabId;};

    vm.findMap = function (data) {
        vm.tab = 5;

        vm.Cliente = data.Cliente;
        vm.Revendedor = data.Revendedor;
        vm.enderecoCliente = data.Cliente.Endereco + ',' + data.Cliente.Numero + ',' + data.Cliente.Cidade + '-' + data.Cliente.UF + ',' + data.Cliente.CEP;
        vm.enderecoRevendedor = origin;
        vm.getLatiTudeCliente();

    }

    vm.getVisitas = function () {

        VisitasService.disponiveis().then(function (response) {
            vm.visitas = response.data;
        }, function () {

        });

    }

    vm.getVisitas();

    vm.getVisitasAgendadas = function () {

        VisitasService.agendadas().then(function (response) {
            vm.visitas = response.data;
        }, function () {

        });

    }

    vm.clienteLarLng;
    vm.revendedorLarLng;

    vm.PegarVisita = function (data) {

        if (data.Distancia >= 200) {
            iziToast.error({
                title: 'OPS!',
                message: 'Você não pode visitar alguém a mais de 200 km.'
            });
            return null
        }

        VisitasService.PegarVisita(data).then(function (response) {
            console.log(response);
            iziToast.success({
                title: 'OK!',
                message: 'Visita garantida!'
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

    vm.getLatiTudeCliente = function () {

        console.log('vm.enderecoCliente');
        console.log(vm.enderecoCliente);
        $http({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + vm.enderecoCliente + '&key=AIzaSyCbo0KMzq1xllIBsM6NIW5Rxv_J2ZuKNo4',
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(function (response, status) {
                vm.clienteLarLng = response.data.results[0].geometry.location;
                console.log(vm.clienteLarLng);

            }).finally(function () {
                vm.getLatiTudeRevendedor();
            });
    }

    vm.getLatiTudeRevendedor = function () {

        $http({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + vm.enderecoRevendedor + '&key=AIzaSyCbo0KMzq1xllIBsM6NIW5Rxv_J2ZuKNo4',
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(function (response, status) {
                vm.revendedorLarLng = response.data.results[0].geometry.location;

            }).finally(function () {
                vm.completeMap();
            });
    }

    vm.completeMap = function () {
        console.log('vm.revendedorLarLng');
        console.log(vm.revendedorLarLng);
        console.log('vm.clienteLarLng');
        console.log(vm.clienteLarLng);

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(vm.revendedorLarLng.lat, vm.revendedorLarLng.lng)
        }

        var map = new google.maps.Map(document.getElementById('mapFull'), mapOptions);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(vm.revendedorLarLng.lat, vm.revendedorLarLng.lng),
            title: "Você",
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(vm.clienteLarLng.lat, vm.clienteLarLng.lng),
            title: vm.Cliente.Nome,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

    }

    vm.getDistancia = function (v) {

        if (v == null) return null;

        
        var destination = v.Cliente.Endereco + ',' + v.Cliente.Numero + ',' + v.Cliente.Cidade + '-' + v.Cliente.UF + ',' + v.Cliente.CEP;;   
        
        calculateDistance(origin, destination).then(function(data, status) {
            console.log(data);
            v.Distance = data;
            var el = vm.visitas.filter(function (el) { return el.Id == v.Id; })[0];
            el.Distancia = (data / 1000);
        });

    }

    function calculateDistance(origin, destination)
    {
        var result = $q.defer();

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            }, function (response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    result.reject(status);
                } else {
                    result.resolve(response.rows[0].elements[0].distance.value);
                }
            });

        return result.promise;
        
    }

    //navigator.geolocation.getCurrentPosition(function (pos) {
    //    console.log(pos);
    //    console.log(pos.coords.latitude);
    //    console.log(pos.coords.longitude);
    //    lat = pos.coords.latitude;
    //    lng = pos.coords.longitude;
    //});        
}

RevendedorController.$inject = ['VisitasService', 'AuthService', '$http', '$q'];
module.exports = RevendedorController;