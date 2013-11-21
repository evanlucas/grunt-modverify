## grunt-modverify

[![NPM](https://nodei.co/npm/grunt-modverify.png?downloads=true)](https://nodei.co/npm/grunt-modverify/)

A [grunt](http://gruntjs.com) plugin for verifying project dependencies

This is a very basic plugin that scans all of the files in your project verifying that each dependency that has been `required` is present in your project's `package.json` as either a dependency or devDepedency

If the `required` module is a local module, it verifies that the file exists

### options

- fileFilter (specify files or file types)
  - default

```js
['*.js']
```

- directoryFilter (used to ignore directories)
  - default

```js
['!.git', '!components', '!bower_components`', '!node_modules']
```

### License

MIT