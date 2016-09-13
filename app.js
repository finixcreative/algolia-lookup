// Dependencies

var express	= require('express'),
	app 	= express(),
	path 	= require('path'),
	algolia	= require('algoliasearch'),
	client	= algolia('5P9VW7TCW2', '2977c9a3a401babb0031f9801928fe61'),
	index	= client.initIndex('products'),
	data	= require('./data/demo_master_data.json');

// Algolia index

index.setSettings({
	'customRanking': ['asc(brand)'],
	'attributesToIndex': [
		'name',
		'brand',
		'categories',
		'type',
		'description',
		'objectID'
	]
}, function(err, content){
	console.log(content);
});

index.addObjects(data, function(err, content){
	if(err){
		console.error(err);
	}
});

// Router

app.use(express.static(__dirname));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/search", function(req, res){
	var searchTerms = req.body,
		searchResults = "",
		template = {
			open: `<div class="full">`,
			close: `</div>`
		};

	function searchDB(query){
		index.search(query, function(err, content){
			searchResults += template.open;
			for(var i = 0; i < content.hits.length; i++){
				var item = content.hits[i];
				searchResults +=	`<div class="result full">
										<img class="thumbnail" src="${item.image}">
										<div class="title center">
											<p>${item.name}</p>
										</div>
										<div class="order center">
											<b>$${item.price}</b><br>
											<button>Buy now</button>
										</div>
									</div>`;
			}
			searchResults += template.close;
			return res.end(searchResults);
		});
	};

	searchDB(searchTerms);

});

app.listen(3333);