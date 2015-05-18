angular.module('postCtrl', ['postService', 'authService'])
    .controller('postController', function(Post, Auth, AuthToken, $routeParams) {
        var vm = this;

        vm.loggedIn = Auth.isLoggedIn();


        vm.login = function(loginData) {
            console.log(loginData);
            Auth.login(loginData.email, loginData.password)
			.success(function(data) {


				if (data.success)
					window.location.href = '/'
				else
					vm.error = data.message;

			});
        }

        vm.isLoggedIn = function() {
            Auth.isLoggedIn();
        }


        Post.all()
            .success(function(data) {
                vm.posts = data;

                for(i=0; i < vm.posts.length; i++) {

                    // FORMAT DATE
                    if(data[i].date) {

                        var year     = null
                        var monthDay = null

                        data[i].date = data[i].date.slice(0,data[i].date.indexOf('T'));
                        data[i].date = data[i].date.replace(/-/g, '/');

                        year     = data[i].date.slice(0, 4);
                        monthDay = data[i].date.slice(5, data[i].date.length);

                        data[i].date = monthDay +'/' + year;

                    };

                    // FORMAT EXCERPT
                    if(data[i].content) {

                        data[i].content = data[i].content.split(/\s+/).slice(0, 30).join(" ") + '...';

                    };


                };

                vm.posts = data;

             });

        Post.get($routeParams.post_id)
            .success(function(data) {
                vm.post = data;
            });


        vm.createPost = function(postData) {
            Post.post(postData)
                .success(function(data) {
                    console.log(data);
                })

                .error(function(error) {
                    console.log(error);
                });

        }

    });
