const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'brada', 'Desktop', 'elevate-exterior', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const startStr = '            <div class="scrolling-reviews-track">';
const endStr = '            </div>\r\n        </div>\r\n    </section>';
const endStr2 = '            </div>\n        </div>\n    </section>';

let start = content.indexOf(startStr);
let end = content.indexOf(endStr);
if (end === -1) end = content.indexOf(endStr2);

if (start !== -1 && end !== -1) {
    let trackContent = content.substring(start + startStr.length, end);
    let cards = trackContent.split('                <div class="scrolling-review-card">');
    
    let first4 = [];
    for (let i = 1; i <= 4; i++) {
        first4.push('                <div class="scrolling-review-card">' + cards[i]);
    }
    
    let groupHtml = first4.join('');
    
    let newTrackHtml = '\n';
    for (let i = 0; i < 6; i++) {
        let aria = i > 0 ? ' aria-hidden="true"' : '';
        newTrackHtml += `                <div class="reviews-group"${aria}>\n`;
        newTrackHtml += groupHtml;
        newTrackHtml += '                </div>\n';
    }
    
    let newContent = content.substring(0, start + startStr.length) + newTrackHtml + content.substring(end);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully replaced HTML');
} else {
    console.log('Could not find boundaries');
}
