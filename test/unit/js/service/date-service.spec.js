define(
  [
  'angular',
  'angular-mocks',
  'js/app',
  'js/service/date-service',
  'js/controller/dashboard-controller'
  ],
  function() {
    describe('DateService', function() {
    
    beforeEach(function(){
        angular.module('todoApp', ['todoApp.date-service']);
        module('todoApp');
    });

     describe('date formatter', function() {
      var DateService;

      beforeEach(inject(function (_DateService_) {
        DateService = _DateService_;
      }));

      it('should transform timestamp to date', function() {
          DateService.formatDate(0);
          expect(DateService.formatDate(0)).to.equal('');
          expect(DateService.formatDate(1)).to.equal('Thu Jan 01 1970');
        });
    });

   });
  }
  );
