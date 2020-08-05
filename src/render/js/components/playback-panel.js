Vue.component("playback-panel", {
    template: `
    <div class="playback">
        <progress-bar />
        <div class="playback__controls">
            <a class="playback-button" @click="previous">
                <img src="img/backward.svg" class="playback-button__icon"/>
            </a>
            <a class="playback-button" @click="togglePlayback">
                <img :src='isPlaying ? "img/pause.svg" : "img/play.svg"' class="playback-button__icon"/>
            </a>
            <a class="playback-button" @click="next">
                <img src="img/forwards.svg" class="playback-button__icon" />
            </a>
        </div>
    </div>`,
    watch: {
        currPlayback(newPl, oldPl) {
            newPl.on("end", this.next);
        }
    },
    methods: {
        togglePlayback() {
            let pl = this.$store.state.currentPlayback;

            if (pl) {
                if (this.isPlaying) {
                    pl.pause();
                } else {
                    pl.play();
                }
            }
        },
        findSiblings(id) {
            let lib = this.$store.state.library;
            let ids = Object.keys(lib);
            let currTrack = this.$store.state.currentTrack;
            let nextIndex = 0;
            let prevIndex = ids.length - 1;

            for (let i = 0; i <= ids.length; i++) {
                if (ids[i] == currTrack.id) {
                    if (i >= ids.length - 1) {
                        nextIndex = 0;
                    } else {
                        nextIndex = i + 1;
                    }

                    if (i == 0) {
                        prevIndex = ids.length - 1;
                    } else {
                        prevIndex = i - 1;
                    }

                    return [lib[ids[prevIndex]], lib[ids[nextIndex]]];
                }
            }
        },
        next() {
            this.$store.commit("setTrack", this.findSiblings(this.$store.state.currentTrack.id)[1]);
        },
        previous() {
            this.$store.commit("setTrack", this.findSiblings(this.$store.state.currentTrack.id)[0]);
        }
    },
    computed: {
        isPlaying() {
            return this.$store.state.currentPlayback && this.$store.state.currentPlayback.playing();
        },
        currPlayback() {
            return this.$store.state.currentPlayback;
        }
    }
});