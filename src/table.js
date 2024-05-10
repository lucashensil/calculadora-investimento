const isNonEmptyArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Informações necessarias não passadas ou passadas corretamente"
    );
  }
  const tableElement = document.getElementById("results-table");
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Id da tabela não encontrado");
  }

  createTeableHeader(tableElement, columnsArray);
  createTeableBody(tableElement, dataArray, columnsArray);
};

function createTeableHeader(tableReference, columnsArray) {
  function createTheadEl(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  const theadReference =
    tableReference.querySelector("thead") ?? createTheadEl(tableReference);

  const headerRow = document.createElement("tr");
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-0'].forEach(cssClass => headerRow.classList.add(cssClass))
  for (const tableColumnObject of columnsArray) {
    const headerEl = `<th class= 'text-center'> ${tableColumnObject.columnLabel} </th>`;

    headerRow.innerHTML += headerEl;
    theadReference.appendChild(headerRow)
  }
}

function createTeableBody(tableReference, tableItemns, columnsArray) {
  function createTbodyEl(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tbodyReference =
    tableReference.querySelector("tbody") ?? createTbodyEl(tableReference);

  for (const [itemIndex, tableItem] of tableItemns.entries()) {
    const tableRow = document.createElement("tr");
    if (itemIndex % 2 !==0) {
      tableRow.classList.add('bg-blue-200')
    }
    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info)
      tableRow.innerHTML += `<td class='text-center'>${
        formatFn(tableItem[tableColumn.accessor])
      }</td>`;
    }
    tbodyReference.appendChild(tableRow);
  }
}
