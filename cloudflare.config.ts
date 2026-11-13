import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "screenshot",
		compatibilityDate: "2026-11-01",
		domains: [
			"screenshot.oodicraft.com",
		],
	},
});
