
importLink('https://static.scania.com/resources/logotype/scania/favicon/favicon.ico', 'shortcut icon');

importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-57x57.png', 'apple-touch-icon', '57x57');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-60x60.png', 'apple-touch-icon', '60x60');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-72x72.png', 'apple-touch-icon', '72x72');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-76x76.png', 'apple-touch-icon', '76x76');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-114x114.png', 'apple-touch-icon', '114x114');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-120x120.png', 'apple-touch-icon', '120x120');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-144x144.png', 'apple-touch-icon', '144x144');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-152x152.png', 'apple-touch-icon', '152x152');
importLink('https://static.scania.com/resources/logotype/scania/favicon/apple-icon-180x180.png', 'apple-touch-icon', '180x180');

importLink('https://static.scania.com/resources/logotype/scania/favicon/android-icon-192x192.png', 'icon', '192x192');

importLink('https://static.scania.com/resources/logotype/scania/favicon/favicon-32x32.png', 'icon', '32x32');
importLink('https://static.scania.com/resources/logotype/scania/favicon/favicon-96x96.png', 'icon', '96x96');
importLink('https://static.scania.com/resources/logotype/scania/favicon/favicon-16x16.png', 'icon', '16x16');

importLink('https://static.scania.com/resources/logotype/scania/favicon/manifest.json', 'manifest');

generateMeta('msapplication-TileColor', '#000');
generateMeta('msapplication-TileImage', 'https://static.scania.com/resources/logotype/scania/favicon/ms-icon-144x144.png');


function importLink(href, type, size) {
	var head = document.head,
		link = document.createElement('link');

	link.rel = type || 'stylesheet';
	link.href = href;

	if (size) {
		link.setAttribute('size', size);
	}

	if (type === 'icon') {
		link.type = 'image/png';
	}

	head.appendChild(link);
}

function generateMeta(name, content) {
	var head = document.head,
		meta = document.createElement('meta');

	meta.name = name;
	meta.content = content;

	head.appendChild(meta);
}
