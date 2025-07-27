const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycby-6r7AHEqFeJNpM_vDL1vYd2q2-P13z71FyBfrgtbCzQTVIa-X3aczyc4-y2-6IsM0/exec';

fetch(SHEET_API_URL)
  .then(res => res.json())
  .then(data => {
    const tableBody = document.getElementById('tableBody');
    data.reverse().forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.post}</td>
        <td>${item.violation}</td>
        <td>${item.risk}</td>
        <td>${item.timestamp}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error('Error loading data:', err);
  });
