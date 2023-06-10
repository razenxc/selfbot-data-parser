// File value input change event handler
document.getElementById('fileInput').addEventListener('change', function(e) {
  let file = e.target.files[0];
  let reader = new FileReader();
  // Reading a file
  reader.onload = function(e) {
      let contents = e.target.result;
      let jsonData = JSON.parse(contents);
      // Sort messages by timestamp
      jsonData.sort((a, b) => { return new Date(a.timestamp) - new Date(b.timestamp); });
      // Shaping the HTML Output
      let htmlOutput = '';
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
          if (/\.(jpeg|jpg|gif|png)$/.test(message.content)) {
              htmlOutput += '<img class="message_image" src="' + message.content + '">';
          }
          if (message.attachements && message.attachements.length > 0) {
              // If attachments exist, display them as images
              message.attachements.forEach(attachment => {
                  htmlOutput += '<img class="message_image" src="' + attachment + '">';
              });
          }
      });
      // Outputting HTML to a page
      document.getElementById('output').innerHTML = htmlOutput;
  };
  // Reading file content as text
  reader.readAsText(file);
});
