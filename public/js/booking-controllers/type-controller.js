var dropOffSection = document.getElementById('drop-off-section')
var serviceTypeSelect = document.getElementById('service-type');

dropOffSection.style.display = 'none'
serviceTypeSelect.addEventListener('change', function() {
  var selectedOption = serviceTypeSelect.options[serviceTypeSelect.selectedIndex];
  if (selectedOption.value === 'a-b') {
    dropOffSection.style.display = 'block'
  } else {
    dropOffSection.style.display = 'none'
  }
});


