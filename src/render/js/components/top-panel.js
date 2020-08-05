Vue.component("top-panel", {
    template: `<div class="top-panel">
        <nav class="top-panel__nav">
            <a class="top-panel__nav-item">
                <settings-view />
            </a>
            <a class="top-panel__nav-item" @click="close">
                <img src="img/close.svg" class="close-icon"/>
            </a>
        </nav>
    </div>`,
    methods: {
        close() {
            window.ipc.send(APP_CLOSE);
        }
    }
});