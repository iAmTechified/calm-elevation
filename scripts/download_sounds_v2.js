const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const SOUNDS_DIR = path.join(__dirname, '..', 'assets', 'sounds');

const sounds = [
    { name: 'fire.mp3', url: 'https://soundbible.com/mp3/Campfire-SoundBible.com-975617282.mp3' },
    { name: 'white_noise.mp3', url: 'https://soundbible.com/mp3/Radio%20Static-SoundBible.com-710427499.mp3' },
    { name: 'brown_noise.mp3', url: 'https://utopia.duth.gr/~gchristo/mix/audiotest/brown.mp3' },
];

if (!fs.existsSync(SOUNDS_DIR)) {
    fs.mkdirSync(SOUNDS_DIR, { recursive: true });
}

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);

        function request(currUrl) {
            const parsedUrl = new URL(currUrl);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;

            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            };

            protocol.get(currUrl, options, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    // Follow redirect
                    let redirectUrl = response.headers.location;
                    if (!redirectUrl.startsWith('http')) {
                        redirectUrl = new URL(redirectUrl, currUrl).href;
                    }
                    request(redirectUrl);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to get '${currUrl}' (${response.statusCode})`));
                    return;
                }

                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(dest, () => { });
                reject(err);
            });
        }

        request(url);
    });
}

(async () => {
    for (const sound of sounds) {
        const filePath = path.join(SOUNDS_DIR, sound.name);
        console.log(`Downloading ${sound.name}...`);
        try {
            await downloadFile(sound.url, filePath);
            console.log(`Successfully downloaded ${sound.name}`);
        } catch (err) {
            console.error(`Error downloading ${sound.name}: ${err.message}`);
        }
    }
})();
