Number.prototype.toTime = function timeFromSeconds() {
    let hours = Math.floor(this / 3600);
    let minutes = Math.floor((this - hours * 3600) / 60);
    let seconds = Math.floor(this - hours * 3600 - minutes * 60);

    hours < 10 && (hours = "0" + hours);
    minutes < 10 && (minutes = "0" + minutes);
    seconds < 10 && (seconds = "0" + seconds);

    return (hours != "00" ? hours + ":" : "") + (minutes != "00" ? minutes + ":" : "") + seconds.toString();
}

const KEY_LIBRARY = "key-library";

const App = new Vue({
    el: "#app",
    store,
    template: `
    <div>
       <top-panel/>
       <library-view/>
       <playback-panel/>
    </div>`,
    created: function () {
        window.ipc.on(LIBRARY_GET, (e, dir, lib) => {
            localStorage.setItem(KEY_LIBRARY, JSON.stringify(lib));
            this.$store.commit('setLibrary', { dir, library: lib });
        });
    }
});