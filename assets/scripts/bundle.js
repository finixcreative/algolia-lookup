// Search

function search(){
	var input = $("#search-input").val();
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3333/search',
		data: JSON.stringify(input),
		error: function(err){
			console.log(err);
		}
	})
	.done(function(data){
		template = `${data}`;
		console.log("Data: " + data);
		$("#search-results").html(template);
	});
};

$("#search-input").on("keyup", search);
$("#search-input").on("change", search);