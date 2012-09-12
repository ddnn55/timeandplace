var map;

function update() {
  var radius = google.maps.geometry.spherical.computeDistanceBetween(map.getCenter(), map.getBounds().getNorthEast());
  console.log(radius);
  return;

  params = {}
  params['min_date'] = $('#min_date').val();
  params['max_date'] = $('#max_date').val();
  params['lat'] = map.getCenter().lat();
  params['lng'] = map.getCenter().lng();
  params['distance'] = radius;
  $.getJSON('/photos', params, function(data, textStatus){
    
  });
}

$(document).ready(function(){
  var center = new google.maps.LatLng((40.878582000732536 + 40.700420379638786)/2.0,
                                      (-73.91047668457026 + -74.02426147460932)/2.0)

  var mapOptions = {
    zoom: 12,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $('.date_picker').datepicker();

  $('.date_picker').change(update);
  
  var dragging = false;
  var waitUpdate = false;
  google.maps.event.addListener(map, 'dragstart', function(e) {
    dragging = true;
  });
  google.maps.event.addListener(map, 'dragend', function(e) {
    dragging = false;
    if(waitUpdate) {
      waitUpdate = false;
      update();
    }
  });
  google.maps.event.addListener(map, 'bounds_changed', function(e) {
    if(dragging)
       waitUpdate = true;
    else
       update();
  });
});
