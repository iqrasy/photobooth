import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/",
	plugins: [react()],
	server: {
		host: true,
		allowedHosts: ["1845-104-221-121-42.ngrok-free.app"],
	},
});
