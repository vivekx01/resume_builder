$(document).ready(function () {
  $('.accordion-heading').click(function () {
    // Toggle the visibility of the accordion body specified by the data-accordion-target attribute
    $($(this).data('accordion-target')).toggleClass('hidden');
  });
  // Populate text inputs with corresponding data from the preview pane
  $('.editor-field').each(function () {
    var targetSelector = $(this).data('target'); // Get the target selector
    var previewValue = $(targetSelector).text(); // Get the content from the preview pane
    $(this).val(previewValue); // Set the text input value
  });

  // Event listener to keep the preview pane in sync with the editor pane
  $('.editor-pane').on('input', '.editor-field', function () {
    var targetSelector = $(this).data('target');
    var newValue = $(this).val();
    $(targetSelector).text(newValue);
  });
});
