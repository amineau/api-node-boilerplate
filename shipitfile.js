const { deploy }    = require('./config/production.json');
const shipitDeploy  = require('shipit-deploy');
const workdir       = '/home/musicroom/api';
let port            = '';

module.exports = shipit => {
  shipitDeploy(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '~/api',
      repositoryUrl: 'git@gitlab.com:music-room/mr-api.git',
      ignores: [
        '.git',
        'node_modules',
        'test'
      ],
      rsync: ['--del'],
      branch: 'master',
      keepReleases: 2,
      key: '/tmp/key',
      shallowClone: true,
    },
    production: { servers: `${deploy.name}@${deploy.url}` }
  });

  shipit.blTask('get port', () => {
    const initialPort = 8080;
    const getPort = `cat .balancing || echo ${initialPort}`;
    const cmd = newPort => `echo ${newPort} > .balancing`;
    return shipit.remote(getPort, {cwd: workdir})
      .then(res => {
        port = res[0].stdout.slice(0, -1);
        port = initialPort + (port - initialPort + 1) % 2;
        console.log(res[0].stdout);
        console.log(port);
        shipit.remote(cmd(port), {cwd: workdir})
      });
  });
  shipit.task('export port', () => {
    return shipit.remote('export MR_API_PORT=$(cat .balancing)', {cwd: workdir})
  });
  shipit.blTask('start new docker', () => {
    return shipit.remote(`ls && export MR_API_PORT=${port} && ./script/prod.sh`, {cwd: `${workdir}/current`});
  });
  shipit.blTask('waiting', () => {
    return shipit.remote('sleep 10');
  });
  shipit.blTask('kill old dockers', () => {
    return shipit.remote('docker system prune -f');
  });
  shipit.task('balance', () => {
    shipit.start(
      'get port',
      'start new docker',
      'waiting',
      'kill old dockers'
    )
  });
};
