var module = angular.module('email', ['ngResource']).
    factory('Email', function ($resource) {
        return $resource('email', {},
            { send: { method: "POST" } }
        );
    });

module.controller('EmailController', function($scope, Email) {

    $scope.send = function (message) {
        Email.send({from: message.from,
                    to: message.to,
                    cc: message.cc,
                    bcc: message.bcc,
                    subject: message.subject,
                    text: message.text}, function (response) {
            $scope.status = response;
            if (!$scope.status.error && $scope.status.message == "") {
                $scope.reset();
                $scope.status = {message: "E-mail sent successfully"};
            }
        }, function(err) {
            $scope.status = { error: true, message: "Error calling app controller: " + err };
        });
    };

    $scope.reset = function () {
        $scope.status = null;
        $scope.message = {
            to: [ "" ],
            cc: [ "" ],
            bcc: [ "" ],
            from: "",
            subject: "",
            text: ""
        };
    }
    $scope.reset();
});
