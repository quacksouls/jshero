/**
 * Adapted from the file
 *
 * https://github.com/Acquati/legend-of-faune/blob/main/src/config.ts
 *
 * by Leandro Acquati <https://github.com/Acquati>
 *
 * MIT License
 *
 * Copyright (c) 2021 Leandro Acquati
 * Modification copyright (c) 2023 Duck McSouls <quacksouls [AT] gmail [DOT] com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Preloader from "./scene/Preloader";
import Village from "./scene/Village";

import PluginKey from "./const/plugin";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: Math.floor(window.innerWidth),
    height: Math.floor(window.innerHeight),
    parent: "game",
    scene: [Preloader, Village],
    title: "jsHero",
    url: "https://github.com/quacksouls/jshero",
    version: "0.0.1",
    disableContextMenu: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 },
        },
    },
    backgroundColor: "#000000",
    antialiasGL: false,
    pixelArt: true,
    roundPixels: true,
    plugins: {
        global: [
            {
                start: true,
            },
        ],
        scene: [
            {
                key: PluginKey.rexUI,
                plugin: RexUIPlugin,
                mapping: PluginKey.rexUI,
            },
        ],
    },
};
export default GameConfig;
