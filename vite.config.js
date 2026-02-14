import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'home.html'),
                about: resolve(__dirname, 'about.html'),
                materials: resolve(__dirname, 'materials.html'),
                announcements: resolve(__dirname, 'announcements.html'),
                vision_mission: resolve(__dirname, 'vision_mission.html'),
                team: resolve(__dirname, 'team.html'),
            },
        },
    },
});
