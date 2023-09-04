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

import { anim_t, cherryAnim_t } from "../../const/anim";
import { cherry_t } from "../../const/npc";
import NPC from "./npc";

/**
 * The NPC Charlie Cherry.
 */
export default class Cherry extends NPC {
    /**
     * Load and position the NPC sprite.
     *
     * @param scene Spawn the npc sprite in this scene.
     * @param x The initial x-coordinate of the sprite.
     * @param y The initial y-coordinate of the sprite.
     * @param texture The key for this texture.
     * @param depth The depth at which to place Cherry in the scene.
     * @param frame See this page for more details:
     *     https://newdocs.phaser.io/docs/3.60.0/Phaser.Physics.Arcade.Sprite
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        depth: number,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this.anims.play(cherryAnim_t.idle, anim_t.IGNORE_IF_PLAYING);
        this.setDepth(depth);
        this.body?.setSize(cherry_t.SCALE * cherry_t.WIDTH, cherry_t.SCALE * cherry_t.HEIGHT);
        this.setScale(cherry_t.SCALE);
    }

    /**
     * Update the animation.  Called for every frame.
     */
    update() {
        this.anims.play(cherryAnim_t.idle, anim_t.IGNORE_IF_PLAYING);
    }
}
