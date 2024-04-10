/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_LANCHONETE_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
