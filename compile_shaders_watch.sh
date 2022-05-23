#!/usr/bin/env bash

fswatch -0 -i ".frag" -i ".vert" . | xargs -0 -n 1 -I {} ./compile_shaders.sh {}
