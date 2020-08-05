Vue.component('progress-bar', {
    template: `
    <div class="progress-bar">
        <div class="progress-bar__back" ref="slider-back" @click="setTime">
            <div class="progress-bar__slider" ref="slider"/>
        </div>
    </div>`,
    data() {
        return {
            intervalId: 0
        }
    },
    methods: {
        setTime(event) {
            let sliderBack = this.$refs['slider-back'];
            let clickPos = event.clientX;
            let pos = clickPos / sliderBack.offsetWidth * 100;
            let pl = this.$store.state.currentPlayback;
            let tr = this.$store.state.currentTrack;

            console.log(pos);

            if (pl) {
                this.$refs.slider.style.width = clickPos;
                pl.seek(pos * tr.length / 100);
            }
        }
    },
    created() {
        this.indtervalId = setInterval(() => {
            let slider = this.$refs.slider;
            let pl = this.$store.state.currentPlayback;
            if (!pl) return 0;
            let len = this.$store.state.currentTrack.length;
            slider.style.width = `${(pl.seek() / len) * 100}%`;
        }, 500);
    },
    destroyed() {
        clearInterval(this.intervalId);
    }
});