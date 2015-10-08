app.controller("myController", ["$scope", "httpFactory", "$timeout", function($scope, httpFactory, $timeout){

//--HEADER SECTION--\\
  $scope.searchIcon = "../images/search_icon.png";
  $scope.logo = "job pocket";
  $scope.menuIcon = "../images/nav_bar_icon.png";
//--END HEADER SECTION--\\

//--FOOTER SECTION--\\
  $scope.contact = "contact";
//--END FOOTER SECTION--\\

//--MAIN BODY/ MY LIST--\\
 $scope.headLine = "Wanted UX/UI Designer";
 $scope.fillerText = "Title Amadeus Consulting is a technology consulting company located in the heart of Boulder, CO. We are looking for dynamic developers to join our fast growing team! Benefits of Amadeus Consulting: A great learning opportunity with a supportive and collaborative team environment A chance to develop cutting edge technology in dynamic project ...";
//--END MAIN BODY/ MY LIST--\\

}]);



app.controller("jobController", function($scope, httpFactory, $timeout){
  $scope.url= "";
  $scope.allJobs = [];

  $scope.getUrl= function () {
    console.log($scope.url);
    $scope.allJobs.push($scope.url);
    console.log($scope.allJobs);
  };

  $scope.messageSection = false;
  $scope.headLine = "";
  $scope.jobdescription = {};

  var jobUrl = "";
  var jobsUrl = "/api/v1/jobs";

  getjobs = function(url){
    httpFactory.get(url)
    .then(function(response){
      $scope.jobs = response.data;
    });
  };

  function showMessage(messageString) {
    getjobs(jobsUrl);
    $scope.messageSection = true;
    $scope.message = messageString;
    $timeout(function() {
      $scope.messageSection = false;
    }, 5000);
  }

  getjobs(jobsUrl);

  $scope.postjob = function(){
    var payload = $scope.job;
    httpFactory.post(jobsUrl, payload);
    $scope.job = {};
    showMessage("Job Successfully Added!");
  };

  $scope.editjob = function(id){
    jobUrl = "/api/v1/job/" + id;
    httpFactory.get(jobUrl).then(function(response) {
      $scope.job = response.data;
    });
    $scope.edit = true;
  };

  $scope.updatejob = function() {
    var payload = $scope.job;
    httpFactory.put(jobUrl, payload);
    $scope.edit = false;
    $scope.job = {};
    showMessage("job Successfully Updated!");
  };

  $scope.deletejob = function(id) {
    jobUrl = "/api/v1/job/" + id;
    httpFactory.delete(jobUrl);
    showMessage("job Successfully Deleted!");
  };

});
