const fs = require('fs');
const https = require('https');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '..', 'assets', 'sounds');

const sounds = [
    { name: 'fire.mp3', url: 'https://soundbible.com/mp3/Campfire-SoundBible.com-975617282.mp3' }, // Campfire
    { name: 'night.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/61/61-preview.mp3' },
    { name: 'ocean.mp3', url: 'https://soundbible.com/mp3/Ocean_Waves-Mike_Koenig-980635527.mp3' },
    { name: 'rain.mp3', url: 'https://soundbible.com/mp3/Rain_Background-Mike_Koenig-1681389445.mp3' }, // Gentle Rain
    { name: 'thunder.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3' },
    { name: 'birds.mp3', url: 'https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3' },
    { name: 'river.mp3', url: 'https://www.soundjay.com/nature/sounds/river-1.mp3' },
    { name: 'wind.mp3', url: 'https://soundbible.com/mp3/Wind-Mark_DiAngelo-1940285615.mp3' },
    { name: 'white_noise.mp3', url: 'https://soundbible.com/mp3/Radio%20Static-SoundBible.com-710427499.mp3' }, // Static White Noise
    { name: 'brown_noise.mp3', url: 'https://utopia.duth.gr/~gchristo/mix/audiotest/brown.mp3' }, // Real Brown Noise
];

if (!fs.existsSync(SOUNDS_DIR)) {
    fs.mkdirSync(SOUNDS_DIR, { recursive: true });
}

sounds.forEach(sound => {
    const filePath = path.join(SOUNDS_DIR, sound.name);
    if (fs.existsSync(filePath)) {
        console.log(`Skipping ${sound.name}, already exists.`);
        return;
    }

    const file = fs.createWriteStream(filePath);
    console.log(`Downloading ${sound.name}...`);

    https.get(sound.url, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${sound.name}: ${response.statusCode}`);
            file.close();
            fs.unlinkSync(filePath); // Delete incomplete file
            return;
        }

        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${sound.name}`);
        });
    }).on('error', (err) => {
        fs.unlinkSync(filePath);
        console.error(`Error downloading ${sound.name}: ${err.message}`);
    });
});
