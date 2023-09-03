/**
 * Adapted from the file
 *
 * https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/ui-textbox/textbox.js
 *
 * MIT License
 *
 * Copyright (c) 2023 Rex <https://github.com/rexrainbow>
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

const COLOR_PRIMARY = 0x6495ed; // base
const COLOR_LIGHT = 0x6495ed; // border
const COLOR_DARK = 0x191970; // separator

const GetValue = Phaser.Utils.Objects.GetValue;

/**
 *
 * @param scene Create a text box in this scene.
 * @param config A configuration object having the following attributes:
 *     * x -- The top-left x-coordinate of the text box.
 *     * y -- The top-left y-coordinate of the text box.
 *     * depth -- The depth of the text box within the scene.
 *     * icon -- Display this image as an icon.  Should be a texture key.
 *     * scale -- Scale the icon by this factor.
 *     * wrapWidth -- Print text for at most this width before we wrap the remaining text.
 *     * fixedWidth -- The width of the text box.
 *     * fixedHeight -- The height of the text box.
 *     * titleText -- The title of the text box.
 * @returns A generic text box having the given configuration.  Pass content to the
 *     returned text box.
 */
export default function createTextBox(scene: Phaser.Scene, config: object) {
    const x = GetValue(config, "x", 0);
    const y = GetValue(config, "y", 0);
    const depth = GetValue(config, "depth", -1);
    const icon = GetValue(config, "icon", undefined);
    const scale = GetValue(config, "scale", 1);
    const wrapWidth = GetValue(config, "wrapWidth", 0);
    const fixedWidth = GetValue(config, "fixedWidth", 0);
    const fixedHeight = GetValue(config, "fixedHeight", 0);
    const titleText = GetValue(config, "title", undefined);

    const textBox = scene.rexUI.add
        .textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle({
                radius: 0,
                color: COLOR_PRIMARY,
                strokeColor: COLOR_LIGHT,
                strokeWidth: 2,
                alpha: 0.8,
            }),

            icon: scene.add.image(0, 0, icon).setScale(scale),
            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),
            action: scene.add.image(0, 0, "nextPage").setTint(COLOR_LIGHT).setVisible(false),
            title: titleText ? scene.add.text(0, 0, titleText, { fontSize: "24px" }) : undefined,

            separator: titleText
                ? scene.rexUI.add.roundRectangle({ height: 3, color: COLOR_DARK })
                : undefined,

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
                separator: 6,
            },

            align: {
                title: "left",
            },
        })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on(
            "pointerdown",
            function () {
                const icon = this.getElement("action").setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else if (!this.isLastPage) {
                    this.typeNextPage();
                } else {
                    textBox.destroy();
                }
            },
            textBox
        )
        .on(
            "pageend",
            function () {
                if (this.isLastPage) {
                    return;
                }

                const icon = this.getElement("action").setVisible(true);
                this.resetChildVisibleState(icon);
                icon.y -= 30;
                // eslint-disable-next-line
                const tween = scene.tweens.add({
                    targets: icon,
                    y: "+=30", // '+=100'
                    ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false,
                });
            },
            textBox
        )
        .on("complete", function () {
            // FIXME: provide a better transition to a different state
            console.log("all pages typing complete");
        });
    //.on('type', function () {
    //})
    textBox.setDepth(depth);
    textBox.fadeIn(200);

    return textBox;
}

// const getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
//     return scene.add
//         .text(0, 0, "", {
//             fontSize: "20px",
//             wordWrap: {
//                 width: wrapWidth,
//             },
//             maxLines: 3,
//         })
//         .setFixedSize(fixedWidth, fixedHeight);
// };

/**
 * Format text according to BBCode.
 *
 * https://en.wikipedia.org/wiki/BBCode
 *
 * @param scene Embed a text box in this scene.
 * @param wrapWidth Print text for at most this width before we wrap the remaining text.
 * @param fixedWidth The width of the text box.
 * @param fixedHeight The height of the text box.
 * @returns Text added to the given scene.
 */
function getBBcodeText(
    scene: Phaser.Scene,
    wrapWidth: number,
    fixedWidth: number,
    fixedHeight: number
) {
    return scene.rexUI.add.BBCodeText(0, 0, "", {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: "20px",
        wrap: {
            mode: "word",
            width: wrapWidth,
        },
        maxLines: 3,
    });
}
