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

/**
 * Miscellaneous constants related to the player.
 */
export const player_t = Object.freeze({
    /**
     * Height of the player sprite in pixels.
     */
    HEIGHT: 32,
    /**
     * Time in milliseconds.
     */
    IDLE_THRESHOLD: 400,
    /**
     * Various constants related to player movement.
     */
    movement: Object.freeze({
        /**
         * Various movement states.
         */
        state: Object.freeze({
            IDLE: 0,
            PUSHED: 1,
        }),
        /**
         * The velocity of the player sprite.
         */
        VELOCITY: 180,
    }),
    /**
     * Width of the player sprite in pixels.
     */
    WIDTH: 32,
});
