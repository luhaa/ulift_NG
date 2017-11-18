angular.module('UliftApp',['ng','ngRoute','ngAnimate'])
    .config(function($routeProvider){
        $routeProvider
            .when('/index',{
                templateUrl:'tpl/index.html',
                controller:'indexCtrl'
            })
            .when('/list',{
                templateUrl:'tpl/list.html',
                controller:'listCtrl'
            })
            .otherwise('index');
    }) //给body一个控制器
    .controller('parentCtrl',['$scope','$location','$http',function($scope,$location,$http){
        //封装跳转函数 供容器中的子元素跳转使用
        $scope.jump=function (dsnPath) {
            $location.path(dsnPath)
        };

        //获取房源数据  因为反复调用多次 所以在这里封装起来
        $scope.getHouseData=function (postData) {
            $http({
                method:'POST',
                url:'php/zf_list.php',
                headers:{'content-type':'application/x-www-form-urlencode; charset=utf-8'},
                data:$.param(postData) //把数据转成键值对的形式发给服务器
            }).success(function () {

            })
        }
    }])
    .controller('indexCtrl',['$scope',function($scope){

    }])
    .controller('listCtrl',['$scope','$http',function($scope,$http){
        //获取一级区域列表的数据 (页面加载就触发)
        $http.get('php/area_list.php').success(function (n) {
            //记录n中所得到的服务器端返回的数据
            $scope.areaData=n;
        });

        //获取房源数据并显示 (页面加载就触发)
        var postData={ //第一次获取 第一页 不限 不限
            pageNum:1,
            areaId:0,
            subAreaId:0,
            priceMin:0,
            priceMax:20000,
            sizeMin:0,
            sizeMax:20000,
            houseType:0,
            leaseWay:0
        };


        //定义方法,实现显示二级区域数据 (点击后触发)
        $scope.currentAreaId=0; //为了控制二级区域显示与隐藏 0说明点的是不限要隐藏
        $scope.showSubAreas=function (areaId) {
            $scope.currentAreaId=areaId;
            if(areaId==0) return; //如果点击的是不限直接返回就行,不用再发请求了
            $http.get('php/area_list_sub.php?areaId'+areaId).success(function (result) {
                $scope.subAreaData=result;
            })
        }
    }]);