
var doTask = (taskName,x1,x2) => {
    var begin = Date.now();
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var end = Date.now();
            var timeSpent = (end - begin) + "ms";
            console.log('\x1b[36m', "[TASK] FINISHED: " + taskName + " in " +
                timeSpent, '\x1b[0m');
            resolve(true);
        }, ( Math.random() * 200));
    });
}


var counter=0;    //global counter, not the best pratice tho

let helperConcurrency = (taskList, concurrencyMax, concurrencyCurrent) => {
    if (counter < taskList.length && concurrencyCurrent < concurrencyMax) {   //checking the element on the array and the status of the current running processes
        concurrencyCurrent += 1
        counter+=1
        doTask(taskList[counter-1],concurrencyCurrent,concurrencyMax).then((res) => {
            if (res) {
                concurrencyCurrent -= 1;
            }
            if (counter < taskList.length && concurrencyCurrent < concurrencyMax) manageConcurrency(taskList, concurrencyMax, concurrencyCurrent);   // calling the main function after any promise is resolved
        })
        if (counter < taskList.length && concurrencyCurrent < concurrencyMax) manageConcurrency(taskList, concurrencyMax, concurrencyCurrent);  // calling the main function after checking if the counters are in the correct state 
    }
}

let manageConcurrency = (taskList, concurrencyMax, concurrencyCurrent) => { // wrapper function for the recursive solution made
    if(counter >= taskList.length) return;
    else{
        helperConcurrency(taskList, concurrencyMax, concurrencyCurrent);
    }
}

async function init() {
    numberOfTasks = 20;
    const concurrencyMax = 4;
    const taskList = [...Array(numberOfTasks)].map(() =>
        [...Array(~~(Math.random() * 10 + 3))].map(() =>
            String.fromCharCode(Math.random() * (123 - 97) + 97)
        ).join(''))
    let tasks_executing_list = []
    let concurrencyCurrent = 0
    console.log("[init] Concurrency Algo Testing...")
    console.log("[init] Tasks to process: ", taskList.length)
    console.log("[init] Task list: " + taskList)
    console.log("[init] Maximum Concurrency: ", concurrencyMax, "\n")

    manageConcurrency(taskList, concurrencyMax, concurrencyCurrent)
}

init()
