const LIBRARY_GET = "library-get";
const APP_CLOSE = "app-close";
const LIBRARY_ROOT_DIR = "library-root-dir";

if (typeof window == "undefined")
    module.exports = Object.freeze({
        LIBRARY_GET,
        APP_CLOSE,
        LIBRARY_ROOT_DIR
    });