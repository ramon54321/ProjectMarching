#version 450

layout(location = 0) in vec2 position;
layout(location = 0) out vec4 outColor;

void main() {
    outColor = vec4(position, 1.0, 1.0);
}
