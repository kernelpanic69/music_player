Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentTrack: null,
        library: null,
        currentPlayback: null,
        settings: {
            libDir: ""
        }
    },
    getters: {
        currentLength(state) {
            if (!state.currentTrack) {
                return 0;
            }

            return state.currentTrack.length;
        },

        libDir(state) {
            return state.settings.libDir;
        }
    },
    mutations: {
        setTrack(state, newTrack) {
            state.currentTrack = newTrack;

            if (state.currentPlayback) {
                state.currentPlayback.unload();
            }

            state.currentPlayback = new Howl({ src: newTrack.path, autoplay: true });
        },
        setLibrary(state, newLibrary) {
            state.settings.libDir = newLibrary.dir;
            state.library = newLibrary.library;
        }
    }
});