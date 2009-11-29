task :xpi do |t|
  files_to_include = ['chrome', 'chrome.manifest', 'defaults', 'install.rdf']
  # TODO add version to xpi
  sh "zip sink.xpi #{files_to_include.join(' ')}"
end
