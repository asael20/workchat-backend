const fs = require('fs');

const pathsRepo = new Map();

pathsRepo.set('users',`${__dirname}/data/user-repo.json`);
pathsRepo.set('rooms',`${__dirname}/data/room-repo.json`);
pathsRepo.set('participants',`${__dirname}/data/participant-repo.json`);
pathsRepo.set('relations',`${__dirname}/data/relations-repo.json`);



module.exports.getRepo = async function (repoName) {
    const path_repo = pathsRepo.get(repoName);

    const exist = await new Promise ((resolve, reject) => {
        fs.stat(path_repo, (err, stats) => {
            if(err) resolve(false);
            resolve(true);
        });
    });

    if(!exist)
    {   
        const wstr = fs.createWriteStream(path_repo, {encoding: 'utf-8'});
        wstr.write(JSON.stringify([]));
        wstr.end()
        return [];
    }

    const reder = fs.createReadStream(path_repo, {encoding: 'utf-8'});
    let data = "";
    
    return  new Promise((resolve, reject) => {
        reder.on('data', (chunk) => data += chunk );
        reder.on('end', () => resolve(JSON.parse(data)) )
    });

}


module.exports.updateRepo = async function (repoName, value ) {
    const path_repo = pathsRepo.get(repoName);

    const wstr = fs.createWriteStream(path_repo, {encoding: 'utf-8'});
    wstr.write(JSON.stringify(value, null, 3));
    wstr.end()
    return Array.from(value).length;
}