(function () {
    "use strict";

    // The responsibility of this module is to provide information about videos to other modules.

    // The videos are defined here. Add your videos to this list.
    let allVideos = [
        // The following entries are for the pre-generated demo videos. To add your own videos, 
        // copy the sample video above, append to the list and adjust the fields as needed.
        //
        // Note: The demo videos have hardcoded license tokens for maximum ease of use of the
        // sample app. Never do this in production - always generate a new license token on
        // every request.

        // Note: the "tags" property is optional. The demo player uses this to filter the video
        // list -- for example, to only display FairPlay-compliant videos on Safari.

        // My video 1 is related to the Sample scenario 3: creating your own videos
        // My video 2 is related to the Sample scenario 4: creating your own multi-key videos
        {
            "name": "Axinom Test Vector demo video - single key (DASH; cenc) - with License Token",
            "url": "https://media.axprod.net/TestVectors/Cmaf/protected_1080p_h264_cbcs/manifest.mpd",
            "licenseToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjogMSwiY29tX2tleV9pZCI6ICJjZDk5ODBlYy1hNDVhLTQ1NmEtODM1Yy1iMWM1MDA1ZmIyYzIiLCJtZXNzYWdlIjogeyAgInR5cGUiOiAiZW50aXRsZW1lbnRfbWVzc2FnZSIsICAidmVyc2lvbiI6IDIsICAiY29udGVudF9rZXlzX3NvdXJjZSI6IHsgICAgImlubGluZSI6IFsgICAgICB7ICAgICAgICAiaWQiOiAiMzAyZjgwZGQtNDExZS00ODg2LWJjYTUtYmIxZjgwMThhMDI0IiwgICAgICAgICJlbmNyeXB0ZWRfa2V5IjogImlkMzFjaEpMVjlrbVFQSHcxR1N2ZWc9PSIgICAgICB9ICAgIF0gIH19fQ.r2nZytsBXJEIcEo7WSyfiw9nGxPCCVfbO2PSMXyMkk0"
        },
        {
            "name": "Axinom Test Vector demo video - single key (DASH; cenc) with KeyIds",
            "url": "https://media.axprod.net/TestVectors/Cmaf/protected_1080p_h264_cbcs/manifest.mpd",
            "keys": [
                {
                    "keyId": "302f80dd-411e-4886-bca5-bb1f8018a024",
                    "encrypted_key": "id31chJLV9kmQPHw1GSveg=="
                } 
            ]
        },
        {
            "name": "Axinom demo video - single key (HLS; cbcs)",
            "url": "https://media.axprod.net/VTB/DrmQuickStart/AxinomDemoVideo-SingleKey/Encrypted_Cbcs/Manifest.m3u8",
            "licenseToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiNjllNTQwODgtZTllMC00NTMwLThjMWEtMWViNmRjZDBkMTRlIiwibWVzc2FnZSI6eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImxpY2Vuc2UiOnsiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImlubGluZSI6W3siaWQiOiIyMTFhYzFkYy1jOGEyLTQ1NzUtYmFmNy1mYTRiYTU2YzM4YWMiLCJ1c2FnZV9wb2xpY3kiOiJUaGVPbmVQb2xpY3kifV19LCJjb250ZW50X2tleV91c2FnZV9wb2xpY2llcyI6W3sibmFtZSI6IlRoZU9uZVBvbGljeSIsInBsYXlyZWFkeSI6eyJwbGF5X2VuYWJsZXJzIjpbIjc4NjYyN0Q4LUMyQTYtNDRCRS04Rjg4LTA4QUUyNTVCMDFBNyJdfX1dfX0.D9FM9sbTFxBmcCOC8yMHrEtTwm0zy6ejZUCrlJbHz_U",
            "tags": ["FairPlay"]
        },
        {
            "name": "Axinom Test Vector demo video - multikey (DASH; cenc)",
            "url": "https://media.axprod.net/TestVectors/MultiKey/Cmaf_h264_1080p_cbcs/manifest.mpd",
            "licenseToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjogMSwiY29tX2tleV9pZCI6ICJjZDk5ODBlYy1hNDVhLTQ1NmEtODM1Yy1iMWM1MDA1ZmIyYzIiLCJtZXNzYWdlIjogeyAgInR5cGUiOiAiZW50aXRsZW1lbnRfbWVzc2FnZSIsICAidmVyc2lvbiI6IDIsICAiY29udGVudF9rZXlzX3NvdXJjZSI6IHsgICAgImlubGluZSI6IFsgICAgICB7ICAgICAgICAiaWQiOiAiYjU0ZWM5MTQtMTkyZC00ZWExLWFjMTktZjQyOWViNDk4MjY4IiwgICAgICAgICJlbmNyeXB0ZWRfa2V5IjogIm1RWTNQZmlLVHVxVXlSb0xxYldhcUE9PSIgICAgICB9LCAgICAgIHsgICAgICAgICJpZCI6ICJjODNjNGVhOC0wZjJhLTQ1MjMtODUxYy1mYmVjY2RjMGYyMDIiLCAgICAgICAgImVuY3J5cHRlZF9rZXkiOiAiclFoZUtlbjdmanYyL1dzNERjSC9kQT09IiAgICAgIH0sICAgICAgeyAgICAgICAgImlkIjogImM4NjhjNzAyLWM3MWItNDA2NC1hZTJiLWMyNGY3Y2MxMDc5MiIsICAgICAgICAiZW5jcnlwdGVkX2tleSI6ICJyRXZzR3pqNEpNdG43dlN2OWpvWTlnPT0iICAgICAgfSAgICBdICB9fX0.aFpMQnGA0nig8l1rkXeCfDxefM67a8d5Ex5SwZHulj4"
        },
        {
            "name": "Axinom demo video - multikey (HLS; cbcs)",
            "url": "https://media.axprod.net/VTB/DrmQuickStart/AxinomDemoVideo-MultiKey/Encrypted_Cbcs/Manifest.m3u8",
            "licenseToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiNjllNTQwODgtZTllMC00NTMwLThjMWEtMWViNmRjZDBkMTRlIiwibWVzc2FnZSI6eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImxpY2Vuc2UiOnsiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImlubGluZSI6W3siaWQiOiJmM2Q1ODhjNy1jMTdhLTQwMzMtOTAzNS04ZGIzMTczOTBiZTYiLCJ1c2FnZV9wb2xpY3kiOiJUaGVPbmVQb2xpY3kifSx7ImlkIjoiNDRiMThhMzItNmQzNi00OTlkLThiOTMtYTIwZjk0OGFjNWYyIiwidXNhZ2VfcG9saWN5IjoiVGhlT25lUG9saWN5In0seyJpZCI6ImFlNmU4N2UyLTNjM2MtNDZkMS04ZTlkLWVmNGM0NjFkNDY4MSIsInVzYWdlX3BvbGljeSI6IlRoZU9uZVBvbGljeSJ9XX0sImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjpbeyJuYW1lIjoiVGhlT25lUG9saWN5IiwicGxheXJlYWR5Ijp7InBsYXlfZW5hYmxlcnMiOlsiNzg2NjI3RDgtQzJBNi00NEJFLThGODgtMDhBRTI1NUIwMUE3Il19fV19fQ.DpwBd1ax4Z7P0cCOZ7ZJMotqVWfLFCj2DYdH37xjGxM",
            "tags": ["FairPlay"]
        },
        {
            "name": "My video 1",
            "url": "https://ed57d7c184e185ae4e90c406.blob.core.windows.net/video-output/NcCRTaM51KdoFp9yDC26MC/dash/manifest.mpd",
            "keys": [
                {
                    "keyId": "aef9fb90-caff-4c5a-832c-30c068a9589f"
                } 
            ]
        },
        {
            "name": "My video 2 - test with KeyIds",
            "url": "https://ed57d7c184e185ae4e90c406.blob.core.windows.net/video-output/PVUQNzpbUxL95ycZx3GSKM/dash/manifest.mpd",
            "keys": [
                {
                    "keyId": "d78cdf23-5b5a-4252-a2fc-00777f62f638"
                },
                {
                    "keyId": "013186b2-5ce0-46bb-b73c-01a75123292f"
                }, 
                {
                    "keyId": "92d16252-6cf0-4c6f-ae80-b09a274fda24"
                } 
            ]
        },
        {
            "name": "My video 2", // with license token
            "url": "https://ed57d7c184e185ae4e90c406.blob.core.windows.net/video-output/PVUQNzpbUxL95ycZx3GSKM/dash/manifest.mpd",
            "licenseToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjogMSwiY29tX2tleV9pZCI6ICJjZDk5ODBlYy1hNDVhLTQ1NmEtODM1Yy1iMWM1MDA1ZmIyYzIiLCJtZXNzYWdlIjogeyAgInR5cGUiOiAiZW50aXRsZW1lbnRfbWVzc2FnZSIsICAidmVyc2lvbiI6IDIsICAiY29udGVudF9rZXlzX3NvdXJjZSI6IHsgICAgImlubGluZSI6IFsgICAgICB7ICAgICAgICAiaWQiOiAiZDc4Y2RmMjMtNWI1YS00MjUyLWEyZmMtMDA3NzdmNjJmNjM4IiAgICAgIH0sICAgICAgeyAgICAgICAgImlkIjogIjAxMzE4NmIyLTVjZTAtNDZiYi1iNzNjLTAxYTc1MTIzMjkyZiIgICAgICB9LCAgICAgIHsgICAgICAgICJpZCI6ICI5MmQxNjI1Mi02Y2YwLTRjNmYtYWU4MC1iMDlhMjc0ZmRhMjQiICAgICAgfSAgICBdICB9fX0._PMcaXkd1jFXY3cHIvkttIKhZvsC8EMgNfz1bN76EIY"
        }
    ];

    // Verifies that all critical information is present on a video.
    // Automatically performs sanity checks to avoid making mistakes in the above list. 
    function verifyVideoIntegrity(video) {
        if (!video)
            throw new Error("A video was expected but was not present.");
        if (!video.name || !video.name.length)
            throw new Error("A video is missing its name.");

        console.log("Verifying integrity of video definition: " + video.name);

        if (!video.url || !video.url.length)
            throw new Error("The video is missing its URL.");

        // Either a hardcoded license token or the keys structure must exist. Not both.
        if (video.licenseToken && video.keys)
            throw new Error("The video has both a hardcoded license token and a content key list - pick only one.");
        if (!video.licenseToken && !video.keys)
            throw new Error("The video is missing the content key list.");

        if (video.keys) {
            if (!video.keys.length)
                throw new Error("The content key list for this video is empty.");

            // Verify that each item in the keys list has all the required data.
            video.keys.forEach(function verifyKey(item) {
                if (!item.keyId)
                    throw new Error("A content key is missing the key ID.");
            });
        }
    }

    // Verify all videos on startup.
    allVideos.forEach(verifyVideoIntegrity);

    module.exports = {
        "getAllVideos": function getAllVideos() {
            return allVideos;
        },
        "getVideoByName": function getVideoByName(name) {
            return allVideos.find(function filter(item) {
                return item.name === name;
            });
        }
    };
})();




