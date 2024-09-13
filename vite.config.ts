import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: { exportType: 'named', ref: true },
            include: "**/*.svg",
        }),
    ],
    resolve: {
        alias: {
            "@": "/src",
        }
    }
})