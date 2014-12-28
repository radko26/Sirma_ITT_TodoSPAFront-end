define(
	[
	'angular-mocks',
	'js/app',
	'js/service/tasks-service',
	'js/service/global-service'
	],
	function(){

		describe('Get tasks service test', function() {
			beforeEach(function(){
				angular.module('todoApp', ['todoApp.tasks-service']);
				module('todoApp');
			});
			var $httpBackend;
			var TasksService;
			var Rest;

			describe('get tasks', function() {

				beforeEach(inject(function ($injector , _Rest_ , _TasksService_) {
					$httpBackend = $injector.get("$httpBackend");
					Rest = _Rest_;
					TasksService = _TasksService_; 
				}));

				it('should get tasks', function() {
					var mockArray = [];
					mockArray.push({
						id:'1'
					});
					
					$httpBackend.expectGET(Rest.getTasks).respond(mockArray);
					var array = []
					TasksService.getTasks().then(function(tasks){
						array=tasks.data[0];
					});
					$httpBackend.flush();
					expect(array.id).toBe('1');
				});

			});

			describe('adds task', function() {

				beforeEach(inject(function ($injector , _Rest_ , _TasksService_) {
					$httpBackend = $injector.get("$httpBackend");
					Rest = _Rest_;
					TasksService = _TasksService_;
				}));

				it('should send query to create new task', function() {
					var mockTask ={
						id:'1' 
					};
					
					$httpBackend.expectPOST(Rest.addTask).respond(mockTask);
					var task;
					TasksService.addTask().then(function(respondedTask){
						task = respondedTask.data;
					});
					$httpBackend.flush();
					expect(task.id).toBe(mockTask.id);
				});
			});



			describe('delete task', function() {

				beforeEach(inject(function ($injector , _Rest_ , _TasksService_) {
					$httpBackend = $injector.get("$httpBackend");
					Rest = _Rest_;
					TasksService = _TasksService_;
				}));

				it('should delete the given task', function() {
					var mockTask = {id:'1'};

					
					$httpBackend.expectDELETE(Rest.removeTask(mockTask)).respond(mockTask.id);
					var res;
					TasksService.removeTask(mockTask).then(function(respond){
						res  = respond.data;
					});
					$httpBackend.flush();
					expect(res).toBe(mockTask.id);
				});
			});

				describe('mark as finished task', function() {

				beforeEach(inject(function ($injector , _Rest_ , _TasksService_) {
					$httpBackend = $injector.get("$httpBackend");
					Rest = _Rest_;
					TasksService = _TasksService_;
				}));

				it('should mark the task as finished', function() {
					var mockTask = {id:'1'};

					
					$httpBackend.expectDELETE(Rest.removeTask(mockTask)).respond(mockTask.id);
					var res;
					TasksService.removeTask(mockTask).then(function(respond){
						res  = respond.data;
					});
					$httpBackend.flush();
					expect(res).toBe(mockTask.id);
				});
			});

		});




});