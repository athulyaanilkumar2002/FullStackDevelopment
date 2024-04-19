document.addEventListener('DOMContentLoaded', function () {
    var qrCodeCanvas = document.getElementById('qrCodeCanvas');
    var imageUpload = document.getElementById('imageUpload');

    imageUpload.addEventListener('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var imageDataUrl = e.target.result;

            // Generate QR code from image data URL
            var qrCode = new QRCode(qrCodeCanvas, {
                text: imageDataUrl,
                width: 256,
                height: 256
            });
        };

        reader.readAsDataURL(file);
    });
});
