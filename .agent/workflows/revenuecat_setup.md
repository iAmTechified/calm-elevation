---
description: Guide for configuring RevenueCat for In-App Purchases
---

# RevenueCat Setup Guide for "Calm Elevation"

To make the implemented In-App Purchases work, you need to configure RevenueCat and update the API keys in your code.

## 1. Create a RevenueCat Account & Project
1.  Go to [RevenueCat](https://www.revenuecat.com/) and sign up/login.
2.  Create a new project (e.g., "Calm Elevation").

## 2. Configure Apps in RevenueCat
1.  **Apple (iOS)**:
    *   In your Project Settings, select **Apps** -> **+ New App** -> **App Store**.
    *   Enter your App Bundle ID (found in `app.json` or `app.config.js`).
    *   Follow instructions to set up your App Store Shared Secret.
2.  **Google (Android)**:
    *   In Project Settings, select **Apps** -> **+ New App** -> **Play Store**.
    *   Enter your Package Name.
    *   Follow instructions to link your Google Cloud Service Account credentials.

## 3. Create Products & Entitlements
This is the most critical step to match the code logic.

1.  **Entitlements**:
    *   Create a new Entitlement with the identifier: **`pro`** (case-sensitive).
    *   This is what the app checks (`if (customerInfo.entitlements.active['pro']) ...`).

2.  **Offerings**:
    *   Create a default Offering (usually called "Default").
    *   This ensures `Purchases.getOfferings().current` returns something.

3.  **Products**:
    *   Create packages within your Offering.
    *   **Monthly Package**:
        *   Identifier: Match your store product ID (e.g., `calm_elevation_monthly`).
        *   Package Type: Select "Monthly".
        *   Attach to Entitlement: `pro`.
    *   **Annual Package**:
        *   Identifier: Match your store product ID (e.g., `calm_elevation_yearly`).
        *   Package Type: Select "Annual".
        *   Attach to Entitlement: `pro`.

## 4. Get Your API Keys
1.  In RevenueCat Project Settings -> **API Keys**.
2.  Copy the **Public API Key** for Apple.
3.  Copy the **Public API Key** for Google.

## 5. Update Code
1.  Open `context/SubscriptionContext.tsx`.
2.  Locate the `API_KEYS` constant near the top:
    ```typescript
    const API_KEYS = {
        apple: 'appl_YOUR_ACTUAL_KEY', 
        google: 'goog_YOUR_ACTUAL_KEY'
    };
    ```
3.  Replace the placeholders with your actual keys.

## 6. Testing
*   **Sandbox**: Use Sandbox users (Apple TestFlight / Google Internal Test Track) to test purchases without charging real money.
*   The app logs generic errors if configuration is missing. Watch the console or the Alert messages.
