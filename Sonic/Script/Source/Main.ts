namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let sonic: ƒ.Node;
  let gravity: Number = -1;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  //document.addEventListener("keydown",hndlKeyboard)
  console.log(sonic);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateZ(20);
    viewport.camera.mtxPivot.rotateY(180);
    let cmpCamera: ƒ.ComponentCamera = viewport.getBranch().getComponent(ƒ.ComponentCamera);
    viewport.camera = cmpCamera;
    sonic = viewport.getBranch().getChildrenByName("SonicSprite")[0];
    //sonic.mtxLocal.translateX(0.01);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    //sonic.mtxLocal.translateX(1);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
    sonic.mtxLocal.translateX(0.01);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
    sonic.mtxLocal.translateX(-0.01);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]))
    sonic.mtxLocal.translateY(0.1);
    viewport.draw();
    //ƒ.AudioManager.default.update();
  }

  // function hndlKeyboard(_event: KeyboardEvent){
  //   if(_event.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT || _event.code == ƒ.KEYBOARD_CODE.ARROW_LEFT)
  //   sonic.mtxLocal.translateX(0.01);
  // }
}


