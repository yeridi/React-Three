import React, {useRef, useState} from 'react'
import './App.css';
import Modals from './modal'

//import canvas
import {Canvas, useFrame} from 'react-three-fiber'
/* import shadow from dai */
import {softShadows, MeshWobbleMaterial, OrbitControls} from '@react-three/drei'

import{useSpring, a} from 'react-spring/three'

/* sombras realistas */
softShadows();

const SpindingMesh = ({position, args, color , speed})=>{
  const mesh= useRef(null)
  //repeticion infinita
  useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  const[expand,setExpand] = useState(false)

  const props = useSpring({
    scale:expand ? [1.4,1.4,1.4]: [1,1,1]
  })

  return(
    <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} position={position} ref={mesh} castShadow >
      {/* ARGS  en X,Y,Z (tamaño)*/}
        <boxBufferGeometry attach='geometry' args={args} />
        {/* se puede agregar mas cosas (texturas)*/}
        <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={.6} />
    </a.mesh>
  )
}

function App() {
  return (
    <>{/* fov para el zoom */}
      <Canvas shadowMap colorManagement camera={{position: [-5,2,10], fov:60}}>
        <ambientLight intensity={.3}/>
        <directionalLight 
          castShadow
          position={[0,10,0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10,0,-20]} intensity={.5} />
        <pointLight position={[0,-10,0]} intensity={1.5} />
        

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2,0,0]} position={[0,-3,0]}>
            <planeBufferGeometry attach='geometry' args={[100 ,100]}/>
            {/* <meshStandardMaterial attach='material' color={"yellow"} /> */}
            <shadowMaterial attach='material' opacity={.3}/>
          </mesh>
          <SpindingMesh position={[0,1,0]} args={[3,2,1]} color='lightblue' speed={2}/>
          <SpindingMesh position={[-2,1,-5]}  color='pink' speed={6}/>
          <SpindingMesh position={[5,1,-2]}  color='pink' speed={6}/>
        </group>


        
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
