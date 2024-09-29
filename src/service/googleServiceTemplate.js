const fs = require('fs');
const path = require('path');
require('dotenv').config();

const googleServicesTemplate = {
  project_info: {
    project_id: process.env.FIREBASE_PROJECT_ID,
    project_number: process.env.FIREBASE_MESSAGING_SENDER_ID,
    storage_bucket: process.env.FIREBASE_STORAGE_BUCKET,
  },
  client: [
    {
      client_info: {
        mobilesdk_app_id: process.env.MOBILE_SDK_APP_ID,
        android_client_info: {
          package_name: 'com.rdsapp',
        },
      },
      oauth_client: [
        {
          client_id: process.env.OAUTH_CLIENT_ID,
          client_type: 3,
        },
      ],
      api_key: [
        {
          current_key: process.env.FIREBASE_CURRENT_API_KEY,
        },
      ],
      services: {
        appinvite_service: {
          other_platform_oauth_client: [
            {
              client_id: process.env.OTHER_PLATFORM_OAUTH_CLIENT_ID,
              client_type: 3,
            },
          ],
        },
      },
    },
  ],
  configuration_version: '1',
};

console.log('🥲🥲🥲🥲🥲', googleServicesTemplate);
// Write the file to the correct location
const outputPath = path.join(
  __dirname,
  '../..',
  'android',
  'app',
  'google-services.json',
);

// Write the google-services.json file
if (fs.existsSync(outputPath)) {
  console.log(`File ${outputPath} already exists. Overwriting...`);
} else {
  console.log(`File ${outputPath} does not exist. Creating a new file...`);
}
fs.writeFileSync(outputPath, JSON.stringify(googleServicesTemplate, null, 2));

console.log('google-services.json has been generated');
