const fs = require('fs');
let html = fs.readFileSync('book.html', 'utf8');
const startToken = '    <!-- Booking Steps Indicator -->';
const endToken = '    <!-- Footer -->';
const startIndex = html.indexOf(startToken);
const endIndex = html.indexOf(endToken);

if (startIndex === -1 || endIndex === -1) {
    console.log('Tokens not found');
    process.exit(1);
}

const ghlEmbed = `    <!-- GHL Form Integration -->
    <section class="booking-section">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
            <iframe
                src="https://api.leadconnectorhq.com/widget/form/BECuw4R5vmUW4GuyoIY1"
                style="width:100%;height:100%;min-height:800px;border:none;border-radius:12px;box-shadow: 0 20px 40px rgba(0,0,0,0.1);"
                id="inline-BECuw4R5vmUW4GuyoIY1" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Standard Form"
                data-layout-iframe-id="inline-BECuw4R5vmUW4GuyoIY1"
                data-form-id="BECuw4R5vmUW4GuyoIY1"
                title="Standard Form"
            ></iframe>
            <script src="https://link.msgsndr.com/js/form_embed.js"></script>
        </div>
    </section>

`;

const newHtml = html.slice(0, startIndex) + ghlEmbed + html.slice(endIndex);
fs.writeFileSync('book.html', newHtml);
console.log('book.html successfully updated.');
