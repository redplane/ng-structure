const path = require('path');
const dist = 'src/dist';
const szCompressedDist = `${dist}\\dist.zip`;

const args = require('yargs').argv;
const siteId = args['site-id'];
const clientId = args['client-id'];
const clientSecret = args['client-secret'];

// Import bitballoon library.
const bitBalloon = require("bitballoon");

// Import node-zip
const zipdir = require('zip-dir');

// Create bit-balloon client.
let bitBalloonClient = bitBalloon.createClient({client_id: clientId, client_secret: clientSecret});
bitBalloonClient
    .authorizeFromCredentials((authenticationError, accessToken) => {
        if (authenticationError)
            return console.log(authenticationError);

        // Search for bit-balloon site.
        bitBalloonClient.site(siteId, (error, site) => {
            if (error)
                return console.log(error);

            zipdir(dist, {saveTo: szCompressedDist}, (pCompressionError, buffer) => {

                if (pCompressionError)
                    return console.log(pCompressionError);

                // `buffer` is the buffer of the zipped file
                // And the buffer was saved to `~/myzip.zip`
                site.createDeploy({zip: szCompressedDist}, (error, deployment) => {
                    if (error)
                        return console.log("Error updating site %o", error);

                    deployment.waitForReady(function (deploymentError, deploy) {
                        if (deploymentError) return console.log("Error updating site %o", deploymentError);
                        console.log('Deployment is successful.');
                    });
                });
            });


            // console.log(site);
        });


        return accessToken;
    });



