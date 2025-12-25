const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function removeBootReceiver(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;

    const app = manifest.manifest.application?.[0];
    if (!app || !app.receiver) return config;

    app.receiver = app.receiver.filter(
      (r) =>
        r['$']?.['android:name'] !==
        'expo.modules.audio.AudioRecordingService$AudioRecordingReceiver'
    );

    return config;
  });
};
