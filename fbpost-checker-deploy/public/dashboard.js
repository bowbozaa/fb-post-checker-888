// dashboard.js
// ใช้ร่วมกับ config.js ที่มี GAS_BASE_URL และ PROXY_URL

fetch(PROXY_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: GAS_BASE_URL,
    payload: { action: "getAllPosts" }
  })
})
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#postTable tbody");
    tbody.innerHTML = ""; // เคลียร์ข้อมูลเก่า
    data.forEach(post => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${post.timestamp}</td>
        <td>${post.name}</td>
        <td>${post.employeeId}</td>
        <td>${post.teamCode}</td>
        <td>${post.position}</td>
        <td>${post.keywords}</td>
        <td>${post.postType}</td>
        <td>${post.userRole}</td>
        <td><a href="${post.postLink}" target="_blank">ลิงก์</a></td>
        <td>${post.postText}</td>
        <td>${post.riskLevel}</td>
        <td>${post.suggestions}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("❌ ดึงข้อมูลล้มเหลว:", error);
    const tbody = document.querySelector("#postTable tbody");
    tbody.innerHTML = `<tr><td colspan="12" style="color:red; text-align:center">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>`;
  });
