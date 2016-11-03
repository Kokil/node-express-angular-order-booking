﻿(function () {
    'use strict';

    angular
            .module('app')
            .controller('Order_Book', Controller);

    function Controller($window, $scope, $auth,$http,UserService,OrderService,$location) {
        var vm = this;
        vm.user = null;
        vm.items = null;
        vm.getTotal = 0;
        vm.username =null;
        vm.tableno=null;
        vm.email =null;
        vm.userBooked=null;
       // $localStorage.itemBooked=[];
        initController();
        vm.addItem = addItem;
        vm.SubmitForm = SubmitForm;
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                 vm.username = user.name;
                  vm.email = user.email;
            }).catch(function (err) {
                    $window.location="/";
            });
            OrderService.GetAllItem().then(function(item){
                console.log(item);
                vm.items=item;
            })
            OrderService.GetBooked().then(function (itemdata) {
                    console.log(itemdata)
                vm.userBooked = itemdata.data;
                vm.getTotal=0;
                for(var i=0; i < itemdata.data.length;i++){
                   vm.getTotal+= itemdata.data[i]['price'];
                }
            })
        }
        function SubmitForm(){
            if(vm.getTotal==0){
                swal("Babua Kuch Book To Kar Le");
                return 0;
            }
            var Json={tableno:vm.tableno,username:vm.username,email:vm.email,details:vm.userBooked};
            var config = {
                headers : { 'Content-Type': 'application/json' } 
            }
            swal({
                title: "Matlab Soch Liya Khane Ka?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ha Be",
                cancelButtonText: "Nahi Be",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.post('/api/order/saveorderfinal', Json, config)
            .success(function (data, status, headers, config) {
                swal("Atal La Raha Tera Order Wait Kar");
                $location.path("/history")
            })
            .error(function (data, status, header, config) {
               swal("Error Hai Ab Bhukhe Reh");
            });
                } else {
                    swal("Kya Hua Bhukkad ??", "");
                }
            });
        }
        function addItem(itemid,quant,price,name){
            if(quant=="" || quant==undefined){
                swal("Bina Add Kiye Khana?? No No");
                return false;
            }
            var data = {
                itemid: itemid,
                quantity: quant,
                price: price*quant,
                name:name
            };
        
            var config = {
                headers : { 'Content-Type': 'application/json' } 
            }
            swal({
                title: "Suchi Me Bhookh Lagi Kya?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ha Bohot Tez",
                cancelButtonText: "Nahi Hai Bhookh",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.post('/api/order/saveorder', data, config)
            .success(function (data, status, headers, config) {
                swal("Ollala Ho Gya Add");
                OrderService.GetBooked().then(function (itemdata) {
                    console.log(itemdata)
                vm.userBooked = itemdata.data;
                vm.getTotal=0;
                for(var i=0; i < itemdata.data.length;i++){
                   vm.getTotal+= itemdata.data[i]['price'];
                }
            })
            })
            .error(function (data, status, header, config) {
               swal("Error Hai Ab Bhukhe Reh");
            });
                } else {
                    swal("Kya Hua Paise Ni Hai Na ??", "");
                }
            });
            
        
          //  alert(angular.element(item));
        }
        



    }

})();
