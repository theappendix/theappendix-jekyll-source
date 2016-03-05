function showSupernote(supernote, number) {
  console.log("type: " + supernote['type']);
  for (var i = 0; i < supernote['notes'].length; i++) {
    console.log(supernote['notes'][i]);
  }
}

function buildSupernoteLink(supernote, number) {
  var label = '[' + supernote['type'] + ']';

  link = $('<a>')
            .attr('href', '#paragraph-' + number)
            .attr('id', supernote['type'] + '-' + number + '-supernote')
            .text(label);
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