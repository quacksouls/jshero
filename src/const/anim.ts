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

export const anim_t = Object.freeze({
    /**
     * From the page
     *
     * https://newdocs.phaser.io/docs/3.60.0/focus/Phaser.Animations.AnimationState-play
     *
     * If this animation is already playing then ignore this call.
     */
    IGNORE_IF_PLAYING: true,
});

/**
 * Constants for animation of the NPC Cherry.
 */
export const cherryAnim_t = Object.freeze({
    idle: "cherry-idle",
});

/**
 * Constants for player animation.
 */
export const playerAnim_t = Object.freeze({
    //////////////////////////////////////////////////////////////////////
    // Movement states
    //////////////////////////////////////////////////////////////////////
    idle: Object.freeze({
        DOWN: "player-idle-down",
        SIDE: "player-idle-side",
        UP: "player-idle-up",
    }),
    push: Object.freeze({
        DOWN: "player-push-down",
        SIDE: "player-push-side",
        UP: "player-push-up",
    }),
    run: Object.freeze({
        DOWN: "player-run-down",
        SIDE: "player-run-side",
        UP: "player-run-up",
    }),
    walk: Object.freeze({
        DOWN: "player-walk-down",
        SIDE: "player-walk-side",
        UP: "player-walk-up",
    }),
});
