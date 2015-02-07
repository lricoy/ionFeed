angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, PersonService) {
  $scope.items =[];
  $scope.newItems = [];


  $scope.doRefresh = function() {
    if($scope.newItems.length>0) {
      $scope.items = $scope.newItems.concat($scope.items);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

      $scope.newItems = [];
    }
    else {
      PersonService.GetNewUsers().then(function(items){
        $scope.items = items.concat($scope.items);

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
  $scope.doRefresh(); // auto-call at start


  $scope.loadMore = function() {
    PersonService.GetOldUsers().then(function(items){
      $scope.items = $scope.items.concat(items);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  var checkNewItems = function() {
    $timeout(function() {
      PersonService.GetNewUsers().then(function(items){
        $scope.newItems = items.concat($scope.newItems);

        checkNewItems();
      });
    }, 10000);
  };
  checkNewItems(); //auto-call at start
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
