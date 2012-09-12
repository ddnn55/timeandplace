function update() {
  console.log("Update, yo!");
}

$(document).ready(function(){
  var center = new google.maps.LatLng((40.878582000732536 + 40.700420379638786)/2.0,
                                      (-73.91047668457026 + -74.02426147460932)/2.0)

  var mapOptions = {
    zoom: 12,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

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
