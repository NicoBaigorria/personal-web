import { ShaderMaterial, WebGLRenderer, WebGLProgramParametersWithUniforms } from "three";

// Function to modify the fragment shader
const replaceFragmentShader = (fragmentShader: any) =>
  fragmentShader
    .replace(
      `#include <common>`,
      `#include <common>
  float exponentialEasing(float x, float a) {
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));
    
    if (a < 0.5){
      a = 2.0*(a);
      float y = pow(x, a);
      return y;
    } else {
      a = 2.0*(a-0.5);
      float y = pow(x, 1.0/(1.0-a));
      return y;
    }
  }`
    )
    .replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
  float fadeDist = 350.0;
  float dist = length(vViewPosition);
  
  float fadeOpacity = smoothstep(fadeDist, 0.0, dist);
  fadeOpacity = exponentialEasing(fadeOpacity, 0.93);
  vec4 diffuseColor = vec4( diffuse, fadeOpacity * opacity );`
    );

// Corrected `onBeforeCompile` function to modify the fragment shader source
export const fadeOnBeforeCompile = (parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => {
  // Access and modify the fragment shader directly from the parameters
  if (parameters.fragmentShader) {
    parameters.fragmentShader = replaceFragmentShader(parameters.fragmentShader);
  }
};

export const fadeOnBeforeCompileFlat = (parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => {
  if (parameters.fragmentShader) {
    parameters.fragmentShader = replaceFragmentShader(parameters.fragmentShader).replace(
      `#include <output_fragment>`,
      `gl_FragColor = diffuseColor;`
    );
  }
};
