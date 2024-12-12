// Canvas Manager

function scale_canvas(baseWidth, baseHeight, targetWidth, targetHeight) {
    var aspect = (baseWidth / baseHeight);

    // Calculate pixel ratio and new canvas size
    var pixelRatio = window.devicePixelRatio || 1;
    var backStoreRatio = (g_CurrentGraphics.webkitBackingStorePixelRatio || g_CurrentGraphics.mozBackingStorePixelRatio || g_CurrentGraphics.msBackingStorePixelRatio ||
        g_CurrentGraphics.oBackingStorePixelRatio || g_CurrentGraphics.backingStorePixelRatio || 1);
    var pixelScale = round(pixelRatio / backStoreRatio);

    var scaledWidth = targetWidth * pixelScale;
    var scaledHeight = targetHeight * pixelScale;

    var posx = 0;
    var posy = 0;

    posx = Math.round(((scaledWidth) / pixelScale) / 2);
    scaledWidth = Math.round(scaledWidth);
    posy = Math.round(((scaledHeight) / pixelScale) / 2);
    scaledHeight = Math.round(scaledHeight);

    // Update canvas size
    var ret = '{"w":' + scaledWidth + ',"h":' + scaledHeight + ',"x":' + posx + ',"y":' + posy + '}';
    eval("gml_Script_gmcallback_window_set_size(null,null,'" + ret + "')");

    // Scale back canvas with CSS
    if (pixelScale != 1) {
        canvas.style.width = (scaledWidth / pixelScale) + "px";
        canvas.style.height = (scaledHeight / pixelScale) + "px";
    } else {
        canvas.style.width = "";
        canvas.style.height = "";
    }

    // Update canvas scale
    if (typeof g_CurrentGraphics.scale === "function")
        g_CurrentGraphics.scale(pixelScale, pixelScale);
}

function resize_canvas(width, height, baseWidth, baseHeight) {
    var displayWidth = Math.round(window.innerWidth);
    var displayHeight = Math.round(window.innerHeight);

    console.log("canvas resized")

    scale_canvas(Math.round(width), Math.round(height), Math.round(baseWidth), Math.round(baseHeight));
}