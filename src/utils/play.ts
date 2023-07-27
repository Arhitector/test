import dingSoundPath from '../assets/ding.wav';
import buidlSoundPath from '../assets/build.wav';

const dingSound = new Audio(dingSoundPath);
export const playDing = () => {
    dingSound.play();
}

const buildSound = new Audio(buidlSoundPath);
export const playBuild = () => {
    buildSound.play();
}