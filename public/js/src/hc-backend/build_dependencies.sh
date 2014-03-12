#!/bin/bash
full="";
echo "define([" > Deps.js;

while [ "$1" != "" ]; do
    echo "DIR >>${1}";
    cd ${1};
    for i in `find . -name '*.js' -print | grep -v './*.profile.js' | grep -v './tests'`;
    do 
        echo "FILE >>"$i
        i=${i:2};
        i=${i%.*};
        
        if [ "${1}" == "." ]; then
            module=${PWD##*/};
        else
            module=${1};
        fi

        full=$full"\"$module/"$i"\", "
    done;
    cd -;
    echo "${full%,*}," >> Deps.js;
    shift;
done;

echo "], function(){});" >> Deps.js;
