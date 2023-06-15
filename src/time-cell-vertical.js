'use strict';

import { applyTheme } from '../renderer/themes.js';

import { getUserPreferences } from '../js/user-preferences.js';

const { remote } = require('electron');
const header_title = document.querySelector('.header-title');
const timeArr = remote.getGlobal('arr');

const $ = require('jquery');

header_title.textContent = timeArr['date'] + ' ' + '(' + timeArr['day'] + ')';

let count = 1,
    insertRowIndex = 0;

const table = $('#sort-list-table tbody')[0];
let row = table.insertRow(insertRowIndex),
    numberCell = row.insertCell(0),
    startCell = row.insertCell(1),
    endCell = row.insertCell(2);

function createRowTwoCell()
{
    row = table.insertRow(++insertRowIndex);
    numberCell = row.insertCell(0);
    startCell = row.insertCell(1);
}

function addRowToVerticalListTable()
{
    timeArr['time'].forEach((element, index) =>
    {

        if (element.value === 'start')
        {
            if (index !== 0)
            {
                createRowTwoCell();
                endCell = row.insertCell(2);
            }

            numberCell.innerHTML = count;
            startCell.innerHTML = element.key;
            count += 1;
        }
        else if (element.value === 'end')
        {
            endCell.innerHTML = element.key;
        }
        else if (element.value === 'interval')
        {
            createRowTwoCell();
            startCell.colSpan = 2;
            startCell.innerHTML = element.key;
        }

    });

    createRowTwoCell();
    startCell.colSpan = 2;
    numberCell.innerHTML = 'Total';

    timeArr['total'] === '' ? startCell.innerHTML = '?' : startCell.innerHTML = timeArr['total'];

}

addRowToVerticalListTable();

$(() =>
{
    const preferences = getUserPreferences();
    applyTheme(preferences.theme);
});
