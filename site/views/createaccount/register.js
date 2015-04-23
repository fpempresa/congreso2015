
app.controller('CreateAccountRegisterController', ['$scope', '$stateParams', '$location', 'serviceFactory', 'formValidator', function ($scope, $stateParams, $location, serviceFactory, formValidator) {
        var usuarioService = serviceFactory.getService("Usuario");
        $scope.model = {};
        $scope.businessMessages = null;

        usuarioService.create().then(function (usuario) {
            $scope.model = usuario;
            if ($stateParams.tipoUsuario) {
                //Sobreescribimos el valor si nos los pasan en la URL
                $scope.model.tipoUsuario = $stateParams.tipoUsuario;
            }
        }, function (businessMessages) {
            $scope.businessMessages = businessMessages;
        });

        $scope.registrarse = function () {
            $scope.businessMessages = formValidator.validate($scope.mainForm, $scope.$validators);
            if ($scope.businessMessages.length === 0) {
                usuarioService.insert($scope.model).then(function () {
                    $location.path("/createaccount/end/" + $scope.model.tipoUsuario);
                }, function (businessMessages) {
                    $scope.businessMessages = businessMessages;
                });
            }
        };

        $scope.volver = function () {
            $location.path("/createaccount/init/" + $scope.model.tipoUsuario);
        }

    }]);
