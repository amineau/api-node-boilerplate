import './prerequire'
import './user'

import mocha from './mochainstance'

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures > 0 ? 1 : 0);
  });
});

setTimeout(() => {
  process.exit(0);
}, 2000);
