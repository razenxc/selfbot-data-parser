// File value input change event handler
document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    // Reading a file
    reader.onload = function(e) {
        var contents = e.target.result;
        var jsonData = JSON.parse(contents);
        // Sort messages by timestamp
        jsonData.sort((a, b) => { return new Date(a.timestamp) - new Date(b.timestamp); });
        // Shaping the HTML Output
        var htmlOutput = '';
        jsonData.forEach(message => {
            htmlOutput += 
            '<div class="message">' +
              '<img class="message_avatar" src="public/images/default_avatar_yellow.png">' +
              '<div class="message_content">' +
                '<div class="message_info">' +
                  '<span class="message_author">' + message.author + '</span>' +
                  '<span class="message_timestamp">' + message.timestamp + '</span>' +
                '</div>' +
                '<div class="message_text">' + message.content + '</div>' +
              '</div>' +
            '</div>';
            htmlOutput += '<br>';
            var isImageLink = /\.(jpeg|jpg|gif|png)$/.test(message.content);
            if (isImageLink) {
                htmlOutput += '<img class="message_image" src="' + message.content + '">';
            }
        });
        // Outputting HTML to a page
        document.getElementById('output').innerHTML = htmlOutput;
    };
    // Reading file content as text
    reader.readAsText(file);
});