# Ember Asset Loader

[![Build Status](https://travis-ci.org/trentmwillis/ember-asset-loader.svg?branch=master)](https://travis-ci.org/trentmwillis/ember-asset-loader)
[![Code Climate](https://codeclimate.com/github/trentmwillis/ember-asset-loader/badges/gpa.svg)](https://codeclimate.com/github/trentmwillis/ember-asset-loader)

Provides experimental support for the [Asset Manifest RFC](https://github.com/emberjs/rfcs/pull/153) and [Asset Loader Service RFC](https://github.com/emberjs/rfcs/pull/158).

## Usage

Ember Asset Loader does three primary things:

1. Provides a base class to easily generate an Asset Manifest,
2. Provides an Ember service to use the generated manifest at runtime, and
3. Initializes the above service with the above generated manifest.

### Generating an Asset Manifest

You can generate an Asset Manifest by creating either a standalone or in-repo addon which extends from the
`ManifestGenerator` base class:

```js
var ManifestGenerator = require('ember-asset-loader/lib/manifest-generator');
module.exports = ManifestGenerator.extend({
  name: 'asset-generator-addon',
  manifestOptions: {
    bundlesLocation: 'engines-dist',
    supportedTypes: [ 'js', 'css' ]
  }
});
```

The `ManifestGenerator` will generate an asset manifest and merge it into your build tree during post-processing. It
generates the manifest according to the options specified in `manifestOptions`:

* The `bundlesLocation` option is a string that specifies which directory in the build tree contains the bundles to be
placed into the asset manifest. This defaults `bundles`.

* The `supportedTypes` option is an array that specifies which types of files should be included into the bundles for
the asset manifest. This defaults to `[ 'js', 'css' ]`.

_Note: This class provides default `contentFor`, `postprocessTree`, and `postBuild` hooks so be sure that you call
`_super` if you override one of those methods._

### Why isn't a manifest generated by default?

No manifest is generated by default since there is no convention for bundling assets within Ember currently. Thus, to
prevent introducing unintuitive or conflicting behavior, we provide no default generation.

If no manifest is generated, you'll get a warning at build time to ensure that you understand no manifest has been
generated and thus you'll have to provide a manifest manually in order to use the Asset Loader Service. This warning can
be disabled via the `noManifest` option from the consuming application:

```js
var app = new EmberApp(defaults, {
  assetLoader: {
    noManifest: true
  }
});
```

## Pre-loading Assets During Testing

For test environments it is often useful to load all of the assets in a manifest upfront. You can do this by using the
`preloadAssets` helper, like so:

```js
// tests/test-helper.js
import preloadAssets from 'ember-asset-loader/test-support/preload-assets';
import manifest from 'app/asset-manifest';

preloadAssets(manifest);
```

## Installation

* `git clone https://github.com/trentmwillis/ember-asset-loader`
* `cd ember-asset-loader`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit the tests at [http://localhost:4200/tests](http://localhost:4200/tests).

## Running Tests

One of three options:

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
