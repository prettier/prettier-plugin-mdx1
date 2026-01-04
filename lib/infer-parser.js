const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0;

/**
 * @param {SupportLanguage[]} languages
 * @param {string | undefined} [languageName]
 * @returns {SupportLanguage | undefined}
 */
function getLanguageByLanguageName(languages, languageName) {
  if (!languageName) {
    return;
  }

  return (
    languages.find(({ name }) => name.toLowerCase() === languageName) ??
    languages.find(({ aliases }) => aliases?.includes(languageName)) ??
    languages.find(({ extensions }) => extensions?.includes(`.${languageName}`))
  );
}

/**
 * @param {Options} options
 * @param {{physicalFile?: string | URL | undefined, file?: string | URL | undefined, language?: string | undefined}} fileInfo
 * @returns {string | undefined} matched parser name if found
 */
function inferParser(options, fileInfo) {
  const languages = options.plugins.toReversed().flatMap(
    (plugin) =>
      // @ts-expect-error -- Safe
      plugin.languages ?? [],
  );

  // If the file has no extension, we can try to infer the language from the
  // interpreter in the shebang line, if any; but since this requires FS access,
  // do it last.
  const language = getLanguageByLanguageName(languages, fileInfo.language);

  return language?.parsers[0];
}

export default inferParser;
