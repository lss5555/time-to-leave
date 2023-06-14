'use strict';

import { applyTheme } from '../renderer/themes.js';

import { getUserPreferences } from '../js/user-preferences.js';

const { remote } = require('electron');
const header_title = document.querySelector('.header-title');
const timeArr = remote.getGlobal('arr');

const $ = require('jquery');

header_title.textContent = timeArr['date'] + ' ' + '(' + timeArr['day'] + ')';

function addRowToVerticalListTable()
{
    let startIndex = 0,
        count = 1,
        insertRowIndex = 0,
        endIndex = 1,
        breakIndex = 2;


    const table = $('#sort-list-table tbody')[0];
    let row = table.insertRow(insertRowIndex),
        numberCell = row.insertCell(0),
        startCell = row.insertCell(1),
        endCell = row.insertCell(2),
        breakTimeCell;

    numberCell.innerHTML = 'order';
    startCell.innerHTML = 'Start';
    endCell.innerHTML = 'End';

    row = table.insertRow(++insertRowIndex);
    numberCell = row.insertCell(0);
    breakTimeCell = row.insertCell(1);
    breakTimeCell.colSpan = 2;
    breakTimeCell.innerHTML = 'BreakTime';


    timeArr['time'].forEach((element, index) =>
    {

        if (index === startIndex)
        {
            row = table.insertRow(++insertRowIndex);
            numberCell = row.insertCell(0);
            startCell = row.insertCell(1);
            endCell = row.insertCell(2);

            numberCell.innerHTML = count;
            startCell.innerHTML = element.key;
            count += 1;
        }
        else if (index === endIndex)
        {
            endCell.innerHTML = element.key;
            endIndex += 3;
        }
        else if (index === breakIndex && element.value === 'interval')
        {
            row = table.insertRow(++insertRowIndex);
            numberCell = row.insertCell(0);
            breakTimeCell = row.insertCell(1);
            breakTimeCell.colSpan = 2;
            breakTimeCell.innerHTML = element.key;
            breakIndex += 3;
            startIndex += 3;
        }

    });

    row = table.insertRow(++insertRowIndex);
    startCell = row.insertCell(0);
    endCell = row.insertCell(1);

    startCell.innerHTML = 'Total';

    if (timeArr['total'] === '')
    {
        endCell.innerHTML = '?';
    }
    else
    {
        endCell.innerHTML = timeArr['total'];
    }
    endCell.colSpan = 2;

}

addRowToVerticalListTable();

$(() =>
{
    const preferences = getUserPreferences();
    applyTheme(preferences.theme);
});
