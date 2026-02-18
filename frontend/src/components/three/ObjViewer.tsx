"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three-stdlib"
import { OBJLoader } from "three-stdlib"

export default function ObjViewer() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#000000")

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 6)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    )
    mountRef.current.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const dirLight = new THREE.DirectionalLight(0xffffff, 2)
    dirLight.position.set(5, 10, 7)
    scene.add(dirLight)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Texture loader
    const textureLoader = new THREE.TextureLoader()

    const baseColor = textureLoader.load(
      "/models/textures/T_Stahlritter-42_BC.png"
    )
    const normalMap = textureLoader.load(
      "/models/textures/T_Stahlritter-42_N.png"
    )
    const ormMap = textureLoader.load(
      "/models/textures/T_Stahlritter-42_ORM.png"
    )

    // OBJ Loader
    const loader = new OBJLoader()
    loader.load(
      "/models/Stahl_Ritter_42.obj",
      (object) => {
        object.traverse((child: any) => {
          if (!child.isMesh) return

          child.material = new THREE.MeshStandardMaterial({
            map: baseColor,
            normalMap: normalMap,
            roughnessMap: ormMap,
            metalnessMap: ormMap,
            metalness: 1,
            roughness: 1,
          })

          // Required for AO maps (if UV2 exists)
          child.geometry.setAttribute(
            "uv2",
            new THREE.BufferAttribute(
              child.geometry.attributes.uv.array,
              2
            )
          )
        })

        // Center model
        const box = new THREE.Box3().setFromObject(object)
        const center = box.getCenter(new THREE.Vector3())
        object.position.sub(center)

        // Scale
        object.scale.set(1.2, 1.2, 1.2)

        scene.add(object)
      },
      undefined,
      (error) => console.error("OBJ load error:", error)
    )

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-[500px]" />
}
