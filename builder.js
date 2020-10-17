let firebaseConfig = {
    apiKey: "AIzaSyCnfyjfUPNuN4i8IKVbQ14OI5SOsCcvjIw",
    authDomain: "realityleap-rosseti.firebaseapp.com",
    databaseURL: "https://realityleap-rosseti.firebaseio.com",
    projectId: "realityleap-rosseti",
    storageBucket: "realityleap-rosseti.appspot.com",
    messagingSenderId: "389004230415",
    appId: "1:389004230415:web:d0fdff6cbc90bb124e887a",
    measurementId: "G-DFDWX4CFBT"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let database = firebase.database();
// database.ref('employees/0').update({
//     first_name : "Владимир"
// });

const urlParams = new URLSearchParams(window.location.search);
const reportType = urlParams.get(REPORT_TYPE);

switch (reportType) {
    case TYPE_TASK :
        const taskId = urlParams.get(TASK_ID);
        database.ref(`inspection_tasks/${taskId}`).once("value").then(function(snapshot) {
            let task = snapshot.val();

            const table = createTable();
            for (let i = 0; i < 2; i++) {
                const row = createRow();
                if (i === 0) {
                    for (let j = 0; j < HEADERS_TASK.length; j++) {
                        row.append(createHeaderCell().html(HEADERS_TASK[j]));
                    }
                } else {
                    row.append(createCell().html(task.place.name));
                    row.append(createCell().html(task.safety_event));
                    row.append(createCell().html(employeeToString(task.creator)));
                    row.append(createCell().html(employeeToString(task.executor)));
                }
                table.append(row);
            }
            $('#table_holder').append(table);
        });
        break;
    case TYPE_RESULT :
        const resultId = urlParams.get(RESULT_ID);
        database.ref(`inspection_results/${resultId}`).once("value").then(function(snapshot) {
            let result = snapshot.val();
            let defects = result.defects;

            const table = createTable();
            table.append(createSingleCell(3).html(
                `<div align='center'><b>ЛИСТОК ОСМОТРА ОБЪЕКТА</b></div><br>` +
                `<div align='center'>${result.inspection_task.place.name}</div><br>` +
                `<div align='center'>Вид обхода : Осмотр всей ВЛ электромонтерами.</div>`
            ));

            for (let i = -1; i < defects.length; i++) {
                const row = createRow();
                if (i === -1) {
                    for (let j = 0; j < HEADERS_RESULT.length; j++) {
                        row.append(createHeaderCell().html(HEADERS_RESULT[j]));
                    }
                } else {
                    row.append(createCell().html(defects[i].location));
                    row.append(createCell().html(defects[i].equipment_type));
                    row.append(createCell().html(defects[i].description.text));
                }
                table.append(row);
            }
            $('#table_holder').append(table);
        });
        break;
    case TYPE_FINAL :
        break;
}

// function generateTable(size) {
//     // const numbersPull = getNumbers(size);
//     const table = createTable();
//     for (let i = 0; i < ; i++) {
//         const row = createRow();
//         for (let j = 0; j < size; j++) {
//             const numberToCell = removeRandomElement(numbersPull).toString().padStart(2);
//             const numberHolder = createNumberHolder().text(numberToCell)
//             const cell = createCell().html(numberHolder);
//             row.append(cell);
//         }
//         table.append(row);
//     }
//     $('#table_holder').append(table);
// }
