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

import { Geom } from "phaser";

import { camera_t } from "../const/camera";
import { VillageDepthKey } from "../const/DepthKey";
import SceneKey from "../const/SceneKey";
import TextureKey from "../const/TextureKey";
import { world_t } from "../const/world";
import Cherry from "../object/npc/cherry";
import Player from "../object/Player";
import { debugDraw } from "../util/debug";
import createTextBox from "../util/dialogue";

const content = "Hello. My name's Charlie Cherry. Nice to meet you.";

/**
 * The "Village" scene.  This is the player's hub area.  A typical Phaser scene is
 * initialized and updated by the following methods.  These methods are automatically
 * called by the scene manager in the given order.
 *
 * - init(): https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.SceneInitCallback
 * - preload(): https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.ScenePreloadCallback
 * - create(): https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.SceneCreateCallback
 * - update(): https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.SceneUpdateCallback
 */
export default class Village extends Phaser.Scene {
    private collisionLayer!: Phaser.Tilemaps.TilemapLayer;
    private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
    private cherry!: Cherry;
    private player!: Player;

    constructor() {
        super({ key: SceneKey.village });
    }

    /**
     * Perform anything required to create the scene.  See the following page for more
     * details:
     *
     * https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.SceneCreateCallback
     */
    create() {
        const map = this.loadMap();
        this.spawnCharacters(map);

        this.physics.add.collider(this.player, this.collisionLayer);
        this.physics.add.collider(this.player, this.cherry);

        this.cherry.on("pointerdown", () => {
            if (this.isPlayerCherryOverlap()) {
                createTextBox(this, {
                    x: 0,
                    y: 600,
                    depth: VillageDepthKey.dialogue,
                    icon: TextureKey.cherry,
                    scale: 3,
                    wrapWidth: 500,
                    fixedWidth: 656,
                    fixedHeight: 123,
                    title: "Cherry",
                }).start(content, 50);
            }
        });

        this.cameras.main.setBounds(
            camera_t.TOP_LEFT_X,
            camera_t.TOP_LEFT_Y,
            map.widthInPixels,
            map.heightInPixels
        );
        this.cameras.main.startFollow(this.player, camera_t.ROUND_PIXELS);
    }

    isPlayerCherryOverlap() {
        return Geom.Intersects.RectangleToRectangle(
            this.player.getBounds(),
            this.cherry.getBounds()
        );
    }

    /**
     * Load the map for the scene.
     *
     * @returns The scene map.
     */
    loadMap() {
        const map = this.make.tilemap({ key: TextureKey.village });
        const villageTile = map.addTilesetImage("village", TextureKey.villageTile);
        this.physics.world.setBounds(
            world_t.TOP_LEFT_X,
            world_t.TOP_LEFT_Y,
            map.widthInPixels,
            map.heightInPixels
        );

        // Build the various layers.
        const baseLayer = map.createLayer("base", villageTile);
        baseLayer.setDepth(VillageDepthKey.base);
        baseLayer.setCollisionByProperty({ collides: true });

        const landmarkLayer = map.createLayer("landmark", villageTile);
        landmarkLayer.setDepth(VillageDepthKey.landmark);
        landmarkLayer.setCollisionByProperty({ collides: true });

        const vegetationLayer = map.createLayer("vegetation", villageTile);
        vegetationLayer.setDepth(VillageDepthKey.vegetation);
        vegetationLayer.setCollisionByProperty({ collides: true });

        const forestTopLayer = map.createLayer("forestTop", villageTile);
        forestTopLayer.setDepth(VillageDepthKey.forestTop);
        forestTopLayer.setCollisionByProperty({ collides: true });

        const forestBottomLayer = map.createLayer("forestBottom", villageTile);
        forestBottomLayer.setDepth(VillageDepthKey.forestBottom);
        forestBottomLayer.setCollisionByProperty({ collides: true });

        this.collisionLayer = map.createLayer("collision", villageTile);
        this.collisionLayer.setDepth(VillageDepthKey.collisionLayer);
        this.collisionLayer.setCollisionByProperty({ collides: true });
        debugDraw(this.collisionLayer, this);

        return map;
    }

    /**
     * Load anything we need prior to creating the scene.  See the following page for
     * more details:
     *
     * https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.ScenePreloadCallback
     */
    preload() {
        this.cursor = this.input.keyboard?.createCursorKeys();
    }

    /**
     * Position all characters at their spawn points.
     *
     * @param map The map for the scene.
     */
    spawnCharacters(map: Phaser.Tilemaps.Tilemap) {
        const playerSpawn = map.getObjectLayer("player-spawn");
        playerSpawn?.objects.forEach((position) => {
            this.player = new Player(
                this,
                Number(position.x),
                Number(position.y),
                TextureKey.player
            );
        });

        //////////////////////////////////////////////////////////////////
        // NPCs
        //////////////////////////////////////////////////////////////////

        const cherrySpawn = map.getObjectLayer("cherry-spawn");
        cherrySpawn?.objects.forEach((position) => {
            this.cherry = new Cherry(
                this,
                Number(position.x),
                Number(position.y),
                TextureKey.cherry
            );
            this.cherry.setInteractive();
        });
    }

    /**
     * The game loop.  Called for every frame.  See the following page for more details:
     *
     * https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Scenes.SceneUpdateCallback
     *
     * @param time Current time value.
     * @param delta The amount of time in milliseconds since the last frame.
     */
    update(time: number, delta: number) {
        if (!this.cursor || !this.player) {
            return;
        }
        this.player.update(delta, this.cursor);
        this.cherry.update();
    }
}
