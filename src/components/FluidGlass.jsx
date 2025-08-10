import * as THREE from 'three'
import { useRef, useState, useEffect, memo } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import { easing } from 'maath'

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {}, children }) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, preserveDrawingBuffer: true }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.domElement.style.background = 'transparent'
        gl.domElement.style.pointerEvents = 'none'
      }}
    >
      <Wrapper modeProps={rawOverrides}>
        {children}
      </Wrapper>
    </Canvas>
  )
}


function Lens({ modeProps, ...p }) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  )
}

function Cube({ modeProps, ...p }) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  )
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  }

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  )
}

const ModeWrapper = memo(function ModeWrapper({
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  children,
  ...props
}) {
  const ref = useRef()
  const { nodes } = useGLTF(glb)
  const buffer = useFBO()
  const { viewport: vp, gl, camera, scene } = useThree()
  const geoWidthRef = useRef(1)

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry
    geo.computeBoundingBox()
    geoWidthRef.current =
      geo.boundingBox.max.x - geo.boundingBox.min.x || 1
  }, [nodes, geometryKey])

  useFrame((state, delta) => {
    const { pointer } = state
    const v = state.viewport.getCurrentViewport(camera, [0, 0, 15])

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
      ? (pointer.y * v.height) / 2
      : 0

    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 2], 0.15, delta)
    }

    if (modeProps.scale == null && ref.current) {
      const maxWorld = v.width * 0.9
      const desired = maxWorld / geoWidthRef.current
      ref.current.scale.setScalar(Math.min(0.15, desired))
    }

    gl.setRenderTarget(buffer)
    gl.render(scene, camera)
    gl.setRenderTarget(null)
  })

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps

  return (
    <>
      {/* children을 scene에 포탈링 */}
      {createPortal(children, scene)}

      {/* 배경 plane에 buffer.texture 투사 */}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>

      {/* 렌즈 */}
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={nodes[geometryKey]?.geometry}
        position={[0, 0, 2]}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  )
})