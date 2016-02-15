/**
 * Created by apple on 04.03.15.
 */
angular.module('bilete').controller('Datepicker', function ($scope) {

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
        $event.showWeeks = false;
    };

    $scope.dateOptions = {
        showWeeks:'false'
    };

    $scope.format = 'dd.MM.yyyy';

});
