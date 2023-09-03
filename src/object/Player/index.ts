/**
 * Adapted from the file
 *
 * https://github.com/Acquati/legend-of-faune/blob/main/src/objects/Player/index.ts
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

import { playerAnim_t } from "../../const/anim";
import { VillageDepthKey } from "../../const/DepthKey";
import { player_t } from "../../const/player";
import playerMovement from "./movement";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private movementState: number = player_t.movement.state.IDLE;
    private pushedTimer = 0;

    /**
     * Load and position the player sprite.
     *
     * @param scene Spawn the player sprite in this scene.
     * @param x The initial x-coordinate of the sprite.
     * @param y The initial y-coordinate of the sprite.
     * @param texture The key for this texture.
     * @param frame See this page for more details:
     *     https://newdocs.phaser.io/docs/3.60.0/Phaser.Physics.Arcade.Sprite
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);

        this.anims.play(playerAnim_t.walk.DOWN);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(VillageDepthKey.player);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(player_t.WIDTH, player_t.HEIGHT);
        this.setCollideWorldBounds(true);
    }

    /**
     * Update the animation of the player sprite.  See this page for more details:
     *
     * https://newdocs.phaser.io/docs/3.60.0/focus/Phaser.Physics.Arcade.Sprite-preUpdate
     *
     * @param time Current time value.
     * @param delta The amount of time in milliseconds since the last frame.
     */
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        switch (this.movementState) {
            case player_t.movement.state.IDLE:
                break;
            case player_t.movement.state.PUSHED:
                this.pushedTimer += delta;
                if (this.pushedTimer >= player_t.IDLE_THRESHOLD) {
                    this.movementState = player_t.movement.state.IDLE;
                    this.pushedTimer = 0;
                }
                break;
        }
    }

    /**
     *
     * @param delta The amount of time in milliseconds since the last frame.
     * @param cursor Either one of the arrow keys (UP, DOWN, LEFT, RIGHT) or one of these
     *     keys: SPACE, SHIFT.
     */
    update(delta: number, cursor: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (this.movementState === player_t.movement.state.PUSHED) {
            return;
        }

        playerMovement(cursor, this, player_t.movement.VELOCITY);
    }
}
