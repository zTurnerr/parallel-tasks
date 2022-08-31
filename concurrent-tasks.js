

var doTask = (taskName) => {
    var begin = Date.now();
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var end = Date.now();
            var timeSpent = (end - begin) + "ms";
            console.log('\x1b[36m', "[TASK] FINISHED: " + taskName + " in " +
                timeSpent, '\x1b[0m');
            resolve(true);
        }, (Math.random() * 200));
    });
}


async function init() {
    numberOfTasks = 20;
    const concurrencyMax = 4 ;
    const taskList = [...Array(numberOfTasks)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))].map(() =>
    String.fromCharCode(Math.random() * (123 - 97) + 97)
    ).join('') )
    const counter = 0;
    const concurrencyCurrent = 0
    console.log("[init] Concurrency Algo Testing...")
    console.log("[init] Tasks to process: ", taskList.length)
    console.log("[init] Task list: " + taskList)
    console.log("[init] Maximum Concurrency: ", concurrencyMax,"\n")
}

// await manageConcurrency(taskList,counter,concurrencyMax,concurrencyCurrent);
// }



init()