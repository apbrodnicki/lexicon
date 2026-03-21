/// <reference types="vite/client" />

interface ViteTypeOptions {
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_KEY_1: string; // import.meta.env.VITE_KEY_1
	readonly VITE_KEY_2: string; // import.meta.env.VITE_KEY_2
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
