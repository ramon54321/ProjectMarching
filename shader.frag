#version 450

layout(location = 0) in vec2 position;
layout(location = 0) out vec4 outColor;

#define MAX_STEPS 100
#define MAX_DISTANCE 100.0
#define SURFACE_DISTANCE 0.01

float getDist(vec3 point)
{
    vec4 sphere = vec4(0, 1, 2, 0.5);
    
    float sphereDist = length(point - sphere.xyz) - sphere.w;
    float planeDist = point.y;
    
    float dist = min(sphereDist, planeDist);
    return dist;
}

vec3 getNormal(vec3 point)
{
    float pointDistance = getDist(point);
    vec2 sampleOffset = vec2(0.01, 0.0);
    vec3 normal = pointDistance - vec3(
        getDist(point - sampleOffset.xyy),
        getDist(point - sampleOffset.yxy),
        getDist(point - sampleOffset.yyx)
    );
    return normalize(normal);
}

float getLight(vec3 point)
{
    vec3 lightPosition = vec3(2.5, 5.0, -1.0);
    vec3 directionToLight = normalize(lightPosition - point);
    vec3 surfaceNormal = getNormal(point);

    float diffuseLight = dot(surfaceNormal, directionToLight);
    return diffuseLight;
}

float rayMarch(vec3 rayOrigin, vec3 rayDirection)
{
    float distanceOrigin = 0.0;
    
    for (int i = 0; i < MAX_STEPS; i++)
    {
        vec3 currentMarchingPoint = rayOrigin + rayDirection * distanceOrigin;
        float distanceScene = getDist(currentMarchingPoint);
        distanceOrigin += distanceScene;
        if (distanceOrigin > MAX_DISTANCE || distanceScene < SURFACE_DISTANCE) break;
    }
    
    return distanceOrigin;
}


void main()
{
    vec2 uv = vec2(position.x * (1280.0 / 720.0), position.y);
    vec3 rayOrigin = vec3(0, 1, 0);
    vec3 rayDirection = normalize(vec3(uv.x, uv.y, 1));
    
    float hitDistance = rayMarch(rayOrigin, rayDirection);
    vec3 hitPoint = rayOrigin + rayDirection * hitDistance;
    
    //float diffuseLight = getNormal(hitPoint);
    
    //vec3 color = vec3(diffuseLight);
    float lightIntensity = getLight(hitPoint);
    vec3 color = vec3(lightIntensity);

    outColor = vec4(color, 1.0);
}
