var arg1 = process.argv[0];
var programPath = process.argv[1];

var sum = 0;

for(var i = 2; i < process.argv.length; i++){
    sum += Number(process.argv[i]);
}

console.log(sum);