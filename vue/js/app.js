(function(exports, router, Vue) {
  'use strict';

  // Vue 实例
  window.App = new Vue({
    // el: '.todoapp',
    router: router,
    data: function() {
      return {
        // 数据集
        todos: exports.todoStorage.getTodos(),
        // 当前需要显示的数据,
        // currentShowTodos: [],
        // 显示模式类型参数
        type: '/',
        // 全选标志
        checkedAll: true,
        // 输入内容
        input: '',
        // 全局正在编辑项id
        currentEditingId: -1,
      }
    },
    methods: {
      toggleAll: function() {
        for (var i = 0; i < this.todos.length; i++) {
          this.todos[i].completed = this.checkedAll;
        }
        this.checkedAll = !this.checkedAll;
      },
      toggle: function (todo) {
      	for(var i=0; i<this.todos.length; i++){
  				if(todo.id === this.todos[i].id){
  					this.todos[i] = todo;
  				}
  			}
  			exports.todoStorage.saveTodos(this.todos);
      },
      add: function() {
      	if(this.input){
      		this.todos.push({
	          id: +new Date(),
	          text: this.input,
	          completed: false
	        });
	        this.input = '';
      	}
      },
      del: function (id) {
      	for(var i=0; i<this.todos.length; i++){
      		if(id === this.todos[i].id){
      			this.todos.splice(i, 1);
      		}
      	}
      },
      clearCompleted: function () {
      	var tempArr = [];
      	for(var i=0; i<this.todos.length; i++){
      		if(!this.todos[i].completed){
      			tempArr.push(this.todos[i]);
      		}
      	}
      	this.todos = tempArr;
      },
      editing: function (id) {
      	this.currentEditingId = id;
      },
      edited: function (todo) {
      	for(var i=0; i<this.todos.length; i++){
  				if(todo.id === this.todos[i].id){
  					this.todos[i] = todo;
  				}
  			}
  			exports.todoStorage.saveTodos(this.todos);
      	this.currentEditingId = -1;
      }
    },
    watch: {
    	'$route': function (to, from) {
    		console.log('route change');
    		this.type = to.path;
    	},
    },
    computed: {
    	currentShowTodos: function () {
    		if(this.type === '/active'){
    			var tempArr = [];
    			for(var i=0; i<this.todos.length; i++){
    				if(!this.todos[i].completed){
    					tempArr.push(this.todos[i]);
    				}
    			}
    			return tempArr;
    		}else if(this.type === '/completed'){
    			var tempArr = [];
    			for(var i=0; i<this.todos.length; i++){
    				if(this.todos[i].completed){
    					tempArr.push(this.todos[i]);
    				}
    			}
    			return tempArr;
    		}else if(this.type === '/') {
    			return this.todos
    		}
    	}
    }
  })
  .$mount('.todoapp')

})(window, router, Vue);
