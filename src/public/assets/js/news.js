$(document).ready(function(){
	//Document loaded, create event listeners
	console.log("document loaded")
	$("#getNews").on("click", function(){
		getNews();
	});
	$("#articles").on("click", ".notes", function(){
		var article_id = $(this).attr("data-article_id");
		viewNotes(article_id);
	});
	displayNews();

	$('#notes_modal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget) // Button that triggered the modal
		var recipient = button.data('whatever') // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		var modal = $(this)
		modal.find('.modal-title').text('New message to ' + recipient)
		modal.find('.modal-body input').val(recipient)
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

function viewNotes(article_id){
	//Show Modal
	$("#notes_modal").modal("show");
	console.log(article_id)
}

function displayNews(){
	$.ajax({
		"method": "GET",
		"url": "/api/get-news/"
	})
	.done(function(response) {
		console.log(response)
		//Loop through articles
		for(var i=0; i < response.length; i++){
			var div = $("<div>");
			var header = $("<h1>");
			var anchor = $("<a>");
			var button = $("<button>");
			anchor.attr("href", response[i].link);
			anchor.attr("target", "_blank");
			anchor.text("View Article");
			button.text("Create Notes");
			button.attr("data-article_id", response[i]._id);
			button.addClass("notes");
			header.text(response[i].title);
			div.append(header);
			div.append(anchor);
			div.append(button);
			$("#articles").append(div);
		}
	})
	.error(function(err){
		console.log(err);
	});
}