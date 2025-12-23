const fs = require('fs');
const https = require('https');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '..', 'assets', 'sounds');

const sounds = [
    { name: 'fire.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3' },
    { name: 'rain.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/113/113-preview.mp3' },
    { name: 'white_noise.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/113/113-preview.mp3' }, // Placeholder (Rain)
    { name: 'brown_noise.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/243/243-preview.mp3' }, // Placeholder (Ocean)
];

if (!fs.existsSync(SOUNDS_DIR)) {
    fs.mkdirSync(SOUNDS_DIR, { recursive: true });
}

sounds.forEach(sound => {
    const filePath = path.join(SOUNDS_DIR, sound.name);
    const file = fs.createWriteStream(filePath);
    console.log(`Downloading ${sound.name}...`);

    https.get(sound.url, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${sound.name}: ${response.statusCode}`);
            file.close();
            // If it failed, we'll try to copy an existing sound if possible in a post-process
            return;
        }

        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${sound.name}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${sound.name}: ${err.message}`);
    });
});
