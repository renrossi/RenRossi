$(document).ready(function() {
	createPlanet();
	
	loadStart();
	
	loadCategory($('#sun-core, .category-label'));
	
	unloadCategory($('#sun-core'));		
});

function loadStart()
{	
	setTimeout(function() {
		$('.visible-delay').fadeIn();
	}, 1500);
}

function loadCategory(elements) 
{
	var planet = elements.closest('.planet');
	
	elements.on('click', function() {
		$('.visible-delay').fadeOut()
		.promise().done(function() {
			if (planet.hasClass('not-exploring'))
			{
				planet.removeClass('not-exploring');
			}
			
			planet.addClass('explore');
			
			setTimeout(function() {
				$('.category-content').load("http://localhost:31337/RenRossi/app/pages/about.html")
				.promise().done(function() {
					$(this).fadeIn(700);
				});
			}, 1000);
		});
	});
}

function unloadCategory(element) 
{
	var planet = element.closest('.planet');
	
	element.on('click', function() {
		if (planet.hasClass('explore'))
		{
			planet.removeClass('explore');
			planet.addClass('not-exploring');
			
			setTimeout(function() {
				$('.dynamic').fadeIn();
			}, 700);
		}
	});
}

function createPlanet()
{
	var container, stats;

	var clock = new THREE.Clock();

	var camera, scene, renderer, composer;

	var uniforms, material, mesh;

	var mouseX = 0, mouseY = 0,
	lat = 0, lon = 0, phy = 0, theta = 0;

	var width = 500;
	var height = 500;

	var windowHalfX = width / 2;
	var windowHalfY = height / 2;

	init();
	animate();

	function init() {

		container = document.getElementById('sun-core');

		camera = new THREE.PerspectiveCamera( 45, 1, 0.01, 3000 );
		camera.position.z = 2.7;

		scene = new THREE.Scene();

		var textureLoader = new THREE.TextureLoader();

		uniforms = {

			fogDensity: { value: 0.65 },
			fogColor:   { value: new THREE.Vector3( 0, 0, 0 ) },
			time:       { value: 1.0 },
			resolution: { value: new THREE.Vector4() },
			uvScale:    { value: new THREE.Vector2( 3.0, 1.0 ) },
			texture1:   { value: textureLoader.load( "../assets/images/cloud.png" ) },
			texture2:   { value: textureLoader.load( "../assets/images/lavatile.jpg" ) }

		};

		uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
		uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;

		var texture = new THREE.TextureLoader();

		material = new THREE.ShaderMaterial( {

			uniforms: uniforms,
			vertexShader: document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent

		} );

		mesh = new THREE.Mesh( new THREE.SphereGeometry(1, 32, 32), material );
//		mesh.rotation.y = 0.003;
		scene.add( mesh );

		//

		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true  } );
		container.appendChild( renderer.domElement );
		renderer.autoClear = false;

		//

		// stats = new Stats();
		//container.appendChild( stats.dom );

		//

		var renderModel = new THREE.RenderPass( scene, camera );
		var effectBloom = new THREE.BloomPass( 1.25 );
		var effectFilm = new THREE.FilmPass( 0.1, 0.1, 2048, false );

		effectFilm.renderToScreen = true;

		
		
		composer = new THREE.EffectComposer( renderer );

		composer.addPass( renderModel );
		composer.addPass( effectBloom );
		composer.addPass( effectFilm );
		
	}

//	function onWindowResize( event ) {
//
//		uniforms.resolution.value.x = 228;
//		uniforms.resolution.value.y = 228;
//
//		renderer.setSize(228, 228);
//
//
//		camera.updateProjectionMatrix();
//
//		composer.reset();
//
//	}


//	function animate() {
//
//		requestAnimationFrame(animate);
////
//////		var delta = 7 * clock.getDelta();
////
//		uniforms.time.value += 1.5 * clock.getDelta();
////
//////		mesh.rotation.y += 0.0125 * delta;
////
//		composer.render(scene, camera);
//
//	}
	
	function animate() 
	{
		requestAnimationFrame(animate);
		var time = clock.getElapsedTime();
//	    var size = time/1.5;
//	
	    uniforms.time.value += 0.03;
//	    
	    if (time > 0)
	    {
	    	
	    	if (time < 1.5)
	        {
	    		uniforms.resolution.value.x = container.clientWidth;
	    		uniforms.resolution.value.y = container.clientHeight;
	    		renderer.setSize(container.clientWidth, container.clientHeight);
//	        	mesh.scale.x = size;   
//	        	mesh.scale.y = size;   
//	        	mesh.scale.z = size;   
	        }
//	        else
//	        {
//	    	    
//	        	
//	        }
	    }
////	
	    composer.render(scene, camera);
	}
}


