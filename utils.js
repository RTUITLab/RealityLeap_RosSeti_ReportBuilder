const REPORT_TYPE = "type";
const RESULT_ID   = "result_id";
const TASK_ID     = 'task_id';

const TYPE_TASK   = "task";
const TYPE_RESULT = "result";
const TYPE_FINAL  = "final";

const HEADERS_TASK = [
    "Место и наименование проведения работ",
    "Технические мероприятия по обеспечению безопасности работ",
    "Работник, отдавший распоряжение",
    "Работник, глава бригады по осмотру",
    // "К работе приступили (дата, время)",
    // "Работа закончена (дата, время)"
]

const HEADERS_RESULT = [
    "Оборудование",
    "Тип оборудования",
    "Выявленные дефекты"
]

const createTable      = () => $('<table>').addClass('main-table');
const createRow        = () => $('<tr>'   ).addClass('main-table-row');
const createCell       = () => $('<td>'   ).addClass('main-table-cell');
const createHeaderCell = () => $('<td>'   ).addClass('main-table-header-cell');
const employeeToString = (employee) =>
    employee.middle_name + " " +
    employee.first_name[0] + ". " +
    employee.last_name[0] + ". (гр. " +
    employee.safety_group + ")";

