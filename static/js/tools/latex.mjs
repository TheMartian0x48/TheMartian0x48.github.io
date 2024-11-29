import pureMarkdown from "/static/js/markdown.mjs";
$(document).ready(function() {

    $("#input").on("input", function() {
        const value = $("#input").val();
        const mvalue = pureMarkdown.render(value);
        $("#preview-container").html(mvalue);
    });
});