//$(document).ready(function() {
//	createPlanet(228, 228, -228, '#earth', 'http://localhost:31337/RenRossi/app/assets/images/sun-map.jpg');
//	
//	loadStart();
//	
//	loadCategory($('#sun-core, .category-label'));
//	
//	unloadCategory($('#sun-core'));		
//});
//
//function loadStart()
//{	
//	setTimeout(function() {
//		$('.visible-delay').fadeIn();
//	}, 1500);
//}
//
//function loadCategory(elements) 
//{
//	var planet = elements.closest('.planet');
//	
//	elements.on('click', function() {
//		$('.visible-delay').fadeOut()
//		.promise().done(function() {
//			if (planet.hasClass('not-exploring'))
//			{
//				planet.removeClass('not-exploring');
//			}
//			
//			planet.addClass('explore');
//			
//			setTimeout(function() {
//				$('.category-content').load("http://localhost:31337/RenRossi/app/pages/about.html")
//				.promise().done(function() {
//					$(this).fadeIn(700);
//				});
//			}, 1000);
//		});
//	});
//}
//
//function unloadCategory(element) 
//{
//	var planet = element.closest('.planet');
//	
//	element.on('click', function() {
//		if (planet.hasClass('explore'))
//		{
//			planet.removeClass('explore');
//			planet.addClass('not-exploring');
//			
//			setTimeout(function() {
//				$('.dynamic').fadeIn();
//			}, 700);
//		}
//	});
//}
//
//function createPlanet(width, height, depth, element, surface)
//{
//	  // Set some camera attributes.
//	  const VIEW_ANGLE = 45;
//	  const ASPECT = 1;
//	  const NEAR = 0.1;
//	  const FAR = 1000;
//
//	  // Get the DOM element to attach to
//	  const container =
//	      document.querySelector(element);
//
//	  // Create a WebGL renderer, camera
//	  // and a scene
//	  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//	  const camera =
//	      new THREE.PerspectiveCamera(
//	          VIEW_ANGLE,
//	          ASPECT,
//	          NEAR,
//	          FAR
//	      );
//
//	  const scene = new THREE.Scene();
//
//	  // Add the camera to the scene.
//	  scene.add(camera);
//
//	  // Start the renderer.
//	  renderer.setSize(width, height);
//
//	  // Attach the renderer-supplied
//	  // DOM element.
//	  container.appendChild(renderer.domElement);
//
//	  // create a point light
//	  const pointLight =
//	    new THREE.PointLight(0xFFFFFF);
//
//	  // set its position
//	  pointLight.position.x = 10;
//	  pointLight.position.y = 10;
//	  pointLight.position.z = 130;
//
//	  // add to the scene
//	  scene.add(pointLight);
//	  
//	  var texture = new THREE.TextureLoader();
//
//	  // create the sphere's material
//	  const sphereMaterial =
//	    new THREE.MeshPhongMaterial(
//	      {
//	      	map: texture.load(surface),
//	      	bumpMap	: texture.load(surface),
//			bumpScale: 1.5
//	      });
//
//	  // Set up the sphere vars
//	  const RADIUS = 114;
//	  const SEGMENTS = 32;
//	  const RINGS = 32;
//
//	  // Create a new mesh with
//	  // sphere geometry - we will cover
//	  // the sphereMaterial next!
//	  const sphere = new THREE.Mesh(
//
//	    new THREE.SphereGeometry(
//	      RADIUS,
//	      SEGMENTS,
//	      RINGS),
//
//	    sphereMaterial);
//
//	  // Move the Sphere back in Z so we
//	  // can see it.
//	  sphere.position.z = depth;
//
//	  // Finally, add the sphere to the scene.
//	  scene.add(sphere);
//	  
//	  var clock = new THREE.Clock;
//
////	  requestAnimationFrame(function() {
////		  animate(clock, scene, camera, sphere, renderer);
////		  requestAnimationFrame(arguments.callee);
////	  });
////	  
//	  renderer.setSize(228, 228);
//	  
//	  renderer.render(scene, camera);
//	  
//}
//
//function animate(clk, scene, camera, mesh, renderer) 
//{
//    var time = clk.getElapsedTime();
//    var size = time/2;
//
//    if (time > 0)
//    {
//    	if (time < 1.5)
//        {
//        	mesh.scale.x = size;   
//        	mesh.scale.y = size;   
//        	mesh.scale.z = size;   
//        }
//        else
//        {
//        	mesh.rotation.y += 0.0005;
//        }
//    }
//
//    renderer.render(scene, camera);
//}
