	(function (angular) {
	'use strict';		//启用严格模式
	//不允许使用一些不安全的语法
	 
	// 创建一个主模块
	var myapp = angular.module('myTodoMvc',[]);

	// 注册一个主要的控制器
	myapp.controller('MainController',['$scope',function($scope){

		// 文本框需要一个模型
		$scope.text = '';

		// 任务列表也需要一个模型
		// 每一个任务的结构{id：1，text：'学习'，completed:true/flase}
		$scope.todos = [
			{id : 1, text : '学习', completed:true},
			{id : 2, text : '吃饭', completed:false},
			{id : 3, text : '睡觉', completed:false},
			{id : 4, text : '发呆', completed:true},
		]; 

		// 添加todo
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				// 自动增长？
				id : Math.random(),
				// 由于$scope.text是双向数据绑定，add同时肯定可以拿到界面上输入值
				text : $scope.text, 
				completed:false
			});
			// 清空文本框
			$scope.text = '';
		};

		// 处理删除
		$scope.remove = function(id){
			// 删除谁，就是要有参数
			for(var i=0; i<$scope.todos.length; i++){
				if($scope.todos[i].id === id ){
					$scope.todos.splice(i,1);
					break;
				}
			}
		};

		// 清空已完成
		$scope.clear = function(){
			var result = [];
			for(var i = 0 ;i<$scope.todos.length ; i++){
				if(!$scope.todos[i].completed){
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		}

		// 是否有已经完成的
		$scope.exitstCompleted = function(){
			for(var i = 0 ;i<$scope.todos.length ; i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}

		// 当前编辑哪个元素
		$scope.currentEditingId = -1;
		$scope.editing = function(id){
			$scope.currentEditingId = id;
		};
		$scope.save= function(){
			$scope.currentEditingId = -1;
		};

		// $scope.checkall =false;
		// $scope.$watch('checkall',function(now , old){
		// 	for(var i = 0 ;i<$scope.todos.length ; i++){
		// 		$scope.todos[i].completed = now;
		// 	}
		// })
		var now = false;
		$scope.toggleAll = function(){
			for(var i = 0 ;i<$scope.todos.length ; i++){
				$scope.todos[i].completed = now;
			}
			now = !now;
		}


		}])

})(angular);
