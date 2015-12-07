angular.module('OrderCloud-HamburgerNavigation', []);

angular.module('OrderCloud-HamburgerNavigation')
    .directive('hamburgernavigation', hamburgernavigation)
    //.controller('HamburgerNavigationCtrl', HamburgerNavigationCtrl)
;

function hamburgernavigation() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'NavCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            //color changes
            '.navbar-hamburger .main-toggle i { color:#fff; }',
            'ul.burgers { background-color: #50acdb; margin:0; width:100%; }',
            'ul.burgers li a:hover, ul.burgers li a:focus { background-color: #359FD5; }',
            //color changes
            'accountnavigation { display:none !important; }',
            '.navbar-hamburger .main-toggle i { font-size: 1.8em; left: 10px; position: relative; top: 10px; }',
            '.navbar.navbar-hamburger, .navbar.navbar-categories, .navbar.navbar-account { min-height:40px; max-height:40px; padding-bottom:10px; }',
            'ul.burgers li {width:100%;}',
            'ul.burgers li a {  padding: 0.5em 0.75em; width: 100%; height: auto; line-height:auto; }',
            'ul.burgers li a:hover { text-decoration: none; }',
            'ul.burgers li a i { font-size: 1.2em; min-width: 25px; }',
            'ul.categories-tree, ul.my-account { position: relative; top: 0; z-index: 1010;}',
            'ul.categories-tree li, ul.my-account li {  width: 100%; }',
            'ul.categories-tree li a, ul.my-account li a { padding: 0.5em 0.75em; width: 100%; }',
            'ul.categories-tree li a:hover, ul.my-account li a:hover { text-decoration:none; }',
            'ul.categories-tree li ul li a, ul.my-account li a { color:#fff; font-size:95%; text-indent:5px; }',
            'ul.burgers .badge {margin-left:3px; }',
            '</style>',
            '<header class="header navbar navbar-inner hidden-sm hidden-md hidden-lg">',
            '<nav class="navbar navbar-default navbar-hamburger" role="navigation">',
            '<div ng-init="isCollapsed = true">',
            '<a class="main-toggle" ng-click="isCollapsed = !isCollapsed" ng-class="{\'active\': !isCollapsed, \'\': isCollapsed}">',
            '<i class="fa fa-th-list" ng-show="isCollapsed"></i>',
            '<i class="fa fa-th" ng-show="!isCollapsed"></i>',
            '</a>',
            '</div>',
            '</nav>',
            '<div class="container">',
            '<div class="col-xs-12 col-collapse" collapse="isCollapsed">',
            '<ul class="navbar-nav burgers">',
            '<li ng-class="{\'active\': isActive([\'catalog\'])}">',
            '<a href="catalog">',
            '<i class="fa fa-home"></i>',
            '<span>{{\'Home\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '<li ng-class="{\'active\': isActive([\'search\'])}">',
            '<a href="search">',
            '<i class="fa fa-search"></i>',
            '<span>{{\'Search\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            //categories
            '<li id="categories">',
            '<nav class="navbar-default navbar-categories" role="navigation">',
            '<div ng-init="isCollapsedCategory = true">',
            '<a ng-click="isCollapsedCategory = !isCollapsedCategory" ng-class="{\'active\': !isCollapsedCategory, \'\': isCollapsedCategory}">',
            '<i class="fa fa-folder" ng-show="isCollapsedCategory"></i>',
            '<i class="fa fa-folder-open" ng-show="!isCollapsedCategory"></i>',
            '<span>{{\'Products\' | r | xlat}}</span>',
            '</a>',
            '</div>',
            '</nav>',
            '<div class="col-xs-12 col-collapse" collapse="isCollapsedCategory">',
            '<ul class="navbar-nav categories-tree">',
            '<li>',
            '<categorytree tree=\'tree\' current=\'currentCategory\' />',
            '</li>',
            '</ul>',
            '</div>',
            '</li>',
            '<li class="cart" ng-class="{\'active\': isActive([\'cart\', \'checkout\'])}">',
            '<a ng-show="cartCount && user.CurrentOrderID" class="cart" href="cart">',
            '<i class="fa fa-shopping-cart"></i>',
            '<span>{{\'Cart\' | r | xlat}}</span>',
            '<span ng-bind="cartCount" class="badge"></span>',
            '</a>',
            '</li>',
            //account
            '<li id="account">',
            '<nav class="navbar-account" role="navigation">',
            '<div ng-init="isCollapsedAccount = true">',
            '<a ng-click="isCollapsedAccount = !isCollapsedAccount" ng-class="{\'active\': !isCollapsedAccount, \'\': isCollapsedAccount}">',
            '<i class="fa fa-cog" ng-show="isCollapsedAccount"></i>',
            '<i class="fa fa-cogs" ng-show="!isCollapsedAccount"></i>',
            '<span>{{\'My Account\' | r | xlat}}</span>',
            '</a>',
            '</div>',
            '</nav>',
            '<div class="col-xs-12 col-collapse" collapse="isCollapsedAccount">',
            '<ul class="navbar-nav my-account">',
            '<li>',
            '<li id="451qa_user_link" ng-show="user.Permissions.contains(\'ViewSelfAdmin\')" class="admin">',
            '<a href="admin">',
            '<i class="fa fa-lock"></i>',
            '{{\'User Information\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li class="order" ng-if="user.Type == \'Customer\'" ng-class="{\'active\': isActive(\'order\'), \'active-xs\': isActive(\'favoriteorders\')}">',
            '<a id="451qa_order_link" href="order">',
            '<i class="fa fa-clipboard"></i>',
            '{{\'Orders\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li id="451qa_addy_link" ng-show="user.Type == \'Customer\' && (user.Permissions.contains(\'CreateShipToAddress\') || user.Permissions.contains(\'CreateBillToAddress\'))" class="addresses">',
            '<a href="addresses">',
            '<i class="fa fa-book"></i>',
            '{{\'Addresses\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li id="451qa_mesg_link" ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'ViewMessaging\')" class="messages">',
            '<a href="message">',
            '<i class="fa fa-comment"></i>',
            '{{\'Messages\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li class="favorites" ng-show="user.Type == \'Customer\'">',
            '<a id="451qa_fave_link" href="favoriteorders">',
            '<i class="fa fa-star"></i>',
            '{{\'Favorites\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li class="report" ng-if="user.Type == \'Customer\' && user.Permissions.contains(\'AdvancedReporting\')" ng-class="{\'active\': isActive(\'reports\')}">',
            '<a id="451qa_order_link" href="reports">',
            '<i class="fa fa-bar-chart-o"></i>',
            '{{\'Reports\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li>',
            '<a href="#" neworder ng-if="user.Permissions.contains(\'MultipleShoppingCart\') && currentOrder" class="neworder" ng-click="newOrderLoadingIndicator = true;startNewOrder()">',
            '<i class="fa fa-plus"></i>',
            '{{\'Start\' | r | xlat}} {{\'New\' | r | xlat}} {{\'Order\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li class="logout" ng-if="user.Type ==\'Customer\'">',
            '<a href="#" class="451_btn_logout" ng-click="Logout()">',
            '<i class="fa fa-sign-out"></i>',
            '<span>{{\'Logout\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '</li>',
            '</ul>',
            '</header>'
        ].join('');
    }
}

/*placeholder for additional functions if needed*/
HamburgerNavigationCtrl.$inject = ['$scope', '$location'];
function HamburgerNavigationCtrl($scope, $location) {
}

