declare module "*.scss" {
    const scss: { [key: string]: string };
    export default scss;
}
declare module "*.css" {
    const css: { [key: string]: string };
    export default css;
}

declare module "uuid";