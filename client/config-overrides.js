module.exports = function override(config, env) {
  const terserPlugin = config.optimization.minimizer[0]
  terserPlugin.options.minimizer.options.mangle.keep_classnames = true // For serialization
  terserPlugin.options.minimizer.options.mangle.keep_fnames = true // For serialization
  return config
}
