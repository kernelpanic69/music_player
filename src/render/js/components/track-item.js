Vue.component("track-item", {
    template: `
    <div :class="['track-item', {'track-item_current': isCurrent}]" @click="play">
        <img :src="track.thumb || emptyThumb" class="track-item__thumb"/>
        <div class="track-item__title-block">
            <h3 class="track-item__title">{{track.title || track.file}}</h3>
            <h4 class="track-item__artist" v-if="track.artist">{{track.artist}}</h4>
        </div>
        <span class="track-item__time">{{track.length ? track.length.toTime() : '-'}}</span>
    </div>`,
    props: {
        track: {
            type: Object,
            required: true
        },
        emptyThumb: {
            type: String,
            required: false,
            default: "img/empty_thumb.svg"
        }
    },
    methods: {
        play() {
            this.$store.commit("setTrack", this.track);
        }
    },
    computed: {
        isCurrent() {
            if (!this.$store.state.currentTrack) return false;
            return this.$store.state.currentTrack.id == this.track.id;
        }
    }
});