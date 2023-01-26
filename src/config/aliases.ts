import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@adapters': getDirPath('adapters'),
  '@common': getDirPath('common'),
  '@config': getDirPath('config'),
  '@core': getDirPath('core'),
  '@infra': getDirPath('infrastructure'),
});

function getDirPath(dirName: string) {
  const srcPath = path.resolve(__dirname, '../');
  return path.join(srcPath, dirName);
}
