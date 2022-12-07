<script>
    import { Canvas, InteractiveObject, OrbitControls, T,  useLoader } from '@threlte/core';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

import svgPath from '$lib/assets/img/test.svg';
const svgToGeometry = (svg) => {
        let shapes = [];
        const loader = new SVGLoader();
        const data = loader.parse(svg);

        const shapePaths = data.paths;
        console.log(shapePaths, 'shapePaths');
        shapePaths.forEach((shapePath) => {
            const shape = SVGLoader.createShapes(shapePath);
            console.log(shape, 'shape');
            shapes = [...shapes, ...shape];
        });
        return shapes;
    };
const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="210mm"
   height="297mm"
   viewBox="0 0 210 297"
   version="1.1"
   id="svg5"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
   <sodipodi:namedview
      id="namedview7"
      pagecolor="#505050"
      bordercolor="#eeeeee"
      borderopacity="1"
      inkscape:showpageshadow="0"
      inkscape:pageopacity="0"
      inkscape:pagecheckerboard="0"
      inkscape:deskcolor="#505050"
      inkscape:document-units="mm"
      showgrid="false" />
   <defs
      id="defs2" />
   <g
      inkscape:label="Ebene 1"
      inkscape:groupmode="layer"
      id="layer1">
      <ellipse
         style="fill:#800000;stroke:#000080;stroke-width:0.396875;paint-order:markers fill stroke"
         id="path111"
         cx="47.836876"
         cy="42.947384"
         rx="19.300549"
         ry="19.304649" />
      <path
         sodipodi:type="star"
         style="fill:#ffff00;stroke:#ff00ff;stroke-width:0.396875;paint-order:markers fill stroke"
         id="path273"
         inkscape:flatsided="false"
         sodipodi:sides="5"
         sodipodi:cx="89.82048"
         sodipodi:cy="36.20248"
         sodipodi:r1="16.958241"
         sodipodi:r2="8.4791203"
         sodipodi:arg1="-0.11542572"
         sodipodi:arg2="0.51289281"
         inkscape:rounded="0"
         inkscape:randomized="0"
         d="m 106.66588,34.249407 -9.457299,6.113777 -0.325103,11.256689 -8.737013,-7.105164 -10.80621,3.169317 4.057526,-10.505009 -6.353502,-9.297943 11.244703,0.61271 6.879529,-8.915762 2.892082,10.883685 z"
         inkscape:transform-center-x="-1.0345973"
         inkscape:transform-center-y="-0.6035334" />
   </g>
</svg>`
    </script>
<T.Mesh>
    <T.ExtrudeGeometry args={[svgToGeometry(svg), {depth:10}]}/>
    <T.MeshStandardMaterial>
        <T.Color args={['#ff0000']} attach="color" />
    </T.MeshStandardMaterial>

</T.Mesh>
