#!/bin/bash

full="";
for i in `find . -name "*.js" -print | grep -v './backend.profile.js'`;
  do 
    i=${i:2};
    i=${i%.*};
    full=$full"\"backend/"$i"\", "
done;
echo "define(["${full%,*}"], function(){});" > Deps.js;
