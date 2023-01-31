import * as path from 'path';

export const STATIC_PATH = path.resolve(__dirname, process.env.STATIC_PATH) || 'not defined';
export const IMAGES_PATH = path.resolve(__dirname, process.env.STATIC_PATH, "images") || 'not defined';
export const TWE_BUILD_PATH = path.resolve(__dirname, process.env.STATIC_PATH, "twe", "TWE.rar") || 'not defined';