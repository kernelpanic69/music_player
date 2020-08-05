Vue.component("settings-view", {
    template: `
    <div class="settings">
        <img class="settings__icon" @click="showSettings" src="img/settings.svg"/>
        <div v-if="shown" class="settings__panel">
            <div class="settings__field">
                <label for="libDir">Library dir</label>
                <input type="text" name="libDir" readonly :value="$store.getters.libDir"/>
                <a class="settings__button" @click="selectLibDir">...</a>
            </div>
        </div>
    </div>`,
    data() {
        return {
            shown: false
        };
    },
    methods: {
        showSettings() {
            this.shown = !this.shown;
        },
        selectLibDir() {
            window.ipc.send(LIBRARY_ROOT_DIR);
        }
    }
});