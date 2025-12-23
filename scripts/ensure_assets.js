const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '..', 'assets', 'sounds');

const soundsNeeded = [
    'fire.mp3',
    'white_noise.mp3',
    'brown_noise.mp3'
];

const fallbackSource = 'river.mp3'; // We know this one exists

soundsNeeded.forEach(name => {
    const target = path.join(SOUNDS_DIR, name);
    if (!fs.existsSync(target)) {
        console.log(`Copying placeholder for ${name}...`);
        const sourcePath = path.join(SOUNDS_DIR, fallbackSource);
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, target);
            console.log(`Created placeholder for ${name}`);
        } else {
            console.error(`Fallback source ${fallbackSource} missing!`);
        }
    } else {
        console.log(`${name} already exists.`);
    }
});
