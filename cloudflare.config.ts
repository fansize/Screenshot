import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "screenshot-studio",
		compatibilityDate: "2026-11-01",
		domains: [
			"screenshot.oodicraft.com",
		],
	},
});
