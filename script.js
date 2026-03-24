var searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('searchInput');
var sortSelect = document.getElementById('sortSelect');
var filterInput = document.getElementById('filterInput');
var statusText = document.getElementById('status');
var resultsContainer = document.getElementById('results');

var allSongs = [];

searchForm.addEventListener('submit', function (event) {
	event.preventDefault();
	var query = searchInput.value.trim();

	if (!query) {
		statusText.textContent = 'Please enter a song or artist name.';
		return;
	}

	fetchSongs(query);
});

sortSelect.addEventListener('change', function () {
	renderWithSortAndFilter();
});

filterInput.addEventListener('input', function () {
	renderWithSortAndFilter();
});

function fetchSongs(query) {
	var firstWord = query.split(/\s+/)[0];
	var url =
		'https://itunes.apple.com/search?entity=song&limit=80&term=' +
		encodeURIComponent(firstWord);

	statusText.textContent = 'Loading...';
	resultsContainer.innerHTML = '';

	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw new Error('Request failed');
			}
			return response.json();
		})
		.then(function (data) {
			var fetchedSongs = data.results || [];

			allSongs = fetchedSongs.filter(function (song) {
				return matchesSearchQuery(song, query);
			});

			if (allSongs.length === 0) {
				statusText.textContent = 'No results found.';
				return;
			}

			statusText.textContent =
				'Showing ' + allSongs.length + ' result(s).';
			renderWithSortAndFilter();
		})
		.catch(function () {
			allSongs = [];
			statusText.textContent = 'Could not fetch songs. Please try again.';
			resultsContainer.innerHTML = '';
		});
}

function matchesSearchQuery(song, query) {
	var lowerQuery = query.toLowerCase();
	var words = lowerQuery.split(/\s+/).filter(Boolean);
	var trackName = (song.trackName || '').toLowerCase();
	var artistName = (song.artistName || '').toLowerCase();
	var searchableText = trackName + ' ' + artistName;

	if (searchableText.indexOf(lowerQuery) !== -1) {
		return true;
	}

	return words.every(function (word) {
		return searchableText.indexOf(word) !== -1;
	});
}

function renderWithSortAndFilter() {
	var artistFilter = filterInput.value.trim().toLowerCase();

	var filteredSongs = allSongs.filter(function (song) {
		var artistName = song.artistName || '';
		return artistName.toLowerCase().indexOf(artistFilter) !== -1;
	});

	var selectedSort = sortSelect.value;

	if (selectedSort === 'song') {
		filteredSongs.sort(function (a, b) {
			return (a.trackName || '').localeCompare(b.trackName || '');
		});
	}

	if (selectedSort === 'artist') {
		filteredSongs.sort(function (a, b) {
			return (a.artistName || '').localeCompare(b.artistName || '');
		});
	}

	if (filteredSongs.length === 0) {
		resultsContainer.innerHTML = '';

		if (allSongs.length === 0) {
			statusText.textContent = 'No results found.';
		} else {
			statusText.textContent = 'No songs match the artist filter.';
		}

		return;
	}

	statusText.textContent = 'Showing ' + filteredSongs.length + ' result(s).';
	renderSongs(filteredSongs);
}

function renderSongs(songs) {
	var cards = songs.map(function (song) {
		var artwork = song.artworkUrl100 || '';
		var track = song.trackName || 'Unknown Song';
		var artist = song.artistName || 'Unknown Artist';
		var preview = song.previewUrl || '';

		var previewHtml = '';
		if (preview) {
			previewHtml = '<audio controls src="' + preview + '"></audio>';
		} else {
			previewHtml = '<p>Preview not available.</p>';
		}

		return (
			'<article class="song-card">' +
			'<img src="' +
			artwork +
			'" alt="Album art for ' +
			escapeHtml(track) +
			'">' +
			'<h3>' +
			escapeHtml(track) +
			'</h3>' +
			'<p>' +
			escapeHtml(artist) +
			'</p>' +
			previewHtml +
			'</article>'
		);
	});

	resultsContainer.innerHTML = cards.join('');

	var songCards = document.querySelectorAll('.song-card');
	songCards.forEach(function (card) {
		card.style.opacity = '0';
		setTimeout(function () {
			card.style.opacity = '1';
			card.style.transition = 'opacity 0.25s ease';
		}, 10);
	});
}

function escapeHtml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}
