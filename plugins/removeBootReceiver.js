const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function removeBootCompleted(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    const app = manifest.manifest.application?.[0];

    if (!app) return config;

    // Remove BOOT_COMPLETED from ALL receivers
    if (app.receiver) {
      app.receiver = app.receiver.map((receiver) => {
        if (!receiver['intent-filter']) return receiver;

        receiver['intent-filter'] = receiver['intent-filter'].filter(
          (intent) =>
            !intent.action?.some(
              (a) => a['$']?.['android:name'] === 'android.intent.action.BOOT_COMPLETED'
            )
        );

        return receiver;
      }).filter(
        (receiver) => receiver['intent-filter']?.length !== 0
      );
    }

    return config;
  });
};
