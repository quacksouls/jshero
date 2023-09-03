/**
 * MIT License
 *
 * Copyright (c) 2023 Duck McSouls <quacksouls [AT] gmail [DOT] com>
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

import { cherryAnim_t } from "../const/anim";
import { cherry_t } from "../const/npc";
import SceneKey from "../const/SceneKey";
import TextureKey from "../const/TextureKey";

/**
 * Load assets (art, music, etc.) prior to loading the first scene.
 */
export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: SceneKey.preloader });
    }

    /**
     * Load anything we need prior to creating the scene.
     */
    preload() {
        this.load.image({
            key: TextureKey.villageTile,
            url: "tileset/Serene-Village_32x32.png",
        });
        this.load.tilemapTiledJSON({
            key: TextureKey.village,
            url: "map/village.json",
        });
        this.load.aseprite({
            key: TextureKey.player,
            textureURL: "character/player/player.png",
            atlasURL: "character/player/player.json",
        });

        // Other characters
        this.load.spritesheet({
            key: TextureKey.cherry,
            url: "character/npc/cherry/idle.png",
            frameConfig: {
                frameWidth: cherry_t.WIDTH,
                frameHeight: cherry_t.HEIGHT,
                startFrame: 0,
                endFrame: 3,
                spacing: 1,
            },
        });
    }

    /**
     * Perform anything required to create the scene.
     */
    create() {
        this.anims.createFromAseprite(TextureKey.player);
        this.anims.create({
            key: cherryAnim_t.idle,
            frames: this.anims.generateFrameNumbers(TextureKey.cherry, { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.start(SceneKey.village);
    }
}
