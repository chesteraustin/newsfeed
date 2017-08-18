$(document).ready(function(){
	//Document loaded, create event listeners
	console.log("document loaded")
	$("#getNews").on("click", function(){
		getNews();
	})
});

function getNews(){
	$.ajax({
		"method": "POST",
		"url": "/news/google/"
	})
	.done(function(response) {
		console.log(response);
	})
	.error(function(err){
		console.log(err);
	});
}