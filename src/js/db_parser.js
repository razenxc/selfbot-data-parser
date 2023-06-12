const fileInput = document.getElementById('fileInput');
const outputDiv = document.getElementById('output');

const handleFile = async () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
    const arrayBuffer = event.target.result;
    const data = new Uint8Array(arrayBuffer);
    const sql = await initSqlJs({ locateFile: () => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm' });
    const db = new sql.Database(data);

    // Executing a SQL query to get data from the messages table
    const query = "SELECT author, content, timestamp, attachments, avatar FROM messages";
    const results = db.exec(query);
    const rows = results[0].values;

    // Generating HTML Output
    let htmlOutput = '';
    rows.forEach(row => {
        const author = row[0];
        const content = row[1];
        const timestamp = row[2];
        const attachments = row[3] ? row[3].split(",") : [];
        const avatar = row[4];

        htmlOutput += 
        '<div class="message">' +
        '<img class="message_avatar" onerror="this.src=\'public/images/default_avatar_yellow.png\'" src=" ' + avatar + ' ">' +
        '<div class="message_content">' +
            '<div class="message_info">' +
            '<span class="message_author">' + author + '</span>' +
            '<span class="message_timestamp">' + timestamp + '</span>' +
            '</div>' +
            '<div class="message_text">' + content + '</div>' +
        '</div>' +
        '</div>';

        htmlOutput += '<br>';

        if (/\.(jpeg|jpg|gif|png)$/.test(content)) {
            htmlOutput += '<img class="message_image" src="' + content + '">';
        }
        
        attachments.forEach(attachment => {
            htmlOutput += '<img class="message_image" onerror="this.src=\'public/images/corrupted_attachment.png\'" src="' + attachment + '">';
        });
        
    });

    // Outputting HTML to a page
    outputDiv.innerHTML = htmlOutput;
    };

    reader.readAsArrayBuffer(file);
};

fileInput.addEventListener('change', handleFile);

// Loading a file immediately on page load (if the file is selected in advance)
window.addEventListener('DOMContentLoaded', () => {
    if (fileInput.files.length > 0) {
    handleFile();
    }
});