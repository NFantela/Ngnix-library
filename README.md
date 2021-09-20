# NgnixApps

## Lib setup process:
<!-- library setup tips : https://www.youtube.com/watch?v=2vHJ3_Om_gU&t=546s&ab_channel=B%C3%A4rnerJSTalks --> 
1) project:   ng new ngnix-apps --create-application=false

2) inside project create lib project: ng g library ngnix-lib

2.1) inside project create angular app showcase for created lib: ng g application ngnix-showcase

3) build library using : ng build

4) Build and show showcase project: ng build --named-chunks --output-hashing=none --project ngnix-showcase
-- this will only build and show modules

!! remember library is consumed from the dist !!

## Dangers of commonjs dependencies (e.g. momentjs)
Ivy automatically optmizies not imported modules etc however if u use commonjs deps it will be included even
if not used

Solution : SUBENTRIES:
-- in every library module e.g. library-a ADD:

1) public-api.ts : exports module and component
  export * from './library-a.module';
  export * from './a/a.component';

2) index.ts - always same just exports everything from its neighbhor public-api.ts
export * from './public-api';

3) package.json - always have same content
{
  "ngPackage": {
    "lib": {
      "entryFile": "public-api.ts"
    }
  }
}

after that change root tsconfig.json paths:
    "paths": {
      "ngnix-lib/*": [
        "projects/ngnix-lib/*",
      ],
      "ngnix-lib": [
        "dist/ngnix-lib"
      ]
    },

and in library project edit public-apis to include our modules:

now ng build builds multiple files for our library

## Making stuff private
-- dont export it from the top level public-api and u have to use deep imports inside others modules using it

## DONT DO
import modules with services / set up some processing  e.g. BrowserModule, TranslationModule... use that in 
consuming app cuz it will be duplicated

## DO
Modules should only bring components  / directives / pipes for services modules are not needed

### Note to self
Initial vnedor.js (2.38 mb)
styless.css, styles.js 328.87 kb
main.js 11.68 kb

