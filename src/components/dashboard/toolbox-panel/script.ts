Polymer({
  is: name,
  properties: {
    headline: String,
    description: String
  },
  ready: function() {
    angular.module('app', ['ui.sortable'])
      .controller('Toolbox', Toolbox);

    angular.bootstrap(this, ['app']);

    function Toolbox($scope, $http) {
      var vm = this;

      vm.closed = true;
      vm.categories = [];
      vm.options = {
        connectWith: '.ui-sortable',
        start: function(e, ui) {
          //e.toElement.outerHTML = '<figure class="panel panel-default lobipanel lobipanel-sortable" data-inner-id="pPpBqCnrf7" data-index="0"><header class="panel-heading">customers<div class="dropdown"><ul class="dropdown-menu dropdown-menu-right"><li><a data-func="close" data-tooltip="Close" data-toggle="tooltip" data-title="Close" data-placement="bottom" data-original-title="" title=""><i class="panel-control-icon glyphicon glyphicon-remove"></i><span class="control-title">Close</span></a></li></ul><div class="dropdown-toggle" data-toggle="dropdown"><span class="panel-control-icon glyphicon glyphicon-cog"></span></div></div></header><div class="panel-body">apa</div></figure>';
          //debugger
          //AppEventStore.apply({ name: 'dashboard', action: 'toolbox.sortstart' });
        },
        update: function(e, ui) {
          console.log('update')
        },
        stop: function(e, ui) {
          //AppEventStore.apply({ name: 'dashboard', action: 'toolbox.sortstop' });
        },
        beforeStop: function(e, ui) {
          //debugger
        }
      };

      $http.get('data?path=html/component').then(
        function(response) {
          vm.categories = response.data.children;
        }, function(response) {
          console.error(response);
        });
    }
  }
});
