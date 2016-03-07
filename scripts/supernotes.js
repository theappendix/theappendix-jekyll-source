function showSupernote(supernote, number) {
  console.log("type: " + supernote['type']);
  for (var i = 0; i < supernote['notes'].length; i++) {
    console.log(supernote['notes'][i]);
  }
}

function supernoteLinkTitle(type, count, number) {
  var label;
  var plural = count > 1;

  switch (type) {
    case 'commentary':
      label = (plural) ? 'Commentaries' : 'Commentary';
      break;
    case 'citation':
      label = (plural) ? 'Citations' : 'Citation';
      break;
    case 'image':
      label = (plural) ? 'Images' : 'Image';
      break;
    case 'video':
      label = (plural) ? 'Videos' : 'Video';
      break;
    case 'map':
      label = (plural) ? 'Maps' : 'Map';
      break;
    case 'link':
      label = (plural) ? 'Links' : 'Link';
      break;
  }

  return label + ' for paragraph ' + number;
}

function buildSupernoteLink(supernote, number) {
  link = $('<a>')
            .attr('href', '#paragraph-' + number)
            .attr('id', supernote['type'] + '-' + number + '-supernote')
            .attr('title', 
              supernoteLinkTitle(
                supernote['type'], supernote['notes'].length, number))
            .addClass('supernote-icon')
            .addClass('icon-' + supernote['type']);
  $('#paragraph-' + number).append(link);

  (function(supernote, paragraph) {
    var linkId = '#' + supernote['type'] + '-' + paragraph + '-supernote';
    $(linkId).on('click', function(e) {
      e.preventDefault();
      showSupernote(supernote, paragraph);
    });
  })(supernote, number);
}

function buildSupernotes(data) {
  for (var i = 0; i < data.length; i++) {
    var number = parseInt(data[i]['paragraph']);

    for (var j = 0; j < data[i]['notes'].length; j++) {
      var supernote = data[i]['notes'][j];

      buildSupernoteLink(supernote, number);
    }
  }
}