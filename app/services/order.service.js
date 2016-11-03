﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllItem = GetAllItem;
        service.GetBooked= GetBooked;
        service.GetBookedHistory= GetBookedHistory;
        service.GetBookedOrder=GetBookedOrder;
        return service;

        function GetAllItem() {
            return $http.get('/api/order/allitems').then(handleSuccess, handleError);
        }
        function GetBooked() {
            return $http.get('/api/order/currentbook').then(handleSuccess, handleError);
        }
        function GetBookedHistory() {
            return $http.get('/api/order/history').then(handleSuccess, handleError);
        }
        function GetBookedOrder() {
            return $http.get('/api/order/allorder').then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
