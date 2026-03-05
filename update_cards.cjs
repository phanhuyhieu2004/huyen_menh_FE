const fs = require('fs');
const path = require('path');

const landingPagePath = 'src/views/LandingPage.vue';
let landingCode = fs.readFileSync(landingPagePath, 'utf8');

const regexMap = /@property --angle\s*\{[\s\S]*?@keyframes spin-angle\s*\{[\s\S]*?\}/;
const match = landingCode.match(regexMap);

if (match) {
    const cssContent = match[0];
    landingCode = landingCode.replace(cssContent, '/* Moved .animated-border-card CSS to global style.css */');
    fs.writeFileSync(landingPagePath, landingCode);

    const stylePath = 'src/style.css';
    let styleCode = fs.readFileSync(stylePath, 'utf8');
    if (!styleCode.includes('animated-border-card')) {
        styleCode += '\n\n' + cssContent + '\n';
        fs.writeFileSync(stylePath, styleCode);
    }
}

const componentsDir = 'src/components/dashboard';
const cards = ['SoulMapCard.vue', 'DailyMessageCard.vue', 'NumerologyCard.vue', 'ElementsChartCard.vue', 'FengShuiCalendarCard.vue'];

cards.forEach(cardFile => {
    const filePath = path.join(componentsDir, cardFile);
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/<template>\s*<div class=\"[^\"]*bg-white\/5[^\"]*\"[^>]*>/,
        '<template>\n    <div class="animated-border-card group cursor-pointer w-full h-full">\n      <div class="inner-card-content p-0 w-full h-full text-left flex flex-col items-center">');

    if (!content.includes('inner-card-content')) {
       console.log('Failed to replace outer div for', cardFile);
    } else {
        const lastDivMatch = content.lastIndexOf('</div>\n</template>');
        if (lastDivMatch !== -1) {
            content = content.substring(0, lastDivMatch) + '</div>\n    </div>\n</template>' + content.substring(lastDivMatch + 17);
            fs.writeFileSync(filePath, content);
            console.log('Updated', cardFile);
        }
    }
});