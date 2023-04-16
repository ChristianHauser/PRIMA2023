"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    let CustomComponentScript = /** @class */ (() => {
        class CustomComponentScript extends ƒ.ComponentScript {
            constructor() {
                super();
                // Properties may be mutated by users in the editor via the automatically created user interface
                this.message = "CustomComponentScript added to ";
                // Activate the functions of this component as response to events
                this.hndEvent = (_event) => {
                    switch (_event.type) {
                        case "componentAdd" /* COMPONENT_ADD */:
                            ƒ.Debug.log(this.message, this.node);
                            break;
                        case "componentRemove" /* COMPONENT_REMOVE */:
                            this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                            this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                            break;
                        case "nodeDeserialized" /* NODE_DESERIALIZED */:
                            // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                            break;
                    }
                };
                // Don't start when running in editor
                if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                    return;
                // Listen to this component being added to or removed from a node
                this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
            }
        }
        // Register the script as component for use in the editor via drag&drop
        CustomComponentScript.iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        return CustomComponentScript;
    })();
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let sonic;
    let gravity = -1;
    document.addEventListener("interactiveViewportStarted", start);
    //document.addEventListener("keydown",hndlKeyboard)
    console.log(sonic);
    function start(_event) {
        viewport = _event.detail;
        viewport.camera.mtxPivot.translateZ(20);
        viewport.camera.mtxPivot.rotateY(180);
        let cmpCamera = viewport.getBranch().getComponent(ƒ.ComponentCamera);
        viewport.camera = cmpCamera;
        sonic = viewport.getBranch().getChildrenByName("SonicSprite")[0];
        //sonic.mtxLocal.translateX(0.01);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        //sonic.mtxLocal.translateX(1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
            sonic.mtxLocal.translateX(0.01);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
            sonic.mtxLocal.translateX(-0.01);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]))
            sonic.mtxLocal.translateY(0.1);
        viewport.draw();
        //ƒ.AudioManager.default.update();
    }
    // function hndlKeyboard(_event: KeyboardEvent){
    //   if(_event.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT || _event.code == ƒ.KEYBOARD_CODE.ARROW_LEFT)
    //   sonic.mtxLocal.translateX(0.01);
    // }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map