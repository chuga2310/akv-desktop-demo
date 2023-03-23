import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
  UniversalCamera,
  ExecuteCodeAction,
  ActionManager,
  ArcRotateCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import SceneComponent from "babylonjs-hook";

let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI/2.5, 10, Vector3.Zero());

  camera.setTarget(Vector3.Zero());
  // camera.wheelDeltaPercentage = 0.15
  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  
  camera.attachControl(canvas, true);

  SceneLoader.ImportMesh("", "adamHead/", "adamHead.gltf", scene);

  const map = {}; //object for multiple key presses
  scene.actionManager = new ActionManager(scene);

  scene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
      // camera.attachControl(canvas, false);
      map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    })
  );

  scene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
      map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    })
  );

  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 2
		
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

function SceneView() {
  return (
    <SceneComponent
      style={{ height: 80 + "vh" }}
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas"
    />
  );
}

export default SceneView;
