import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { mouse, sceneState } from '../../store'

export default function CameraRig() {
  useFrame(({ camera }, dt) => {
    const c = camera as PerspectiveCamera
    const k = Math.min(1, dt * 2)
    c.position.x += (mouse.x * 0.35 - c.position.x) * k
    c.position.y += (-mouse.y * 0.2 - c.position.y) * k
    c.lookAt(0, 0.3, 0)
    if (c.fov !== sceneState.fov) { c.fov = sceneState.fov; c.updateProjectionMatrix() }
  })
  return null
}
