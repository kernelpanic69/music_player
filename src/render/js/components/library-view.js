Vue.component("library-view", {
    template: `
    <div class="library">
        <ul>
            <li v-for="track in this.$store.state.library" class="library__list-item">
                <track-item :track="track"/>
            </li>
        </ul>
    </div>`
});