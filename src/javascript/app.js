if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {

            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {

            console.log('ServiceWorker registration failed: ', err);
        });
    });
}



Notification.requestPermission(function (status) {
    console.log("Notification permission status:", status);
    if (Notification.permission == "granted") {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            reg.showNotification("velkommen til ostebiksen");
        });
    }
});