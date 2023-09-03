/**
 * Adapted from the file
 *
 * https://github.com/Acquati/legend-of-faune/blob/main/src/objects/Player/playerMovement.ts
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

import { anim_t, playerAnim_t } from "../../const/anim";

//////////////////////////////////////////////////////////////////////////
// Diagonal movement
//////////////////////////////////////////////////////////////////////////

const moveUpRight = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    player.scaleX = 1;
    player.body.offset.x = player.body.width;

    const vel = velocity(movementVelocity);
    player.setVelocity(vel, -vel);

    if (player.anims.currentAnim.key === playerAnim_t.walk.UP) {
        player.anims.play({ key: playerAnim_t.walk.UP }, anim_t.IGNORE_IF_PLAYING);
    } else {
        player.anims.play({ key: playerAnim_t.walk.SIDE }, anim_t.IGNORE_IF_PLAYING);
    }
};

const moveRightDown = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    player.scaleX = 1;
    player.body.offset.x = player.body.width;

    const vel = velocity(movementVelocity);
    player.setVelocity(vel, vel);

    if (player.anims.currentAnim.key === playerAnim_t.walk.DOWN) {
        player.anims.play({ key: playerAnim_t.walk.DOWN }, anim_t.IGNORE_IF_PLAYING);
    } else {
        player.anims.play({ key: playerAnim_t.walk.SIDE }, anim_t.IGNORE_IF_PLAYING);
    }
};

const moveDownLeft = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    const vel = velocity(movementVelocity);
    player.setVelocity(-vel, vel);

    if (player.anims.currentAnim.key === playerAnim_t.walk.DOWN) {
        player.scaleX = 1;
        player.body.offset.x = player.body.width;
        player.anims.play({ key: playerAnim_t.walk.DOWN }, anim_t.IGNORE_IF_PLAYING);
    } else {
        player.scaleX = -1;
        player.body.offset.x = player.body.width * 2;
        player.anims.play({ key: playerAnim_t.walk.SIDE }, anim_t.IGNORE_IF_PLAYING);
    }
};

const moveLeftUp = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    const vel = velocity(movementVelocity);
    player.setVelocity(-vel, -vel);

    if (player.anims.currentAnim.key === playerAnim_t.walk.UP) {
        player.scaleX = 1;
        player.body.offset.x = player.body.width;
        player.anims.play({ key: playerAnim_t.walk.UP }, anim_t.IGNORE_IF_PLAYING);
    } else {
        player.scaleX = -1;
        player.body.offset.x = player.body.width * 2;
        player.anims.play({ key: playerAnim_t.walk.SIDE }, anim_t.IGNORE_IF_PLAYING);
    }
};

//////////////////////////////////////////////////////////////////////////
// Movement along up, down, left, right
//////////////////////////////////////////////////////////////////////////

const moveUp = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    player.scaleX = 1;
    player.body.offset.x = player.body.width;
    player.setVelocity(0, -movementVelocity);
    player.anims.play({ key: playerAnim_t.walk.UP }, anim_t.IGNORE_IF_PLAYING);
};

const moveRight = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    player.scaleX = 1;
    player.body.offset.x = player.body.width;
    player.setVelocity(movementVelocity, 0);
    player.anims.play({ key: playerAnim_t.walk.SIDE }, anim_t.IGNORE_IF_PLAYING);
};

const moveDown = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    player.scaleX = 1;
    player.body.offset.x = player.body.width;
    player.setVelocity(0, movementVelocity);
    player.anims.play({ key: playerAnim_t.walk.DOWN }, anim_t.IGNORE_IF_PLAYING);
};

const moveLeft = (player: Phaser.Physics.Arcade.Sprite, movementVelocity: number) => {
    player.scaleX = -1;
    player.body.offset.x = player.body.width * 2;
    player.setVelocity(-movementVelocity, 0);
    player.anims.play({ key: playerAnim_t.walk.SIDE }, anim_t.IGNORE_IF_PLAYING);
};

/**
 * Move the player along the map.
 *
 * @param cursor One of these keyboard keys: UP, DOWN, LEFT, RIGHT, SPACE, SHIFT.
 * @param player The player sprite.
 * @param movementVelocity Move the player sprite according to this velocity.
 */
const playerMovement = (
    cursor: Phaser.Types.Input.Keyboard.CursorKeys,
    player: Phaser.Physics.Arcade.Sprite,
    movementVelocity: number
) => {
    if (cursor.up?.isDown && cursor.right?.isDown && cursor.down?.isUp && cursor.left?.isUp) {
        moveUpRight(player, movementVelocity);
    } else if (
        cursor.up?.isUp &&
        cursor.right?.isDown &&
        cursor.down?.isDown &&
        cursor.left?.isUp
    ) {
        moveRightDown(player, movementVelocity);
    } else if (
        cursor.up?.isUp &&
        cursor.right?.isUp &&
        cursor.down?.isDown &&
        cursor.left?.isDown
    ) {
        moveDownLeft(player, movementVelocity);
    } else if (
        cursor.up?.isDown &&
        cursor.right?.isUp &&
        cursor.down?.isUp &&
        cursor.left?.isDown
    ) {
        moveLeftUp(player, movementVelocity);
    } else if (
        cursor.up?.isDown &&
        cursor.right?.isUp &&
        cursor.down?.isDown &&
        cursor.left?.isUp
    ) {
        if (cursor.up?.timeDown < cursor.down?.timeDown) {
            moveDown(player, movementVelocity);
        } else {
            moveUp(player, movementVelocity);
        }
    } else if (
        cursor.up?.isUp &&
        cursor.right?.isDown &&
        cursor.down?.isUp &&
        cursor.left?.isDown
    ) {
        if (cursor.right?.timeDown < cursor.left?.timeDown) {
            moveLeft(player, movementVelocity);
        } else {
            moveRight(player, movementVelocity);
        }
    } else if (cursor.up?.isDown && cursor.right?.isUp && cursor.down?.isUp && cursor.left?.isUp) {
        moveUp(player, movementVelocity);
    } else if (cursor.up?.isUp && cursor.right?.isDown && cursor.down?.isUp && cursor.left?.isUp) {
        moveRight(player, movementVelocity);
    } else if (cursor.up?.isUp && cursor.right?.isUp && cursor.down?.isDown && cursor.left?.isUp) {
        moveDown(player, movementVelocity);
    } else if (cursor.up?.isUp && cursor.right?.isUp && cursor.down?.isUp && cursor.left?.isDown) {
        moveLeft(player, movementVelocity);
    } else {
        player.setVelocity(0, 0);
        const parts = player.anims.currentAnim.key.split("-");
        parts[1] = "idle";
        player.anims.play(parts.join("-"));
    }
};
export default playerMovement;

const velocity = (movementVelocity: number) => Math.round(Math.cos(Math.PI / 4) * movementVelocity);
