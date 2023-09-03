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
 * Miscellaneous constants related to the NPC Cherry.
 */
export const cherry_t = Object.freeze({
    /**
     * The height of Cherry.  This is the frame height.
     */
    HEIGHT: 17,
    /**
     * The scale factor.  Scale the sprite up by this factor.
     */
    SCALE: 2,
    /**
     * The width of Cherry, aka the frame width.
     */
    WIDTH: 17,
});

/**
 * Constants that apply to all NPCs.
 */
export const npc_t = Object.freeze({
    /**
     * Set the NPC as a static body.
     */
    IS_STATIC: true,
});
